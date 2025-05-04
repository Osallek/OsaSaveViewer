import { GridLegacy, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
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
}

function ConditionNumEstatePrivileges({ wiki, wikiVersion, condition, clause, negate }: ConditionNumEstatePrivilegesProps): JSX.Element {
  const intl = useIntl();
  const theme = useTheme();

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
    <GridLegacy container item alignItems='center'>
      <ConditionsNumber condition={ clause } negate={ negate } value={ value ? Number(value) : undefined }
                        sx={ { width: undefined } } grid={ false }/>
      <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ml: 0.5 } } key={ `${ condition }-${ value }` }>
        { intl.formatMessage({ id: `wiki.condition.${ clause }.1` }) }
      </Typography>
      <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } grid={ false } record={ wiki.estates } value={ name } type={ wikiTypes.estates }
                              avatar={ estate ? getEstateImage(estate) : undefined } colons={ false }/>
    </GridLegacy>
  )
}

export default ConditionNumEstatePrivileges;
