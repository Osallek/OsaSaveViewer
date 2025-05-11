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
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import ConditionsList from 'screens/wiki/condition/ConditionsList';
import { modifiersGrid } from 'screens/wiki/ModifiersGrid';
import theme from 'theme';
import { Policy, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';

interface PolicyCardProps {
  policy: Policy;
  wiki: Wiki;
  version: string;
  expanded?: boolean;
}

function PolicyCard({ policy, wiki, version, expanded: initExpanded = false }: PolicyCardProps) {
  const intl = useIntl();

  const [ expanded, setExpanded ] = useState<boolean>(initExpanded);
  const [ borderRadius, setBorderRadius ] = useState<number>(initExpanded ? 0 : 4);

  return (
    <Tooltip title={ `id: ${ policy.id }` } placement='right-start'>
      <Card sx={ { width: '100%', height: 'fit-content' } } elevation={ expanded ? 1 : 0 }>
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
                            { getLName(policy) }
                          </Typography>
                          <Avatar
                            src={ `/eu4/wiki/${ policy.category.toLowerCase() }.png` }
                            variant='square' sx={ { width: 28, height: 28 } }/>
                        </Grid>
                      }
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
                    policy.allow && (
                      <TableRow key={ `trigger-${ policy.id }` }>
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
                                          condition={ policy.allow } wiki={ wiki } root={ false } useExample={ false }
                                          wikiVersion={ version } backgroundColor={ theme.palette.primary.main }
                                          dot={ false } spaced={ false }/>
                        </TableCell>
                      </TableRow>
                    )
                  }
                  <TableRow key={ `policy-${ policy.id }` }>
                    <TableCell sx={ {
                      backgroundColor: theme.palette.primary.light,
                      borderBottomColor: theme.palette.primary.light
                    } }>
                      <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                  sx={ { fontWeight: 'bold' } }>
                        { intl.formatMessage({ id: 'wiki.effects' }) }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      { policy.modifiers && modifiersGrid(policy.modifiers, wiki) }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
    </Tooltip>
  )
}

export default PolicyCard;
