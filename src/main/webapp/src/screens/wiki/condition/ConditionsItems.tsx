import { Circle } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionLocalised from './ConditionLocalised';

interface ConditionItemProps {
  wiki: Wiki;
  condition: Condition;
  wikiVersion: string;
  useExample: boolean;
  root: boolean;
  negate?: boolean;
  dot?: boolean;
  spaced?: boolean;
}

function ConditionsItems({
                           wiki, condition, wikiVersion, negate = false, root, useExample, dot = true, spaced = true
                         }: ConditionItemProps) {
  const theme = useTheme();

  return (
    condition.conditions ?
      <>
        {
          Object.entries(condition.conditions).map(([key, values]) => {
            return values.map((value, i) => {
              return (
                <ListItem key={ `${ key }-${ value }-${ i }` }
                          sx={ {
                            pl: root ? 0 : 1, pr: root ? 0 : 1, pt: spaced ? undefined : 0, pb: spaced ? undefined : 0
                          } }>
                  { dot && (
                    <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
                      <Circle sx={ { fontSize: 8, color: theme.palette.primary.contrastText } }/>
                    </ListItemIcon>
                  ) }
                  <ListItemText primary={ <ConditionLocalised condition={ key } value={ value } wiki={ wiki }
                                                              useExample={ useExample } wikiVersion={ wikiVersion }
                                                              negate={ negate }/> }/>
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
