import { Avatar, Grid, Theme, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import { Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import {
  getAdvisor, getAdvisorImage, getCountry, getCountrysFlag, getIdea, getReligion, getReligionImage
} from 'utils/wiki.utils';
import { getLName } from '../../../utils/data.utils';
import { formatNumber } from '../../../utils/format.utils';
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

const defaultNode = ({
                       intl, theme, value, negate, condition, wikiVersion, wiki, lower, ...others
                     }: DefaultNodeProps) => {
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

  //Check trade good

  switch (condition) {
    case 'tag': {
      const country = value && getCountry(wiki, value);

      return country ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.countries } value={ value } type={ wikiTypes.countries }
                                  avatar={ getCountrysFlag(country) }/>
        )
        :
        <></>
    }
    case 'advisor': {
      const advisor = value && getAdvisor(wiki, value);

      return advisor ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.advisors } value={ value } type={ wikiTypes.advisors }
                                  avatar={ getAdvisorImage(advisor) } colons={ false }/>
        )
        :
        <></>
    }
    case 'region': {
      const region = value && wiki.regions[value];

      return region ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.regions } value={ value } type={ wikiTypes.regions }/>
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
    case 'has_reform': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.governmentReforms } value={ value } type={ wikiTypes.governmentReforms }/>
      )
    }
    case 'has_estate_privilege': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate } colons={ false }
                                record={ wiki.estatePrivileges } value={ value } type={ wikiTypes.estatePrivileges }
                                suffix={ intl.formatMessage(
                                  { id: `wiki.condition.active${ negate ? '.not' : '' }` }) }/>
      )
    }
    case 'has_global_flag': {
      return (
        <Grid container item>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                      key={ `title-${ condition }-${ value }` }>
            { intl.formatMessage({ id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }
          </Typography>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        display: 'inline',
                        ml: 0.5, mr: 0.5
                      } }>
            { `${ value }` }
          </Typography>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                      key={ `suffix-${ condition }-${ value }` }>
            { intl.formatMessage({ id: `wiki.condition.active${ negate ? '.not' : '' }` }) }
          </Typography>
        </Grid>
      )
    }
    case 'years_of_income': {
      return (
        <Grid container item>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                      key={ `title-${ condition }-${ value }` }>
            { intl.formatMessage({ id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }
          </Typography>
          <Typography variant='body1'
                      sx={ {
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        display: 'inline',
                        ml: 0.5, mr: 0.5
                      } }>
            { `${ value && formatNumber(Number(value)) }` }
          </Typography>
          <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText } }
                      key={ `suffix-${ condition }-${ value }` }>
            { intl.formatMessage({ id: `wiki.condition.years_of_income.2${ negate ? '.not' : '' }` }) }
          </Typography>
        </Grid>
      )
    }
    case 'is_religion_enabled': {
      const religion = value && getReligion(wiki, value);

      if (religion) {
        return (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate } colons={ false }
                                  record={ wiki.religions } value={ value } type={ wikiTypes.religions }
                                  avatar={ getReligionImage(religion) }
                                  suffix={ intl.formatMessage(
                                    { id: `wiki.condition.is_active_f${ negate ? '.not' : '' }` }) }/>
        )
      } else {
        return <></>
      }
    }
    case 'owns_or_non_sovereign_subject_of':
    case 'owns_core_province': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.provinces } value={ value } type={ wikiTypes.provinces }/>
      )
    }
    case 'culture_group': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.cultureGroups } value={ value } type={ wikiTypes.cultureGroups }/>
      )
    }
    case 'religion_group': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.religionGroups } value={ value } type={ wikiTypes.religionGroups }/>
      )
    }
    case 'primary_culture': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.cultures } value={ value } type={ wikiTypes.cultures }/>
      )
    }
    case 'dominant_religion':
    case 'ruler_religion':
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
          const religion = value && getReligion(wiki, value);

          if (religion) {
            return (
              <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                      avatar={ getReligionImage(religion) } record={ wiki.religions } value={ value }
                                      type={ wikiTypes.religions }/>
            )
          } else {
            return <></>
          }
        }
      }
    }
    case 'secondary_religion': {
      const religion = value && getReligion(wiki, value);

      if (religion) {
        return (
          <ConditionLocalisedLink condition='follow' wikiVersion={ wikiVersion } negate={ negate } colons={ false }
                                  avatar={ getReligionImage(religion) } record={ wiki.religions } value={ value }
                                  type={ wikiTypes.religions }
                                  suffix={ intl.formatMessage(
                                    { id: `wiki.condition.secondary_religion${ negate ? '.not' : '' }` }).toLowerCase() }/>
        )
      } else {
        return <></>
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
            { `${ intl.formatMessage({ id: `wiki.condition.is_strongest_trade_power${ negate ? '.not' : '' }` }) }` }
          </Typography>
        )
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink
              wikiVersion={ wikiVersion } negate={ negate }
              record={ wiki.countries } value={ value }
              suffix={ intl.formatMessage(
                { id: `wiki.condition.is_strongest_trade_power${ negate ? '.not' : '' }` }).toLowerCase() }
              type={ wikiTypes.countries } avatar={ getCountrysFlag(country) } colons={ false }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props, negate, value });
        }
      }
    case 'owned_by':
    case 'is_subject_of':
      if ('root' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, negate, condition: `${ condition }.root`, value: undefined });
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink
              wikiVersion={ wikiVersion } negate={ negate } condition={ condition } record={ wiki.countries }
              value={ value } type={ wikiTypes.countries } avatar={ getCountrysFlag(country) } colons={ false }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props, negate, value });
        }
      }
    case 'exists':
      const country = value && getCountry(wiki, value);

      if (country) {
        return (
          <ConditionLocalisedLink
            wikiVersion={ wikiVersion } negate={ negate } record={ wiki.countries }
            value={ value } type={ wikiTypes.countries } avatar={ getCountrysFlag(country) } colons={ false }
            suffix={ intl.formatMessage({ id: `wiki.condition.exists${ negate ? '.not' : '' }` }).toLowerCase() }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
    case 'overextension_percentage':
    case 'piety':
      return defaultNode({
        intl, theme, ...props, negate,
        value: `${ (value !== undefined && !isNaN(Number(value))) ? (Number(value) * 100) : 0 }%`
      });
    case 'has_idea':
      const idea = value && getIdea(wiki, value);

      return defaultNode({ intl, theme, ...props, negate, value: idea ? getLName(idea) : value });
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
