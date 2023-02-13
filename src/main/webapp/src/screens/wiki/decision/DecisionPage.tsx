import { Home, PriorityHigh } from '@mui/icons-material';
import { Backdrop, CircularProgress, Grid, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import theme from 'theme';
import { Decision } from 'types/api.types';
import { getName } from 'utils/data.utils';
import { stringLocalisedComparator } from 'utils/format.utils';
import ExampleIcon from '../ExampleIcon';
import ExampleLocalised from '../ExampleLocalised';
import WikiBar from '../WikiBar';

function DecisionPage() {
  const params = useParams();
  const intl = useIntl();

  const [decision, setDecision] = useState<Decision>();
  const [decisions, setDecisions] = useState<Array<Decision>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [showExample, setShowExample] = useState<boolean>(false);

  const { id, version } = params;

  useEffect(() => {
    ;(async () => {
      try {
        if (id && version) {
          const { data } = await api.wiki.decisions(version);

          if (data && data[id]) {
            setDecision(data[id]);
            setDecisions(Object.values(data).sort(stringLocalisedComparator));
            document.title = intl.formatMessage({ id: 'wiki.decision' }) + ' - ' + getName(data[id]) ?? id;
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
  }, [id]);

  return (
    <>
      {
        (error || (!loading && (!decision || !version))) ?
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.decision.notFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' style={ { width: 40, height: 40 } }/>
            </Link>
          </Grid>
          :
          <>
            <WikiBar version={ version } type={ 'decisions' } objects={ decisions }>
              {
                decision &&
                (
                  <Toolbar style={ { justifyContent: 'center', backgroundColor: theme.palette.primary.dark } }>
                    <Grid container item alignItems='center' xs={ 12 } xl={ 10 }>
                      <ExampleLocalised main={ decision } example={ decision.localisationsExample }
                                        useExample={ showExample } suffix={ ` (${ decision.id })` }
                                        variant='h6' color={ theme.palette.primary.contrastText }/>
                      {
                        decision.major &&
                        <Tooltip title={ intl.formatMessage({ id: 'wiki.decision.isMajor' }) }>
                          <IconButton color='success' style={ { marginLeft: 8 } }>
                            <PriorityHigh style={ { width: 24, height: 24 } }/>
                          </IconButton>
                        </Tooltip>
                      }
                      <ExampleIcon onClick={ () => setShowExample(!showExample) } color='secondary'/>
                    </Grid>
                  </Toolbar>
                )
              }
            </WikiBar>
            {
              (loading || !decision) ?
                <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <Grid container justifyContent='center' style={ { padding: 24 } }>
                  <Grid container item xs={ 12 } xl={ 10 } flexDirection='column'>
                    <Grid container alignItems='center'>
                      <Typography variant='h6'>
                        { intl.formatMessage({ id: 'wiki.decision.description' }) }
                      </Typography>
                    </Grid>
                    <ExampleLocalised main={ decision.description } example={ decision.descriptionExample }
                                      useExample={ showExample }/>
                  </Grid>
                </Grid>
            }
          </>
      }
    </>
  )
}

export default DecisionPage;
