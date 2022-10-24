import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import theme from 'theme';
import { SaveTradeNode } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getNodeCountriesPie, NodeCountriesPie } from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';
import { getCountryName, getCountrysFlag } from 'utils/save.utils';

const renderActiveShape = (props: any, total: number, save: MapSave) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={ cx } y={ cy } dy={ 8 } textAnchor="middle" fill={ fill }>
        <tspan x={ cx } dy="-0.1cm">{ getCountryName(save, payload.item.tag) }</tspan>
        <tspan x={ cx } dy="0.5cm">{ `${ formatNumber(value) } (${ formatNumber(value * 100 / total) })%` }</tspan>
      </text>
      <Sector
        cx={ cx }
        cy={ cy }
        innerRadius={ innerRadius }
        outerRadius={ outerRadius }
        startAngle={ startAngle }
        endAngle={ endAngle }
        fill={ fill }
      />
      <Sector
        cx={ cx }
        cy={ cy }
        startAngle={ startAngle }
        endAngle={ endAngle }
        innerRadius={ outerRadius + 6 }
        outerRadius={ outerRadius + 10 }
        fill={ fill }
      />
    </g>
  );
};

interface NodeCountriesTabProps {
  node: SaveTradeNode;
  save: MapSave;
}

function NodeCountriesTab({ node, save }: NodeCountriesTabProps) {
  const intl = useIntl();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [countries, setCountries] = useState<Array<NodeCountriesPie>>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setCountries(getNodeCountriesPie(node, save));
    setTotal(node.countries.reduce((s, d) => s + (d.value ?? 0), 0));
  }, [node, save]);

  return (
    <>
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <PieChart width={ 500 } height={ 500 }>
          <Pie
            activeIndex={ activeIndex }
            activeShape={ props => renderActiveShape(props, total, save) }
            data={ countries }
            innerRadius={ 100 }
            outerRadius={ 120 }
            dataKey='value'
            onMouseEnter={ (_, index) => setActiveIndex(index) }
            isAnimationActive={ false }
          >
            { countries.map((entry, index) => (
              <Cell key={ `cell-${ index }` } fill={ entry.color }/>
            )) }
          </Pie>
        </PieChart>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'tradeNode.country' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'tradeNode.totalPower' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'tradeNode.provincePower' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'tradeNode.shipPower' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'tradeNode.lightShip' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'tradeNode.money' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                countries.map(country => (
                  <TableRow
                    key={ `row-${ country.country.tag }` }
                  >
                    <TableCell>
                      <Grid container item alignItems='center'>
                        <Avatar src={ getCountrysFlag(country.country) } variant='square'/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { country.name }
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell align='right'>{ formatNumber(country.value) }</TableCell>
                    <TableCell align='right'>{ formatNumber(country.item.provincePower) }</TableCell>
                    <TableCell align='right'>{ formatNumber(country.item.shipPower) }</TableCell>
                    <TableCell align='right'>{ formatNumber(country.item.lightShip) }</TableCell>
                    <TableCell align='right'>
                      {
                        country.item.money &&
                          <Grid item alignItems='center' style={ { display: 'flex', paddingLeft: 8 } }>
                              <Typography variant='body1' align='right' width='100%'>
                                { formatNumber(country.item.money) }
                              </Typography>
                              <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                      }
                    </TableCell>
                  </TableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default NodeCountriesTab;
