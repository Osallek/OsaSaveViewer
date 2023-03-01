import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getCountrysFlag } from 'utils/wiki.utils';

interface ConditionTrustProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  value?: string;
}

function ConditionTrust({ wiki, wikiVersion, condition, }: ConditionTrustProps): JSX.Element {
  let tag = undefined;
  if (condition.conditions && condition.conditions.who && condition.conditions.who.length > 0) {
    tag = condition.conditions.who[0];
  }

  let trust = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    trust = condition.conditions.value[0];
  }

  if (trust !== undefined && tag !== undefined && 'emperor' === tag?.toLowerCase()) {
    return (
      <ConditionLocalised condition={ 'trust.emperor' } wikiVersion={ wikiVersion } wiki={ wiki }
                          value={ trust }/>
    )
  }

  if (trust !== undefined && tag !== undefined && 'root' === tag?.toLowerCase()) {
    return (
      <ConditionsNumber condition={ 'trust' } negate={ false } value={ trust ? Number(trust) : undefined }/>
    )
  }

  let country = undefined;
  if (trust !== undefined && tag !== undefined) {
    country = wiki.countries[tag];
  }

  if (country) {
    return (
      <>
        <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ false } value={ tag }
                                colons={ false } avatar={ getCountrysFlag(country) } record={ wiki.countries }
                                type={ wikiTypes.countries } sx={ { pl: -1 } }
                                suffix={ <ConditionsNumber condition={ 'trust.country' } negate={ false }
                                                           value={ trust ? Number(trust) : undefined }
                                                           sx={ { display: 'contents' } }/> }/>
      </>
    )
  } else {
    return <></>
  }
}

export default ConditionTrust;
