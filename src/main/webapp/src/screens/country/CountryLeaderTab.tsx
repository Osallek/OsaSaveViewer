import { Avatar, GridLegacy, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SaveCountry, SaveLeader } from 'types/api.types';
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

  const [leaders, setLeaders] = useState<Array<SaveLeader>>([]);

  useEffect(() => {
    setLeaders(getLeaders(save, country));
  }, [country]);

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
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
                        <TableCell style={ {
                          backgroundColor: theme.palette.primary.light,
                          borderBottomColor: theme.palette.primary.main
                        } }>
                          <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                            { leader.name }
                          </Typography>
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
                          <GridLegacy container>
                            { leader.personality
                              && (
                                <Tooltip key={ `${ country.tag }-leader-${ i }-${ leader.personality }` }
                                         title={ getLeaderPersonalityName(save, leader.personality) }>
                                  <Avatar src={ getLeaderPersonalityImage(save, leader.personality) } variant='square'
                                          alt={ getLeaderPersonalityName(save, leader.personality) }
                                          style={ { width: 28, height: 28 } }/>
                                </Tooltip>
                              ) }
                          </GridLegacy>
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
                    leaders.length > 0 &&
                    `${ formatNumber(leaders.map(l => l.shock).reduce((a, b) => a + b, 0) / leaders.length) } /
                  ${ formatNumber(leaders.map(l => l.fire).reduce((a, b) => a + b, 0) / leaders.length) } /
                  ${ formatNumber(leaders.map(l => l.manuever).reduce((a, b) => a + b, 0) / leaders.length) } /
                  ${ formatNumber(leaders.map(l => l.siege).reduce((a, b) => a + b, 0) / leaders.length) }
                  (${ formatNumber(leaders.map(l => (l.shock + l.fire + l.manuever + l.siege)).reduce((a, b) => a + b, 0) / leaders.length) })`
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default CountryLeaderTab;
