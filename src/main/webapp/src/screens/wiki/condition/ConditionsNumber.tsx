import { Avatar, Grid, Typography, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import React from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import { formatNumber } from 'utils/format.utils';

interface ConditionItemProps {
  condition: string;
  negate: boolean;
  value?: number;
  avatar?: string;
  sx?: SxProps<Theme>;
  suffix?: string;
  grid?: boolean;
}

interface DefaultNodeProps extends ConditionItemProps {
  intl: IntlShape;
  theme: Theme;
}

const innerDefaultNode = ({
                            intl, theme, value, negate, condition, grid = true, suffix, avatar
                          }: DefaultNodeProps) => {
  return (
    <>
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
          { `${ formatNumber(value) }${ suffix ?? '' }` }
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
    </>
  )
}

function ConditionsNumber(props: ConditionItemProps) {
  const { grid = true } = props;
  const theme = useTheme();
  const intl = useIntl();

  return (
    grid ?
      (
        <Grid container>
          { innerDefaultNode({ theme, intl, ...props }) }
        </Grid>
      )
      :
      (
        innerDefaultNode({ theme, intl, ...props })
      )
  )
}

export default ConditionsNumber;
