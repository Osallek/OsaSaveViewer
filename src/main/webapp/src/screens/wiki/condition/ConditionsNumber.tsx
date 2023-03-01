import { Avatar, Grid, Typography, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';
import { useIntl } from 'react-intl';
import { formatNumber } from 'utils/format.utils';

interface ConditionItemProps {
  condition: string;
  negate: boolean;
  value?: number;
  avatar?: string;
  sx?: SxProps<Theme>;
}

function ConditionsNumber({ condition, negate, value, avatar, sx }: ConditionItemProps) {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Grid container item alignItems='center' sx={ { ...sx } }>
      <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                  key={ `title-${ condition }-${ value }` }>
        { intl.formatMessage({ id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }
      </Typography>
      {
        value !== undefined &&
        <Typography variant='body1'
                    sx={ {
                      color: theme.palette.primary.contrastText,
                      fontWeight: 'bold',
                      display: 'inline',
                      ml: 0.5, mr: 0.5
                    } }>
          { formatNumber(value) }
        </Typography>
      }
      {
        avatar &&
        <Avatar src={ avatar } variant='square'
                sx={ { display: 'inline-block', width: 32, height: 32, mr: 0.5 } }/>
      }
      <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                  key={ `suffix-${ condition }-${ value }` }>
        { intl.formatMessage({ id: `wiki.condition.${ condition }.2${ negate ? '.not' : '' }` },
          { nb: Number(value) }) }
      </Typography>
    </Grid>
  )
}

export default ConditionsNumber;
