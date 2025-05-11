import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import { useIntl } from 'react-intl';
import ConditionsBlock from 'screens/wiki/condition/ConditionsBlock';
import { Condition, Wiki } from 'types/api.types';

interface ConditionNumOfProvincesProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  negate: boolean;
  root: boolean;
  condition: Condition;
  useExample: boolean;
  value?: string;
}

function ConditionNumOfProvinces({
                                   wiki, wikiVersion, condition, root, useExample, negate = false,
                                 }: ConditionNumOfProvincesProps): JSX.Element {
  const intl = useIntl();

  let nb = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    nb = condition.conditions.value[0];
  }

  if (nb !== undefined) {
    const copy = JSON.parse(JSON.stringify(condition));
    delete copy.conditions?.value;
    return (
      <ConditionsBlock wiki={ wiki } condition={ copy } wikiVersion={ wikiVersion } root={ root }
                       useExample={ useExample } negate={ negate }
                       title={ intl.formatMessage(
                         { id: `wiki.condition.num_of_owned_provinces_with${ negate ? '.not' : '' }` }, { nb }) }/>
    )
  } else {
    return <></>
  }
}

export default ConditionNumOfProvinces;
