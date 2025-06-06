import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import { intl } from 'index';
import React, { useState } from 'react';
import ConditionsList from 'screens/wiki/condition/ConditionsList';
import { modifiersGrid } from 'screens/wiki/ModifiersGrid';
import theme from 'theme';
import { IdeaGroup, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { getIdeaGroupImage } from 'utils/wiki.utils';

interface IdeaGroupCardProps {
  group: IdeaGroup;
  wiki: Wiki;
  version: string;
  expanded?: boolean;
}

function IdeaGroupCard({ group, wiki, version, expanded: initExpanded = false }: IdeaGroupCardProps) {
  const [ expanded, setExpanded ] = useState<boolean>(initExpanded);
  const [ borderRadius, setBorderRadius ] = useState<number>(4);
  const nbIdeas = group.ideas ? Object.values(group.ideas).length : 0;

  return (
    <Card id={ group.id } sx={ { width: '100%', height: 'fit-content' } } elevation={ expanded ? 1 : 0 }>
      <CardActionArea onClick={ () => setExpanded(!expanded) }>
        <CardHeader disableTypography
                    title={
                      <Grid container alignItems='center'>
                        <Typography variant='h5'
                                    sx={ {
                                      color: theme.palette.primary.contrastText,
                                      fontWeight: 'bold',
                                      mr: 1
                                    } }>
                          { getLName(group) }
                        </Typography>
                        <Avatar
                          src={ `/eu4/wiki/${ group.category.toLowerCase() }.png` }
                          variant='square' sx={ { width: 28, height: 28 } }/>
                      </Grid>
                    }
                    avatar={ <Avatar src={ getIdeaGroupImage(group) }
                                     variant='square'/> }
                    sx={ {
                      backgroundColor: theme.palette.primary.dark, borderBottomRightRadius: borderRadius,
                      borderBottomLeftRadius: borderRadius
                    } }
        />
      </CardActionArea>
      <Collapse in={ expanded } timeout="auto" unmountOnExit
                addEndListener={ () => setBorderRadius(expanded ? 0 : 4) }>
        <CardContent sx={ { padding: 0, paddingBottom: '0 !important' } }>
          <TableContainer>
            <Table>
              <TableBody>
                {
                  group.trigger && (
                    <TableRow key={ `trigger-${ group.id }` }>
                      <TableCell sx={ {
                        backgroundColor: theme.palette.primary.main, borderRight: '1px solid rgba(224, 224, 224, 1);'
                      } }>
                        <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                    sx={ { fontWeight: 'bold' } }>
                          { intl.formatMessage({ id: 'wiki.condition' }) }
                        </Typography>
                      </TableCell>
                      <TableCell sx={ { backgroundColor: theme.palette.primary.main, padding: 0 } }>
                        <ConditionsList sx={ { backgroundColor: theme.palette.primary.main } }
                                        condition={ group.trigger } wiki={ wiki } root={ false } useExample={ false }
                                        wikiVersion={ version } backgroundColor={ theme.palette.primary.main }
                                        dot={ false } spaced={ false }/>
                      </TableCell>
                    </TableRow>
                  )
                }
                {
                  group.ideas && Object.values(group.ideas).map((idea, index) => (
                    <TableRow key={ `idea-${ idea.id }` }>
                      <TableCell sx={ {
                        backgroundColor: theme.palette.primary.light,
                        borderBottomColor: (!group.bonus && index === nbIdeas - 1) ? theme.palette.primary.light : undefined
                      } }>
                        <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                    sx={ { fontWeight: 'bold' } }>
                          { getLName(idea) }
                        </Typography>
                      </TableCell>
                      <TableCell style={ {
                        borderBottom: (!group.bonus && index === nbIdeas - 1) ? 'none' : undefined
                      } }>
                        { idea.modifiers && modifiersGrid(idea.modifiers, wiki) }
                      </TableCell>
                    </TableRow>
                  ))
                }
                {
                  group.bonus &&
                  (
                    <TableRow key={ `bonus-${ group.id }` }>
                      <TableCell sx={ {
                        backgroundColor: theme.palette.primary.light,
                        borderBottomColor: theme.palette.primary.light
                      } }>
                        <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                    sx={ { fontWeight: 'bold' } }>
                          { intl.formatMessage({ id: 'wiki.ideaGroups.bonus' }) }
                        </Typography>
                      </TableCell>
                      <TableCell style={ { borderBottom: 'none' } }>
                        { group.bonus && modifiersGrid(group.bonus, wiki) }
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default IdeaGroupCard;
