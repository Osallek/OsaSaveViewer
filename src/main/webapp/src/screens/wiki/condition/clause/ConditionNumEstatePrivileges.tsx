import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getEstate, getEstateImage } from 'utils/wiki.utils';

interface ConditionNumEstatePrivilegesProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionNumEstatePrivileges({ wiki, wikiVersion, condition, clause, negate, useExample }: ConditionNumEstatePrivilegesProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.estate && condition.conditions.estate.length > 0) {
    name = condition.conditions.estate[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    value = condition.conditions.value[0];
  }

  const estate = value !== undefined && name !== undefined && getEstate(wiki, name);
  return (
    <ConditionLocalisedLink condition={ `${ clause }.1` } wikiVersion={ wikiVersion } negate={ negate } value={ name } type={ wikiTypes.estates }
                            record={ wiki.estates } colons={ false } sx={ { pl: -1 } } avatar={ estate ? getEstateImage(estate) : undefined } grid={ false }
                            suffix={ <ConditionsNumber condition={ clause } negate={ negate } value={ value ? Number(value) : undefined } grid={ false }/> }/>
  )
}

export default ConditionNumEstatePrivileges;
