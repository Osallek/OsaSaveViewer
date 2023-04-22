import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';

interface ConditionHasIssueUnlockTooltipProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionHasIssueUnlockTooltip({
                                          wiki, wikiVersion, condition, clause, negate
                                        }: ConditionHasIssueUnlockTooltipProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.issue && condition.conditions.issue.length > 0) {
    name = condition.conditions.issue[0];
  }

  return (
    <ConditionLocalisedLink condition={ clause } wikiVersion={ wikiVersion } negate={ negate } value={ name }
                            type={ wikiTypes.parliamentActions } record={ wiki.parliamentActions } grid={ false }/>
  )
}

export default ConditionHasIssueUnlockTooltip;
