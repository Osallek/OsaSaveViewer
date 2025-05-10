import { Card, CardActionArea, CardContent, CardHeader, Grid, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import theme from 'theme';
import { Decision } from 'types/api.types';
import LocalisedExample from "../LocalisedExample";
import { useIntl } from "react-intl";
import { PriorityHigh } from '@mui/icons-material';
import ExampleIcon from '../ExampleIcon';
import { wikiTypes } from "types/wiki.types";

interface DecisionCardProps {
  decision: Decision;
  version: string;
}

function DecisionCard({ decision, version }: DecisionCardProps) {
  const intl = useIntl();
  const [ useExample, setUseExample ] = useState<boolean>(false);

  return (
    <Tooltip title={ `id: ${ decision.id }` } placement='right-start'>
      <Card sx={ { width: '100%', height: 'fit-content' } } elevation={ 1 }>
        <CardActionArea component="a" href={`/wiki/${ version }/${ wikiTypes.decisions.path }/${ decision.id }`}>
          <CardHeader disableTypography
                      title={
                        <Grid display='inline-flex' flexWrap='nowrap' alignItems='baseline' gap={ 1 }>
                          <LocalisedExample example={ decision } useExample={ useExample }
                                            variant="h5" color={ theme.palette.primary.contrastText }/>
                          {
                            decision.major &&
                              <Tooltip title={ intl.formatMessage({ id: 'wiki.decision.isMajor' }) }>
                                  <IconButton color="success">
                                      <PriorityHigh style={ { width: 24, height: 24 } }/>
                                  </IconButton>
                              </Tooltip>
                          }
                          <ExampleIcon onClick={ () => setUseExample(!useExample) } color="secondary"/>
                        </Grid>
                      }
                      sx={ { backgroundColor: theme.palette.primary.dark } }
          />
          <CardContent sx={ {} }>
            <LocalisedExample example={ decision.description } useExample={ useExample }/>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  )
}

export default DecisionCard;
