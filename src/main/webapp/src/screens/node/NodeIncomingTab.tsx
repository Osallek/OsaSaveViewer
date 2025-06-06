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
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import theme from 'theme';
import { SaveTradeNode } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getNodeIncomingPie, NodeIncomingPie } from 'utils/chart.utils';
import { formatNumber } from 'utils/format.utils';

const renderActiveShape = (props: any, total: number, save: MapSave) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={ cx } y={ cy } dy={ 8 } textAnchor="middle" fill={ fill }>
        <tspan x={ cx } dy="-0.1cm">{ payload.name }</tspan>
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

interface NodeIncomingTabProps {
  node: SaveTradeNode;
  save: MapSave;
}

function NodeIncomingTab({ node, save }: NodeIncomingTabProps) {
  const intl = useIntl();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [incoming, setIncoming] = useState<Array<NodeIncomingPie>>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setIncoming(getNodeIncomingPie(node, save));
    setTotal(node.incoming.reduce((s, d) => s + (d.value ?? 0), 0));
  }, [node, save]);

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
        <PieChart width={ 500 } height={ 500 }>
          <Pie
            activeIndex={ activeIndex }
            activeShape={ (props: any) => renderActiveShape(props, total, save) }
            data={ incoming }
            innerRadius={ 100 }
            outerRadius={ 120 }
            dataKey='value'
            onMouseEnter={ (_, index) => setActiveIndex(index) }
            isAnimationActive={ false }
          >
            { incoming.map((entry, index) => (
              <Cell key={ `cell-${ index }` } fill={ entry.color }/>
            )) }
          </Pie>
        </PieChart>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.color' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'tradeNode.incoming' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'tradeNode.value' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'tradeNode.added' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                incoming.map(incoming => (
                  <TableRow key={ `row-${ incoming.node.name }` }>
                    <TableCell align='center'>
                      <div style={ {
                        width: 10,
                        height: 10,
                        backgroundColor: incoming.color,
                        margin: 'auto'
                      } }/>
                    </TableCell>
                    <TableCell>
                      <GridLegacy container item alignItems='center'>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { incoming.name }
                          {
                            !incoming.item.from &&
                            ` (${ intl.formatMessage({ id: 'tradeNode.localValue' }) })`
                          }
                        </Typography>
                      </GridLegacy>
                    </TableCell>
                    <TableCell align='right'>
                      <GridLegacy item alignItems='center' style={ { display: 'flex', paddingLeft: 8 } }>
                        <Typography variant='body1' align='right' width='100%'>
                          { formatNumber(incoming.value) }
                        </Typography>
                        <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                      </GridLegacy>
                    </TableCell>
                    <TableCell align='right'>
                      <GridLegacy item alignItems='center' style={ { display: 'flex', paddingLeft: 8 } }>
                        <Typography variant='body1' align='right' width='100%'>
                          { formatNumber(incoming.item.added) }
                        </Typography>
                        <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                      </GridLegacy>
                    </TableCell>
                  </TableRow>
                )) }
              <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
                <TableCell colSpan={ 2 } align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'common.total' }) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <GridLegacy item alignItems='center' style={ { display: 'flex', paddingLeft: 8 } }>
                    <Typography variant='body1' align='right' width='100%' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                      { formatNumber(total) }
                    </Typography>
                    <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                  </GridLegacy>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <GridLegacy item alignItems='center' style={ { display: 'flex', paddingLeft: 8 } }>
                    <Typography variant='body1' align='right' width='100%' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                      { formatNumber(node.incoming.reduce((s, d) => s + (d.added ?? 0), 0)) }
                    </Typography>
                    <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                  </GridLegacy>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default NodeIncomingTab;
