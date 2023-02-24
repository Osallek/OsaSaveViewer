import { Circle } from '@mui/icons-material';
import { Box, ListItem, ListItemIcon, useTheme } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { Condition, Wiki } from 'types/api.types';
import ConditionCustomTriggerTooltip from './clause/ConditionCustomTriggerTooltip';
import ConditionReverseOpinion from './clause/ConditionReverseOpinion';
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
    default: {
      return (
        <Box key={ `${ name }-clause-box-${ i }` } sx={ { pt: 1 } }>
          <>
            <ConditionLocalised condition={ name } wiki={ wiki } wikiVersion={ wikiVersion }
                                sx={ {
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
