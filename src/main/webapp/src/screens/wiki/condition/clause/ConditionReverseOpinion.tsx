import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getCountrysFlag } from 'utils/wiki.utils';

interface ConditionReverseOpinionProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  value?: string;
}

function ConditionReverseOpinion({ wiki, wikiVersion, condition, }: ConditionReverseOpinionProps): JSX.Element {
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
      <ConditionLocalised condition={ 'reverse_has_opinion.emperor' } wikiVersion={ wikiVersion } wiki={ wiki }
                          value={ opinion }/>
    )
  }

  let country = undefined;
  if (opinion !== undefined && tag !== undefined) {
    country = wiki.countries[tag];
  }

  if (country) {
    return (
      <>
        <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ false } value={ tag }
                                colons={ false } avatar={ getCountrysFlag(country) } record={ wiki.countries }
                                type={ wikiTypes.countries } sx={ { pl: -1 } }
                                suffix={ <ConditionLocalised condition={ 'reverse_has_opinion.country' }
                                                             wikiVersion={ wikiVersion } wiki={ wiki }
                                                             value={ opinion }/> }/>
      </>
    )
  } else {
    return <></>
  }
}

export default ConditionReverseOpinion;
