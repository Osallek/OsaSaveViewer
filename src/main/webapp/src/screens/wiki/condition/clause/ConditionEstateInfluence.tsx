import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getEstate, getEstateImage } from 'utils/wiki.utils';

interface ConditionEstateInfluenceProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionEstateInfluence({ wiki, wikiVersion, condition, clause, negate, useExample }: ConditionEstateInfluenceProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.estate && condition.conditions.estate.length > 0) {
    name = condition.conditions.estate[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.influence && condition.conditions.influence.length > 0) {
    value = condition.conditions.influence[0];
  }

  const loyalty = value === undefined && condition.conditions?.higher_than_loyalty;
  const negateLoyalty = loyalty && condition.conditions?.higher_than_loyalty && condition.conditions?.higher_than_loyalty[0] === 'no';

  const estate = value !== undefined && name !== undefined && getEstate(wiki, name);
  return (
    <ConditionLocalisedLink condition={ `${ clause }.1` } wikiVersion={ wikiVersion } negate={ negate } value={ name } type={ wikiTypes.estates }
                            record={ wiki.estates } avatar={ estate ? getEstateImage(estate) : undefined } grid={ false }
                            suffix={ <ConditionLocalised condition={ `${ clause }${ loyalty ? '.loyalty' : '' }` }
                                                         negate={ loyalty ? negateLoyalty : negate } value={ value } grid={ false }
                                                         useExample={ useExample } wiki={ wiki } wikiVersion={ wikiVersion }/> }/>
  )
}

export default ConditionEstateInfluence;
