import { PhotoCamera } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Autocomplete,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    GridLegacy,
    IconButton,
    TextField,
    Tooltip as Tt,
    Typography,
    useTheme
} from '@mui/material';
import { toPng } from 'html-to-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { CurrentLine, getCurrentLine, previousCharts } from 'utils/chart.utils';
import { cleanString, colorToHex, formatNumber, stringComparator } from 'utils/format.utils';
import {
    getCountries,
    getCountry,
    getCountryFlag,
    getCountryName,
    getCountrysFlag,
    getCountrysName
} from 'utils/save.utils';

interface CompareTableProps {
  save: MapSave;
  visible: boolean;
}

function CompareTable({ save, visible }: CompareTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [ countriesA, setCountriesA ] = useState<Array<SaveCountry>>([]);
  const [ countriesB, setCountriesB ] = useState<Array<SaveCountry>>([]);
  const [ teamA, setTeamA ] = useState<Array<CurrentLine>>([]);
  const [ teamB, setTeamB ] = useState<Array<CurrentLine>>([]);
  const [ players, setPlayers ] = useState<Array<SaveCountry>>([]);
  const [ exporting, setExporting ] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLDivElement | null>>(Array(previousCharts.length).fill(null));

  useEffect(() => {
    setPlayers(
      getCountries(save).filter(value => value.players && value.players.length > 0).sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b))));
  }, [ save ]);

  useEffect(() => {
    setTeamA(previousCharts.map(value => getCurrentLine(save, countriesA.map(c => c.tag), value.current, 'a')));
  }, [ countriesA, save ]);

  useEffect(() => {
    setTeamB(previousCharts.map(value => getCurrentLine(save, countriesB.map(c => c.tag), value.current, 'b')));
  }, [ countriesB, save ]);

  const exportToPng = useCallback(async () => {
    try {
      setExporting(true);
      if (mainRef.current === null) {
        return
      }

      await toPng(mainRef.current, {
        cacheBust: true,
        backgroundColor: 'white',
        filter: domNode => domNode.id !== 'export-button'
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.setAttribute('download', `${ cleanString(`${ save.name }_${ intl.formatMessage({ id: 'common.compare' }).toLowerCase() }`) }.png`);

          if (document.body) {
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((err) => {
          console.error(err);
        })
    } finally {
      setExporting(false);
    }
  }, [ mainRef, setExporting ]);


  const exportPartToPng = useCallback(async (part: string, ref: HTMLDivElement | null) => {
    try {
      setExporting(true);
      if (ref === null) {
        return
      }

      await toPng(ref, { cacheBust: true, backgroundColor: 'white' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.setAttribute('download',
            `${ cleanString(
              `${ save.name }_${ intl.formatMessage({ id: 'common.compare' }).toLowerCase() }_${ intl.formatMessage({ id: `country.${ part }` }) }`) }.png`);

          if (document.body) {
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((err) => {
          console.error(err);
        })
    } finally {
      setExporting(false);
    }
  }, [ refs, setExporting ]);

  return (
    visible ?
      <GridLegacy container style={ { justifyContent: 'center', padding: 24 } } ref={ mainRef }>
        <GridLegacy container item xs={ 12 } md={ 6 } lg={ 4 } flexDirection='column' rowGap={ 2 }>
          <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
            <CardHeader title={ intl.formatMessage({ id: 'common.teamA' }) }
                        titleTypographyProps={ { color: theme.palette.primary.contrastText, fontWeight: 'bold' } }
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
                      <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                        <Avatar src={ getCountrysFlag(option) } variant='square' style={ { display: 'inline-block' } }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountrysName(option) }
                        </Typography>
                      </GridLegacy>
                    </li>
                  )
                } }
                renderTags={ (value: readonly SaveCountry[], getTagProps) =>
                  value.map((option: SaveCountry, index: number) => (
                    <Chip label={ getCountrysName(option) }
                          avatar={ <Avatar src={ getCountrysFlag(option) } variant='circular'/> }
                          { ...getTagProps({ index }) }
                          style={ {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText
                          } }/>
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
            <CardHeader title={ intl.formatMessage({ id: 'common.teamB' }) }
                        titleTypographyProps={ { color: theme.palette.primary.contrastText, fontWeight: 'bold' } }
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
                      <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                        <Avatar src={ getCountrysFlag(option) } variant='square' style={ { display: 'inline-block' } }/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountrysName(option) }
                        </Typography>
                      </GridLegacy>
                    </li>
                  )
                } }
                renderTags={ (value: readonly SaveCountry[], getTagProps) =>
                  value.map((option: SaveCountry, index: number) => (
                    <Chip label={ getCountrysName(option) }
                          avatar={ <Avatar src={ getCountrysFlag(option) } variant='circular'/> }
                          { ...getTagProps({ index }) }
                          style={ {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText
                          } }/>
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
          <LoadingButton variant='contained' color='primary' onClick={ exportToPng } loading={ exporting }
                         disabled={ exporting || Object.keys(teamA[0]).length <= 1 || Object.keys(teamB[0]).length <= 1 }
                         id='export-button'>
            { intl.formatMessage({ id: 'common.export' }) }
          </LoadingButton>
        </GridLegacy>
        <GridLegacy container item xs={ 12 } md={ 10 } lg={ 8 } xl={ 8 }>
          <AutoSizer disableHeight>
            { ({ width }) => (
              <GridLegacy container item flexDirection='column' rowGap={ 2 } style={ { width: 'fit-content' } }
                          key='compare-grid'>
                {
                  previousCharts.map((chart, i) => {
                      return (
                        <div key={ `rank-${ chart.key }-${ i }` } id={ chart.key } ref={ el => {
                          refs.current[i] = el;
                        } }>
                          <Typography variant='h6' style={ { textAlign: 'center' } }>
                            { intl.formatMessage({ id: `country.${ chart.key }` }) }
                            {
                              <Tt title={ intl.formatMessage({ id: 'common.export' }) }>
                                <span>
                                  <IconButton onClick={ () => exportPartToPng(chart.key, refs.current[i]) }
                                              disabled={ exporting || Object.keys(teamA[0]).length <= 1 || Object.keys(teamB[0]).length <= 1 }
                                              style={ {
                                                color: Object.keys(teamA[0]).length <= 1 || Object.keys(
                                                  teamB[0]).length <= 1 ? 'grey' : theme.palette.primary.main,
                                                fontWeight: 'bold',
                                                fontSize: '1.2em',
                                                borderRadius: '50%',
                                                marginLeft: 8,
                                                paddingTop: 4
                                              } }>
                                    {
                                      (exporting) ?
                                        <CircularProgress color='primary' style={ { width: 24, height: 24 } }/> :
                                        <PhotoCamera/>
                                    }
                                  </IconButton>
                                </span>
                              </Tt>
                            }
                          </Typography>
                          <BarChart
                            width={ width }
                            height={ 500 }
                            data={ [ teamA[i], teamB[i] ] }
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
                                  <GridLegacy container alignItems='center' rowGap={ 2 }
                                              style={ {
                                                padding: 10,
                                                backgroundColor: 'white',
                                                border: '1px solid rgb(204, 204, 204)',
                                                flexDirection: 'column'
                                              } }>
                                    {
                                      props.payload.sort((a, b) => stringComparator(getCountryName(save, (a.name as string).slice(0, 3)),
                                        getCountryName(save, (b.name as string).slice(0, 3))))
                                        .map(payload => (
                                          <GridLegacy container item alignItems='center' style={ { width: '100%' } }>
                                            <Avatar src={ getCountryFlag(save, (payload.name as string).slice(0, 3)) }
                                                    variant='square'
                                                    style={ { display: 'inline-block' } }/>
                                            <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                                              { `${ getCountryName(save, (payload.name as string).slice(0, 3)) } : ${ formatNumber(payload.value as number) }` }
                                            </Typography>
                                          </GridLegacy>
                                        ))
                                    }
                                  </GridLegacy>
                                ) : undefined;
                            } }/>
                            {
                              Object.keys(teamA[i]).filter(key => key !== 'total').sort(
                                (a, b) => -stringComparator(getCountryName(save, a.slice(0, 3)), getCountryName(save, b.slice(0, 3))))
                                .map(tag => (
                                  <Bar dataKey={ tag } stackId='team' isAnimationActive={ false }
                                       fill={ colorToHex(getCountry(save, tag.slice(0, 3)).colors.countryColor) }>
                                    <LabelList dataKey={ tag } position='middle' fill='black'
                                               formatter={ (value: number) =>
                                                 `${ chart.valueMapper(value) } (${ formatNumber(100 * value / teamA[i].total) }%)` }/>
                                    {
                                      (teamA[i].total < teamB[i].total) &&
                                        <LabelList dataKey={ tag } position='top' fill='red'
                                                   formatter={ () => `-${ formatNumber(teamB[i].total - teamA[i].total) } 
                                                 (-${ formatNumber((1 - (teamA[i].total / teamB[i].total)) * 100) }%)` }/>
                                    }
                                  </Bar>
                                ))
                            }
                            {
                              Object.keys(teamB[i]).filter(key => key !== 'total').sort(
                                (a, b) => -stringComparator(getCountryName(save, a.slice(0, 3)), getCountryName(save, b.slice(0, 3))))
                                .map(tag => (
                                  <Bar dataKey={ tag } stackId='team' isAnimationActive={ false }
                                       fill={ colorToHex(getCountry(save, tag.slice(0, 3)).colors.countryColor) }>
                                    <LabelList dataKey={ tag } position='middle' fill='black'
                                               formatter={ (value: number) => `${ chart.valueMapper(value) } (${ formatNumber(
                                                 100 * value / teamB[i].total) }%)` }/>
                                    {
                                      (teamB[i].total < teamA[i].total) &&
                                        <LabelList dataKey={ tag } position='top' fill='red'
                                                   formatter={ (value: number) => `-${ formatNumber(teamA[i].total - teamB[i].total) } (-${ formatNumber(
                                                     (1 - (teamB[i].total / teamA[i].total)) * 100) }%)` }/>
                                    }
                                  </Bar>
                                ))
                            }
                          </BarChart>
                        </div>
                      )
                    }
                  )
                }
              </GridLegacy>
            ) }
          </AutoSizer>
        </GridLegacy>
      </GridLegacy>
      :
      <></>
  )
}

export default CompareTable;
