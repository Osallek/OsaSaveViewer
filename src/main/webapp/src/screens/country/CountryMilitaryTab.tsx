import {
  Avatar, GridLegacy, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatNumber } from 'utils/format.utils';
import { getRank } from 'utils/save.utils';

export function getRankDisplay(rank: number, margin: string = 'auto'): any {
  switch (rank) {
    case 1:
      return <Avatar src='/eu4/country/first.png' variant='square' style={ { marginLeft: margin } }/>;

    case 2:
      return <Avatar src='/eu4/country/second.png' variant='square' style={ { marginLeft: margin } }/>;

    case 3:
      return <Avatar src='/eu4/country/third.png' variant='square' style={ { marginLeft: margin } }/>;

    default:
      return rank;
  }
}

interface CountryMilitaryTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryMilitaryTab({ country, save }: CountryMilitaryTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.armyStats' }) }
        </Typography>
        <TableContainer component={ Paper } style={ { borderRadius: 0, marginTop: 8, width: 'auto', minWidth: '50%' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.type' }) }
                </TableCell>
                <TableCell align='right' style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.value' }) }
                </TableCell>
                <TableCell align='right' style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.rank' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={ `manpower-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/manpower.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.manpower' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.maxManpower) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.maxManpower)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `army-limit-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/land_limit.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.armyLimit' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.armyLimit) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.armyLimit)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `land-morale-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/land_morale.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.armyMorale' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.armyMorale) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.armyMorale)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `discipline-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/discipline.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.discipline' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { `${ formatNumber((1 + country.discipline) * 100) }%` }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.discipline)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `army-trad-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/land_tradition.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.armyTradition' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { `${ formatNumber(country.armyTradition ?? 0) }%` }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.armyTradition)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `prof-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light, borderBottom: 'none' } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/professionalism.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.armyProfessionalism' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right'
                           style={ { borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none' } }>
                  { `${ formatNumber((country.armyProfessionalism ?? 0) * 100) }%` }
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  { getRankDisplay(getRank(save, country, c => c.armyProfessionalism)) }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 8 } }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.navyStats' }) }
        </Typography>
        <TableContainer component={ Paper } style={ { borderRadius: 0, marginTop: 8, width: 'auto', minWidth: '50%' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.type' }) }
                </TableCell>
                <TableCell align='right' style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.value' }) }
                </TableCell>
                <TableCell align='right' style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'common.rank' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={ `sailors-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/sailors.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.sailors' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.maxSailors / 1000) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.maxSailors)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `naval-limit-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/naval_limit.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.navalLimit' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.navalLimit) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.navalLimit)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `naval-morale-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/naval_morale.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.navalMorale' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                  { formatNumber(country.navalMorale ?? 0) }
                </TableCell>
                <TableCell align='right'>
                  { getRankDisplay(getRank(save, country, c => c.navalMorale)) }
                </TableCell>
              </TableRow>
              <TableRow key={ `naval-trad-${ country.tag }` }>
                <TableCell style={ { backgroundColor: theme.palette.primary.light, borderBottom: 'none' } }>
                  <GridLegacy container alignItems='center'>
                    <Avatar src='/eu4/country/naval_tradition.png' variant='square' style={ { marginRight: 8 } }/>
                    <Typography variant='body1' color={ theme.palette.primary.contrastText }
                                style={ { fontWeight: 'bold' } }>
                      { intl.formatMessage({ id: 'country.navalTradition' }) }
                    </Typography>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right'
                           style={ { borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none' } }>
                  { `${ formatNumber(country.navyTradition ?? 0) }%` }
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  { getRankDisplay(getRank(save, country, c => c.navyTradition)) }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default CountryMilitaryTab;
