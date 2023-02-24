import { OpenInNew } from '@mui/icons-material';
import {
  Avatar, Grid, Paper, styled, Tooltip, tooltipClasses, TooltipProps, Typography, useTheme
} from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Localised } from 'types/api.types';
import { WikiType } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';

interface ConditionLocalisedLinkProps extends TypographyProps {
  wikiVersion: string;
  type: WikiType;
  record: Record<string, Localised>;
  negate: boolean;
  condition?: string;
  value?: string;
  avatar?: string;
  colons?: boolean;
  suffix?: string | React.ReactElement;
}

const NoBgTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip { ...props } classes={ { popper: className } }/>
))(() => ({
  [`& .${ tooltipClasses.tooltip }`]: {
    backgroundColor: 'transparent',
    marginLeft: '2px !important',
    cursor: 'pointer',
  },
}));

function ConditionLocalisedLink({
                                  wikiVersion, condition, value, negate, type, record, avatar, colons = true, suffix,
                                  ...others
                                }: ConditionLocalisedLinkProps): JSX.Element {
  const theme = useTheme();
  const intl = useIntl();
  const { sx, ...others2 } = others;

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Grid container item alignItems='center' key={ `tooltip-total-${ value }` } sx={ { cursor: 'pointer', ...sx } }
          onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
      {
        condition &&
        <Typography variant='body1'
                    sx={ {
                      color: theme.palette.primary.contrastText,
                      display: 'inline',
                      ...sx
                    } }
                    { ...others2 }>
          { intl.formatMessage({ id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }
        </Typography>
      }
      {
        (value || avatar) && (
          <>
            { colons &&
              <Typography variant='body1'
                          sx={ { color: theme.palette.primary.contrastText, display: 'inline', ml: 0.5, mr: 0.5 } }>
                { ':' }
              </Typography>
            }
            <NoBgTooltip open={ hover }
                         title={
                           <OpenInNew fontSize='small' sx={ { color: theme.palette.primary.dark } }
                                      onClick={ () => window.open(`/wiki/${ wikiVersion }/${ type.path }/${ value }`,
                                        "_blank") }/>
                         }
                         placement='right'>
              <Paper elevation={ 0 } sx={ {
                p: 0.5,
                backgroundColor: hover ? 'rgba(55, 71, 79, 0.24)' : 'transparent',
                cursor: 'pointer'
              } }>
                <Grid container item alignItems='center' sx={ { width: 'fit-content' } }>
                  {
                    avatar &&
                    <Avatar src={ avatar } variant='square'
                            sx={ { display: 'inline-block', width: 32, height: 32, mr: 0.5 } }/>
                  }
                  {
                    value &&
                    <Typography variant='body1'
                                sx={ {
                                  color: theme.palette.primary.contrastText,
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                  display: 'inline',
                                  mr: suffix ? 0.5 : 0,
                                  ...sx
                                } }
                                { ...others2 }>
                      { ` ${ record && record[value] ? getLName(record[value]) : value }` }
                    </Typography>
                  }
                </Grid>
              </Paper>
            </NoBgTooltip>
          </>
        )
      }
      {
        suffix &&
        <Typography variant='body1'
                    sx={ { color: theme.palette.primary.contrastText, ...sx } } { ...others2 }>
          { suffix }
        </Typography>
      }
    </Grid>
  )
}

export default ConditionLocalisedLink;
