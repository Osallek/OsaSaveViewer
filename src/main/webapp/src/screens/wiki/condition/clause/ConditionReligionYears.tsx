import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getReligion, getReligionImage } from 'utils/wiki.utils';

interface ConditionReligionYearsProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
}

function ConditionReligionYears({
                                  wiki, wikiVersion, condition, clause, negate
                                }: ConditionReligionYearsProps): JSX.Element {
  const name = Object.keys(wiki.religions).find(value => condition.conditions && condition.conditions[value]);

  let years = undefined;
  if (name && condition.conditions && condition.conditions[name] && condition.conditions[name].length > 0) {
    years = condition.conditions[name][0];
  }

  let religion = years !== undefined && name !== undefined && getReligion(wiki, name);
  return (
    <ConditionLocalisedLink condition={ `${ clause }.1` } wikiVersion={ wikiVersion } negate={ negate } value={ name }
                            record={ wiki.religions } colons={ false } sx={ { pl: -1 } }
                            avatar={ religion ? getReligionImage(religion) : undefined } type={ wikiTypes.religions }
                            suffix={ <ConditionsNumber condition={ clause } negate={ negate } grid={ false }
                                                       value={ years ? Number(years) : undefined }/> }/>
  )
}

export default ConditionReligionYears;
