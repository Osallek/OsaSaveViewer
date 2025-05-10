import { Home } from '@mui/icons-material';
import { Backdrop, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import PolicyCard from 'screens/wiki/policies/PolicyCard';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { Policy, Power, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { stringComparator, stringLocalisedComparator } from 'utils/format.utils';

function PoliciesList() {
  const { version, id } = useParams();
  const intl = useIntl();
  const { wikiState } = useContext(WikiContext)!;

  const [ wiki, setWiki ] = useState<Wiki>();
  const [ policies, setPolicies ] = useState<Array<Policy>>();
  const [ filtered, setFiltered ] = useState<Array<Policy>>();
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean>(false);
  const [ barHeight, setBarHeight ] = useState<number>(0);

  useEffect(() => {
    if (!wiki && version && wikiState && wikiState.wikis && wikiState.wikis[version]) {
      const wiki = wikiState.wikis[version];
      setWiki(wiki);
      setPolicies(
        Object.values(wiki.policies).filter(i => i.category !== undefined).sort(stringLocalisedComparator));
      document.title = intl.formatMessage({ id: 'wiki.policies' });
      setLoading(false);
      setError(false);
    }
  }, [ wikiState, version, wiki, intl ]);

  useEffect(() => {
    if (policies) {
      setFiltered(policies.sort((a, b) => stringComparator(a.category, b.category) || stringLocalisedComparator(a, b)));
    }
  }, [ policies ]);

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
        (error || (!loading && (!policies || !version || !wiki))) ?
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                sx={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.policy.notFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' sx={ { width: 40, height: 40 } }/>
            </Link>
          </Grid>
          :
          <>
            <WikiBar type={ wikiTypes.policies } objects={ policies }
                     group={ p => intl.formatMessage({ id: `wiki.policy.${ p.category }` }) }
                     setHeight={ setBarHeight }>
              <Toolbar sx={ { backgroundColor: theme.palette.primary.dark } }>
                <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                  { intl.formatMessage({ id: 'wiki.policies' }) }
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
                    <Grid container rowSpacing={ 2 }>
                      {
                        Object.keys(Power).map(category => (
                            <Grid container sx={ { flexDirection: 'column' } } rowSpacing={ 1 } key={ category }>
                              <Typography variant='h4'>
                                { intl.formatMessage({ id: `wiki.policy.${ category }` }) }
                              </Typography>
                              <Grid container spacing={ 2 }>
                                {
                                  filtered && filtered.filter(i => category === i.category)
                                    .map((policy) => (
                                      <Grid container size={ { xs: 12, md: 6, xl: 4 } }
                                            key={ policy.id } id={ policy.id }>
                                        <PolicyCard policy={ policy } wiki={ wiki } version={ version }
                                                    expanded={ id === policy.id }/>
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

export default PoliciesList;
