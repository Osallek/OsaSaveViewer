import { Autocomplete, Avatar, Card, CardContent, CardHeader, Chip, Grid, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { CurrentLine, getCurrentLine, previousCharts } from 'utils/chart.utils';
import { colorToHex, formatNumber, stringComparator } from 'utils/format.utils';
import { getCountries, getCountry, getCountryFlag, getCountryName, getCountrysFlag, getCountrysName } from 'utils/save.utils';

interface CompareTableProps {
  save: MapSave;
  visible: boolean;
}

function CompareTable({ save, visible }: CompareTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [countriesA, setCountriesA] = useState<Array<SaveCountry>>([]);
  const [countriesB, setCountriesB] = useState<Array<SaveCountry>>([]);
  const [teamA, setTeamA] = useState<Array<CurrentLine>>([]);
  const [teamB, setTeamB] = useState<Array<CurrentLine>>([]);
  const [players, setPlayers] = useState<Array<SaveCountry>>([]);

  useEffect(() => {
    setPlayers(getCountries(save).filter(value => value.players && value.players.length > 0).sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b))));
  }, [save]);

  useEffect(() => {
    setTeamA(previousCharts.map(value => getCurrentLine(save, countriesA.map(c => c.tag), value.current)));
  }, [countriesA]);

  useEffect(() => {
    setTeamB(previousCharts.map(value => getCurrentLine(save, countriesB.map(c => c.tag), value.current)));
  }, [countriesB]);

  return (
    visible ?
      <Grid container style={ { justifyContent: 'center', padding: 24 } }>
        <Grid container item xs={ 12 } md={ 6 } lg={ 4 } flexDirection='column' rowGap={ 2 }>
          <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
            <CardHeader title={ intl.formatMessage({ id: 'common.teamA' }) } titleTypographyProps={ { color: theme.palette.primary.contrastText } }
                        style={ { backgroundColor: theme.palette.primary.dark } }/>
            <CardContent>
              <Autocomplete
                id='select-teamA'
                multiple
                fullWidth
                options={ players }
                getOptionLabel={ getCountrysName }
                getOptionDisabled={ option => countriesA.includes(option) }
                renderOption={ (props, option) => {
                  return (
                    <li { ...props }>
                      <Grid container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                        <Avatar src={ getCountrysFlag(option) } variant='square' style={ { display: 'inline-block' } }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountrysName(option) }
                        </Typography>
                      </Grid>
                    </li>
                  )
                } }
                renderTags={ (value: readonly SaveCountry[], getTagProps) =>
                  value.map((option: SaveCountry, index: number) => (
                    <Chip label={ getCountrysName(option) }
                          avatar={ <Avatar src={ getCountrysFlag(option) } variant='circular'/> }
                          { ...getTagProps({ index }) }
                          style={ { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText } }/>
                  ))
                }
                renderInput={ (params) => (
                  <TextField
                    { ...params }
                    variant='outlined'
                  />
                ) }
                value={ countriesA }
                onChange={ (event, value) => setCountriesA(value) }
              />
            </CardContent>
          </Card>
          <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
            <CardHeader title={ intl.formatMessage({ id: 'common.teamB' }) } titleTypographyProps={ { color: theme.palette.primary.contrastText } }
                        style={ { backgroundColor: theme.palette.primary.dark } }/>
            <CardContent>
              <Autocomplete
                id='select-teamB'
                multiple
                fullWidth
                options={ players }
                getOptionLabel={ getCountrysName }
                getOptionDisabled={ option => countriesB.includes(option) }
                renderOption={ (props, option) => {
                  return (
                    <li { ...props }>
                      <Grid container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                        <Avatar src={ getCountrysFlag(option) } variant='square' style={ { display: 'inline-block' } }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountrysName(option) }
                        </Typography>
                      </Grid>
                    </li>
                  )
                } }
                renderTags={ (value: readonly SaveCountry[], getTagProps) =>
                  value.map((option: SaveCountry, index: number) => (
                    <Chip label={ getCountrysName(option) }
                          avatar={ <Avatar src={ getCountrysFlag(option) } variant='circular'/> }
                          { ...getTagProps({ index }) }
                          style={ { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText } }/>
                  ))
                }
                renderInput={ (params) => (
                  <TextField
                    { ...params }
                    variant='outlined'
                  />
                ) }
                value={ countriesB }
                onChange={ (event, value) => setCountriesB(value) }
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid container item xs={ 12 } md={ 10 } lg={ 8 } xl={ 8 }>
          <AutoSizer disableHeight>
            { ({ height, width }) => (
              <Grid container item flexDirection='column' rowGap={ 2 } style={ { width: 'fit-content' } } key='compare-grid'>
                {
                  previousCharts.map((chart, i) => {
                      return (
                        <React.Fragment key={ `rank-${ chart.key }` }>
                          <Typography variant='h6' style={ { textAlign: 'center' } }>
                            { intl.formatMessage({ id: `country.${ chart.key }` }) }
                          </Typography>
                          <BarChart
                            width={ width }
                            height={ 500 }
                            data={ [teamA[i], teamB[i]] }
                            margin={ {
                              top: 25,
                              right: 40,
                              left: 20,
                              bottom: 5,
                            } }>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='total' type='category' tickFormatter={ value => formatNumber(value) }/>
                            <YAxis/>
                            <Tooltip content={ props => {
                              return props.active && props.payload ?
                                (
                                  <Grid container alignItems='center' rowGap={ 2 }
                                        style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)', flexDirection: 'column' } }>
                                    {
                                      props.payload.sort((a, b) => stringComparator(getCountryName(save, a.name as string), getCountryName(save, b.name as string)))
                                        .map(payload => (
                                          <Grid container item alignItems='center' style={ { width: '100%' } }>
                                            <Avatar src={ getCountryFlag(save, payload.name as string) } variant='square' style={ { display: 'inline-block' } }/>
                                            <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                                              { `${ getCountryName(save, payload.name as string) } : ${ formatNumber(payload.value as number) }` }
                                            </Typography>
                                          </Grid>
                                        ))
                                    }
                                  </Grid>
                                ) : undefined;
                            } }/>
                            {
                              Object.keys(teamA[i]).filter(key => key !== 'total').sort((a, b) => -stringComparator(getCountryName(save, a), getCountryName(save, b)))
                                .map(tag => (
                                  <Bar dataKey={ tag } stackId='teamA' isAnimationActive={ false }
                                       fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                                    <LabelList dataKey={ tag } position='middle'
                                               formatter={ (value: number) => `${ chart.valueMapper(value) } (${ formatNumber(100 * value / teamA[i].total) }%)` }/>
                                    {
                                      (teamA[i].total < teamB[i].total) &&
                                        <LabelList dataKey={ tag } position='top' fill='red'
                                                   formatter={ (value: number) => `-${ formatNumber(teamB[i].total - teamA[i].total) } (-${ formatNumber((1 - (teamA[i].total / teamB[i].total)) * 100) }%)` }/>
                                    }
                                  </Bar>
                                ))
                            }
                            {
                              Object.keys(teamB[i]).filter(key => key !== 'total').sort((a, b) => -stringComparator(getCountryName(save, a), getCountryName(save, b)))
                                .map(tag => (
                                  <Bar dataKey={ tag } stackId='teamB' isAnimationActive={ false }
                                       fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                                    <LabelList dataKey={ tag } position='middle'
                                               formatter={ (value: number) => `${ chart.valueMapper(value) } (${ formatNumber(100 * value / teamB[i].total) }%)` }/>
                                    {
                                      (teamB[i].total < teamA[i].total) &&
                                        <LabelList dataKey={ tag } position='top' fill='red'
                                                   formatter={ (value: number) => `-${ formatNumber(teamA[i].total - teamB[i].total) } (-${ formatNumber((1 - (teamB[i].total / teamA[i].total)) * 100) }%)` }/>
                                    }
                                  </Bar>
                                ))
                            }
                          </BarChart>
                        </React.Fragment>
                      )
                    }
                  )
                }
              </Grid>
            ) }
          </AutoSizer>
        </Grid>
      </Grid>
      :
      <></>
  )
}

export default CompareTable;
