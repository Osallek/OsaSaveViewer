import { Circle } from '@mui/icons-material';
import { ListItem, ListItemIcon, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import ConditionCustomTriggerTooltip from 'screens/wiki/condition/clause/ConditionCustomTriggerTooltip';
import ConditionNumOfProvinces from 'screens/wiki/condition/clause/ConditionNumOfProvinces';
import ConditionReverseOpinion from 'screens/wiki/condition/clause/ConditionReverseOpinion';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsBlock from 'screens/wiki/condition/ConditionsBlock';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getLName } from 'utils/data.utils';
import { getCountry, getCountrysFlag, getProvince } from 'utils/wiki.utils';
import ConditionGreatProject from './clause/ConditionGreatProject';
import ConditionReligiousSchool from './clause/ConditionReligiousSchool';

interface ConditionClauseProps extends TypographyProps {
  wiki: Wiki;
  name: string;
  clause: Condition;
  level: number;
  i: number;
  useExample: boolean;
  wikiVersion: string;
}

function ConditionClause({ wiki, name, clause, level, i, useExample, wikiVersion }: ConditionClauseProps) {
  const theme = useTheme();
  const intl = useIntl();

  const country = getCountry(wiki, name);

  if (country !== null) {
    return (
      <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } level={ level }
                       useExample={ useExample } sx={ { p: 0 } }
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
      <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } level={ level }
                       useExample={ useExample } title={ getLName(province) }/>
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
    case 'reverse_has_opinion': {
      return (
        <ListItem sx={ { pl: 0 } } key={ `${ name }-clause-${ i }` }>
          <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
            <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
          </ListItemIcon>
          <ConditionReverseOpinion condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion }/>
        </ListItem>
      )
    }
    case 'num_of_owned_provinces_with': {
      return (
        <ConditionNumOfProvinces condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion } level={ level }
                                 useExample={ useExample }/>
      )
    }
    case 'has_great_project': {
      return (
        <ConditionGreatProject condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion }/>
      )
    }
    case 'religious_school': {
      return (
        <ConditionReligiousSchool condition={ clause } wiki={ wiki } wikiVersion={ wikiVersion }/>
      )
    }
    default: {
      return (
        <ConditionsBlock wiki={ wiki } condition={ clause } wikiVersion={ wikiVersion } level={ level }
                         useExample={ useExample }
                         title={ `${ intl.formatMessage({ id: `wiki.condition.${ name }`, defaultMessage: name }) }` }/>
      )
    }
  }
}

export default ConditionClause;
