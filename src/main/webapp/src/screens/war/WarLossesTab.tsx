import { Avatar, GridLegacy, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Bar, BarChart, CartesianGrid, Label, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { Losses, SaveWar } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { CurrentLine, getLossesChart } from 'utils/chart.utils';
import { lossesToColor } from 'utils/colors.utils';
import { colorToHex, formatNumber, numberComparator } from 'utils/format.utils';
import { getCountry, getCountryFlag, getCountryName } from 'utils/save.utils';

interface WarLossesTabProps {
  war: SaveWar;
  save: MapSave;
}

function WarLossesTab({ war, save }: WarLossesTabProps) {
  const intl = useIntl();

  const [charts, setCharts] = useState<CurrentLine[]>([]);

  useEffect(() => {
    setCharts([getLossesChart(Object.values(war.attackers)), getLossesChart(Object.values(war.defenders))]);
  }, [war, save]);

  return (
    <GridLegacy container item xs={ 12 } md={ 10 } lg={ 8 } xl={ 8 }>
      {
        charts.length > 0 &&
        <AutoSizer disableHeight>
          { ({ height, width }) => (
            <GridLegacy container item flexDirection='column' rowGap={ 2 } style={ { width: 'fit-content' } } key='losses-total-grid'>
              <React.Fragment key='losses'>
                <Typography variant='h6' style={ { textAlign: 'center' } }>
                  { intl.formatMessage({ id: 'war.losses.total' }) }
                </Typography>
                <BarChart
                  width={ width }
                  height={ 500 }
                  data={ charts }
                  margin={ {
                    top: 25,
                    right: 40,
                    left: 20,
                    bottom: 5,
                  } }
                >
                  <CartesianGrid strokeDasharray='3 3'/>
                  <XAxis dataKey='total' type='category' tickFormatter={ value => formatNumber(value) }>
                    <Label value={ intl.formatMessage({ id: 'war.attackers' }) } offset={ 0 } position='insideBottomLeft'/>
                    <Label value={ intl.formatMessage({ id: 'war.defenders' }) } offset={ 0 } position='insideBottomRight'/>
                  </XAxis>
                  <YAxis/>
                  <Tooltip content={ props => {
                    return props.active && props.payload ?
                      (
                        <GridLegacy container alignItems='center' rowGap={ 2 }
                              style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)', flexDirection: 'column' } }>
                          {
                            props.payload.sort((a, b) => numberComparator(a.value as number, b.value as number))
                              .map(payload => (
                                <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ `tooltip-total-${ payload.name as string }` }>
                                  <Avatar src={ getCountryFlag(save, (payload.name as string).slice(0, 3)) } variant='square'
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
                    Object.keys(war.attackers)
                      .filter(tag => charts[0][tag] > 0)
                      .sort((a, b) => -numberComparator(charts[0][a], charts[0][b]))
                      .map((tag, index) => (
                        <Bar dataKey={ tag } stackId='total' isAnimationActive={ false } key={ `bar-total-${ tag }` }
                             fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                          {
                            charts[0][tag] / charts[0]['total'] > 0.03 &&
                            <LabelList dataKey={ tag } position='middle' fill='black'
                                       formatter={ (value: number) => `${ charts[0][tag] } (${ formatNumber(100 * value / charts[0]['total']) }%)` }/>
                          }
                          {
                            (index === Object.keys(war.attackers).filter(tag => charts[0][tag] > 0).length - 1) && (charts[1].total < charts[0].total) &&
                            <LabelList dataKey={ tag } position='top' fill='red'
                                       formatter={ (value: number) => `+${ formatNumber(charts[0].total - charts[1].total) } (+${ formatNumber(
                                         ((charts[0].total / charts[1].total) - 1) * 100) }%)` }/>
                          }
                        </Bar>
                      ))
                  }
                  {
                    Object.keys(war.defenders)
                      .filter(tag => charts[1][tag] > 0)
                      .sort((a, b) => -numberComparator(charts[1][a], charts[1][b]))
                      .map((tag, index) => (
                        <Bar dataKey={ tag } stackId='total' isAnimationActive={ false } key={ `bar-total-${ tag }` }
                             fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                          {
                            charts[1][tag] / charts[1]['total'] > 0.03 &&
                            <LabelList dataKey={ tag } position='middle' fill='black'
                                       formatter={ (value: number) => `${ charts[1][tag] } (${ formatNumber(100 * value / charts[1]['total']) }%)` }/>
                          }
                          {
                            (index === Object.keys(war.defenders).filter(tag => charts[1][tag] > 0).length - 1) && (charts[0].total < charts[1].total) &&
                            <LabelList dataKey={ tag } position='top' fill='red'
                                       formatter={ (value: number) => `+${ formatNumber(charts[1].total - charts[0].total) } (+${ formatNumber(
                                         ((charts[1].total / charts[0].total) - 1) * 100) }%)` }/>
                          }
                        </Bar>
                      ))
                  }
                </BarChart>
              </React.Fragment>
              <React.Fragment key='losses-land'>
                <Typography variant='h6' style={ { textAlign: 'center' } }>
                  { intl.formatMessage({ id: 'war.losses.land' }) }
                </Typography>
                <BarChart
                  width={ width }
                  height={ 500 }
                  data={ charts }
                  margin={ {
                    top: 25,
                    right: 40,
                    left: 20,
                    bottom: 5,
                  } }
                >
                  <CartesianGrid strokeDasharray='3 3'/>
                  <XAxis dataKey='land' type='category' tickFormatter={ value => formatNumber(value) }>
                    <Label value={ intl.formatMessage({ id: 'war.attackers' }) } offset={ 0 } position='insideBottomLeft'/>
                    <Label value={ intl.formatMessage({ id: 'war.defenders' }) } offset={ 0 } position='insideBottomRight'/>
                  </XAxis>
                  <YAxis/>
                  <Tooltip content={ props => {
                    return props.active && props.payload ?
                      (
                        <GridLegacy container alignItems='center' rowGap={ 2 }
                              style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)', flexDirection: 'column' } }>
                          {
                            props.payload.sort((a, b) => numberComparator(a.value as number, b.value as number))
                              .map(payload => (
                                <GridLegacy container key={ `tooltip-land-${ payload.name as string }` }>
                                  <div style={ {
                                    width: 10,
                                    height: 10,
                                    backgroundColor: lossesToColor(Losses[payload.name as keyof typeof Losses]),
                                    margin: 'auto'
                                  } }/>
                                  <Typography variant='body1' component='span' style={ { marginLeft: 4 } }>
                                    { `${ intl.formatMessage({ id: `war.losses.${ payload.name as string }` }) } : ${ formatNumber(payload.value as number) }` }
                                  </Typography>
                                </GridLegacy>
                              ))
                          }
                        </GridLegacy>
                      ) : undefined;
                  } }/>
                  {
                    Object.values(Losses)
                      .filter((value, index) => index <= 8)
                      .filter(type => charts[1][type] > 0 || charts[0][type] > 0)
                      .sort((a, b) => -numberComparator(charts[0][a], charts[0][b]))
                      .map((type, index) => (
                        <Bar dataKey={ type } stackId='type' isAnimationActive={ false } key={ `bar-land-${ type }` }
                             fill={ lossesToColor(type) }>
                          <LabelList dataKey={ type } position='middle' fill='black'
                                     formatter={ (value: number) => {
                                       if (value === charts[0][type]) {
                                         return value / (charts[0]['land']) > 0.03 ? `${ value } (${ formatNumber(100 * value / charts[0]['land']) }%)` : '';
                                       } else {
                                         return value / (charts[1]['land']) > 0.03 ? `${ value } (${ formatNumber(100 * value / charts[1]['land']) }%)` : '';
                                       }
                                     } }/>
                          <LabelList dataKey={ type } position='top' fill='red'
                                     formatter={ (value: number) => {
                                       const values = Object.values(Losses)
                                         .filter((value, index) => index <= 8)
                                         .filter(type => charts[1][type] > 0 || charts[0][type] > 0)
                                         .sort((a, b) => -numberComparator(charts[0][a], charts[0][b]));

                                       if (index === values.length - 1) {
                                         if (charts[0]['land'] > charts[1]['land'] && value === charts[0][type]) {
                                           return `+${ formatNumber(charts[0]['land'] - charts[1]['land']) } (+${ formatNumber(
                                             ((charts[0]['land'] / charts[1]['land']) - 1) * 100) }%)`
                                         } else if (charts[1]['land'] > charts[0]['land'] && value === charts[1][type]) {
                                           return `+${ formatNumber(charts[1]['land'] - charts[0]['land']) } (+${ formatNumber(
                                             ((charts[1]['land'] / charts[0]['land']) - 1) * 100) }%)`
                                         }
                                       }

                                       return '';
                                     } }/>
                        </Bar>
                      ))
                  }
                </BarChart>
              </React.Fragment>
              <React.Fragment key='losses-naval'>
                <Typography variant='h6' style={ { textAlign: 'center' } }>
                  { intl.formatMessage({ id: 'war.losses.naval' }) }
                </Typography>
                <BarChart
                  width={ width }
                  height={ 500 }
                  data={ charts }
                  margin={ {
                    top: 25,
                    right: 40,
                    left: 20,
                    bottom: 5,
                  } }
                >
                  <CartesianGrid strokeDasharray='3 3'/>
                  <XAxis dataKey='naval' type='category' tickFormatter={ value => formatNumber(value) }>
                    <Label value={ intl.formatMessage({ id: 'war.attackers' }) } offset={ 0 } position='insideBottomLeft'/>
                    <Label value={ intl.formatMessage({ id: 'war.defenders' }) } offset={ 0 } position='insideBottomRight'/>
                  </XAxis>
                  <YAxis/>
                  <Tooltip content={ props => {
                    return props.active && props.payload ?
                      (
                        <GridLegacy container alignItems='center' rowGap={ 2 }
                              style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)', flexDirection: 'column' } }>
                          {
                            props.payload.sort((a, b) => numberComparator(a.value as number, b.value as number))
                              .map(payload => (
                                <GridLegacy container key={ `tooltip-naval-${ payload.name as string }` }>
                                  <div style={ {
                                    width: 10,
                                    height: 10,
                                    backgroundColor: lossesToColor(Losses[payload.name as keyof typeof Losses]),
                                    margin: 'auto'
                                  } }/>
                                  <Typography variant='body1' component='span' style={ { marginLeft: 4 } }>
                                    { `${ intl.formatMessage({ id: `war.losses.${ payload.name as string }` }) } : ${ formatNumber(payload.value as number) }` }
                                  </Typography>
                                </GridLegacy>
                              ))
                          }
                        </GridLegacy>
                      ) : undefined;
                  } }/>
                  {
                    Object.values(Losses)
                      .filter((value, index) => index > 8)
                      .filter(type => charts[1][type] > 0 || charts[0][type] > 0)
                      .sort((a, b) => -numberComparator(charts[0][a], charts[0][b]))
                      .map((type, index) => (
                        <Bar dataKey={ type } stackId='type' isAnimationActive={ false } key={ `bar-naval-${ type }` }
                             fill={ lossesToColor(type) }>
                          <LabelList dataKey={ type } position='middle' fill='black'
                                     formatter={ (value: number) => {
                                       if (value === charts[0][type]) {
                                         return value / (charts[0]['naval']) > 0.03 ? `${ value } (${ formatNumber(100 * value / charts[0]['naval']) }%)` : '';
                                       } else {
                                         return value / (charts[1]['naval']) > 0.03 ? `${ value } (${ formatNumber(100 * value / charts[1]['naval']) }%)` : '';
                                       }
                                     } }/>
                          <LabelList dataKey={ type } position='top' fill='red'
                                     formatter={ (value: number) => {
                                       const values = Object.values(Losses)
                                         .filter((value, index) => index > 8)
                                         .filter(type => charts[1][type] > 0 || charts[0][type] > 0)
                                         .sort((a, b) => -numberComparator(charts[0][a], charts[0][b]));

                                       if (index === values.length - 1) {
                                         if (charts[0]['naval'] > charts[1]['naval'] && value === charts[0][type]) {
                                           return `+${ formatNumber(charts[0]['naval'] - charts[1]['naval']) } (+${ formatNumber(
                                             ((charts[0]['naval'] / charts[1]['naval']) - 1) * 100) }%)`
                                         } else if (charts[1]['naval'] > charts[0]['naval'] && value === charts[1][type]) {
                                           return `+${ formatNumber(charts[1]['naval'] - charts[0]['naval']) } (+${ formatNumber(
                                             ((charts[1]['naval'] / charts[0]['naval']) - 1) * 100) }%)`
                                         }
                                       }

                                       return '';
                                     } }/>
                        </Bar>
                      ))
                  }
                </BarChart>
              </React.Fragment>
              {
                Object.values(Losses).filter(type => charts[1][type] > 0 || charts[0][type] > 0).map((type, i) => {
                  return (
                    <React.Fragment key={ `losses-${ type }-${ i }` }>
                      <Typography variant='h6' style={ { textAlign: 'center' } }>
                        { intl.formatMessage({ id: `war.losses.${ type }` }) }
                      </Typography>
                      <BarChart
                        width={ width }
                        height={ 500 }
                        data={ charts }
                        margin={ {
                          top: 25,
                          right: 40,
                          left: 20,
                          bottom: 5,
                        } }
                      >
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey={ type } type='category' tickFormatter={ value => formatNumber(value) }>
                          <Label value={ intl.formatMessage({ id: 'war.attackers' }) } offset={ 0 } position='insideBottomLeft'/>
                          <Label value={ intl.formatMessage({ id: 'war.defenders' }) } offset={ 0 } position='insideBottomRight'/>
                        </XAxis>
                        <YAxis/>
                        <Tooltip content={ props => {
                          return props.active && props.payload ?
                            (
                              <GridLegacy container alignItems='center' rowGap={ 2 }
                                    style={ { padding: 10, backgroundColor: 'white', border: '1px solid rgb(204, 204, 204)', flexDirection: 'column' } }>
                                {
                                  props.payload.sort((a, b) => numberComparator(a.value as number, b.value as number))
                                    .map(payload => (
                                      <GridLegacy container item alignItems='center' style={ { width: '100%' } }>
                                        <Avatar src={ getCountryFlag(save, (payload.name as string).slice(0, 3)) } variant='square'
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
                          Object.keys(war.attackers)
                            .filter(tag => charts[0][`${ tag }-${ type }`] > 0)
                            .sort((a, b) => -numberComparator(charts[0][`${ a }-${ type }`], charts[0][`${ b }-${ type }`]))
                            .map((tag, index) => (
                              <Bar dataKey={ `${ tag }-${ type }` } stackId={ type } isAnimationActive={ false } key={ `bar-${ type }-${ tag }` }
                                   fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                                {
                                  charts[0][`${ tag }-${ type }`] / charts[0][type] > 0.03 &&
                                  <LabelList dataKey={ `${ tag }-${ type }` } position='middle' fill='black'
                                             formatter={ (value: number) => `${ charts[0][`${ tag }-${ type }`] } 
                                             (${ formatNumber(100 * value / charts[0][type]) }%)` }/>
                                }
                                {
                                  (index === Object.keys(war.attackers).filter(tag => charts[0][`${ tag }-${ type }`] > 0).length - 1)
                                  && (charts[1][type] < charts[0][type]) &&
                                  <LabelList dataKey={ `${ tag }-${ type }` } position='top' fill='red'
                                             formatter={ () => `+${ formatNumber(charts[0][type] - charts[1][type]) } 
                                             (+${ formatNumber(((charts[0][type] / charts[1][type]) - 1) * 100) }%)` }/>
                                }
                              </Bar>
                            ))
                        }
                        {
                          Object.keys(war.defenders)
                            .filter(tag => charts[1][`${ tag }-${ type }`] > 0)
                            .sort((a, b) => -numberComparator(charts[1][`${ a }-${ type }`], charts[1][`${ b }-${ type }`]))
                            .map((tag, index) => (
                              <Bar dataKey={ `${ tag }-${ type }` } stackId={ type } isAnimationActive={ false } key={ `bar-${ type }-${ tag }` }
                                   fill={ colorToHex(getCountry(save, tag).colors.countryColor) }>
                                {
                                  charts[1][`${ tag }-${ type }`] / charts[1][type] > 0.03 &&
                                  <LabelList dataKey={ `${ tag }-${ type }` } position='middle' fill='black'
                                             formatter={ (value: number) => `${ charts[1][`${ tag }-${ type }`] } 
                                             (${ formatNumber(100 * value / charts[1][type]) }%)` }/>
                                }
                                {
                                  (index === Object.keys(war.defenders).filter(
                                    tag => charts[1][`${ tag }-${ type }`] > 0).length - 1) && (charts[0][type] < charts[1][type]) &&
                                  <LabelList dataKey={ `${ tag }-${ type }` } position='top' fill='red'
                                             formatter={ () => `+${ formatNumber(charts[1][type] - charts[0][type]) } 
                                             (+${ formatNumber(((charts[1][type] / charts[0][type]) - 1) * 100) }%)` }/>
                                }
                              </Bar>
                            ))
                        }
                      </BarChart>
                    </React.Fragment>
                  )
                })
              }
            </GridLegacy>
          ) }
        </AutoSizer>
      }
    </GridLegacy>
  )
}

export default WarLossesTab;
