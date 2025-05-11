import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { JSX } from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getEstate, getEstateImage } from 'utils/wiki.utils';

interface ConditionEstateLoyaltyProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionEstateLoyalty({ wiki, wikiVersion, condition, clause, negate, useExample }: ConditionEstateLoyaltyProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.estate && condition.conditions.estate.length > 0) {
    name = condition.conditions.estate[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.loyalty && condition.conditions.loyalty.length > 0) {
    value = condition.conditions.loyalty[0];
  }

  const influence = value === undefined && condition.conditions?.higher_than_influence;
  const negateInfluence = influence && condition.conditions?.higher_than_influence && condition.conditions?.higher_than_influence[0] === 'no';

  const estate = value !== undefined && name !== undefined && getEstate(wiki, name);
  return (
    <ConditionLocalisedLink condition={ `${ clause }.1` } wikiVersion={ wikiVersion } negate={ negate } value={ name } type={ wikiTypes.estates }
                            record={ wiki.estates } colons={ false } avatar={ estate ? getEstateImage(estate) : undefined } grid={ false }
                            suffix={ <ConditionLocalised condition={ `${ clause }${ influence ? '.influence' : '' }` }
                                                         negate={ influence ? negateInfluence : negate } value={ value } grid={ false }
                                                         useExample={ useExample } wiki={ wiki } wikiVersion={ wikiVersion }/> }/>
  )
}

export default ConditionEstateLoyalty;
