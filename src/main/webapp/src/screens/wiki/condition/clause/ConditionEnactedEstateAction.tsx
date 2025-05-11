import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';

interface ConditionEnactedEstateActionProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionEnactedEstateAction({
                                        wiki, wikiVersion, condition, clause, negate
                                      }: ConditionEnactedEstateActionProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.estate_action && condition.conditions.estate_action.length > 0) {
    name = condition.conditions.estate_action[0];
  }

  return (
    <ConditionLocalisedLink condition={ clause } wikiVersion={ wikiVersion } negate={ negate } value={ name }
                            type={ wikiTypes.estateActions } record={ wiki.estateActions } grid={ false }/>
  )
}

export default ConditionEnactedEstateAction;
