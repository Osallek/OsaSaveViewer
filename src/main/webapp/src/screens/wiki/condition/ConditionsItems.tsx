import { Circle } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionLocalised from './ConditionLocalised';

interface ConditionItemProps {
  wiki: Wiki;
  condition: Condition;
  wikiVersion: string;
  negate?: boolean;
}

function ConditionsItems({ wiki, condition, wikiVersion, negate = false }: ConditionItemProps) {
  const theme = useTheme();

  return (
    condition.conditions ?
      <>
        {
          Object.entries(condition.conditions).map(([key, values]) => {
            return values.map((value, i) => {
              return (
                <ListItem key={ `${ key }-${ value }-${ i }` } sx={ { pl: 0, pr: 0 } }>
                  <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
                    <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
                  </ListItemIcon>
                  <ListItemText primary={ <ConditionLocalised condition={ key } value={ value } wiki={ wiki }
                                                              wikiVersion={ wikiVersion } negate={ negate }/> }/>
                </ListItem>
              )
            })
          })
        }
      </>
      :
      <></>
  );
}

export default ConditionsItems;
