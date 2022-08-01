import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { MapSave } from 'types/map.types';
import { getPreviousLine, previousCharts, PreviousLine } from 'utils/chart.utils';
import { colorToHex, formatNumber } from 'utils/format.utils';
import { getCountry, getCountryName } from 'utils/save.utils';

interface GraphTableProps {
  save: MapSave;
  visible: boolean;
}

function GraphTable({ save, visible }: GraphTableProps) {
  const intl = useIntl();

  const [charts, setCharts] = useState<Array<Array<PreviousLine>>>([]);

  useEffect(() => {
    setCharts(previousCharts.map(value => getPreviousLine(save, value.previous, value.current)));
  }, [save]);

  return (
    visible ?
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', padding: 24 } }>
        <Grid container item xs={ 12 } lg={ 10 } xl={ 8 }>
          <AutoSizer disableHeight>
            { ({ height, width }) => (
              <Grid container item flexDirection='column' rowGap={ 2 } style={ { width: 'fit-content' } }>
                {
                  charts.map((chart, i) => (
                    <React.Fragment key={ `rank-${ previousCharts[i].key }` }>
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
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='name'/>
                        <YAxis/>
                        <Tooltip formatter={ (value: number, name: string) => [formatNumber(value), getCountryName(save, name)] }
                                 itemSorter={ item => -(item.value as number) }/>
                        {
                          Object.keys(chart[0]).filter(value => 'name' !== value).map(value => {
                              return <Line type='monotone' dataKey={ value } stroke={ colorToHex(getCountry(save, value).colors.countryColor) }/>
                            }
                          )
                        }
                      </ComposedChart>
                    </React.Fragment>
                  ))
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

export default GraphTable;
