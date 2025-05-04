import { Avatar, CircularProgress, GridLegacy, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { getRankDisplay } from 'screens/country/CountryMilitaryTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getReligionsPie, ReligionPie } from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';
import { getDevReligion, getNbReligion, getProvinces, getRank, getReligionImage } from 'utils/save.utils';

const renderActiveShape = (props: any) => {
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

  const g = (
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
        { `${ formatNumber(value) } (${ formatNumber(100 * percent) })%` }
      </text>
    </g>
  );

  return g;
};

interface CountryReligionTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryReligionTab({ country, save }: CountryReligionTabProps) {
  const intl = useIntl();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [religions, setReligions] = useState<Array<ReligionPie>>([]);
  const [nbProvinces, setNbProvinces] = useState<number>(0);
  const [ranks, setRanks] = useState<Array<number>>([]);
  const [devRanks, setDevRanks] = useState<Array<number>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setReligions(getReligionsPie(country, save));
    setNbProvinces(getProvinces(country, save).length);
  }, [country, save]);

  useEffect(() => {
    setRanks(religions.map(religion => getRank(save, country, c => getNbReligion(c, save, religion.type))));
    setDevRanks(religions.map(religion => getRank(save, country, c => getDevReligion(c, save, religion.type))));
  }, [country, save, religions]);

  useEffect(() => {
    if (ranks.length > 0 && devRanks.length > 0) {
      setLoading(false);
    }
  }, [ranks, devRanks]);

  return (
    <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } } key={ `religions-${ country.tag }` }>
      <PieChart width={ 500 } height={ 500 }>
        <Pie
          activeIndex={ activeIndex }
          activeShape={ renderActiveShape }
          data={ religions }
          innerRadius={ 100 }
          outerRadius={ 120 }
          dataKey='dev'
          onMouseEnter={ (_, index) => setActiveIndex(index) }
          isAnimationActive={ false }
        >
          { religions.map((entry, index) => (
            <Cell key={ `cell-religion-${ index }` } fill={ entry.color }/>
          )) }
        </Pie>
      </PieChart>
      <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
        <Table>
          <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
            <TableRow>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.color' }) }</TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.type' }) }</TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                { intl.formatMessage({ id: 'country.nbProvinces' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>
                { intl.formatMessage({ id: 'common.rank' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>
                { intl.formatMessage({ id: 'common.percent' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                { intl.formatMessage({ id: 'country.dev' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>
                { intl.formatMessage({ id: 'common.rank' }) }
              </TableCell>
              <TableCell style={ { color: theme.palette.primary.contrastText } }>
                { intl.formatMessage({ id: 'common.percent' }) }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              religions.map((item, index) => (
                <TableRow key={ `religion-${ item.type }-${ country.tag }` } style={ { height: 73 } }>
                  <TableCell align='center'>
                    <div style={ {
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                      margin: 'auto'
                    } }/>
                  </TableCell>
                  <TableCell>
                    <GridLegacy container item alignItems='center'>
                      <Avatar src={ getReligionImage(save, item.type) } variant='square'/>
                      <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                        { item.name }
                      </Typography>
                    </GridLegacy>
                  </TableCell>
                  <TableCell align='right'>{ formatNumber(item.value) }</TableCell>
                  <TableCell align='right'>
                    { loading ? <CircularProgress color='primary' style={ { height: 30, width: 30 } }/> : getRankDisplay(ranks[index] ?? 0) }
                  </TableCell>
                  <TableCell align='right' style={ { borderRight: '1px solid rgba(224, 224, 224, 1)' } }>
                    { `${ formatNumber(item.value * 100 / nbProvinces) }%` }
                  </TableCell>
                  <TableCell align='right'>{ formatNumber(item.dev) }</TableCell>
                  <TableCell align='right'>
                    { loading ? <CircularProgress color='primary' style={ { height: 30, width: 30 } }/> : getRankDisplay(devRanks[index] ?? 0) }
                  </TableCell>
                  <TableCell align='right'>{ `${ formatNumber(item.dev * 100 / country.dev) }%` }</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </GridLegacy>
  )
}

export default CountryReligionTab;
