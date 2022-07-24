import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, formatDuration, formatNumber } from 'utils/format.utils';
import { getLeaderPersonalityImage, getLeaderPersonalityName, getLeaders } from 'utils/save.utils';

interface CountryLeaderTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryLeaderTab({ country, save }: CountryLeaderTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  const leaders = getLeaders(country);

  console.log(leaders);

  return (
    <>
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto', minWidth: '50%', marginTop: 8 } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.name' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.start' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.end' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.duration' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.personality' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                  { intl.formatMessage({ id: 'country.leader.skills' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {
                  leaders.map((leader, i) => (
                      <TableRow key={ `${ country.tag }-leader-${ i }` }>
                        <TableCell style={ { backgroundColor: theme.palette.primary.light, borderBottomColor: theme.palette.primary.main } }>
                          { leader.name }
                        </TableCell>
                        <TableCell>
                          { formatDate(leader.activation) }
                        </TableCell>
                        <TableCell>
                          { formatDate(leader.deathDate) }
                        </TableCell>
                        <TableCell>
                          { formatDuration(leader.duration) }
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            { leader.personality
                              && (
                                <Tooltip key={ `${ country.tag }-leader-${ i }-${ leader.personality }` }
                                         title={ getLeaderPersonalityName(save, leader.personality) }>
                                  <Avatar src={ getLeaderPersonalityImage(save, leader.personality) } variant='square'
                                          alt={ getLeaderPersonalityName(save, leader.personality) }
                                          style={ { width: 28, height: 28 } }/>
                                </Tooltip>
                              ) }
                          </Grid>
                        </TableCell>
                        <TableCell>
                          { `${ leader.shock } / ${ leader.fire } / ${ leader.manuever } / ${ leader.siege } (${ leader.shock + leader.fire + leader.manuever + leader.siege })` }
                        </TableCell>
                      </TableRow>
                    )
                  )
                }
              </>
              <TableRow>
                <TableCell colSpan={ 4 }>
                </TableCell>
                <TableCell align='right'>
                  { intl.formatMessage({ id: 'common.mean' }) }
                </TableCell>
                <TableCell>
                  {
                    leaders.filter(l => l.duration !== undefined).length > 0 &&
                    `${ formatNumber(leaders.map(l => l.shock * (l.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      leaders.map(l => (l.duration ?? 0)).reduce((a, b) => a + b, 0)) } /
                  ${ formatNumber(leaders.map(l => l.fire * (l.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      leaders.map(l => (l.duration ?? 0)).reduce((a, b) => a + b, 0)) } /
                  ${ formatNumber(leaders.map(l => l.manuever * (l.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      leaders.map(l => (l.duration ?? 0)).reduce((a, b) => a + b, 0)) } /
                  ${ formatNumber(leaders.map(l => l.siege * (l.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      leaders.map(l => (l.duration ?? 0)).reduce((a, b) => a + b, 0)) }
                  (${ formatNumber(leaders.map(l => (l.shock + l.fire + l.manuever + l.siege) * (l.duration ?? 0)).reduce((a, b) => a + b, 0) /
                      leaders.map(l => (l.duration ?? 0)).reduce((a, b) => a + b, 0)) })`
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default CountryLeaderTab;
