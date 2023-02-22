import { Box, ListItem, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionCustomTriggerTooltip from './ConditionCustomTriggerTooltip';
import ConditionLocalised from './ConditionLocalised';
import ConditionsList from './ConditionsList';

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

  switch (name) {
    case 'custom_trigger_tooltip': {
      return (
        <ListItem key={ `${ name }-clause-${ i }` } sx={ { pl: 2 } }>
          <ConditionCustomTriggerTooltip condition={ clause } wiki={ wiki } useExample={ useExample }/>
        </ListItem>
      )
    }
    default: {
      return (
        <Box key={ `${ name }-clause-box-${ i }` } sx={ { pt: 1 } }>
          <>
            <ConditionLocalised condition={ name } wiki={ wiki } wikiVersion={ wikiVersion } sx={ {
              pl: 2,
              pr: 2,
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold'
            } }/>
            <ConditionsList condition={ clause } level={ level + 1 } wiki={ wiki } wikiVersion={ wikiVersion }
                            useExample={ useExample } key={ `${ name }-condition-list-${ i }` }/>
          </>
        </Box>
      )
    }
  }
}

export default ConditionClause;
