import { Circle } from '@mui/icons-material';
import { ListItem, ListItemIcon, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import { Condition, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { getReligiousSchool } from 'utils/wiki.utils';

interface ConditionReligiousSchoolProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  negate: boolean;
  value?: string;
}

function ConditionReligiousSchool({
                                    wiki, wikiVersion, condition, negate
                                  }: ConditionReligiousSchoolProps): JSX.Element {
  const theme = useTheme();

  let school = undefined;
  if (condition.conditions && condition.conditions.school && condition.conditions.school.length > 0) {
    school = condition.conditions.school[0];
  }

  let religiousSchool = undefined;
  if (school !== undefined) {
    religiousSchool = getReligiousSchool(wiki, school);
  }

  return (
    <ListItem sx={ { pl: 0 } }>
      <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
        <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
      </ListItemIcon>
      <ConditionLocalised wikiVersion={ wikiVersion } negate={ negate }
                          value={ religiousSchool ? getLName(religiousSchool) : school }
                          condition={ 'religious_school' } wiki={ wiki }/>
    </ListItem>
  )

}

export default ConditionReligiousSchool;
