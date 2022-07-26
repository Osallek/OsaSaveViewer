import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { getRankDisplay } from 'screens/country/CountryMilitaryTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getBuildingsBar } from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';
import { getNbBuildings, getRank } from 'utils/save.utils';

interface CountryBuildingTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryBuildingTab({ country, save }: CountryBuildingTabProps) {
  const intl = useIntl();

  const buildings = getBuildingsBar(country, save);

  return (
    <>
      <Grid container style={ { width: '100%', minHeight: '100%' } } key={ `grid-buildings-${ country.tag }` }>
        <AutoSizer>
          { ({ height, width }) =>
            <>
              <BarChart
                width={ width } height={ 50 * buildings.length + 75 }
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
              <Grid container alignItems='center' justifyContent='center' style={ { width: width, paddingBottom: 24 } }>
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
                        <TableRow
                          key={ `${ country }-building-${ value.type }` }
                        >
                          <TableCell>{ value.name }</TableCell>
                          <TableCell align='right'>{ formatNumber(value.value) }</TableCell>
                          <TableCell align='right'>
                            { getRankDisplay(getRank(save, country, c => getNbBuildings(c, save)[value.type] ?? 0)) }
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
            </>
          }
        </AutoSizer>
      </Grid>
    </>
  )
}

export default CountryBuildingTab;
