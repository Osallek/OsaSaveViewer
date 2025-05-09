import { Home } from '@mui/icons-material';
import { Backdrop, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import IdeaGroupCard from 'screens/wiki/ideaGroups/IdeaGroupCard';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { IdeaGroup, Power, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { stringComparator, stringLocalisedComparator } from 'utils/format.utils';
import { getIdeaGroupImage } from "utils/wiki.utils";

function IdeaGroupList() {
  const { version, id } = useParams();
  const intl = useIntl();
  const { wikiState } = useContext(WikiContext)!;

  const [ wiki, setWiki ] = useState<Wiki>();
  const [ ideaGroups, setIdeaGroups ] = useState<Array<IdeaGroup>>();
  const [ filtered, setFiltered ] = useState<Array<IdeaGroup>>();
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean>(false);
  const [ barHeight, setBarHeight ] = useState<number>(0);

  useEffect(() => {
    if (!wiki && version && wikiState && wikiState.wikis && wikiState.wikis[version]) {
      const wiki = wikiState.wikis[version];
      setWiki(wiki);
      setIdeaGroups(
        Object.values(wiki.ideaGroups).filter(i => i.category !== undefined).sort(stringLocalisedComparator));
      document.title = intl.formatMessage({ id: 'wiki.ideaGroups' });
      setLoading(false);
      setError(false);
    }
  }, [ wikiState, version ]);

  useEffect(() => {
    if (ideaGroups) {
      setFiltered(
        ideaGroups.sort((a, b) => stringComparator(a.category, b.category) || stringLocalisedComparator(a, b)));
    }
  }, [ ideaGroups ]);

  useEffect(() => {
    if (id) {
      const targetElement = document.getElementById(id);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - barHeight - 8,
          behavior: 'smooth'
        });
      }
    }
  }, [ id, filtered, barHeight ]);

  return (
    <>
      {
        (error || (!loading && (!ideaGroups || !version || !wiki))) ?
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                sx={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.ideaGroup.notFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' sx={ { width: 40, height: 40 } }/>
            </Link>
          </Grid>
          :
          <>
            <WikiBar type={ wikiTypes.ideaGroups } setHeight={ setBarHeight }
                     objects={ ideaGroups?.filter(idea => !idea.free) }
                     group={ ig => intl.formatMessage({ id: `wiki.ideaGroups.${ ig.category }` }) }
                     imageFunction={ getIdeaGroupImage }>
              <Toolbar sx={ { backgroundColor: theme.palette.primary.dark } }>
                <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                  { intl.formatMessage({ id: 'wiki.ideaGroups' }) }
                </Typography>
              </Toolbar>
            </WikiBar>
            {
              (loading || !filtered || !wiki || !version) ?
                <Backdrop open sx={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <Grid container sx={ { p: 3, flexDirection: 'column', alignItems: 'center' } }>
                  <Grid container size={ 12 } spacing={ 2 }>
                    <Grid container rowSpacing={ 4 }>
                      {
                        Object.keys(Power).map(category => (
                            <Grid container sx={ { flexDirection: 'column' } } rowSpacing={ 1 } key={ category }>
                              <Typography variant='h4'>
                                { intl.formatMessage({ id: `wiki.ideaGroups.${ category }` }) }
                              </Typography>
                              <Grid container spacing={ 3 }>
                                {
                                  filtered && filtered.filter(i => category === i.category)
                                    .map((group, index) => (
                                      <Grid container size={ { xs: 12, md: 6, xl: 4 } } key={ group.id }
                                            id={ group.id }>
                                        <IdeaGroupCard group={ group } wiki={ wiki }
                                                       version={ version } expanded={ id === group.id }/>
                                      </Grid>
                                    ))
                                }
                              </Grid>
                            </Grid>
                          )
                        )
                      }
                    </Grid>
                  </Grid>
                </Grid>
            }
          </>
      }
    </>
  )
}

export default IdeaGroupList;
