import { Home } from '@mui/icons-material';
import { Backdrop, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { Decision, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { stringLocalisedComparator } from 'utils/format.utils';
import DecisionCard from "./DecisionCard";

function DecisionsList() {
  const { version } = useParams();
  const intl = useIntl();
  const { wikiState } = useContext(WikiContext)!;

  const [ wiki, setWiki ] = useState<Wiki>();
  const [ decisions, setDecisions ] = useState<Array<Decision>>();
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean>(false);

  useEffect(() => {
    if (!wiki && version && wikiState && wikiState.wikis && wikiState.wikis[version]) {
      const wiki = wikiState.wikis[version];
      setWiki(wiki);
      setDecisions(Object.values(wiki.decisions).sort(stringLocalisedComparator));
      document.title = intl.formatMessage({ id: 'wiki.decisions' });
      setLoading(false);
      setError(false);

      Object.values(wiki.decisions).filter(d => d.effects)
    }
  }, [ wikiState, version, wiki, intl ]);

  return (
    <>
      {
        (error || (!loading && (!decisions || !version || !wiki))) ?
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                sx={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.decision.notFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' sx={ { width: 40, height: 40 } }/>
            </Link>
          </Grid>
          :
          <>
            <WikiBar type={ wikiTypes.decisions } objects={ decisions }>
              <Toolbar sx={ { backgroundColor: theme.palette.primary.dark } }>
                <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                  { intl.formatMessage({ id: 'wiki.decisions' }) }
                </Typography>
              </Toolbar>
            </WikiBar>
            {
              (loading || !decisions || !wiki || !version) ?
                <Backdrop open sx={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <Grid container sx={ { p: 3, flexDirection: 'column', alignItems: 'center' } }>
                  <Grid container size={ 12 } spacing={ 2 }>
                    <Grid container rowSpacing={ 4 }>
                      {
                        decisions && decisions.map((decision, index) => (
                          <Grid container size={ { xs: 12, md: 6, xl: 4 } }
                                key={ decision.id } id={ decision.id }>
                            <DecisionCard decision={ decision } wiki={ wiki } version={ version }/>
                          </Grid>
                        ))
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

export default DecisionsList;
