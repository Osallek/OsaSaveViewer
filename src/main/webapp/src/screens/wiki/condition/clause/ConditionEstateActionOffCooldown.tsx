import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';

interface ConditionEstateActionOffCooldownProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionEstateActionOffCooldown({
                                            wiki, wikiVersion, condition, clause, negate, useExample
                                          }: ConditionEstateActionOffCooldownProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.estate_action && condition.conditions.estate_action.length > 0) {
    name = condition.conditions.estate_action[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.days && condition.conditions.days.length > 0) {
    value = condition.conditions.days[0];
  }

  return (
    <ConditionLocalisedLink condition={ clause } wikiVersion={ wikiVersion } negate={ negate } value={ name }
                            type={ wikiTypes.estateActions } record={ wiki.estateActions } grid={ false }
                            colons={ false }
                            suffix={ <ConditionsNumber condition={ `${ clause }.days` } negate={ negate }
                                                       value={ value ? Number(value) : undefined }
                                                       sx={ { width: undefined } } grid={ false }/> }/>
  )
}

export default ConditionEstateActionOffCooldown;
