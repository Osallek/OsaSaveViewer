import { Box, List, ListItem, ListItemText, Paper, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionLocalised from './ConditionLocalised';
import ConditionsClause from './ConditionsClause';

interface ConditionsListProps extends TypographyProps {
  wiki: Wiki;
  condition: Condition;
  useExample: boolean;
  level?: number;
}

function ConditionsList({ wiki, condition, useExample, level = 0, ...others }: ConditionsListProps) {
  const theme = useTheme();

  return (
    <Paper elevation={ level === 0 ? 1 : 0 }
           sx={ {
             width: 'fit-content',
             backgroundColor: theme.palette.primary.light,
             mt: level === 0 ? 2 : 0,
             pt: level === 0 ? 2 : 0,
             pb: level === 0 ? 2 : 0,
             pl: 2,
             pr: 2
           } }>
      <List key='condition-list' sx={ { pb: 0, pt: 0 } }>
        <>
          {
            condition.conditions &&
            Object.entries(condition.conditions).map(([key, values]) => {
              return values.map((value, i) => {
                return (
                  <ListItem key={ `${ key }-${ value }-${ i }` } sx={ { pl: 0, pr: 0 } }>
                    <ListItemText primary={ <ConditionLocalised condition={ key } value={ value } wiki={ wiki }/> }/>
                  </ListItem>
                )
                /*
                                return (
                  <ListItem key={ `${ key }-${ value }-${ i }` } sx={ { pl: 2 * (level + 1), pr: 2 } }>
                    <ListItemIcon sx={ { minWidth: 8, mr: 1 } }>
                      <Circle sx={ { fontSize: 8, color: theme.palette.primary.dark } }/>
                    </ListItemIcon>
                    <ListItemText primary={ <ConditionLocalised condition={ key } value={ value } wiki={ wiki }/> }/>
                  </ListItem>
                )
                 */
              })
            })
          }
          {
            condition.scopes &&
            Object.entries(condition.scopes).map(([key, conditions]) => {
              return conditions.map((condition, i) => {
                return (
                  <Box key={ `${ key }-conditions-box-${ i }` } sx={ { pt: 1 } }>
                    <>
                      <ConditionLocalised condition={ key } wiki={ wiki } sx={ {
                        pl: 0,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold'
                      } }/>
                      <ConditionsList condition={ condition } level={ level + 1 } wiki={ wiki }
                                      useExample={ useExample } key={ `${ key }-condition-list-${ i }` }/>
                    </>
                  </Box>
                )
              })
            })
          }
          {
            condition.clauses &&
            Object.entries(condition.clauses).map(([key, clauses]) => {
              return clauses.map((clause, i) => {
                return <ConditionsClause name={ key } clause={ clause } level={ level } i={ i } wiki={ wiki }
                                         useExample={ useExample } key={ `${ key }-clause-${ i }` }/>
              })
            })
          }
        </>
      </List>
    </Paper>
  )
}

export default ConditionsList;
