import { FilterList, Launch } from '@mui/icons-material';
import {
    Autocomplete,
    Avatar,
    Card,
    CardContent,
    Checkbox,
    ClickAwayListener,
    FormControlLabel,
    GridLegacy,
    IconButton,
    Paper,
    Popper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { intl } from 'index';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { SaveWar } from 'types/api.types';
import { MapSave } from 'types/map.types';
import {
    cleanString,
    formatDate,
    formatDuration,
    formatNumber,
    numberComparator,
    round,
    stringComparator
} from 'utils/format.utils';
import {
    getCountries,
    getCountry,
    getCountryName,
    getCountrysFlag,
    getCountrysName,
    getWarLosses
} from 'utils/save.utils';

const onlyPlayers = 'onlyPlayers';

interface Column {
  id: string;
  label: string;
  minWidth: number;
  value: (save: MapSave, war: SaveWar, width?: number) => React.ReactNode;
  comparatorValue: (save: MapSave, war: SaveWar) => number | string | undefined;
  filterValues: (save: MapSave) => Array<string | number>;
  filter: ((save: MapSave, war: SaveWar, filter: (string | number | undefined)[]) => boolean);
}

function getColumns(save: MapSave, columns?: Array<HTMLDivElement | null>): Column[] {
  const lossesMax = save.wars ? Math.max(...save.wars.map(war => getWarLosses(war))) : 0;
  const lossesRadix = lossesMax >= 500000 ? 100000 : lossesMax >= 50000 ? 10000 : 1000;

  return [
    {
      id: 'name',
      label: intl.formatMessage({ id: 'war.name' }),
      minWidth: 170,
      value: (save, war, width) =>
        <GridLegacy container alignItems="center" justifyContent="space-between" flexWrap="nowrap"
                    style={ { width } } key={ `war-name-${ war.id }` }>
          <Tooltip title={ war.name }>
            <Typography variant="body1" style={ {
              whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
            } }>{ war.name }</Typography>
          </Tooltip>
          <GridLegacy item flexGrow={ 1 }/>
          <Link to={ `war/${ war.id }` } target="_blank" rel="noopener noreferrer">
            <Launch color="primary"/>
          </Link>
        </GridLegacy>,
      comparatorValue: (save, war) => war.name,
      filterValues: save => Array.from(
        new Set<string>(save.wars ? save.wars.map(p => p.name).sort(stringComparator) : [])),
      filter: (save, war, filter) => filter.includes(war.name),
    },
    {
      id: 'attackers',
      label: intl.formatMessage({ id: 'war.attackers' }),
      minWidth: 150,
      value: (save, war, width) =>
        <GridLegacy container alignItems="center" style={ { width } }>
          {
            Object.keys(war.attackers).map(tag => getCountry(save, tag))
                  .map(value => (
                    <Tooltip title={ getCountrysName(value) } key={ `tooltip-attacker-${ value.tag }` }>
                      <Avatar src={ getCountrysFlag(value) } variant="square"
                              style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                    </Tooltip>
                  ))
          }
        </GridLegacy>,
      comparatorValue: (save, war) => Object.keys(war.attackers).length,
      filterValues: save => Array.from(
        new Set<string>(getCountries(save).map(c => getCountrysName(c)).sort(stringComparator))),
      filter: (save, war, filter) => Object.keys(war.attackers).map(attacker => getCountryName(save, attacker)).find(
        name => filter.includes(name)) !== undefined,
    },
    {
      id: 'defenders',
      label: intl.formatMessage({ id: 'war.defenders' }),
      minWidth: 150,
      value: (save, war, width) =>
        <GridLegacy container alignItems="center" style={ { width } }>
          {
            Object.keys(war.defenders).map(tag => getCountry(save, tag))
                  .map(value => (
                    <Tooltip title={ getCountrysName(value) } key={ `tooltip-attacker-${ value.tag }` }>
                      <Avatar src={ getCountrysFlag(value) } variant="square"
                              style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                    </Tooltip>
                  ))
          }
        </GridLegacy>,
      comparatorValue: (save, war) => Object.keys(war.defenders).length,
      filterValues: save => Array.from(
        new Set<string>(getCountries(save).map(c => getCountrysName(c)).sort(stringComparator))),
      filter: (save, war, filter) => Object.keys(war.defenders).map(attacker => getCountryName(save, attacker)).find(
        name => filter.includes(name)) !== undefined,
    },
    {
      id: 'startDate',
      label: intl.formatMessage({ id: 'war.startDate' }),
      minWidth: 100,
      value: (save, war, width) =>
        <GridLegacy style={ { width } }>
          <Typography variant="body1">
            { formatDate(war.startDate) }
          </Typography>
        </GridLegacy>,
      comparatorValue: (save, war) => war.startDate,
      filterValues: save => Array.from(new Set<number>(
        save.wars ? save.wars.map(war => Number(war.startDate.slice(0, 4))).sort(numberComparator) : [])),
      filter: (save, war, filter) => filter.includes(Number(war.startDate.slice(0, 4))),
    },
    {
      id: 'endDate',
      label: intl.formatMessage({ id: 'war.endDate' }),
      minWidth: 100,
      value: (save, war, width) =>
        <GridLegacy style={ { width } }>
          <Typography variant="body1">
            { formatDate(war.endDate) }
          </Typography>
        </GridLegacy>,
      comparatorValue: (save, war) => war.endDate,
      filterValues: save => Array.from(new Set<number>(
        save.wars ? save.wars.map(war => war.endDate)
                        .filter(value => value !== undefined)
                        .map(endDate => endDate ? Number(endDate.slice(0, 4)) : 0)
                        .sort(
                          numberComparator) : [])),
      filter: (save, war, filter) => war.endDate !== undefined && filter.includes(Number(war.endDate.slice(0, 4))),
    },
    {
      id: 'duration',
      label: intl.formatMessage({ id: 'war.duration' }),
      minWidth: 120,
      value: (save, war, width) =>
        <GridLegacy style={ { width } }>
          <Typography variant="body1">
            { formatDuration(war.duration) }
          </Typography>
        </GridLegacy>,
      comparatorValue: (save, war) => war.duration ?? 0,
      filterValues: save => Array.from(new Set<number>(
        save.wars ? save.wars.map(war => war.duration)
                        .filter(value => value !== undefined)
                        .map(duration => ((duration ?? 0) / 12) | 0)
                        .sort(
                          numberComparator) : [])),
      filter: (save, war, filter) => war.duration !== undefined && filter.includes((war.duration / 12) | 0),
    },
    {
      id: 'losses',
      label: intl.formatMessage({ id: 'war.losses' }),
      minWidth: 120,
      value: (save, war, width) =>
        <GridLegacy style={ { width } }>
          <Typography variant="body1">{ formatNumber(getWarLosses(war)) }</Typography>
        </GridLegacy>
      ,
      comparatorValue: (save, war) => getWarLosses(war),
      filterValues: save => Array.from(new Set<number>(
        save.wars ? save.wars.map(war => round(getWarLosses(war), lossesRadix)).sort(numberComparator) : [])),
      filter: (save, war, filter) => filter.includes(round(getWarLosses(war), lossesRadix)),
    },
  ];
}

interface WarTableProps {
  save: MapSave;
  visible: boolean;
}

function WarTable({ save, visible }: WarTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [columns, setColumns] = useState<Column[]>([]);
  const [orderBy, setOrderBy] = useState<Column | undefined>(undefined);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [wars, setWars] = useState<SaveWar[]>([]);

  const [filters, setFilters] = useState<Record<string, (string | number)[]>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false);
  const [filterPopoverLoc, setFilterPopoverLoc] = useState<number[]>([0, 0]);
  const [filterPopoverColumn, setFilterPopoverColumn] = useState<Column>(columns[0]);
  const filterPopoverDiv = useRef<HTMLDivElement>(null);

  const columnsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<VariableSizeList<SaveWar[]>>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const handleSort = (column: Column) => {
    const isAsc = orderBy === undefined || (orderBy.id === column.id && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  if (Object.keys(filters).length > 0) {
    for (const key of Object.keys(filters)) {
      if (key !== onlyPlayers && !columns.map(value => value.id).includes(key)) {
        delete filters[key];
      }
    }
  }

  useEffect(() => {
    if (orderBy === undefined) {
      setOrderBy(columns[columns.length - 1]);
      setOrder('asc');
    }

    setWars(save.wars ? save.wars.filter(war => {
        if (Object.keys(filters).length === 0) {
          return true;
        }

        for (const [key, value] of Object.entries(filters)) {
          if (key === onlyPlayers && Object.keys(war.attackers)
                                           .find(country => getCountry(save, country).players !== undefined) === undefined
            && Object.keys(war.defenders)
                     .find(country => getCountry(save, country).players !== undefined) === undefined) {
            return false;
          } else {
            const column = columns.find(c => c.id === key);

            if (column) {
              if (!column.filter(save, war, value)) {
                return false;
              }
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
      listRef.current.resetAfterIndex(0);
    }
  }, [columns, filters, order, orderBy, save]);

  useEffect(() => {
    columnsRefs.current = columnsRefs.current.slice(0, columns.length);
  }, [columns]);

  useEffect(() => {
    setColumns(getColumns(save, columnsRefs.current));

    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, [save]);

  useEffect(() => {
    setOrderBy(columns[3]);
    setOrder('desc');
  }, [columns]);

  const rowHeight = (index: number, width: number, wars: SaveWar[]): number => {
    const war = wars[index];

    if (!war) {
      return 75;
    }

    let attackersWidth = 0;
    if (columnsRefs.current && columnsRefs.current[1]) {
      attackersWidth = columnsRefs.current[1]?.clientWidth ?? 0;
    }

    const attackersHeight = 75 + 48 * Math.floor((48 * (Object.keys(war.attackers).length)) / attackersWidth);

    let defendersWidth = 0;
    if (columnsRefs.current && columnsRefs.current[2]) {
      defendersWidth = columnsRefs.current[2]?.clientWidth ?? 0;
    }

    const defendersHeight = 75 + 48 * Math.floor((48 * (Object.keys(war.defenders).length)) / defendersWidth);

    return Math.max(attackersHeight, defendersHeight);
  };

  const renderRow = ({ index, style }: ListChildComponentProps<SaveWar[]>) => {
    const war = wars[index];

    return (
      <TableRow tabIndex={ index } key={ war.id }
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
              { column.value(save, war,
                columnsRefs.current[cIndex] ? (columnsRefs.current[cIndex]?.clientWidth ?? 0) : column.minWidth) }
            </TableCell>
          );
        }) }
      </TableRow>
    );
  };

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
                      placement="bottom-start"
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
                      groupBy={ (option) => typeof option === 'string' ? cleanString(option.slice(0, 1))
                        .toUpperCase() : ''
                      }
                      renderInput={ (params) =>
                        <TextField { ...params }
                                   label={ filterPopoverColumn.label }
                                   variant="filled"
                                   color="primary"
                        /> }
                      value={ filters[filterPopoverColumn.id] ?? [] }
                      onChange={ (event, newInputValue) => {
                        if (!newInputValue || newInputValue.length === 0) {
                          setFilters(prevState => {
                            const newState: Record<string, (string | number) []> = {};
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
        <GridLegacy>
          <FormControlLabel
            control={
              <Checkbox checked={ Object.keys(filters).includes(onlyPlayers) }
                        onChange={ (event, checked) => {
                          if (!checked) {
                            setFilters(prevState => {
                              const newState: Record<string, (string | number) []> = {};
                              for (let key in prevState) {
                                if (key !== onlyPlayers) {
                                  newState[key] = prevState[key];
                                }
                              }

                              return newState;
                            });
                          } else {
                            setFilters(prevState => ({
                              ...prevState,
                              [onlyPlayers]: ['true']
                            }));
                          }
                        } }/>
            }
            label={ intl.formatMessage({ id: 'war.onlyPlayers' }) }
            style={ { padding: 8 } }/>
        </GridLegacy>
        <TableContainer component={ Paper } style={ { height: `100%`, borderRadius: 0 } }>
          <Table stickyHeader style={ { width: '100%', height: `100%` } }>
            <TableHead ref={ headerRef }>
              <TableRow>
                { columns.map((column, index) => (
                  <TableCell
                    key={ column.id }
                    style={ { minWidth: column.minWidth, backgroundColor: theme.palette.primary.light } }
                  >
                    <GridLegacy container alignItems="center" ref={ el => {columnsRefs.current[index] = el;} }
                                style={ { flexFlow: 'nowrap' } }>
                      <IconButton
                        onClick={ (e) => {
                          setFilterPopoverLoc([e.clientX, e.clientY + 25]);
                          setFilterPopoverOpen(true);
                          setFilterPopoverColumn(column);
                        } }
                        style={ { marginRight: 4, padding: 0 } }>
                        <FilterList fontSize="small"
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
                        <Typography variant="button"
                                    style={ { fontWeight: 'bold', color: theme.palette.primary.contrastText } }>
                          { column.label }
                        </Typography>
                      </TableSortLabel>
                    </GridLegacy>
                  </TableCell>
                )) }
              </TableRow>
            </TableHead>
            <AutoSizer>
              { ({ height, width }) =>
                <TableBody>
                  <VariableSizeList
                    height={ height ?? 0 - (headerRef.current ? headerRef.current?.clientHeight : 0) }
                    itemCount={ wars.length }
                    estimatedItemSize={ 72 }
                    itemSize={ index => rowHeight(index, width ?? 0, wars) }
                    width={ Math.max(width ?? 0, columns.reduce((s, a) => s + a.minWidth, 0)) }
                    itemData={ wars }
                    itemKey={ (index, data) => data[index].id }
                    overscanCount={ 10 }
                    ref={ listRef }
                  >
                    { renderRow }
                  </VariableSizeList>
                </TableBody>
              }
            </AutoSizer>
          </Table>
        </TableContainer>
      </>
      :
      <></>
  );
}

export default WarTable;
