import {
    Avatar,
    GridLegacy,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { EstatePie, getEstatePie } from 'utils/chart.utils';
import { formatNumber, stringComparator } from 'utils/format.utils';
import { getEstate, getEstateImage, getPrivilege, getPrivilegesImage, getPrivilegesName } from 'utils/save.utils';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
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
        { `${ formatNumber(value) }%` }
      </text>
    </g>
  );
};

interface CountryEstateTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryEstateTab({ country, save }: CountryEstateTabProps) {
  const intl = useIntl();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [estates, setEstates] = useState<Array<EstatePie>>([]);

  useEffect(() => {
    setEstates(getEstatePie(country, save));
  }, [country, save]);

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.control' }) }
        </Typography>
        <PieChart width={ 500 } height={ 500 }>
          <Pie
            activeIndex={ activeIndex }
            activeShape={ renderActiveShape }
            data={ estates }
            innerRadius={ 100 }
            outerRadius={ 120 }
            dataKey='value'
            onMouseEnter={ (_, index) => setActiveIndex(index) }
            isAnimationActive={ false }
          >
            { estates.map((entry, index) => (
              <Cell key={ `cell-${ index }` } fill={ entry.color }/>
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
                  { intl.formatMessage({ id: 'country.control' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'country.privileges' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                estates.map(estate => (
                  <TableRow
                    key={ `row-${ estate.item ? estate.item.type : 'crown' }-${ country.tag }` }
                  >
                    <TableCell align='center'>
                      <div style={ {
                        width: 10,
                        height: 10,
                        backgroundColor: estate.color,
                        margin: 'auto'
                      } }/>
                    </TableCell>
                    <TableCell>
                      <GridLegacy container item alignItems='center'>
                        <Avatar src={ estate.item ? getEstateImage(save, estate.item.type) : '/eu4/country/crownland.png' } variant='square'/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { estate.name }
                        </Typography>
                      </GridLegacy>
                    </TableCell>
                    <TableCell align='right'>{ `${ formatNumber(estate.value) }%` }</TableCell>
                    <TableCell>
                      <GridLegacy container>
                        {
                          (estate.item && estate.item.grantedPrivileges) &&
                          (
                            estate.item.grantedPrivileges.map(value => getPrivilege(save, value))
                              .sort((a, b) => {
                                const sa = estate.item ? (getPrivilegesName(a, getEstate(save, estate.item.type))) : a.name;
                                const sb = estate.item ? (getPrivilegesName(b, getEstate(save, estate.item.type))) : b.name;

                                return stringComparator(sa, sb);
                              })
                              .map(privilege => (
                                <Tooltip title={ estate.item ? (getPrivilegesName(privilege, getEstate(save, estate.item.type))) : privilege.name }
                                         key={ `tooltip-privilege-${ privilege.name }` }>
                                  <Avatar src={ getPrivilegesImage(privilege) } variant='square' style={ { marginRight: 8, marginBottom: 8 } }/>
                                </Tooltip>
                              ))
                          )
                        }
                      </GridLegacy>
                    </TableCell>
                  </TableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default CountryEstateTab;
