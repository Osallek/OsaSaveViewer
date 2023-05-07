import { List, Paper, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import { Condition, Wiki } from 'types/api.types';
import ConditionsBlock from './ConditionsBlock';
import ConditionsClause from './ConditionsClause';
import ConditionsItems from './ConditionsItems';

const negateCondition = (key: string, condition: Condition): boolean => {
  return 'not' === key && (condition.scopes === undefined || Object.keys(condition.scopes).length === 0)
    && (condition.clauses === undefined || Object.keys(condition.clauses).length === 0);
}

const negateClause = (key: string, condition: Condition): boolean => {
  return 'not' === key && (condition.scopes === undefined || Object.keys(condition.scopes).length === 0)
    && (condition.conditions === undefined || Object.keys(condition.conditions).length === 0);
}

const negateScope = (key: string, condition: Condition): boolean => {
  return 'not' === key && (condition.clauses === undefined || Object.keys(condition.clauses).length === 0)
    && (condition.conditions === undefined || Object.keys(condition.conditions).length === 0);
}

interface ConditionsListProps extends TypographyProps {
  wiki: Wiki;
  condition: Condition;
  useExample: boolean;
  wikiVersion: string;
  root?: boolean;
  negate?: boolean;
  backgroundColor?: string;
  dot?: boolean;
}

function ConditionsList({
                          wiki, condition, useExample, root = false, wikiVersion, negate = false, backgroundColor, dot
                        }: ConditionsListProps) {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Paper elevation={ 0 }
           sx={ {
             width: 'auto',
             backgroundColor: backgroundColor ?? theme.palette.primary.light,
             mt: root ? 2 : 0,
             pt: root ? 2 : 0,
             pb: root ? 2 : 0,
             pl: root ? 2 : 0,
             pr: root ? 2 : 0
           } }>
      <List key='condition-list' sx={ { pb: 0, pt: 0 } }>
        <>
          {
            condition.clauses && condition.clauses['limit'] &&
            (
              condition.clauses['limit'].map((clause, i) => {
                return <ConditionsClause name={ 'limit' } clause={ clause } root={ false } i={ i } wiki={ wiki }
                                         useExample={ useExample } wikiVersion={ wikiVersion }
                                         key={ `limit-clause-${ i }` } negate={ negate }/>
              })
            )
          }
          <ConditionsItems wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } negate={ negate }
                           root={ root } useExample={ useExample } dot={ dot }/>
          {
            condition.scopes &&
            Object.entries(condition.scopes).map(([key, conditions]) => {
              return conditions.map((condition, i) => {
                if (negateCondition(key, condition)) {
                  return (
                    <ConditionsItems wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } negate={ true }
                                     root={ root } key={ `${ key }-condition-items-${ i }` } useExample={ useExample }/>
                  )
                }

                if (negateClause(key, condition)) {
                  return (
                    <ConditionsList condition={ condition } root={ false } wiki={ wiki }
                                    wikiVersion={ wikiVersion } useExample={ useExample }
                                    negate={ true } key={ `${ key }-condition-items-${ i }` }/>
                  )
                }

                return (
                  <ConditionsBlock wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion }
                                   root={ false } negate={ negateScope(key, condition) }
                                   useExample={ useExample } key={ `${ key }-condition-block-${ i }` }
                                   title={ `${ intl.formatMessage({
                                     id: `wiki.condition.${ key }`,
                                     defaultMessage: key
                                   }) }`
                                   }/>
                )
              })
            })
          }
          {
            condition.clauses &&
            Object.entries(condition.clauses)
                  .filter(([key, clauses]) => 'limit' !== key)
                  .map(([key, clauses]) => {
                    return clauses.map((clause, i) => {
                      return <ConditionsClause name={ key } clause={ clause } root={ false } i={ i } wiki={ wiki }
                                               useExample={ useExample } wikiVersion={ wikiVersion }
                                               key={ `${ key }-clause-${ i }` } negate={ negate }/>
                    })
                  })
          }
        </>
      </List>
    </Paper>
  )
}

export default ConditionsList;
