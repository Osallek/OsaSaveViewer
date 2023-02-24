import { useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import LocalisedExample from 'screens/wiki/LocalisedExample';
import { Condition, Wiki } from 'types/api.types';

interface ConditionCustomTriggerTooltipProps extends TypographyProps {
  wiki: Wiki;
  condition: Condition;
  useExample: boolean;
}

function ConditionCustomTriggerTooltip({
                                         wiki, condition, useExample, ...others
                                       }: ConditionCustomTriggerTooltipProps): JSX.Element {
  const theme = useTheme();

  const tooltip = condition.conditions && condition.conditions.tooltip && condition.conditions.tooltip.length > 0 && condition.conditions.tooltip[0];

  if (tooltip && wiki.idExampleLocalised[tooltip]) {
    return (
      <LocalisedExample example={ wiki.idExampleLocalised[tooltip] } useExample={ useExample }
                        sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }/>
    )
  } else {
    return <></>
  }
}

export default ConditionCustomTriggerTooltip;
