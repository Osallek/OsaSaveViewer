import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from '../../../../types/wiki.types';
import ConditionLocalisedLink from '../ConditionLocalisedLink';

interface ConditionEnactedParliamentActionProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionEnactedParliamentAction({
                                            wiki, wikiVersion, condition, clause, negate
                                          }: ConditionEnactedParliamentActionProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.parliament_action && condition.conditions.parliament_action.length > 0) {
    name = condition.conditions.parliament_action[0];
  }

  return (
    <ConditionLocalisedLink condition={ clause } wikiVersion={ wikiVersion } negate={ negate } value={ name }
                            type={ wikiTypes.parliamentActions } record={ wiki.parliamentActions } grid={ false }/>
  )
}

export default ConditionEnactedParliamentAction;
