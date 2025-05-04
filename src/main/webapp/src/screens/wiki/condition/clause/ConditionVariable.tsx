import { GridLegacy, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import { Condition, Wiki } from 'types/api.types';

interface ConditionVariableProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionVariable({ wiki, wikiVersion, condition, negate, useExample }: ConditionVariableProps): JSX.Element {
  const intl = useIntl();
  const theme = useTheme();

  let variable = undefined;
  if (condition.conditions && condition.conditions.which && condition.conditions.which.length > 0) {
    variable = condition.conditions.which[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    value = condition.conditions.value[0];
  }

  if (value !== undefined && variable !== undefined) {
    return (
      <GridLegacy container item alignItems='center'>
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } } key={ `title-${ condition }-${ value }` }>
          { intl.formatMessage({ id: 'wiki.condition.variable' }) }
        </Typography>
        <Typography variant='body1'
                    sx={ {
                      color: theme.palette.primary.contrastText,
                      fontWeight: 'bold',
                      display: 'inline',
                      ml: 0.5, mr: 0.5
                    } }>
          { variable }
        </Typography>
        <ConditionLocalised wiki={ wiki } condition={ 'check_variable' } wikiVersion={ wikiVersion } negate={ negate } value={ value } grid={ false }
                            useExample={ useExample }/>
      </GridLegacy>
    )
  } else {
    return <></>
  }
}

export default ConditionVariable;
