import { Grid, Typography, useTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';
import { getRankDisplay } from 'screens/country/CountryMilitaryTab';
import { CountryPreviousSave, SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import {
  getIncomeLine,
  getNbProvincesLine,
  getPreviousBar,
  getSavesGradient,
  HistoryLine,
  PreviousBar,
  SaveGradient
} from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';
import { getCountries, getSaveIndex } from 'utils/save.utils';

interface PreviousChart {
  mapper: (previous: CountryPreviousSave) => number,
  current: (country: SaveCountry) => number,
  key: string;
  valueMapper: (n: number) => string;
  domain?: AxisDomain;
}

const previousCharts: Array<PreviousChart> = [
  {
    key: 'dev',
    mapper: previous => previous.dev,
    current: country => country.dev,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'maxManpower',
    mapper: previous => previous.maxManpower,
    current: country => country.maxManpower,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'armyLimit',
    mapper: previous => previous.armyLimit,
    current: country => country.armyLimit,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'armyProfessionalism',
    mapper: previous => previous.armyProfessionalism * 100,
    current: country => (country.armyProfessionalism ?? 0) * 100,
    valueMapper: n => `${ formatNumber(n) }%`,
    domain: [0, 100],
  },
  {
    key: 'losses',
    mapper: previous => previous.losses,
    current: country => country.losses ? Object.values(country.losses).reduce((s, n) => s + n, 0) : 0,
    valueMapper: n => formatNumber(n),
  },
];

interface CountryHistoryTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryHistoryTab({ country, save }: CountryHistoryTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [income, setIncome] = useState<Array<HistoryLine>>([]);
  const [nbProvinces, setNbProvinces] = useState<Array<HistoryLine>>([]);
  const [charts, setCharts] = useState<Array<Array<PreviousBar>>>([]);
  const [colors, setColors] = useState<Array<SaveGradient>>([]);

  useEffect(() => {
    setIncome(getIncomeLine(country));
    setNbProvinces(getNbProvincesLine(country));
    setCharts(previousCharts.map(value => getPreviousBar(country, save, value.mapper, value.current)));
  }, [country, save]);

  useEffect(() => {
    setColors(getSavesGradient(save));
  }, [save]);

  return (
    <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
      <Grid container size={ { xs: 12, lg: 10, xl: 8 } }>
        <AutoSizer disableHeight>
          { ({ width }) => (
            <Grid container flexDirection='column' rowGap={ 2 } style={ { width: 'fit-content' } }>
              <Typography variant='h6' style={ { textAlign: 'center' } }>
                { intl.formatMessage({ id: 'country.history.income' }) }
              </Typography>
              <AreaChart
                width={ width }
                height={ 500 }
                data={ income }
                margin={ {
                  top: 5,
                  right: 40,
                  left: 20,
                  bottom: 5,
                } }
              >
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='year'/>
                <YAxis dataKey='value' domain={ [0, 'dataMax'] }/>
                <Tooltip content={ props => {
                  return props.active ? (
                    <div style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)' } }>
                      <div>
                        { `${ intl.formatMessage({ id: 'common.save' }) } ${ getSaveIndex(parseInt(props.label), save) }` }
                      </div>
                      <div>
                        { `${ props.label } : ${ props.payload ? props.payload[0].value : '' }` }
                      </div>
                    </div>
                  ) : undefined;
                } }/>
                <defs>
                  <linearGradient id='splitColor' x1="0" y1="0" x2="1" y2="0">
                    {
                      colors.map(value => <stop offset={ value.percent } stopColor={ value.color } stopOpacity={ 1 }/>)
                    }
                  </linearGradient>
                </defs>
                <Area type='monotone' dataKey='value' stroke='#8884d8' fill='url(#splitColor)' connectNulls
                      strokeWidth={ 2 }/>
              </AreaChart>
              <Typography variant='h6' style={ { textAlign: 'center' } }>
                { intl.formatMessage({ id: 'country.history.nbProvinces' }) }
              </Typography>
              <AreaChart
                width={ width }
                height={ 500 }
                data={ nbProvinces }
                margin={ {
                  top: 5,
                  right: 40,
                  left: 20,
                  bottom: 5,
                } }
              >
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='year'/>
                <YAxis dataKey='value' domain={ [0, 'dataMax'] }/>
                <Tooltip content={ props => {
                  return props.active ? (
                    <div style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)' } }>
                      <div>
                        { `${ intl.formatMessage({ id: 'common.save' }) } ${ getSaveIndex(parseInt(props.label), save) }` }
                      </div>
                      <div>
                        { `${ props.label } : ${ props.payload ? props.payload[0].value : '' }` }
                      </div>
                    </div>
                  ) : undefined;
                } }/>
                <defs>
                  <linearGradient id='splitColor' x1="0" y1="0" x2="1" y2="0">
                    {
                      colors.map(value => <stop offset={ value.percent } stopColor={ value.color } stopOpacity={ 1 }/>)
                    }
                  </linearGradient>
                </defs>
                <Area type='monotone' dataKey='value' stroke='#8884d8' fill='url(#splitColor)' connectNulls
                      strokeWidth={ 2 }/>
              </AreaChart>
              {
                charts.map((chart, i) => (
                  <>
                    <Typography variant='h6' style={ { textAlign: 'center' } }>
                      { intl.formatMessage({ id: `country.history.${ previousCharts[i].key }` }) }
                    </Typography>
                    <ComposedChart
                      width={ width }
                      height={ 500 }
                      data={ chart }
                      margin={ {
                        top: 25,
                        right: 40,
                        left: 20,
                        bottom: 5,
                      } }>
                      <defs>
                        <linearGradient id='splitColor' x1="0" y1="0" x2="1" y2="0">
                          {
                            colors.map(value => <stop offset={ value.percent } stopColor={ value.color }
                                                      stopOpacity={ 1 }/>)
                          }
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray='3 3'/>
                      <XAxis dataKey='name'/>
                      <YAxis yAxisId='left' dataKey='value' domain={ previousCharts[i].domain ?? [0, 'dataMax'] }
                             label={ {
                               value: intl.formatMessage({ id: 'common.value' }),
                               angle: -90,
                               position: 'left'
                             } }/>
                      {
                        <YAxis yAxisId='right' dataKey='rankAll' allowDecimals={ false }
                               domain={ [1, (dataMax: number) => Math.max(dataMax, getCountries(save).length)] }
                               orientation='right'
                               label={ {
                                 value: intl.formatMessage({ id: 'common.rank' }),
                                 angle: 90,
                                 position: 'right'
                               } }/>
                      }
                      <Tooltip content={ props => {
                        return props.active ? (
                          <div
                            style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)' } }>
                            <Grid container flexDirection='column'>
                              <div>
                                { `${ props.label } : ${ props.payload ? previousCharts[i].valueMapper(props.payload[0].payload.value) : '' }` }
                              </div>
                              {
                                country.players &&
                                <Grid container alignContent='center' alignItems='center'>
                                  <div style={ {
                                    width: 10,
                                    height: 10,
                                    backgroundColor: green[500],
                                    marginRight: theme.spacing(1)
                                  } }/>
                                  { props.payload && `${ intl.formatMessage({ id: 'common.rankPlayers' }) } : ` }{ props.payload && getRankDisplay(props.payload[0].payload.rankPlayers ?? 0) }
                                </Grid>
                              }
                              <Grid container alignContent='center' alignItems='center'>
                                <div style={ {
                                  width: 10,
                                  height: 10,
                                  backgroundColor: blue[500],
                                  marginRight: theme.spacing(1)
                                } }/>
                                { props.payload && `${ intl.formatMessage({ id: 'common.rankAll' }) } : ` }{ props.payload && getRankDisplay(props.payload[0].payload.rankAll ?? 0) }
                              </Grid>
                            </Grid>
                          </div>
                        ) : undefined;
                      } }/>
                      <Bar yAxisId='left' dataKey='value' isAnimationActive={ false }>
                        { chart.map((entry, index) => (
                          <Cell fill={ colors[index * 2].color } fillOpacity={ 0.6 } key={ `cell-${ index }` }/>
                        )) }
                        <LabelList dataKey='value' position='middle' fill='inherit' key='label-middle'
                                   formatter={ (value: number) => previousCharts[i].valueMapper(value) }/>
                        <LabelList dataKey='progress' position='top' fill='inherit' key='label-top'
                                   formatter={ (progress: number) => progress !== undefined ? `${ progress >= 0 ? '+' : '' }${ formatNumber(progress, 0) }%` : undefined }/>
                      </Bar>
                      <Line yAxisId='right' type='monotone' dataKey='rankAll' stroke={ blue[700] }/>
                      {
                        country.players &&
                        <Line yAxisId='right' type='monotone' dataKey='rankPlayers' stroke={ green[700] }/>
                      }
                    </ComposedChart>
                  </>
                ))
              }
            </Grid>
          ) }
        </AutoSizer>
      </Grid>
    </Grid>
  )
}

export default CountryHistoryTab;
