import { Home, PriorityHigh } from '@mui/icons-material';
import { Backdrop, CircularProgress, GridLegacy, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import ConditionsList from 'screens/wiki/condition/ConditionsList';
import ExampleIcon from 'screens/wiki/ExampleIcon';
import LocalisedExample from 'screens/wiki/LocalisedExample';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { Decision, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';
import { stringLocalisedComparator } from 'utils/format.utils';
import WikiAccordion from '../WikiAccordion';

function DecisionPage() {
  const params = useParams();
  const intl = useIntl();
  const { wikiState } = useContext(WikiContext)!;

  const [wiki, setWiki] = useState<Wiki>();
  const [decision, setDecision] = useState<Decision>();
  const [decisions, setDecisions] = useState<Array<Decision>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [useExample, setUseExample] = useState<boolean>(false);
  const [expandedPotential, setExpandedPotential] = useState<boolean>(true);
  const [expandedAllow, setExpandedAllow] = useState<boolean>(true);

  const { id, version } = params;

  useEffect(() => {
    if (!decision && id && version && wikiState && wikiState.wikis && wikiState.wikis[version]) {
      const decision = wikiState.wikis[version].decisions[id];
      setWiki(wikiState.wikis[version]);
      setDecision(decision);
      setDecisions(Object.values(wikiState.wikis[version].decisions).sort(stringLocalisedComparator));
      document.title = intl.formatMessage({ id: 'wiki.decision' }) + ' - ' + (getLName(decision) ?? id);
      setLoading(false);
      setError(false);
    }
  }, [id, wikiState, version]);

  return (
    <>
      {
        (error || (!loading && (!decision || !version || !wiki))) ?
          <GridLegacy container alignItems="center" justifyContent="center" flexDirection="column"
                style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant="h2" color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant="h3" color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.decision.notFound' }) }
            </Typography>
            <Link to="/">
              <Home fontSize="large" color="primary" style={ { width: 40, height: 40 } }/>
            </Link>
          </GridLegacy>
          :
          <>
            <WikiBar type={ wikiTypes.decisions } objects={ decisions } value={ decision }>
              {
                decision ?
                  (
                    <Toolbar style={ { justifyContent: 'center', backgroundColor: theme.palette.primary.dark } }>
                      <GridLegacy container item alignItems="center" xs={ 12 } xl={ 10 }>
                        <LocalisedExample example={ decision }
                                          useExample={ useExample } suffix={ ` (${ decision.id })` }
                                          variant="h6" color={ theme.palette.primary.contrastText }/>
                        {
                          decision.major &&
                          <Tooltip title={ intl.formatMessage({ id: 'wiki.decision.isMajor' }) }>
                            <IconButton color="success" style={ { marginLeft: 8 } }>
                              <PriorityHigh style={ { width: 24, height: 24 } }/>
                            </IconButton>
                          </Tooltip>
                        }
                        <ExampleIcon onClick={ () => setUseExample(!useExample) } color="secondary"/>
                      </GridLegacy>
                    </Toolbar>
                  )
                  :
                  <></>
              }
            </WikiBar>
            {
              (loading || !decision || !wiki || !version) ?
                <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color="primary"/>
                </Backdrop>
                :
                <GridLegacy container justifyContent="center" sx={ { p: 3 } }>
                  <GridLegacy container item xs={ 12 } xl={ 10 } rowSpacing={ 3 }>
                    <GridLegacy container item flexDirection="column">
                      <GridLegacy container alignItems="center">
                        <Typography variant="h4">
                          { intl.formatMessage({ id: 'wiki.decision.description' }) }
                        </Typography>
                      </GridLegacy>
                      <LocalisedExample example={ decision.description } useExample={ useExample }/>
                    </GridLegacy>
                    <GridLegacy container item columnSpacing={ 4 }>
                      <GridLegacy container item flexDirection="column" xs={ 12 } lg={ 6 }>
                        <WikiAccordion expanded={ expandedPotential }
                                       onChange={ () => setExpandedPotential(!expandedPotential) }
                                       summary={
                                         <GridLegacy container alignItems="center">
                                           <Typography variant="h4">
                                             { intl.formatMessage({ id: 'wiki.decision.potential' }) }
                                           </Typography>
                                         </GridLegacy>
                                       }
                                       details={
                                         <ConditionsList condition={ decision.potential } wiki={ wiki } root
                                                         useExample={ useExample } wikiVersion={ version }/>
                                       }
                        />
                      </GridLegacy>
                      <GridLegacy container item flexDirection="column" xs={ 12 } lg={ 6 }>
                        <WikiAccordion expanded={ expandedAllow }
                                       onChange={ () => setExpandedAllow(!expandedAllow) }
                                       summary={
                                         <GridLegacy container alignItems="center">
                                           <Typography variant="h4">
                                             { intl.formatMessage({ id: 'wiki.decision.allow' }) }
                                           </Typography>
                                         </GridLegacy>
                                       }
                                       details={
                                         <ConditionsList condition={ decision.allow } wiki={ wiki } root
                                                         useExample={ useExample } wikiVersion={ version }/>
                                       }
                        />
                      </GridLegacy>
                    </GridLegacy>
                  </GridLegacy>
                </GridLegacy>
            }
          </>
      }
    </>
  );
}

export default DecisionPage;
