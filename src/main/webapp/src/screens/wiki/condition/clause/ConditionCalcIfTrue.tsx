import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionsBlock from 'screens/wiki/condition/ConditionsBlock';
import { Condition, Wiki } from 'types/api.types';

interface ConditionCalcIfTrueProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  useExample: boolean;
  negate: boolean;
  root: boolean;
  name: string;
}

function ConditionCalcIfTrue({
                               wiki, wikiVersion, useExample, condition, negate, root, name
                             }: ConditionCalcIfTrueProps): JSX.Element {
  const intl = useIntl();

  let amount = undefined;
  if (condition.conditions && condition.conditions.amount && condition.conditions.amount.length > 0) {
    amount = condition.conditions.amount[0];
  }

  const copy = JSON.parse(JSON.stringify(condition));
  delete copy.conditions?.amount;

  return (
    <ConditionsBlock wiki={ wiki } condition={ copy } wikiVersion={ wikiVersion } root={ root }
                     useExample={ useExample } negate={ negate }
                     title={ `${ intl.formatMessage({ id: `wiki.condition.${ name }`, defaultMessage: name }, { nb: amount ?? 0 }) }` }/>
  )
}

export default ConditionCalcIfTrue;
