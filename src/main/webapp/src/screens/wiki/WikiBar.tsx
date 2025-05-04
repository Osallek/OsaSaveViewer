import { Home } from '@mui/icons-material';
import { AppBar, Avatar, GridLegacy, Toolbar, Tooltip } from '@mui/material';
import { api } from 'api';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IdImageLocalised, IdLocalised, Wiki } from 'types/api.types';
import { WikiType, wikiTypes } from 'types/wiki.types';
import MenuMenu from './MenuMenu';

interface WikiBarProps {
  type?: WikiType;
  value?: IdLocalised | null;
  imagedValue?: IdImageLocalised | null;
  objects?: Array<IdLocalised>;
  imagedObjects?: Array<IdImageLocalised>;
  children: React.ReactElement;
  showId?: boolean;
  group?: boolean;
}

function WikiBar({ value, imagedValue, type, objects, imagedObjects, children, showId, group }: WikiBarProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const { wikiState, setWikiState } = useContext(WikiContext)!;
  const { version } = useParams();

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
  }, [version, wikiState]);

  return (
    <AppBar style={ { position: 'relative' } }>
      <Toolbar style={ { justifyContent: 'center' } }>
        <GridLegacy container item alignItems="center" xs={ 12 } xl={ 10 }>
          <Link to={ `/wiki/${ version }` }>
            <Home color="secondary" style={ { width: 40, height: 40 } }/>
          </Link>
          {
            type && (
              objects ?
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ type.path }` }) } showId={ showId }
                          objects={ Object.values(objects) } value={ value } group={ group }
                          onChange={ handleMenuChange }
                />
                :
                imagedObjects &&
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ type.path }` }) } showId={ showId }
                          objects={ Object.values(imagedObjects) } imagedValue={ imagedValue } group={ group }
                          onChange={ handleMenuChange }
                />
            )
          }
          {
            Object.values(wikiTypes).filter(value => value !== type).map(value => (
              <Tooltip title={ intl.formatMessage({ id: `wiki.${ value.path }` }) } key={ `tooltip-${ value.path }` }>
                <Link to={ `/wiki/${ version }/${ value.path }` } key={ value.path } style={ { marginLeft: 8 } }>
                  <Avatar variant="square" src={ `/eu4/wiki/${ value.icon }.png` } color="secondary"
                          sx={ { width: 24, height: 24 } }/>
                </Link>
              </Tooltip>
            ))
          }
        </GridLegacy>
      </Toolbar>
      {
        children
      }
    </AppBar>
  );
}

export default WikiBar;
