import { useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsBlock from 'screens/wiki/condition/ConditionsBlock';
import { Condition, Localised, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';

interface ConditionProvinceGroupProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  useExample: boolean;
  negate: boolean;
  value: Localised;
  root: boolean;
  name: string;
}

function ConditionProvinceGroup({
                                  wiki, wikiVersion, useExample, condition, negate, value, root, name
                                }: ConditionProvinceGroupProps): JSX.Element {
  const theme = useTheme();
  const intl = useIntl();

  let type = undefined;
  if (condition.conditions && condition.conditions.type && condition.conditions.type.length > 0) {
    type = condition.conditions.type[0];
  }

  const copy = JSON.parse(JSON.stringify(condition));
  delete copy.conditions?.type;

  return (
    <ConditionsBlock wiki={ wiki } condition={ copy } wikiVersion={ wikiVersion } root={ root }
                     useExample={ useExample } negate={ negate }
                     title={
                       <ConditionLocalisedLink link={ false } colons={ false } wikiVersion={ wikiVersion }
                                               negate={ negate }
                                               value={ intl.formatMessage({
                                                   id: `wiki.condition.${ name }.clause${ 'all' === type ? '.all' : '' }`
                                                 },
                                                 { name: getLName(value) }) }
                                               sx={ {
                                                 color: theme.palette.primary.contrastText,
                                                 backgroundColor: theme.palette.primary.dark,
                                                 fontWeight: 'bold',
                                               } }/>
                     }>
    </ConditionsBlock>
  )
}

export default ConditionProvinceGroup;
