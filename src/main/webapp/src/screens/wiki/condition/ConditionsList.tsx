import { Box, List, Paper, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionLocalised from './ConditionLocalised';
import ConditionsClause from './ConditionsClause';
import ConditionsItems from './ConditionsItems';

const negateCondition = (key: string, condition: Condition): boolean => {
  return 'not' === key && (condition.scopes === undefined || Object.keys(condition.scopes).length === 0)
    && (condition.clauses === undefined || Object.keys(condition.clauses).length === 0);
}

interface ConditionsListProps extends TypographyProps {
  wiki: Wiki;
  condition: Condition;
  useExample: boolean;
  wikiVersion: string;
  level?: number;
  negate?: boolean;
}

function ConditionsList({ wiki, condition, useExample, level = 0, wikiVersion, negate = false }: ConditionsListProps) {
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
          <ConditionsItems wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } negate={ negate }/>
          {
            condition.scopes &&
            Object.entries(condition.scopes).map(([key, conditions]) => {
              return conditions.map((condition, i) => {
                return (
                  negateCondition(key, condition) ? (
                      <ConditionsItems wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } negate={ true }/>
                    )
                    :
                    (
                      <Box key={ `${ key }-conditions-box-${ i }` } sx={ { pt: 1 } }>
                        <>
                          <ConditionLocalised condition={ key } wiki={ wiki } wikiVersion={ wikiVersion } sx={ {
                            pl: 0,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 'bold'
                          } }/>
                          <ConditionsList condition={ condition } level={ level + 1 } wiki={ wiki }
                                          wikiVersion={ wikiVersion } useExample={ useExample }
                                          negate={ false }
                                          key={ `${ key }-condition-list-${ i }` }/>
                        </>
                      </Box>
                    )
                )
              })
            })
          }
          {
            condition.clauses &&
            Object.entries(condition.clauses).map(([key, clauses]) => {
              return clauses.map((clause, i) => {
                return <ConditionsClause name={ key } clause={ clause } level={ level } i={ i } wiki={ wiki }
                                         useExample={ useExample } wikiVersion={ wikiVersion }
                                         key={ `${ key }-clause-${ i }` }/>
              })
            })
          }
        </>
      </List>
    </Paper>
  )
}

export default ConditionsList;
