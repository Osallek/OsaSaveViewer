import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, formatNumber, stringComparator } from 'utils/format.utils';
import { getCountryFlag, getCountryName, getSubjects, getSubjectTypeName } from 'utils/save.utils';

interface CountryDiplomacyTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryDiplomacyTab({ country, save }: CountryDiplomacyTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <>
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto', minWidth: '50%', marginTop: 8 } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell colSpan={ 2 } style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.relations' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={ `alliances-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.alliances' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.alliances?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `alliance-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `wars-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.atWarWith' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.atWarWith?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `wars-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `subjects-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.subjects' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { getSubjects(country, save).sort((a, b) => stringComparator(getCountryName(save, a.second), getCountryName(save, b.second)))
                      .map(dep => (
                        <Tooltip title={ `${ getCountryName(save, dep.second) } : ${ getSubjectTypeName(save, dep.type) } (${ formatDate(dep.date) })` }
                                 key={ `subject-${ country.tag }-${ dep.second }` }>
                          <Avatar src={ getCountryFlag(save, dep.second) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `royal-marriage-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.royalMarriages' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.royalMarriages?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `royal-marriage-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `guarantees-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.guarantees' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.guarantees?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `guarantee-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `guaranteed-by-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.guaranteedBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.guarantedBy?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `guaranteed-by-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `warReparations-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.warReparations' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.warReparations?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `warReparation-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `warReparationsBy-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.warReparationsBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.warReparationsBy &&
                      <Tooltip title={ getCountryName(save, country.warReparationsBy) } key={ `war-reparation-by-${ country.tag }` }>
                        <Avatar src={ getCountryFlag(save, country.warReparationsBy) } variant='square' style={ { marginRight: 8 } }/>
                      </Tooltip>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `subsidies-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.subsidies' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.subsidies &&
                      Object.entries(country.subsidies).sort(([tagA,], [tagB,]) => stringComparator(getCountryName(save, tagA), getCountryName(save, tagB)))
                        .map(([tag, quantity]) => (
                          <Tooltip title={ `${ getCountryName(save, tag) } : ${ formatNumber(quantity) }` } key={ `subsidies-${ country.tag }-${ tag }` }>
                            <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                          </Tooltip>
                        )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `subsidies-by-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.subsidiesBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.subsidiesBy &&
                      Object.entries(country.subsidiesBy).sort(([tagA,], [tagB,]) => stringComparator(getCountryName(save, tagA), getCountryName(save, tagB)))
                        .map(([tag, quantity]) => (
                          <Tooltip title={ `${ getCountryName(save, tag) } : ${ formatNumber(quantity) }` } key={ `subsidies-by-${ country.tag }-${ tag }` }>
                            <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                          </Tooltip>
                        )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `knowledge-sharing-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.knowledgeSharing' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.knowledgeSharing &&
                      <Tooltip title={ getCountryName(save, country.knowledgeSharing) } key={ `knowledge-sharing-${ country.tag }` }>
                        <Avatar src={ getCountryFlag(save, country.knowledgeSharing) } variant='square' style={ { marginRight: 8 } }/>
                      </Tooltip>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `knowledge-sharing-by-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.knowledgeSharingBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.knowledgeSharingBy &&
                      <Tooltip title={ getCountryName(save, country.knowledgeSharingBy) } key={ `knowledge-sharing-by-${ country.tag }` }>
                        <Avatar src={ getCountryFlag(save, country.knowledgeSharingBy) } variant='square' style={ { marginRight: 8 } }/>
                      </Tooltip>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `supportIndependence-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.supportIndependence' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.supportIndependence?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `supportIndependence-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `supportIndependenceBys-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.supportIndependenceBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.supportIndependenceBy?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `supportIndependenceBy-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `transferTradePowerss-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.transferTradePowers' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.transferTradePowers?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `transferTradePowers-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `transferTradePowersBy-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.transferTradePowersBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.transferTradePowersBy?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `transferTradePowersBy-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `warnings-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.warnings' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.warnings?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `warning-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={ `warningsBy-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'country.warningsBy' }) }
                  </Typography>
                </TableCell>
                <TableCell style={ { minWidth: 150 } }>
                  <Grid container>
                    { country.warningsBy?.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b)))
                      .map(tag => (
                        <Tooltip title={ getCountryName(save, tag) } key={ `warningsBy-${ country.tag }-${ tag }` }>
                          <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8 } }/>
                        </Tooltip>
                      )) }
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default CountryDiplomacyTab;
