import { OpenInNew } from '@mui/icons-material';
import {
  Avatar,
  Grid,
  Paper,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  useTheme
} from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { getCountry, getCountrysFlag } from 'utils/wiki.utils';

interface ConditionLocalisedProps extends TypographyProps {
  wiki: Wiki;
  condition: string;
  wikiVersion: string;
  value?: string;
  negate?: boolean;
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

function ConditionLocalised({
                              wiki,
                              condition,
                              wikiVersion,
                              value,
                              negate = false,
                              ...others
                            }: ConditionLocalisedProps) {
  const theme = useTheme();
  const intl = useIntl();

  console.log(intl.formatMessage({ id: `wiki.condition.${ condition + (negate ? '.not' : '') }`}))

  const [hover, setHover] = useState<boolean>(false);

  switch (condition) {
    case 'tag': {
      const country = value && getCountry(wiki, value);

      return country ? (
          <Grid container item alignItems='center' key={ `tooltip-total-${ value }` }
                onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <Typography variant='body1'
                        sx={ { color: theme.palette.primary.contrastText, mr: 0.5, ...others.sx } } { ...others }>
              { intl.formatMessage({ id: 'wiki.condition.tag' + (negate ? '.not' : '') }) }
            </Typography>
            <NoBgTooltip open={ hover }
                         title={
                           <OpenInNew fontSize='small' sx={ { color: theme.palette.primary.dark } }
                                      onClick={ () => window.open(`/wiki/${ wikiVersion }/country/${ country.id }`,
                                        "_blank") }/>
                         }
                         placement='right'>
              <Paper elevation={ 0 } sx={ {
                p: 0.5,
                backgroundColor: hover ? 'rgba(55, 71, 79, 0.24)' : 'transparent',
                cursor: 'pointer'
              } }>
                <Grid container item alignItems='center' sx={ { width: 'fit-content' } }>
                  <Avatar src={ getCountrysFlag(country) } variant='square'
                          sx={ { display: 'inline-block', width: 32, height: 32 } }/>
                  <Typography variant='body1'
                              sx={ {
                                color: theme.palette.primary.contrastText,
                                fontWeight: 'bold',
                                display: 'inline',
                                ml: 0.5,
                                ...others.sx
                              } }
                              { ...others }>
                    { ` ${ getLName(country) ?? country.id }` }
                  </Typography>
                </Grid>
              </Paper>
            </NoBgTooltip>
          </Grid>
        )
        :
        <></>
    }
    case 'has_country_modifier': {
      return (
        <Grid container item alignItems='center' key={ `tooltip-total-${ value }` } sx={ { cursor: 'pointer' } }
              onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        display: 'inline',
                        ...others.sx
                      } }
                      { ...others }>
            { `${ intl.formatMessage({ id: 'wiki.condition.has_country_modifier' + (negate ? '.not' : '') }) } ` }
          </Typography>
          {
            value && (
              <>
                <Typography variant='body1'
                            sx={ { color: theme.palette.primary.contrastText, display: 'inline', ml: 0.5, mr: 0.5 } }>
                  { ':' }
                </Typography>
                <NoBgTooltip open={ hover }
                             title={
                               <OpenInNew fontSize='small' sx={ { color: theme.palette.primary.dark } }
                                          onClick={ () => window.open(`/wiki/${ wikiVersion }/modifier/${ value }`,
                                            "_blank") }/>
                             }
                             placement='right'>
                  <Paper elevation={ 0 } sx={ {
                    p: 0.5,
                    backgroundColor: hover ? 'rgba(55, 71, 79, 0.24)' : 'transparent',
                    cursor: 'pointer'
                  } }>
                    <Typography variant='body1'
                                sx={ {
                                  color: theme.palette.primary.contrastText,
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                  display: 'inline',
                                  ...others.sx
                                } }
                                { ...others }>
                      { ` ${ getLName(wiki.modifiers[value]) }` }
                    </Typography>
                  </Paper>
                </NoBgTooltip>
              </>
            )
          }
        </Grid>
      )
    }
    case 'current_age': {
      return (
        <Grid container item alignItems='center' key={ `tooltip-total-${ value }` } sx={ { cursor: 'pointer' } }
              onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        display: 'inline',
                        ...others.sx
                      } }
                      { ...others }>
            { `${ intl.formatMessage({ id: 'wiki.condition.current_age' + (negate ? '.not' : '') }) } ` }
          </Typography>
          {
            value && (
              <>
                <Typography variant='body1'
                            sx={ { color: theme.palette.primary.contrastText, display: 'inline', ml: 0.5, mr: 0.5 } }>
                  { ':' }
                </Typography>
                <NoBgTooltip open={ hover }
                             title={
                               <OpenInNew fontSize='small' sx={ { color: theme.palette.primary.dark } }
                                          onClick={ () => window.open(`/wiki/${ wikiVersion }/age/${ value }`,
                                            "_blank") }/>
                             }
                             placement='right'>
                  <Paper elevation={ 0 } sx={ {
                    p: 0.5,
                    backgroundColor: hover ? 'rgba(55, 71, 79, 0.24)' : 'transparent',
                    cursor: 'pointer'
                  } }>
                    <Typography variant='body1'
                                sx={ {
                                  color: theme.palette.primary.contrastText,
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                  display: 'inline',
                                  ...others.sx
                                } }
                                { ...others }>
                      { ` ${ value /*getLName(wiki.ages[value])*/ }` }
                    </Typography>
                  </Paper>
                </NoBgTooltip>
              </>
            )
          }
        </Grid>
      )
    }
    case 'monthly_income':
      return (
        <Grid container item alignItems='center'>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
            { `${ intl.formatMessage({ id: `wiki.condition.${ condition }` }) } ${ value ? `: ${ value }` : '' }` }
          </Typography>
          <Avatar src={ '/eu4/country/income.png' } variant='square' sx={ { width: 36, height: 36, ml: 0.25 } }/>
        </Grid>
      )
    case 'not':
    case 'or':
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
          { `${ intl.formatMessage({ id: `wiki.condition.${ condition }` }) }` }
        </Typography>
      )
    default:
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } }
                    key={ condition } { ...others }>
          { `${ intl.formatMessage(
            { id: `wiki.condition.${ condition + (negate ? '.not' : '') }`, defaultMessage: condition }) } 
          ${ value ? `: ${ value }` : '' }` }
        </Typography>
      )
  }
}

export default ConditionLocalised;
