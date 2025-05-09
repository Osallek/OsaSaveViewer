import { Home } from '@mui/icons-material';
import { AppBar, Avatar, Grid, Toolbar, Tooltip } from '@mui/material';
import { api } from 'api';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IdImageLocalised, IdLocalised, Wiki } from 'types/api.types';
import { WikiType, wikiTypes } from 'types/wiki.types';
import MenuMenu from './MenuMenu';

interface WikiBarProps<T extends (IdLocalised | IdImageLocalised)> {
  type?: WikiType;
  value?: T | null;
  objects?: Array<T>;
  children: React.ReactElement;
  showId?: boolean;
  group?: (value: T) => string;
  imageFunction?: (value: T) => string;
  setHeight?: (height: number) => void;
}

function WikiBar<T extends (IdLocalised | IdImageLocalised)>({
                                                               value,
                                                               type,
                                                               objects,
                                                               children,
                                                               showId,
                                                               group,
                                                               imageFunction,
                                                               setHeight: parentSetHeight,
                                                             }: WikiBarProps<T>) {
  const intl = useIntl();
  const navigate = useNavigate();
  const { wikiState, setWikiState } = useContext(WikiContext)!;
  const { version } = useParams();
  const appbarRef = useRef<HTMLHeadElement>(null);
  const [ height, setHeight ] = useState<number | undefined>(undefined);

  const handleMenuChange = (value: IdLocalised | IdImageLocalised | null) => {
    if (value && type) {
      navigate(`/wiki/${ version }/${ type.path }/${ value.id }`);
    }
  };

  useEffect(() => {
    ;(async () => {
      try {
        if (version) {
          let versionsData: Record<string, string>;

          if (!wikiState.versions || !wikiState.versions[version]) {
            versionsData = (await api.wiki.versions()).data;
            setWikiState({ ...wikiState, versions: versionsData });
          } else {
            versionsData = wikiState.versions;
          }

          if (versionsData[version]) {
            let data: Wiki;
            if (!wikiState.wikis || !wikiState.wikis[version]) {
              data = (await api.wiki.data(version, versionsData[version])).data;
              setWikiState({ ...wikiState, wikis: { ...wikiState.wikis, [version]: data } });
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [ version, wikiState ]);

  useEffect(() => {
    setHeight(appbarRef.current?.clientHeight);

    if (parentSetHeight) {
      parentSetHeight(appbarRef.current?.clientHeight ?? 0);
    }
  }, [ appbarRef, appbarRef.current, value, objects ]);

  return (
    <>
      <AppBar ref={ appbarRef }>
        <Toolbar>
          <Grid container size={ { xs: 12, xl: 10 } }
                sx={ { width: '100%', alignItems: 'center', flexWrap: 'nowrap' } }>
            <Grid container sx={ { minWidth: objects ? 300 : undefined } }>
              <Link to={ `/wiki/${ version }` }>
                <Home color="secondary" style={ { width: 40, height: 40 } }/>
              </Link>
              {
                type && objects &&
                  <MenuMenu title={ intl.formatMessage({ id: `wiki.${ type.path }` }) } showId={ showId }
                            objects={ Object.values(objects) } value={ value } group={ group }
                            onChange={ handleMenuChange } imageFunction={ imageFunction }
                  />
              }
            </Grid>
            <Grid container rowGap={ 1 } padding={ 1 }>
              {
                Object.values(wikiTypes).map(value => (
                  <Tooltip title={ intl.formatMessage({ id: `wiki.${ value.path }` }) }
                           key={ `tooltip-${ value.path }` }>
                    <Link to={ `/wiki/${ version }/${ value.path }` } key={ value.path } style={ { marginLeft: 8 } }>
                      <Avatar variant="square" src={ `/eu4/wiki/${ value.icon }.png` } color="secondary"
                              sx={ { width: 24, height: 24 } }/>
                    </Link>
                  </Tooltip>
                ))
              }
            </Grid>
          </Grid>
        </Toolbar>
        {
          children
        }
      </AppBar>
      <div style={ { height: height } }/>
    </>
  );
}

export default WikiBar;
