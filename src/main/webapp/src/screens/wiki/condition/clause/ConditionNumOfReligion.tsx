import { Grid, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getReligion, getReligionImage } from 'utils/wiki.utils';

interface ConditionNumOfReligionProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  clause: string;
  condition: Condition;
  negate: boolean;
}

function ConditionNumOfReligion({ wiki, wikiVersion, condition, clause, negate }: ConditionNumOfReligionProps): JSX.Element {
  const intl = useIntl();
  const theme = useTheme();

  let name = undefined;
  if (condition.conditions && condition.conditions.religion && condition.conditions.religion.length > 0) {
    name = condition.conditions.religion[0];
  }

  let value = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    value = condition.conditions.value[0];
  }

  const religion = value !== undefined && name !== undefined && getReligion(wiki, name);
  return (
    <Grid container item alignItems='center'>
      <ConditionsNumber condition={ clause } negate={ negate }
                        value={ value ? (Number.isInteger(Number(value)) ? Number(value) : Number(value) * 100) : undefined }
                        sx={ { width: undefined } } grid={ false } suffix={ (value && Number.isInteger(Number(value))) ? undefined : '%' }/>
      <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ml: 0.5 } } key={ `${ condition }-${ value }` }>
        { intl.formatMessage({ id: `wiki.condition.${ clause }.1` }, { nb: value ? Number(value) : undefined }) }
      </Typography>
      <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } grid={ false } record={ wiki.religions } value={ name } type={ wikiTypes.religions }
                              avatar={ religion ? getReligionImage(religion) : undefined } colons={ false }/>
    </Grid>
  )
}

export default ConditionNumOfReligion;
