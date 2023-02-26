import { Box, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionsList from 'screens/wiki/condition/ConditionsList';
import { Condition, Wiki } from 'types/api.types';

interface ConditionNumOfProvincesProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  level: number;
  condition: Condition;
  useExample: boolean;
  value?: string;
}

function ConditionNumOfProvinces({
                                   wiki, wikiVersion, condition, level, useExample
                                 }: ConditionNumOfProvincesProps): JSX.Element {
  const theme = useTheme();
  const intl = useIntl();

  let nb = undefined;
  if (condition.conditions && condition.conditions.value && condition.conditions.value.length > 0) {
    nb = condition.conditions.value[0];
  }

  if (nb !== undefined) {
    const copy = JSON.parse(JSON.stringify(condition));
    delete copy.conditions?.value;
    return (
      <Box sx={ { pt: 1 } }>
        <>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        display: 'inline'
                      } }>
            { intl.formatMessage({ id: 'wiki.condition.num_of_owned_provinces_with' }, { nb }) }
          </Typography>
          <ConditionsList condition={ copy } level={ level + 1 } wiki={ wiki } wikiVersion={ wikiVersion }
                          useExample={ useExample }/>
        </>
      </Box>
    )
  } else {
    return <></>
  }
}

export default ConditionNumOfProvinces;
