import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { getRankDisplay } from 'screens/country/CountryMilitaryTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { BuildingBar, getBuildingsBar } from 'utils/chart.utils';
import { formatNumber, toRecord } from 'utils/format.utils';
import { getBuildingImage, getNbBuildings, getRank } from 'utils/save.utils';

interface CountryBuildingTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryBuildingTab({ country, save }: CountryBuildingTabProps) {
  const intl = useIntl();

  const [buildings, setBuildings] = useState<Array<BuildingBar>>([]);
  const [ranks, setRanks] = useState<Record<string, number>>({});

  useEffect(() => {
    setBuildings(getBuildingsBar(country, save));
  }, [save, country]);

  useEffect(() => {
    setRanks(toRecord(buildings, b => b.type, b => getRankDisplay(getRank(save, country, c => getNbBuildings(c, save, b.type)))));
  }, [buildings, save, country]);

  return (
    <Grid container justifyContent='center' alignItems='center' style={ { width: '100%', minHeight: '100%' } } key={ `grid-buildings-${ country.tag }` }>
      <BarChart
        width={ 1000 }
        height={ 50 * buildings.length + 75 }
        data={ buildings }
        margin={ {
          top: 20,
          right: 30,
          left: 75,
          bottom: 5,
        } }
        layout='vertical'
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='value' type='number'/>
        <YAxis dataKey='name' type='category'/>
        <Bar dataKey='value' isAnimationActive={ false } fill={ green[500] }>
          <LabelList dataKey='value' position='middle' formatter={ (value: number) => formatNumber(value) }
                     fill='inherit' key='label-middle'/>
        </Bar>
      </BarChart>
      <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
        <Table>
          <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
            <TableRow>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>
                { intl.formatMessage({ id: 'country.building' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                { intl.formatMessage({ id: 'common.quantity' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                { intl.formatMessage({ id: 'common.rank' }) }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { buildings.map(value => (
              <TableRow key={ `${ country }-building-${ value.type }` }>
                <TableCell>
                  <Grid container item alignItems='center'>
                    <Avatar src={ getBuildingImage(save, value.type) } variant='square'/>
                    <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                      { value.name }
                    </Typography>
                  </Grid>
                </TableCell>
                <TableCell align='right'>{ formatNumber(value.value) }</TableCell>
                <TableCell align='right'>
                  { getRankDisplay(ranks[value.type] ?? 0) }
                </TableCell>
              </TableRow>
            )) }
            <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
              <TableCell align='right' style={ { borderBottom: 'none' } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText }
                            style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'common.total' }) }
                </Typography>
              </TableCell>
              <TableCell align='right' style={ { borderBottom: 'none' } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText }
                            style={ { fontWeight: 'bold' } }>
                  { buildings.reduce((s, b) => s + b.value, 0) }
                </Typography>
              </TableCell>
              <TableCell style={ { borderBottom: 'none' } }/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default CountryBuildingTab;
