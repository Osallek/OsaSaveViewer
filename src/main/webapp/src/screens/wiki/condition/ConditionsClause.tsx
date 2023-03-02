import { Circle } from '@mui/icons-material';
import { ListItem, ListItemIcon, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionCustomTriggerTooltip from 'screens/wiki/condition/clause/ConditionCustomTriggerTooltip';
import ConditionFactionInfluence from 'screens/wiki/condition/clause/ConditionFactionInfluence';
import ConditionGreatProject from 'screens/wiki/condition/clause/ConditionGreatProject';
import ConditionNumOfProvinces from 'screens/wiki/condition/clause/ConditionNumOfProvinces';
import ConditionReligiousSchool from 'screens/wiki/condition/clause/ConditionReligiousSchool';
import ConditionReverseOpinion from 'screens/wiki/condition/clause/ConditionReverseOpinion';
import ConditionTrust from 'screens/wiki/condition/clause/ConditionTrust';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsBlock from 'screens/wiki/condition/ConditionsBlock';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';
import { getArea, getCountry, getCountrysFlag, getProvince, getRegion, getSuperRegion } from 'utils/wiki.utils';
import ConditionOpinion from './clause/ConditionOpinion';
import ConditionProvinceGroup from './clause/ConditionProvinceGroup';

interface ConditionClauseProps extends TypographyProps {
  wiki: Wiki;
  name: string;
  clause: Condition;
  root: boolean;
  i: number;
  useExample: boolean;
  wikiVersion: string;
  negate: boolean;
}

function ConditionClause({ wiki, name, clause, root, i, useExample, wikiVersion, negate }: ConditionClauseProps) {
  const theme = useTheme();
  const intl = useIntl();

  const country = getCountry(wiki, name);
  if (country !== null) {
    return (
      <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                       useExample={ useExample } sx={ { p: 0 } } negate={ negate }
                       title={
                         <ConditionLocalisedLink link={ false }
                                                 wikiVersion={ wikiVersion } negate={ false } record={ wiki.countries }
                                                 value={ getLName(country) }
                                                 type={ wikiTypes.countries } avatar={ getCountrysFlag(country) }
                                                 colons={ false }
                                                 sx={ {
                                                   color: theme.palette.primary.contrastText,
                                                   backgroundColor: theme.palette.primary.dark,
                                                   fontWeight: 'bold'
                                                 } }/>
                       }>
      </ConditionsBlock>
    )
  }

  let province = null;
  if (!isNaN(Number(name))) {
    province = getProvince(wiki, Number(name));
  }

  if (province !== null) {
    return (
      <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                       useExample={ useExample } title={ getLName(province) } negate={ negate }/>
    )
  }

  const region = getRegion(wiki, name);
  if (region !== null) {
    return (
      <ConditionProvinceGroup wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                              useExample={ useExample } sx={ { p: 0 } } negate={ negate } value={ region }/>
    )
  }

  const superRegion = getSuperRegion(wiki, name);
  if (superRegion !== null) {
    return (
      <ConditionProvinceGroup wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                              useExample={ useExample } sx={ { p: 0 } } negate={ negate } value={ superRegion }/>
    )
  }

  const area = getArea(wiki, name);
  if (area !== null) {
    return (
      <ConditionProvinceGroup wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                              useExample={ useExample } sx={ { p: 0 } } negate={ negate } value={ area }/>
    )
  }

  switch (name) {
    case 'custom_trigger_tooltip': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionCustomTriggerTooltip condition={ clause } wiki={ wiki } useExample={ useExample }/>
        </ListItem>
      )
    }
    case 'has_opinion': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionOpinion condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } clause={ name }
                            negate={ negate }/>
        </ListItem>
      )
    }
    case 'reverse_has_opinion': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionReverseOpinion condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } clause={ name }
                                   negate={ negate }/>
        </ListItem>
      )
    }
    case 'num_of_owned_provinces_with': {
      return (
        <ConditionNumOfProvinces condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } root={ root }
                                 useExample={ useExample } negate={ negate }/>
      )
    }
    case 'has_great_project': {
      return (
        <ConditionGreatProject condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } negate={ negate }/>
      )
    }
    case 'religious_school': {
      return (
        <ConditionReligiousSchool condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } negate={ negate }/>
      )
    }
    case 'trust': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionTrust condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } negate={ negate }/>
        </ListItem>
      )
    }
    case 'faction_influence': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionFactionInfluence condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } negate={ negate }/>
        </ListItem>
      )
    }
    default: {
      return (
        <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } root={ root }
                         useExample={ useExample } negate={ negate }
                         title={ `${ intl.formatMessage({ id: `wiki.condition.${ name }`, defaultMessage: name }) }` }/>
      )
    }
  }
}

export default ConditionClause;
