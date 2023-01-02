import { FilterList, Launch } from '@mui/icons-material';
import {
  Autocomplete, Card, CardContent, ClickAwayListener, Grid, IconButton, Paper, Popper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, Typography, useTheme
} from '@mui/material';
import { intl } from 'index';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { SaveTradeNode } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { cleanString, colorToHex, formatNumber, numberComparator, round, stringComparator } from 'utils/format.utils';
import { getTradeNodeIncomingValue, getTradeNodeLocalValue, getTradeNodeOutgoingValue, getTradeNodesName, getTradeNodeValue } from 'utils/save.utils';

interface Column {
  id: string;
  label: string;
  minWidth: number;
  value: (save: MapSave, node: SaveTradeNode, width?: number) => React.ReactNode;
  comparatorValue: (save: MapSave, node: SaveTradeNode) => number | string | undefined;
  filterValues: (save: MapSave) => Array<string | number>;
  filter: ((save: MapSave, node: SaveTradeNode, filter: (string | number | undefined)[]) => boolean);
}

function getColumns(save: MapSave, columns?: Array<HTMLDivElement | null>): Column[] {
  const valueMax = save.tradeNodes ? Math.max(...save.tradeNodes.map(node => getTradeNodeValue(node))) : 0;
  const valueRadix = valueMax >= 5000 ? 1000 : valueMax >= 500 ? 100 : 100;
  const localValueMax = save.tradeNodes ? Math.max(...save.tradeNodes.map(node => getTradeNodeLocalValue(node))) : 0;
  const localValueRadix = localValueMax >= 5000 ? 1000 : localValueMax >= 500 ? 100 : 100;
  const incomingValueMax = save.tradeNodes ? Math.max(...save.tradeNodes.map(node => getTradeNodeIncomingValue(node))) : 0;
  const incomingValueRadix = incomingValueMax >= 5000 ? 1000 : incomingValueMax >= 500 ? 100 : 100;

  return [
    {
      id: 'name',
      label: intl.formatMessage({ id: 'tradeNode.name' }),
      minWidth: 170,
      value: (save, tradeNode, width) =>
        <Grid container alignItems='center' justifyContent='space-between' flexWrap='nowrap'
              style={ { width } } key={ `trade-node-name-${ tradeNode.name }` }>
          <div style={ {
            width: 10,
            height: 10,
            backgroundColor: colorToHex(tradeNode.color),
            marginRight: 4
          } }/>
          <Typography variant='body1' style={ { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }>
            { getTradeNodesName(tradeNode) }
          </Typography>
          <Grid item flexGrow={ 1 }/>
          <Link to={ `trade-node/${ tradeNode.name }` } target='_blank' rel='noopener noreferrer'>
            <Launch color='primary'/>
          </Link>
        </Grid>,
      comparatorValue: (save, node) => getTradeNodesName(node),
      filterValues: save => Array.from(new Set<string>(save.tradeNodes ? save.tradeNodes.map(node => getTradeNodesName(node)).sort(stringComparator) : [])),
      filter: (save, node, filter) => filter.includes(getTradeNodesName(node)),
    },
    {
      id: 'value',
      label: intl.formatMessage({ id: 'tradeNode.totalValue' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ formatNumber(getTradeNodeValue(node)) }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => getTradeNodeValue(node),
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => round(getTradeNodeValue(node), valueRadix)).sort(numberComparator) : [])),
      filter: (save, node, filter) => filter.includes(round(getTradeNodeValue(node), valueRadix)),
    },
    {
      id: 'local_value',
      label: intl.formatMessage({ id: 'tradeNode.localValue' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ formatNumber(getTradeNodeLocalValue(node)) }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => getTradeNodeLocalValue(node),
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => round(getTradeNodeLocalValue(node), localValueRadix)).sort(numberComparator) : [])),
      filter: (save, node, filter) => filter.includes(round(getTradeNodeLocalValue(node), localValueRadix)),
    },
    {
      id: 'incoming_value',
      label: intl.formatMessage({ id: 'tradeNode.incomingValue' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ formatNumber(getTradeNodeIncomingValue(node)) }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => getTradeNodeIncomingValue(node),
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => round(getTradeNodeIncomingValue(node), incomingValueRadix)).sort(numberComparator) : [])),
      filter: (save, node, filter) => filter.includes(round(getTradeNodeIncomingValue(node), incomingValueRadix)),
    },
    {
      id: 'outgoing_value',
      label: intl.formatMessage({ id: 'tradeNode.outGoingValue' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ formatNumber(getTradeNodeOutgoingValue(node, save)) }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => getTradeNodeOutgoingValue(node, save),
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => round(getTradeNodeOutgoingValue(node, save), incomingValueRadix)).sort(numberComparator) : [])),
      filter: (save, node, filter) => filter.includes(round(getTradeNodeOutgoingValue(node, save), incomingValueRadix)),
    },
    {
      id: 'retention',
      label: intl.formatMessage({ id: 'tradeNode.retention' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ `${formatNumber(node.retention * 100)}%` }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => node.retention,
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => round(node.retention * 100, 10)).sort(numberComparator) : [])),
      filter: (save, node, filter) => filter.includes(round(node.retention * 100, 10)),
    },
    {
      id: 'nbCountries',
      label: intl.formatMessage({ id: 'tradeNode.nbCountries' }),
      minWidth: 120,
      value: (save, node, width) =>
        <Grid style={ { width } }>
          <Typography variant='body1'>{ node.countries ? node.countries.length : 0 }</Typography>
        </Grid>
      ,
      comparatorValue: (save, node) => node.countries ? node.countries.length : 0,
      filterValues: save => Array.from(new Set<number>(save.tradeNodes ? save.tradeNodes.map(node => node.countries ? node.countries.length : 0).sort(numberComparator) : [])),
      filter: (save, node, filter) => node.countries !== undefined && filter.includes(node.countries.length),
    },
  ];
}

interface TradeNodeTableProps {
  save: MapSave;
  visible: boolean;
}

function TradeNodeTable({ save, visible }: TradeNodeTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [columns, setColumns] = useState<Column[]>([]);
  const [orderBy, setOrderBy] = useState<Column | undefined>(undefined);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [tradeNodes, setTradeNodes] = useState<SaveTradeNode[]>([]);

  const [filters, setFilters] = useState<Record<string, (string | number)[]>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false);
  const [filterPopoverLoc, setFilterPopoverLoc] = useState<number[]>([0, 0]);
  const [filterPopoverColumn, setFilterPopoverColumn] = useState<Column>(columns[0]);
  const filterPopoverDiv = useRef<HTMLDivElement>(null);

  const columnsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<FixedSizeList<SaveTradeNode[]>>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const handleSort = (column: Column) => {
    const isAsc = orderBy === undefined || (orderBy.id === column.id && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  }

  useEffect(() => {
    if (orderBy === undefined) {
      setOrderBy(columns[1]);
      setOrder('desc');
    }

    setTradeNodes(save.tradeNodes ? save.tradeNodes.filter(node => {
        if (Object.keys(filters).length === 0) {
          return true;
        }

        for (const [key, value] of Object.entries(filters)) {
          const column = columns.find(c => c.id === key);

          if (column) {
            if (!column.filter(save, node, value)) {
              return false;
            }
          }
        }

        return true;
      }).sort((a, b) => {
        let va;
        let vb;

        if (orderBy !== undefined) {
          va = orderBy.comparatorValue(save, a);
          vb = orderBy.comparatorValue(save, b);
        } else {
          const col = columns[columns.length - 1];

          if (col !== undefined) {
            va = col.comparatorValue(save, a);
            vb = col.comparatorValue(save, b);
          } else {
            return 0;
          }
        }

        if (typeof va === 'number' && typeof vb === 'number') {
          return 'asc' === order ? numberComparator(va, vb) : -numberComparator(va, vb);
        } else if (typeof va === 'string' && typeof vb === 'string') {
          return 'asc' === order ? stringComparator(va, vb) : -stringComparator(va, vb);
        } else if (va !== undefined && vb === undefined) {
          return 'asc' === order ? -1 : 1;
        } else if (va === undefined && vb !== undefined) {
          return 'asc' === order ? 1 : -1;
        }

        return 0;
      }) : []
    );

    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, [columns, filters, order, orderBy, save]);

  useEffect(() => {
    setColumns(getColumns(save, columnsRefs.current));

    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, [save]);

  const renderRow = ({ index, style }: ListChildComponentProps<SaveTradeNode[]>) => {
    const node = tradeNodes[index];

    return (
      <TableRow tabIndex={ index } key={ node.name }
                style={ { ...style, backgroundColor: index % 2 === 1 ? 'white' : theme.palette.action.focus } }>
        { columns.map((column, cIndex) => {
          return (
            <TableCell key={ column.id }
                       style={ {
                         width: columnsRefs.current[cIndex] ? (columnsRefs.current[cIndex]?.clientWidth ?? 0) : column.minWidth,
                         paddingRight: cIndex === columns.length - 1 ? 0 : 16,
                         paddingLeft: cIndex === columns.length - 1 ? 8 : 16,
                         borderBottom: 'none'
                       } }>
              { column.value(save, node, columnsRefs.current[cIndex] ? (columnsRefs.current[cIndex]?.clientWidth ?? 0) : column.minWidth) }
            </TableCell>
          );
        }) }
      </TableRow>
    );
  }

  return (
    visible ?
      <>
        <div ref={ filterPopoverDiv }
             style={ { position: 'fixed', left: filterPopoverLoc[0], top: filterPopoverLoc[1] } }/>
        {
          filterPopoverOpen && filterPopoverDiv.current &&
          (
            <ClickAwayListener onClickAway={ () => setFilterPopoverOpen(false) }>
              <Popper open
                      anchorEl={ filterPopoverDiv.current }
                      placement='bottom-start'
                      style={ { zIndex: 1500 } }
              >
                <Card style={ {
                  minWidth: 300,
                  borderColor: theme.palette.primary.main,
                  borderWidth: 1,
                  borderStyle: 'solid'
                } }>
                  <CardContent style={ { color: 'white', paddingTop: 8, paddingBottom: 8 } }>
                    <Autocomplete
                      multiple
                      disablePortal
                      options={ filterPopoverColumn.filterValues(save) }
                      getOptionLabel={ option => option.toString() }
                      groupBy={ (option) => typeof option === 'string' ? cleanString(option.slice(0, 1)).toUpperCase() : ''
                      }
                      renderInput={ (params) =>
                        <TextField { ...params }
                                   label={ filterPopoverColumn.label }
                                   variant='filled'
                                   color='primary'
                        /> }
                      value={ filters[filterPopoverColumn.id] ?? [] }
                      onChange={ (event, newInputValue) => {
                        if (!newInputValue || newInputValue.length === 0) {
                          setFilters(prevState => {
                            const newState: Record<string, (string | number) []> = {}
                            for (let key in prevState) {
                              if (key !== filterPopoverColumn.id) {
                                newState[key] = prevState[key];
                              }
                            }

                            return newState;
                          });
                        } else {
                          setFilters(prevState => ({
                            ...prevState,
                            [filterPopoverColumn.id]: newInputValue
                          }));
                        }
                      } }
                    />
                  </CardContent>
                </Card>
              </Popper>
            </ClickAwayListener>
          )
        }
        <TableContainer component={ Paper } style={ { height: `100%`, borderRadius: 0 } }>
          <Table stickyHeader style={ { width: '100%', height: `100%` } }>
            <TableHead ref={ headerRef }>
              <TableRow>
                { columns.map((column, index) => (
                  <TableCell
                    key={ column.id }
                    style={ { minWidth: column.minWidth, backgroundColor: theme.palette.primary.light } }
                  >
                    <Grid container alignItems='center' ref={ el => columnsRefs.current[index] = el }
                          style={ { flexFlow: 'nowrap' } }>
                      <IconButton
                        onClick={ (e) => {
                          setFilterPopoverLoc([e.clientX, e.clientY + 25]);
                          setFilterPopoverOpen(true);
                          setFilterPopoverColumn(column);
                        } }
                        style={ { marginRight: 4, padding: 0 } }>
                        <FilterList fontSize='small'
                                    style={ { color: filters[column.id] === undefined ? theme.palette.primary.contrastText : theme.palette.primary.main } }/>
                      </IconButton>
                      <TableSortLabel
                        active={ column.id === (orderBy && orderBy.id) }
                        direction={ column.id === (orderBy && orderBy.id) ? order : 'asc' }
                        onClick={ () => handleSort(column) }
                        sx={ {
                          '& .MuiTableSortLabel-icon': {
                            color: `${ theme.palette.primary.contrastText } !important`,
                          }
                        } }
                      >
                        <Typography variant='button' style={ { fontWeight: 'bold', color: theme.palette.primary.contrastText } }>
                          { column.label }
                        </Typography>
                      </TableSortLabel>
                    </Grid>
                  </TableCell>
                )) }
              </TableRow>
            </TableHead>
            <AutoSizer>
              { ({ height, width }) =>
                <TableBody>
                  <FixedSizeList
                    height={ height - (headerRef.current ? headerRef.current?.clientHeight : 0) }
                    itemCount={ tradeNodes.length }
                    itemSize={ 62 }
                    width={ Math.max(width, columns.reduce((s, a) => s + a.minWidth, 0)) }
                    itemData={ tradeNodes }
                    itemKey={ (index, data) => data[index].name }
                    overscanCount={ 10 }
                    ref={ listRef }
                  >
                    { renderRow }
                  </FixedSizeList>
                </TableBody>
              }
            </AutoSizer>
          </Table>
        </TableContainer>
      </>
      :
      <></>
  )
}

export default TradeNodeTable;
