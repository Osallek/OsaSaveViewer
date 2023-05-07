import { Home } from '@mui/icons-material';
import { Backdrop, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import IdeaGroupCard from 'screens/wiki/ideaGroups/IdeaGroupCard';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { IdeaGroup, Power, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { stringComparator, stringLocalisedComparator } from 'utils/format.utils';

function IdeaGroupList() {
  const params = useParams();
  const intl = useIntl();

  const [wiki, setWiki] = useState<Wiki>();
  const [ideaGroups, setIdeaGroups] = useState<Array<IdeaGroup>>();
  const [filtered, setFiltered] = useState<Array<IdeaGroup>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { version } = params;

  useEffect(() => {
    ;(async () => {
      try {
        if (version) {
          const { data: versionsData } = await api.wiki.versions();

          if (versionsData && versionsData[version]) {
            const { data } = await api.wiki.data(version, versionsData[version]);

            if (data) {
              setWiki(data);
              setIdeaGroups(
                Object.values(data.ideaGroups).filter(i => i.category != undefined).sort(stringLocalisedComparator));
              document.title = intl.formatMessage({ id: 'wiki.ideaGroups' });
            }
          }
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  useEffect(() => {
    if (ideaGroups) {
      setFiltered(
        ideaGroups.sort((a, b) => stringComparator(a.category, b.category) || stringLocalisedComparator(a, b)));
    }
  }, [ideaGroups]);

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
            <WikiBar version={ version } type={ wikiTypes.ideaGroups }
                     objects={ ideaGroups?.filter(idea => !idea.free) }
                     group={ false }>
              <Toolbar sx={ { justifyContent: 'center', backgroundColor: theme.palette.primary.dark } }>
                <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                  { intl.formatMessage({ id: 'wiki.ideaGroups' }) }
                </Typography>
              </Toolbar>
            </WikiBar>
            {
              (loading || !ideaGroups || !wiki || !version) ?
                <Backdrop open sx={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <Grid container sx={ { p: 3, flexDirection: 'column', alignItems: 'center' } }>
                  <Grid container item xs={ 12 } spacing={ 2 }>
                    <Grid container item rowSpacing={ 4 }>
                      {
                        Object.keys(Power).map(category => (
                            <Grid container item sx={ { flexDirection: 'column' } } rowSpacing={ 1 } key={ category }>
                              <Typography variant='h4'>
                                { intl.formatMessage({ id: `wiki.ideaGroups.${ category }` }) }
                              </Typography>
                              <Grid container item spacing={ 3 }>
                                {
                                  filtered && filtered.filter(i => category === i.category)
                                                      .map((group, index) => (
                                                        <Grid container item xs={ 12 } md={ 6 } xl={ 4 } key={ group.id }>
                                                          <IdeaGroupCard group={ group } wiki={ wiki }
                                                                         version={ version }/>
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
