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
  const intl = useIntl();

  if (level == 0) {
    console.log(condition);
  }

  return (
    <Paper elevation={ level === 0 ? 1 : 0 }
           sx={ {
             width: 'auto',
             backgroundColor: theme.palette.primary.light,
             mt: level === 0 ? 2 : 0,
             pt: level === 0 ? 2 : 0,
             pb: level === 0 ? 2 : 0,
             pl: level === 0 ? 2 : 1,
             pr: level === 0 ? 2 : 1
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
                      <ConditionsItems wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } negate={ true }
                                       key={ `${ key }-condition-items-${ i }` }/>
                    )
                    :
                    (
                      <ConditionsBlock wiki={ wiki } condition={ condition } wikiVersion={ wikiVersion } level={ level }
                                       useExample={ useExample } key={ `${ key }-condition-block-${ i }` }
                                       title={ `${ intl.formatMessage({
                                         id: `wiki.condition.${ key }`,
                                         defaultMessage: key
                                       }) }`
                                       }/>
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
