import {
    Avatar,
    GridLegacy,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { SaveWar } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, formatDuration, formatNumber } from 'utils/format.utils';
import { getCountryFlag, getCountryName } from 'utils/save.utils';

interface WarInfoTabProps {
  war: SaveWar;
  save: MapSave;
}

function WarInfoTab({ war, save }: WarInfoTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <GridLegacy container item xs={ 10 } lg={ 8 } xl={ 6 } rowGap={ 2 } style={ { alignItems: 'center', justifyContent: 'center' } }>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center' } }>
        <Typography variant='h4'>
          { war.name }
        </Typography>
      </GridLegacy>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center' } }>
        <Typography variant='h4'>
          { `${ formatDate(war.startDate) } - ${ war.endDate ? formatDate(war.endDate) : '?' }` }
          { war.duration ? ` (${ formatDuration(war.duration) })` : '' }
        </Typography>
      </GridLegacy>
      {
        war.outcome !== undefined ?
          <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center' } }>
            <Typography variant='h4'>
              { `${ intl.formatMessage({ id: 'war.result' }) } : ${ intl.formatMessage({ id: `war.outcome.${ war.outcome }` }) }` }
            </Typography>
          </GridLegacy>
          : war.finished ?
            <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center' } }>
              <Typography variant='h4'>
                { `${ intl.formatMessage({ id: 'war.result' }) } : ${ intl.formatMessage({ id: 'war.outcome.unknown' }) }` }
              </Typography>
            </GridLegacy>
            :
            <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center' } }>
              <Typography variant='h4'>
                { `${ intl.formatMessage({ id: 'war.score' }) } : ${ formatNumber(war.score ? war.score : 0) }%` }
              </Typography>
            </GridLegacy>
      }
      <TableContainer component={ Paper } style={ { borderRadius: 0, marginTop: 8 } }>
        <Table>
          <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
            <TableRow>
              <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }/>
              <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                { intl.formatMessage({ id: 'war.attackers' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText, borderBottom: 'none' } }>
                { intl.formatMessage({ id: 'war.defenders' }) }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={ `war-${ war.id }-participants` }>
              <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                <GridLegacy container alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'war.participants' }) }
                  </Typography>
                </GridLegacy>
              </TableCell>
              <TableCell style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                <GridLegacy container>
                  { Object.keys(war.attackers).map(tag => (
                    <Tooltip title={ getCountryName(save, tag) } key={ `attacker-${ war.id }-${ tag }` }>
                      <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                    </Tooltip>
                  )) }
                </GridLegacy>
              </TableCell>
              <TableCell>
                <GridLegacy container>
                  { Object.keys(war.defenders).map(tag => (
                    <Tooltip title={ getCountryName(save, tag) } key={ `defender-${ war.id }-${ tag }` }>
                      <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                    </Tooltip>
                  )) }
                </GridLegacy>
              </TableCell>
            </TableRow>
            <TableRow key={ `war-${ war.id }-losses` }>
              <TableCell style={ { backgroundColor: theme.palette.primary.light } }>
                <GridLegacy container alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'war.losses' }) }
                  </Typography>
                </GridLegacy>
              </TableCell>
              <TableCell style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                { formatNumber(Object.values(war.attackers).map(a => a.losses).map(losses => Object.values(losses).reduce((s, e) => s + e, 0)).reduce((s, e) => s + e, 0)) }
              </TableCell>
              <TableCell>
                { formatNumber(Object.values(war.defenders).map(a => a.losses).map(losses => Object.values(losses).reduce((s, e) => s + e, 0)).reduce((s, e) => s + e, 0)) }
              </TableCell>
            </TableRow>
            <TableRow key={ `war-${ war.id }-battle` }>
              <TableCell style={ { backgroundColor: theme.palette.primary.light, borderBottom: 'none' } }>
                <GridLegacy container alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'war.wonBattles' }) }
                  </Typography>
                </GridLegacy>
              </TableCell>
              <TableCell style={ { borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none' } }>
                { formatNumber(war.history.flatMap(h => h.battles ?? []).filter(b => (Object.keys(war.attackers).includes(b.attacker.country) && b.result) || (!Object.keys(war.attackers).includes(b.attacker.country) && !b.result)).length) }
              </TableCell>
              <TableCell style={ { borderBottom: 'none' } }>
                { formatNumber(war.history.flatMap(h => h.battles ?? []).filter(b => (Object.keys(war.defenders).includes(b.attacker.country) && b.result) || (!Object.keys(war.defenders).includes(b.attacker.country) && !b.result)).length) }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </GridLegacy>
  )
}

export default WarInfoTab;
