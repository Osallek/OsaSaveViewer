import { Close, Done } from '@mui/icons-material';
import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getIdeaUrl } from 'utils/data.utils';
import { getCountrysFlag, getIdeaGroup, getIdeaGroupsImage, getIdeaGroupsName, getIdeaName } from 'utils/save.utils';

interface CountryIdeaTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryIdeaTab({ country, save }: CountryIdeaTabProps) {
  const theme = useTheme();

  return (
    <>
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto', minWidth: '50%', marginTop: 8 } }>
          <Table>
            <TableBody>
              <>
                {
                  country.ideaGroups &&
                  Object.entries(country.ideaGroups).map(([groupName, level], i) => {
                    const group = getIdeaGroup(save, groupName);

                    return (
                      <TableRow key={ `idea-group-${ country.tag }-${ groupName }` }>
                        <TableCell style={ {
                          backgroundColor: theme.palette.primary.light,
                          borderBottom: i + 1 === Object.keys(country.ideaGroups).length ? 'none' : '1px solid rgba(224, 224, 224, 1)'
                        } }>
                          <Grid container alignItems='center'>
                            <Avatar src={ getIdeaGroupsImage(group) } variant='square' style={ { marginRight: 8 } }>
                              <Avatar src={ getCountrysFlag(country) } variant='square'/>
                            </Avatar>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { getIdeaGroupsName(group) }
                            </Typography>
                          </Grid>
                        </TableCell>
                        <TableCell style={ {
                          backgroundColor: theme.palette.primary.main,
                          borderBottom: i + 1 === Object.keys(country.ideaGroups).length ? 'none' : '1px solid rgba(224, 224, 224, 1)'
                        } }>
                          <Grid container alignItems='center'>
                            { group.ideas.map((idea, index) => (
                              <Tooltip key={ `${ country.tag }-${ idea.name }` }
                                       title={
                                         <Grid container alignItems='center'>
                                           { `${ getIdeaName(idea) } : ` }
                                           {
                                             index <= level ?
                                               <Done color='success' fontSize='small'/>
                                               :
                                               <Close color='error' fontSize='small'/>
                                           }
                                         </Grid>
                                       }>
                                <Avatar src={ getIdeaUrl(idea.image) } variant='square'
                                        style={ {
                                          marginRight: index + 1 === group.ideas.length ? 0 : 8,
                                          filter: index <= level ? 'none' : 'grayscale(100%)'
                                        } }/>
                              </Tooltip>
                            )) }
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default CountryIdeaTab;
