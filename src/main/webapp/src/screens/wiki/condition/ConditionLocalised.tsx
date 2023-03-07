import { Avatar, Grid, Theme, Typography, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import LocalisedExample from 'screens/wiki/LocalisedExample';
import { Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';
import {
  getAdvisor, getAdvisorImage, getAge, getAgeImage, getArea, getBuilding, getBuildingImage, getColonialRegion,
  getContinent, getCountry, getCountrysFlag, getDlc, getDlcImage, getEstateImage, getFactionImage, getIdea,
  getIdeaGroup, getIdeaGroupImage, getIdExampleLocalised, getImperialIncident, getInstitution, getInstitutionImage,
  getMission,
  getMissionImage, getProvince, getRegion, getReligion, getReligionImage, getSuperRegion, getTradeGoodImage
} from 'utils/wiki.utils';
import ConditionLocalisedLink from './ConditionLocalisedLink';
import ConditionsNumber from './ConditionsNumber';

interface ConditionLocalisedProps extends TypographyProps {
  wiki: Wiki;
  condition: string;
  wikiVersion: string;
  useExample: boolean;
  value?: string;
  negate?: boolean;
  lower?: boolean;
  grid?: boolean;
}

interface DefaultNodeProps extends ConditionLocalisedProps {
  intl: IntlShape;
  theme: Theme;
}

const innerDefaultNode = ({
                            intl, theme, value, negate, condition, wikiVersion, wiki, lower, grid = true, useExample,
                            ...others
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
    <>
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
    </>
  )
}

const defaultNode = (props: DefaultNodeProps) => {
  const { grid = true, sx } = props;

  return (
    grid ?
      (
        <Grid container item sx={ { ...sx } }>
          { innerDefaultNode({ ...props }) }
        </Grid>
      )
      :
      (
        innerDefaultNode({ ...props })
      )
  )
}

function ConditionLocalised(props: ConditionLocalisedProps) {
  const theme = useTheme();
  const intl = useIntl();
  let { wiki, condition, wikiVersion, value, negate = false, lower = false, useExample, ...others } = props;

  if ('no' === value) {
    negate = !negate;
    value = undefined;
  }

  if ('yes' === value) {
    value = undefined;
  }

  //Check trade good

  const advisor = getAdvisor(wiki, condition.toLowerCase());
  if (advisor !== null) {
    return (
      <ConditionLocalisedLink condition={ 'advisor' } wikiVersion={ wikiVersion } negate={ negate }
                              record={ wiki.advisors } value={ condition } type={ wikiTypes.advisors }
                              avatar={ getAdvisorImage(advisor) } colons={ false }
                              suffix={ defaultNode(
                                { intl, theme, ...props, negate, value, grid: false, condition: 'level' }) }/>
    );
  }

  const building = getBuilding(wiki, condition.toLowerCase());
  if (building !== null) {
    return (
      <Grid container item alignItems='center'>
        <ConditionsNumber condition={ 'building' } negate={ negate } value={ value ? Number(value) : undefined }
                          sx={ { width: undefined } } grid={ false }/>
        <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } grid={ false }
                                record={ wiki.buildings } value={ condition } type={ wikiTypes.buildings }
                                avatar={ getBuildingImage(building) } colons={ false }/>
      </Grid>
    );
  }

  const ideaGroup = getIdeaGroup(wiki, condition.toLowerCase());
  if (ideaGroup !== null) {
    return (
      <Grid container item alignItems='center'>
        <ConditionsNumber condition={ 'ideaGroup' } negate={ negate } value={ value ? Number(value) : undefined }
                          sx={ { width: undefined } } grid={ false }/>
        <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } grid={ false }
                                record={ wiki.ideaGroups } value={ condition } type={ wikiTypes.ideaGroups }
                                avatar={ getIdeaGroupImage(ideaGroup) } colons={ false }/>
      </Grid>
    );
  }

  switch (condition) {
    case 'tag': {
      if ('root' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, negate, value: undefined, condition: `${ condition }.root` });
      }

      const country = value && getCountry(wiki, value);

      return country ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.countries } value={ value } type={ wikiTypes.countries }
                                  avatar={ getCountrysFlag(country) }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'advisor': {
      const advisor = value && getAdvisor(wiki, value);

      return advisor ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.advisors } value={ value } type={ wikiTypes.advisors }
                                  avatar={ getAdvisorImage(advisor) } colons={ false }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'region': {
      const region = value && getRegion(wiki, value);

      return region ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.regions } value={ value } type={ wikiTypes.regions }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'superregion': {
      const superRegion = value && getSuperRegion(wiki, value);

      return superRegion ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.superRegions } value={ value } type={ wikiTypes.superRegions }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'continent': {
      const continent = value && getContinent(wiki, value);

      return continent ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.continents } value={ value } type={ wikiTypes.continents }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'area': {
      const area = value && getArea(wiki, value);

      return area ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.areas } value={ value } type={ wikiTypes.areas }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'colonial_region': {
      const colonialRegion = value && getColonialRegion(wiki, value);

      return colonialRegion ? (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.colonialRegions } value={ value } type={ wikiTypes.colonialRegions }/>
        )
        :
        defaultNode({ intl, theme, ...props, negate, value });
    }
    case 'has_country_modifier': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.modifiers } value={ value } type={ wikiTypes.modifiers }/>
      )
    }
    case 'current_age': {
      const age = value && getAge(wiki, value);
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.ages } value={ value } type={ wikiTypes.ages }
                                avatar={ age ? getAgeImage(age) : undefined } avatarWidth={ 'auto' }/>
      )
    }
    case 'has_idea_group':
    case 'full_idea_group': {
      const group = value && wiki.ideaGroups[value];
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.ideaGroups } value={ value } type={ wikiTypes.ideaGroups }
                                avatar={ group ? getIdeaGroupImage(group) : undefined }/>
      )
    }
    case 'trade_goods': {
      const good = value && wiki.tradeGoods[value];
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.tradeGoods } value={ value } type={ wikiTypes.tradeGoods }
                                avatar={ good ? getTradeGoodImage(good) : undefined }/>
      )
    }
    case 'technology_group': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.techGroups } value={ value } type={ wikiTypes.techGroups }/>
      )
    }
    case 'has_reform': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.governmentReforms } value={ value } type={ wikiTypes.governmentReforms }/>
      )
    }
    case 'has_disaster': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.disasters } value={ value } type={ wikiTypes.disasters }/>
      )
    }
    case 'has_estate': {
      const estate = value && wiki.estates && wiki.estates[value];
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.estates } value={ value } type={ wikiTypes.estates }
                                avatar={ estate ? getEstateImage(estate) : undefined }/>
      )
    }
    case 'has_institution': {
      console.log(wiki.institutions)
      const institution = value && getInstitution(wiki, value);
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.institutions } value={ value } type={ wikiTypes.institutions }
                                avatar={ institution ? getInstitutionImage(institution) : undefined }/>
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
    case 'faction_in_power': {
      const faction = value && wiki.factions && wiki.factions[value];
      return (
        <ConditionLocalisedLink condition={ 'faction_in_power.1' } wikiVersion={ wikiVersion } negate={ negate }
                                colons={ false }
                                record={ wiki.factions } value={ value } type={ wikiTypes.factions }
                                avatar={ faction ? getFactionImage(faction) : undefined }
                                suffix={ intl.formatMessage(
                                  { id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }) }/>
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
    case 'num_of_ports':
    case 'num_of_cities':
    case 'num_of_cities':
    case 'total_number_of_cardinals':
    case 'num_of_subjects':
    case 'hre_size':
    case 'colony':
    case 'reform_level':
    case 'num_of_janissaries':
    case 'years_of_income': {
      return (
        <ConditionsNumber condition={ condition } negate={ negate } value={ value ? Number(value) : undefined }/>
      )
    }
    case 'reform_desire':
    case 'army_professionalism':
    case 'janissary_percentage':
    case 'navy_size_percentage': {
      return (
        <ConditionsNumber condition={ condition } negate={ negate } value={ value ? (Number(value) * 100) : undefined }
                          suffix='%'/>
      )
    }
    case 'num_of_merchants': {
      return (
        <ConditionsNumber condition={ condition } negate={ negate } value={ value ? Number(value) : undefined }
                          avatar='/eu4/wiki/merchant.png'/>
      )
    }
    case 'is_religion_enabled': {
      const religion = value && getReligion(wiki, value);

      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate } colons={ false }
                                record={ wiki.religions } value={ value } type={ wikiTypes.religions }
                                avatar={ religion ? getReligionImage(religion) : undefined }
                                suffix={ intl.formatMessage(
                                  { id: `wiki.condition.is_active_f${ negate ? '.not' : '' }` }) }/>
      )
    }
    case 'owns_or_non_sovereign_subject_of':
    case 'owns':
    case 'capital':
    case 'controls':
    case 'province_id':
    case 'owns_core_province': {
      return (
        <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                record={ wiki.provinces } value={ value } type={ wikiTypes.provinces }/>
      )
    }
    case 'controlled_by':
    case 'has_discovered': {
      if ('root' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, negate, value: undefined, condition: `${ condition }.root` });
      } else {
        const province = value && !isNaN(Number(value)) && getProvince(wiki, Number(value));

        if (province) {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    record={ wiki.provinces } value={ value } type={ wikiTypes.provinces }/>
          )
        } else {
          const country = value && getCountry(wiki, value);

          if (country) {
            return (
              <ConditionLocalisedLink condition={ `${ condition }.country` } wikiVersion={ wikiVersion }
                                      negate={ negate } record={ wiki.countries }
                                      value={ value } type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }/>
            )
          } else {
            return defaultNode({ intl, theme, ...props, negate, value });
          }
        }
      }
    }
    case 'country_or_non_sovereign_subject_holds': {
      if ('root' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, negate, value: undefined, condition: `${ condition }.root` });
      } else {
        const province = value && !isNaN(Number(value)) && getProvince(wiki, Number(value));

        if (province) {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    record={ wiki.provinces } value={ value } type={ wikiTypes.provinces }/>
          )
        } else {
          const country = value && getCountry(wiki, value);

          if (country) {
            return (
              <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } record={ wiki.countries }
                                      colons={ false }
                                      value={ value } type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }
                                      suffix={ intl.formatMessage({ id: `wiki.condition.${ condition }.country` }) }/>
            )
          } else {
            return defaultNode({ intl, theme, ...props, negate, value });
          }
        }
      }
    }
    case 'has_dlc': {
      const dlc = value && getDlc(wiki, value);

      if (dlc) {
        return (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.dlcs } value={ dlc.name } type={ wikiTypes.dlcs }
                                  avatar={ (dlc && dlc.image) ? getDlcImage(dlc) : undefined }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
    }
    case 'has_mission': {
      const mission = value && getMission(wiki, value);

      if (mission) {
        return (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.missions } value={ mission.id } type={ wikiTypes.missions }
                                  avatar={ mission ? getMissionImage(mission) : undefined }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
    }
    case 'mission_completed': {
      const mission = value && getMission(wiki, value);

      if (mission) {
        return (
          <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                  record={ wiki.missions } value={ mission.id } type={ wikiTypes.missions }
                                  avatar={ mission ? getMissionImage(mission) : undefined }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
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
    case 'is_capital_of':
    case 'culture':
    case 'primary_culture': {
      if ('root' === value?.toLowerCase() || 'owner' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.root`, value: undefined });
      } else if ('emperor' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.emperor`, value: undefined });
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink
              wikiVersion={ wikiVersion } negate={ negate } type={ wikiTypes.countries } colons={ false }
              record={ wiki.countries } value={ value } avatar={ getCountrysFlag(country) }
              condition={ `${ condition }.country` }/>
          )
        } else {
          return (
            <ConditionLocalisedLink
              wikiVersion={ wikiVersion } negate={ negate } type={ wikiTypes.cultures }
              record={ wiki.cultures } value={ value } condition={ condition }/>
          )
        }
      }
    }
    case 'dominant_religion':
    case 'heir_religion':
    case 'ruler_religion':
    case 'truce_with':
    case 'religion': {
      if ('root' === value?.toLowerCase() || 'owner' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.root`, value: undefined });
      } else if ('emperor' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.emperor`, value: undefined });
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
            return defaultNode({ intl, theme, ...props, negate, value });
          }
        }
      }
    }
    case 'total_base_tax':
    case 'total_development': {
      const country = value && getCountry(wiki, value);

      if (country) {
        return (
          <ConditionLocalisedLink condition={ `${ condition }.country` } wikiVersion={ wikiVersion } negate={ negate }
                                  colons={ false } record={ wiki.countries } value={ value }
                                  type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, condition, value });
      }
    }
    case 'senior_union_with':
    case 'vassal_of':
    case 'junior_union_with':
    case 'overlord_of':
    case 'alliance_with': {
      if ('root' === value?.toLowerCase() || 'owner' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.root`, value: undefined });
      } else if ('emperor' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.emperor`, value: undefined });
      } else {
        const country = value && getCountry(wiki, value);

        if (country) {
          return (
            <ConditionLocalisedLink condition={ `${ condition }.country` } wikiVersion={ wikiVersion } negate={ negate }
                                    colons={ false } record={ wiki.countries } value={ value }
                                    type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props, condition, value: undefined });
        }
      }
    }
    case 'active_imperial_incident': {
      if ('any' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.any`, value: undefined });
      } else {
        const incident = value && getImperialIncident(wiki, value);

        if (incident) {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    colons={ false } record={ wiki.imperialIncidents } value={ value }
                                    type={ wikiTypes.imperialIncidents }
                                    suffix={ intl.formatMessage(
                                      { id: `${ condition }.incident${ negate ? '.not' : '' }` }).toLowerCase() }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props, condition });
        }
      }
    }
    case 'is_incident_active': {
      if ('any' === value?.toLowerCase()) {
        return defaultNode({ intl, theme, ...props, condition: `${ condition }.any`, value: undefined });
      } else {
        const incident = value && getImperialIncident(wiki, value);

        if (incident) {
          return (
            <ConditionLocalisedLink condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                                    colons={ false } record={ wiki.incidents } value={ value }
                                    type={ wikiTypes.incidents }
                                    suffix={ intl.formatMessage(
                                      { id: `${ condition }.incident${ negate ? '.not' : '' }` }).toLowerCase() }/>
          )
        } else {
          return defaultNode({ intl, theme, ...props, condition });
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
        return defaultNode({ intl, theme, ...props, negate, value });
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
      } else if ('prev' === value?.toLowerCase()) {
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
    case 'is_core':
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
            suffix={ intl.formatMessage(
              { id: `wiki.condition.${ condition }${ negate ? '.not' : '' }` }).toLowerCase() }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
    case 'navy_size': {
      const country = value && getCountry(wiki, value);

      if (country) {
        return (
          <ConditionLocalisedLink
            wikiVersion={ wikiVersion } negate={ negate } record={ wiki.countries }
            condition={ `${ condition }.country` } value={ value } type={ wikiTypes.countries }
            avatar={ getCountrysFlag(country) }/>
        )
      } else {
        return (
          <ConditionsNumber condition={ condition } negate={ negate } value={ value ? Number(value) : undefined }/>
        )
      }
    }
    case 'legitimacy':
    case 'legitimacy_or_horde_unity': {
      const country = value && getCountry(wiki, value);

      if (country) {
        return (
          <ConditionLocalisedLink
            wikiVersion={ wikiVersion } negate={ negate } record={ wiki.countries }
            condition={ `${ condition }.country` } value={ value } type={ wikiTypes.countries }
            avatar={ getCountrysFlag(country) }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
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
    case 'if':
    case 'else_if':
    case 'else':
    case 'limit':
      return (
        <Typography variant='body1' sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }>
          { `${ intl.formatMessage({ id: `wiki.condition.${ condition }`, defaultMessage: condition }) }` }
        </Typography>
      )
    default:
      const trigger = getIdExampleLocalised(wiki, condition + '_tt');
      if (trigger) {
        return (
          <LocalisedExample example={ trigger } useExample={ useExample }
                            sx={ { color: theme.palette.primary.contrastText, ...others.sx } } { ...others }/>
        )
      } else {
        return defaultNode({ intl, theme, ...props, negate, value });
      }
  }
}

export default ConditionLocalised;
