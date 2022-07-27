import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Legend, Pie, PieChart, Sector } from 'recharts';
import { getRankDisplay } from 'screens/country/CountryMilitaryTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getManaSpentBar, ManaSpentBar, powerSpentToColor } from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';
import { getRank, isAdm, isDip, isMil } from 'utils/save.utils';

interface CountryManaTabProps {
  country: SaveCountry;
  save: MapSave;
}

const renderActiveShape = (props: any, total: number) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={ cx } y={ cy } dy={ 8 } textAnchor="middle" fill={ fill }>
        { payload.name }
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
      <path d={ `M${ sx },${ sy }L${ mx },${ my }L${ ex },${ ey }` } stroke={ fill } fill="none"/>
      <circle cx={ ex } cy={ ey } r={ 2 } fill={ fill } stroke="none"/>
      <text x={ ex + (cos >= 0 ? 1 : -1) * 12 } y={ ey } textAnchor={ textAnchor } fill="#333">
        { `${ formatNumber(value) } (${ formatNumber(value * 100 / total) })%` }
      </text>
    </g>
  );
};

function CountryManaTab({ country, save }: CountryManaTabProps) {
  const intl = useIntl();

  const [data, setData] = useState<Array<ManaSpentBar>>([]);
  const [total, setTotal] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    setData(getManaSpentBar(country));
  }, [country]);

  useEffect(() => {
    setTotal(data.reduce((sum, s) => sum + s.total, 0));
  }, [data]);

  return (
    <>
      <Grid container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }
            key={ `grid-incomevsexpense-${ country.tag }` }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.MANA_SPENT' }) }
        </Typography>
        <Grid container style={ { width: '100%', justifyContent: 'center' } }>
          <PieChart width={ 550 } height={ 500 }>
            <Legend verticalAlign="top" height={ 36 } content={
              <Typography variant='h6'>
                { intl.formatMessage({ id: 'country.mana.adm' }) }
              </Typography>
            }/>
            <Pie
              activeIndex={ activeIndex[0] }
              activeShape={ props => renderActiveShape(props, total) }
              data={ data }
              innerRadius={ 90 }
              outerRadius={ 110 }
              dataKey='adm'
              onMouseEnter={ (_, index) => {
                setActiveIndex(prevState => [index, prevState[1], prevState[2]]);
              } }
            >
              { data.map((entry, index) => (
                <Cell key={ `cell-${ index }` } fill={ powerSpentToColor(entry.type) }/>
              )) }
            </Pie>
          </PieChart>
          <PieChart width={ 550 } height={ 500 }>
            <Legend verticalAlign="top" height={ 36 } content={
              <Typography variant='h6'>
                { intl.formatMessage({ id: 'country.mana.dip' }) }
              </Typography>
            }/>
            <Pie
              activeIndex={ activeIndex[1] }
              activeShape={ props => renderActiveShape(props, total) }
              data={ data }
              innerRadius={ 90 }
              outerRadius={ 110 }
              dataKey='dip'
              onMouseEnter={ (_, index) => {
                setActiveIndex(prevState => [prevState[0], index, prevState[2]]);
              } }
            >
              { data.map((entry, index) => (
                <Cell key={ `cell-${ index }` } fill={ powerSpentToColor(entry.type) }/>
              )) }
            </Pie>
          </PieChart>
          <PieChart width={ 550 } height={ 500 }>
            <Legend verticalAlign="top" height={ 36 } content={
              <Typography variant='h6'>
                { intl.formatMessage({ id: 'country.mana.mil' }) }
              </Typography>
            }/>
            <Pie
              activeIndex={ activeIndex[2] }
              activeShape={ props => renderActiveShape(props, total) }
              data={ data }
              innerRadius={ 90 }
              outerRadius={ 110 }
              dataKey='mil'
              onMouseEnter={ (_, index) => {
                setActiveIndex(prevState => [prevState[0], prevState[1], index]);
              } }
            >
              { data.map((entry, index) => (
                <Cell key={ `cell-${ index }` } fill={ powerSpentToColor(entry.type) }/>
              )) }
            </Pie>
          </PieChart>
        </Grid>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.color' }) }</TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.type' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'country.mana.adm' }) }
                </TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.rank' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'country.mana.dip' }) }
                </TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.rank' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'country.mana.mil' }) }
                </TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.rank' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.total' }) }
                </TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.rank' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.percent' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.map(spent => (
                <TableRow key={ `${ country.tag }-mana-table-${ spent.type }` }>
                  <TableCell align='center'>
                    <div style={ {
                      width: 10,
                      height: 10,
                      backgroundColor: powerSpentToColor(spent.type),
                      margin: 'auto'
                    } }/>
                  </TableCell>
                  <TableCell style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { intl.formatMessage({ id: `country.mana.${ spent.type }` }) }
                  </TableCell>
                  <TableCell align='right'>
                    { isAdm(spent.type) && formatNumber(spent.adm) }
                  </TableCell>
                  <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { isAdm(spent.type) && getRankDisplay(getRank(save, country, c => (c.admPowerSpent && c.admPowerSpent[spent.type]) ? c.admPowerSpent[spent.type] : 0)) }
                  </TableCell>
                  <TableCell align='right'>
                    { isDip(spent.type) && formatNumber(spent.dip) }
                  </TableCell>
                  <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { isDip(spent.type) && getRankDisplay(getRank(save, country, c => (c.dipPowerSpent && c.dipPowerSpent[spent.type]) ? c.dipPowerSpent[spent.type] : 0)) }
                  </TableCell>
                  <TableCell align='right'>
                    { isMil(spent.type) && formatNumber(spent.mil) }
                  </TableCell>
                  <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { isMil(spent.type) && getRankDisplay(getRank(save, country, c => (c.milPowerSpent && c.milPowerSpent[spent.type]) ? c.milPowerSpent[spent.type] : 0)) }
                  </TableCell>
                  <TableCell align='right'>
                    { formatNumber(spent.total) }
                  </TableCell>
                  <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { getRankDisplay(getRank(save, country, c => {
                      return ((c.admPowerSpent && c.admPowerSpent[spent.type]) ? c.admPowerSpent[spent.type] : 0)
                        + ((c.dipPowerSpent && c.dipPowerSpent[spent.type]) ? c.dipPowerSpent[spent.type] : 0)
                        + ((c.milPowerSpent && c.milPowerSpent[spent.type]) ? c.milPowerSpent[spent.type] : 0);
                    })) }
                  </TableCell>
                  <TableCell align='right'>
                    { `${ formatNumber((100 * spent.total) / total) }%` }
                  </TableCell>
                </TableRow>
              )) }
              <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
                <TableCell style={ { borderBottom: 'none', color: theme.palette.primary.contrastText } }/>
                <TableCell style={ {
                  borderRight: '1px solid rgba(224, 224, 224, 1)',
                  borderBottom: 'none'
                } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'common.total' }) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(data.reduce((sum, s) => sum + (s.adm ?? 0), 0)) }
                  </Typography>
                </TableCell>
                <TableCell align='right'
                           style={ {
                             borderRight: '1px solid rgba(224, 224, 224, 1)',
                             borderBottom: 'none',
                             color: theme.palette.primary.contrastText
                           } }>
                  { getRankDisplay(getRank(save, country, c => {
                    return (c.admPowerSpent ? Object.values(c.admPowerSpent).reduce((sum, n) => sum + n, 0) : 0);
                  })) }
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(data.reduce((sum, s) => sum + (s.dip ?? 0), 0)) }
                  </Typography>
                </TableCell>
                <TableCell align='right'
                           style={ {
                             borderRight: '1px solid rgba(224, 224, 224, 1)',
                             borderBottom: 'none'
                           } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { getRankDisplay(getRank(save, country, c => {
                      return (c.dipPowerSpent ? Object.values(c.dipPowerSpent).reduce((sum, n) => sum + n, 0) : 0);
                    })) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(data.reduce((sum, s) => sum + (s.mil ?? 0), 0)) }
                  </Typography>
                </TableCell>
                <TableCell align='right'
                           style={ {
                             borderRight: '1px solid rgba(224, 224, 224, 1)',
                             borderBottom: 'none'
                           } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { getRankDisplay(getRank(save, country, c => {
                      return (c.milPowerSpent ? Object.values(c.milPowerSpent).reduce((sum, n) => sum + n, 0) : 0);
                    })) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none', color: theme.palette.primary.contrastText } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(total) }
                  </Typography>
                </TableCell>
                <TableCell align='right'
                           style={ {
                             borderRight: '1px solid rgba(224, 224, 224, 1)',
                             borderBottom: 'none'
                           } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { getRankDisplay(getRank(save, country, c => {
                      return (c.admPowerSpent ? Object.values(c.admPowerSpent).reduce((sum, n) => sum + n, 0) : 0) +
                        (c.dipPowerSpent ? Object.values(c.dipPowerSpent).reduce((sum, n) => sum + n, 0) : 0) +
                        (c.milPowerSpent ? Object.values(c.milPowerSpent).reduce((sum, n) => sum + n, 0) : 0);
                    })) }
                  </Typography>
                </TableCell>
                <TableCell style={ { borderBottom: 'none' } }/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default CountryManaTab;
