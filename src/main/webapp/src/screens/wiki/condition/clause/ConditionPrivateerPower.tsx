import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getCountry, getCountrysFlag } from 'utils/wiki.utils';

interface ConditionPrivateerPowerProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
  useExample: boolean;
}

function ConditionPrivateerPower({ wiki, wikiVersion, condition, clause, negate, useExample }: ConditionPrivateerPowerProps): JSX.Element {
  let country = undefined;
  if (condition.conditions && condition.conditions.country && condition.conditions.country.length > 0) {
    country = condition.conditions.country[0];
  }

  let share = undefined;
  if (condition.conditions && condition.conditions.share && condition.conditions.share.length > 0) {
    share = condition.conditions.share[0];
  }

  if (share !== undefined && country !== undefined && 'emperor' === country?.toLowerCase()) {
    return (
      <ConditionsNumber condition={ `${ clause }.emperor` } negate={ negate } value={ share ? Number(share) : undefined }
                        suffix='%'/>
    )
  }

  if (share !== undefined && country !== undefined && 'root' === country?.toLowerCase()) {
    return (
      <ConditionsNumber condition={ `${ clause }.root` } negate={ negate } value={ share ? Number(share) : undefined }
                        suffix='%'/>
    )
  }

  let other = share !== undefined && country !== undefined && getCountry(wiki, country);
  return (
    <ConditionLocalisedLink condition={ `${ clause }.country.1` } wikiVersion={ wikiVersion } negate={ negate } value={ country } type={ wikiTypes.countries }
                            record={ wiki.countries } colons={ false } sx={ { pl: -1 } } avatar={ other ? getCountrysFlag(other) : undefined }
                            suffix={ <ConditionsNumber condition={ `${ clause }.country` } negate={ negate } value={ share ? Number(share) : undefined }
                                                       suffix='%'/> }/>
  )
}

export default ConditionPrivateerPower;
