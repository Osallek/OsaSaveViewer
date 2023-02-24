import { Avatar, Grid, Theme, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import { Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getCountry, getCountrysFlag } from 'utils/wiki.utils';
import ConditionLocalisedLink from './ConditionLocalisedLink';

interface ConditionLocalisedProps extends TypographyProps {
  wiki: Wiki;
  condition: string;
  wikiVersion: string;
  value?: string;
  negate?: boolean;
  lower?: boolean;
}

interface DefaultNodeProps extends ConditionLocalisedProps {
  intl: IntlShape;
  theme: Theme;
}

const defaultNode = ({ intl, theme, value, negate, condition, lower, ...others }: DefaultNodeProps) => {
  const { sx, ...others2 } = others;
  let cond = intl.formatMessage({
    id: `wiki.condition.${ condition + (negate ? '.not' : '') }`,
    defaultMessage: condition
  });

  if (lower) {
    cond = cond.toLowerCase();
  }

  return (
    <Grid container item sx={ { ...sx } }>
      <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...sx } }
                  key={ `${ condition }-${ value }` } { ...others2 }>
        { cond }
      </Typography>
      {
        value !== undefined &&
        <>
          <Typography variant='body1'
                      sx={ { color: theme.palette.primary.contrastText, ml: 0.5, mr: 0.5, ...sx } }
                      { ...others2 }>
            { ':' }
          </Typography>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        display: 'inline',
                        ...sx
                      } }
                      { ...others2 }>
            { `${ value }` }
          </Typography>
        </>
      }
    </Grid>
  )
}

function ConditionLocalised(props: ConditionLocalisedProps) {
  const theme = useTheme();
  const intl = useIntl();
  let { wiki, condition, wikiVersion, value, negate = false, lower = false, ...others } = props;

  if ('no' === value) {
    negate = !negate;
    value = undefined;
  }

  if ('yes' === value) {
    value = undefined;
  }

  switch (condition) {
    case 'tag': {
      const country = value && getCountry(wiki, value);

      return country ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.countries } value={ value } type={ wikiTypes.countries }
                                  avatar={ getCountrysFlag(country) } colons={ false }/>
        )
        :
        <></>
    }
    case 'has_country_modifier': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.modifiers } value={ value } type={ wikiTypes.modifiers }/>
      )
    }
    case 'current_age': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.ages } value={ value } type={ wikiTypes.ages }/>
      )
    }
    case 'full_idea_group': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.ideaGroups } value={ value } type={ wikiTypes.ideaGroups }/>
      )
    }
    case 'religion': {
      if ('emperor' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: 'religion.emperor', value: undefined });
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink condition={ 'religion.country' } wikiVersion={ wikiVersion } negate={ negate }
                                    colons={ false } record={ wiki.countries } value={ value }
                                    type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }/>
          )
        } else {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    record={ wiki.religions } value={ value } type={ wikiTypes.religions }/>
          )
        }
      }
    }
    case 'war_with': {
      if ('emperor' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: 'war_with.emperor', value: undefined });
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink condition={ 'war_with.country' } wikiVersion={ wikiVersion } negate={ negate }
                                    colons={ false } record={ wiki.countries } value={ value }
                                    type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }/>
          )
        } else {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    record={ wiki.religions } value={ value } type={ wikiTypes.religions }/>
          )
        }
      }
    }
    case 'monthly_income':
      return (
        <Grid container item alignItems='center'>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
            { `${ intl.formatMessage(
              { id: `wiki.condition.${ condition + (negate ? '.not' : '') }` }) }` }
          </Typography>
          {
            value !== undefined &&
            <>
              <Typography variant='body1'
                          sx={ { color: theme.palette.primary.contrastText, ml: 0.5, mr: 0.5, ...others.sx } }
                          { ...others }>
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
                { `${ value }` }
              </Typography>
            </>
          }
          <Avatar src={ '/eu4/country/income.png' } variant='square' sx={ { width: 36, height: 36, ml: 0.25 } }/>
        </Grid>
      )
    case 'is_strongest_trade_power':
      if ('root' === value?.toLowerCase()) {
        return (
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
            { `${ intl.formatMessage({ id: 'wiki.condition.is_strongest_trade_power' }) }` }
          </Typography>
        )
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink
              wikiVersion={ wikiVersion } negate={ negate }
              record={ wiki.countries } value={ value }
              suffix={ intl.formatMessage({ id: 'wiki.condition.is_strongest_trade_power' }).toLowerCase() }
              type={ wikiTypes.countries } avatar={ getCountrysFlag(country) } colons={ false }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props });
        }
      }
    case 'not':
    case 'or':
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
          { `${ intl.formatMessage({ id: `wiki.condition.${ condition }`, defaultMessage: condition }) }` }
        </Typography>
      )
    default:
      return defaultNode({ intl, theme, ...props, negate, value });
  }
}

export default ConditionLocalised;
