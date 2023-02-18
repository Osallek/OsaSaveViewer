import { Avatar, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import { Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { getCountry, getCountrysFlag } from 'utils/wiki.utils';

interface ConditionLocalisedProps extends TypographyProps {
  wiki: Wiki;
  condition: string;
  value?: string;
}

function ConditionLocalised({ wiki, condition, value, ...others }: ConditionLocalisedProps) {
  const theme = useTheme();
  const intl = useIntl();

  switch (condition) {
    case 'tag': {
      const country = value && getCountry(wiki, value);

      return country ? (
          <Grid container item alignItems='center' style={ { width: '100%' } } key={ `tooltip-total-${ value }` }>
            <Typography variant='body1'
                        sx={ { color: theme.palette.primary.contrastText, mr: 1, ...others.sx } } { ...others }>
              { intl.formatMessage({ id: `wiki.condition.tag` }) }
            </Typography>
            <Tooltip title={ getLName(country) ?? country.id }>
              <Avatar src={ getCountrysFlag(country) } variant='square'
                      sx={ { display: 'inline-block', width: 32, height: 32 } }/>
            </Tooltip>
          </Grid>
        )
        :
        <></>
    }
    case 'has_country_modifier': {
      return (
        <>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        display: 'inline', ...others.sx
                      } }
                      { ...others }>
            { `${ intl.formatMessage({ id: `wiki.condition.${ condition }` }) } ` }
          </Typography>
          {
            value && (
              <>
                <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, display: 'inline', } }>
                  { ':' }
                </Typography>
                <Typography variant='body1'
                            sx={ {
                              color: theme.palette.primary.contrastText,
                              fontWeight: 'bold',
                              display: 'inline',
                              ...others.sx
                            } }
                            { ...others }>
                  { ` ${ getLName(wiki.modifiers[value]) }` }
                </Typography>
              </>
            )
          }
        </>
      )
    }
    case 'not':
    case 'or':
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
          { `${ intl.formatMessage({ id: `wiki.condition.${ condition }` }) }` }
        </Typography>
      )
    default:
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
          { `${ condition } ${ value ? `: ${ value }` : '' }` }
        </Typography>
      )
  }
}

export default ConditionLocalised;
