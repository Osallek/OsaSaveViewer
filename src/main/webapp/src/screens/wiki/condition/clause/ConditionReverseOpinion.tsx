import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getCountry, getCountrysFlag } from 'utils/wiki.utils';

interface ConditionReverseOpinionProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionReverseOpinion({
                                   wiki, wikiVersion, condition, clause, negate, useExample
                                 }: ConditionReverseOpinionProps): JSX.Element {
  let tag = undefined;
  if (condition.conditions && condition.conditions.who && condition.conditions.who.length > 0) {
    tag = condition.conditions.who[0];
  }

  let opinion = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    opinion = condition.conditions.value[0];
  }

  if (opinion !== undefined && tag !== undefined && 'emperor' === tag?.toLowerCase()) {
    return (
      <ConditionLocalised condition={ `${ clause }.emperor` } wikiVersion={ wikiVersion } wiki={ wiki }
                          negate={ negate } value={ opinion } useExample={ useExample }/>
    )
  }

  let country = opinion !== undefined && tag !== undefined && getCountry(wiki, tag);
  return (
    <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } value={ tag } record={ wiki.countries }
                            colons={ false } avatar={ country ? getCountrysFlag(country) : undefined }
                            type={ wikiTypes.countries } sx={ { pl: -1 } }
                            suffix={ <ConditionLocalised condition={ `${ clause }.country` } value={ opinion }
                                                         sx={ { display: 'contents' } } wiki={ wiki } useExample={ useExample }
                                                         wikiVersion={ wikiVersion }/> }/>
  )
}

export default ConditionReverseOpinion;
