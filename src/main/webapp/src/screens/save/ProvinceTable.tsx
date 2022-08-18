import { FilterList } from '@mui/icons-material';
import {
  Autocomplete, Avatar, Card, CardContent, ClickAwayListener, Grid, IconButton, Paper, Popper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, Tooltip, Typography, useTheme
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { ProvinceTableType } from 'screens/save/SaveDialog';
import { SaveProvince } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { cleanString, formatNumber, numberComparator, stringComparator } from 'utils/format.utils';
import {
  fakeTag, getBuilding, getBuildingName, getBuildingsImage, getBuildingsName, getCountries, getCountryFlag, getCountryName, getCountrysName, getCultureName,
  getCulturesName, getGoodImage, getGoodName, getGoodsName, getPDev, getPHistory, getPRealDev, getReligionImage, getReligionName, getReligionsName
} from 'utils/save.utils';

interface Column {
  id: string;
  label: string;
  minWidth: number;
  value: (province: SaveProvince) => React.ReactNode;
  comparatorValue: (province: SaveProvince) => number | string | undefined;
  filterValues: Array<string | number>;
  filter: ((province: SaveProvince, filter: (string | number | undefined)[]) => boolean);
}

interface ProvinceTableProps {
  save: MapSave;
  type: ProvinceTableType;
  visible: boolean;
}

function ProvinceTable({ save, type, visible }: ProvinceTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const devColumns: readonly Column[] = [
    {
      id: 'id',
      label: intl.formatMessage({ id: 'province.id' }),
      minWidth: 100,
      value: province => <Typography variant='body1'>{ province.id }</Typography>,
      comparatorValue: province => province.id,
      filterValues: Array.from(new Set<number>(save.provinces.map(p => p.id).sort(numberComparator))),
      filter: (province, filter) => filter.includes(province.id),
    },
    {
      id: 'name',
      label: intl.formatMessage({ id: 'province.name' }),
      minWidth: 170,
      value: province => <Typography variant='body1'>{ province.name }</Typography>,
      comparatorValue: province => province.name,
      filterValues: Array.from(new Set<string>(save.provinces.map(p => p.name).sort(stringComparator))),
      filter: (province, filter) => filter.includes(province.name),
    },
    {
      id: 'admdev',
      label: intl.formatMessage({ id: 'province.baseTax' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>{ province.baseTax ?? 0 }</Typography>,
      comparatorValue: province => province.baseTax ?? 0,
      filterValues: Array.from(new Set<number>(save.provinces.map(p => (p.baseTax ?? 0)).sort(numberComparator))),
      filter: (province, filter) => filter.includes(province.baseTax ?? 0),
    },
    {
      id: 'dipdev',
      label: intl.formatMessage({ id: 'province.baseProduction' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>{ formatNumber(province.baseProduction ?? 0) }</Typography>,
      comparatorValue: province => province.baseProduction ?? 0,
      filterValues: Array.from(new Set<number>(save.provinces.map(p => (p.baseProduction ?? 0) | 0).sort(numberComparator))),
      filter: (province, filter) => filter.includes((province.baseProduction ?? 0) | 0),
    },
    {
      id: 'mildev',
      label: intl.formatMessage({ id: 'province.baseManpower' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>{ province.baseManpower ?? 0 }</Typography>,
      comparatorValue: province => province.baseManpower ?? 0,
      filterValues: Array.from(new Set<number>(save.provinces.map(p => (p.baseManpower ?? 0)).sort(numberComparator))),
      filter: (province, filter) => filter.includes(province.baseManpower ?? 0),
    },
    {
      id: 'dev',
      label: intl.formatMessage({ id: 'province.dev' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>
        { formatNumber(getPDev(province)) }
      </Typography>,
      comparatorValue: province => getPDev(province),
      filterValues: Array.from(new Set<number>(save.provinces.map(province => getPDev(province) | 0).sort(numberComparator))),
      filter: (province, filter) => filter.includes(getPDev(province) | 0),
    },
    {
      id: 'realdev',
      label: intl.formatMessage({ id: 'province.realDev' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>
        { formatNumber(getPRealDev(province)) }
      </Typography>,
      comparatorValue: province => getPRealDev(province),
      filterValues: Array.from(new Set<number>(save.provinces.map(province => getPRealDev(province) | 0).sort(numberComparator))),
      filter: (province, filter) => filter.includes(getPRealDev(province) | 0),
    },
    {
      id: 'manualdev',
      label: intl.formatMessage({ id: 'province.manualDev' }),
      minWidth: 100,
      value: province => <Typography variant='body1' align='center'>
        { province.improvements ? Object.values(province.improvements).reduce((s, a) => s + a, 0) : 0 }
      </Typography>,
      comparatorValue: province => province.improvements ? Object.values(province.improvements).reduce((s, a) => s + a, 0) : 0,
      filterValues: Array.from(new Set<number>(save.provinces
        .map(p => (p.improvements ? Object.values(p.improvements).reduce((s, a) => s + a, 0) : 0))
        .sort(numberComparator))),
      filter: (province, filter) => filter.includes(province.improvements ? Object.values(province.improvements).reduce((s, a) => s + a, 0) : 0),
    }
  ];

  const infoColumns: readonly Column[] = [
    {
      id: 'id',
      label: intl.formatMessage({ id: 'province.id' }),
      minWidth: 100,
      value: province => <Typography variant='body1'>{ province.id }</Typography>,
      comparatorValue: province => province.id,
      filterValues: Array.from(new Set<number>(save.provinces.map(p => p.id).sort(numberComparator))),
      filter: (province, filter) => filter.includes(province.id),
    },
    {
      id: 'name',
      label: intl.formatMessage({ id: 'province.name' }),
      minWidth: 170,
      value: province => <Typography variant='body1'>{ province.name }</Typography>,
      comparatorValue: province => province.name,
      filterValues: Array.from(new Set<string>(save.provinces.map(p => p.name).sort(stringComparator))),
      filter: (province, filter) => filter.includes(province.name),
    },
    {
      id: 'owner',
      label: intl.formatMessage({ id: 'province.owner' }),
      minWidth: 170,
      value: province => {
        const h = getPHistory(province, save);

        if (h.owner) {
          return (
            <Grid container alignItems='center' flexWrap='nowrap'>
              <Avatar src={ getCountryFlag(save, h.owner) } variant='square' component={ Paper }/>
              <Typography variant='body1' component='span' style={ { marginLeft: 8, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }>
                { getCountryName(save, h.owner) }
              </Typography>
            </Grid>
          );
        } else {
          return (<></>);
        }
      },
      comparatorValue: province => getCountryName(save, getPHistory(province, save).owner),
      filterValues: Array.from(new Set<string>(getCountries(save).filter(c => c.alive).filter(c => c.tag !== fakeTag).map(c => getCountrysName(c)).sort(stringComparator))),
      filter: (province, filter) => filter.includes(getCountryName(save, getPHistory(province, save).owner)),
    },
    {
      id: 'religion',
      label: intl.formatMessage({ id: 'province.religion' }),
      minWidth: 170,
      value: province => {
        const h = getPHistory(province, save);

        if (h.religion) {
          return (
            <Grid container alignItems='center' flexWrap='nowrap'>
              <Avatar src={ getReligionImage(save, h.religion) } variant='square'/>
              <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                { getReligionName(save, h.religion) }
              </Typography>
            </Grid>
          );
        } else {
          return (<></>);
        }
      },
      comparatorValue: province => getReligionName(save, getPHistory(province, save).religion),
      filterValues: Array.from(new Set<string>(save.religions.map(g => getReligionsName(g)).sort(stringComparator))),
      filter: (province, filter) => filter.includes(getReligionName(save, getPHistory(province, save).religion)),
    },
    {
      id: 'culture',
      label: intl.formatMessage({ id: 'province.culture' }),
      minWidth: 150,
      value: province => {
        const h = getPHistory(province, save);

        if (h.culture) {
          return (
            <Typography variant='body1'>{ getCultureName(save, h.culture) }</Typography>
          );
        } else {
          return (<></>);
        }
      },
      comparatorValue: province => getCultureName(save, getPHistory(province, save).culture),
      filterValues: Array.from(new Set<string>(save.cultures.map(c => getCulturesName(c)).sort(stringComparator))),
      filter: (province, filter) => filter.includes(getCultureName(save, getPHistory(province, save).culture)),
    },
    {
      id: 'good',
      label: intl.formatMessage({ id: 'province.good' }),
      minWidth: 200,
      value: province => {
        const h = getPHistory(province, save);

        if (h.tradeGood) {
          return (
            <Grid container alignItems='center' flexWrap='nowrap'>
              <Avatar src={ getGoodImage(save, h.tradeGood) } variant='square'/>
              <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                { getGoodName(save, h.tradeGood) }
              </Typography>
            </Grid>
          );
        } else {
          return (<></>);
        }
      },
      comparatorValue: province => getGoodName(save, getPHistory(province, save).tradeGood),
      filterValues: Array.from(new Set<string>(save.tradeGoods.map(g => getGoodsName(g)).sort(stringComparator))),
      filter: (province, filter) => filter.includes(getGoodName(save, getPHistory(province, save).tradeGood)),
    },
    {
      id: 'buildings',
      label: intl.formatMessage({ id: 'province.buildings' }),
      minWidth: 150,
      value: province => (
        <Grid container alignItems='center'>
          {
            province.buildings &&
            province.buildings.map(value => getBuilding(save, value))
              .sort((a, b) => stringComparator(getBuildingsName(a), getBuildingsName(b)))
              .map(value => (
                <Tooltip title={ getBuildingsName(value) } key={ `tooltip-building-${ value.name }` }>
                  <Avatar src={ getBuildingsImage(value) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                </Tooltip>
              ))
          }
        </Grid>
      ),
      comparatorValue: province => province.buildings ? province.buildings.length : 0,
      filterValues: Array.from(new Set<string>(save.buildings.filter(b => b.localisations).map(b => getBuildingsName(b)).sort(stringComparator))),
      filter: (province, filter) => {
        if (filter === undefined || filter.length === 0) {
          return true;
        }

        if (province.buildings === undefined || province.buildings.length === 0) {
          return false;
        }

        return filter.find(value => typeof value === 'string' && province.buildings?.map(b => getBuildingName(save, b)).includes(value)) !== undefined;
      },
    },
  ];

  const columns: readonly Column[] = ProvinceTableType.INFO === type ? infoColumns : devColumns;
  const [orderBy, setOrderBy] = useState<Column>(columns[0]);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const [filters, setFilters] = useState<Record<string, (string | number)[]>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false);
  const [filterPopoverLoc, setFilterPopoverLoc] = useState<number[]>([0, 0]);
  const [filterPopoverColumn, setFilterPopoverColumn] = useState<Column>(columns[0]);
  const filterPopoverDiv = useRef<HTMLDivElement>(null);

  const columnsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<VariableSizeList<SaveProvince[]>>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const handleSort = (column: Column) => {
    const isAsc = orderBy.id === column.id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  }

  if (Object.keys(filters).length > 0) {
    for (const key of Object.keys(filters)) {
      if (!columns.map(value => value.id).includes(key)) {
        delete filters[key];
      }
    }
  }

  const provinces = save.provinces.filter(province => {
    if (Object.keys(filters).length === 0) {
      return true;
    }

    for (const [key, value] of Object.entries(filters)) {
      const column = columns.find(c => c.id === key);

      if (column) {
        if (!column.filter(province, value)) {
          return false;
        }
      }
    }

    return true;
  }).sort((a, b) => {
    const va = orderBy.comparatorValue(a);
    const vb = orderBy.comparatorValue(b);

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
  });

  useEffect(() => {
    columnsRefs.current = columnsRefs.current.slice(0, columns.length);
  }, [columns]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [columns, type]);

  const renderRow = ({ index, style }: ListChildComponentProps<SaveProvince[]>) => {
    const province = provinces[index];

    return (
      <TableRow hover role="checkbox" tabIndex={ -1 } key={ province.id }
                style={ { ...style, backgroundColor: index % 2 === 1 ? 'white' : theme.palette.action.focus } }>
        { columns.map((column, cIndex) => {
          return (
            <TableCell key={ column.id }
                       style={ {
                         minWidth: columnsRefs.current[cIndex] ? columnsRefs.current[cIndex]?.clientWidth : column.minWidth,
                         paddingRight: cIndex === columns.length - 1 ? 0 : 16,
                         paddingLeft: cIndex === columns.length - 1 ? 8 : 16,
                         borderBottom: 'none'
                       } }>
              { column.value(province) }
            </TableCell>
          );
        }) }
      </TableRow>
    );
  }

  const rowHeight = (index: number, width: number, type: ProvinceTableType, provinces: SaveProvince[]): number => {
    if (ProvinceTableType.DEV === type) {
      return 52;
    }

    const province = provinces[index];

    if (!province.buildings || province.buildings.length === 0) {
      return 80;
    }

    let w = 0;
    if (columnsRefs.current && columnsRefs.current[columns.length - 1]) {
      w = columnsRefs.current[columns.length - 1]?.clientWidth ?? 0;
    }

    return 75 + 48 * Math.floor((48 * (province.buildings ? province.buildings.length : 0)) / w);
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
                      options={ filterPopoverColumn.filterValues }
                      getOptionLabel={ option => option.toString() }
                      groupBy={ (option) => typeof option === 'string' ? cleanString(option.slice(0, 1)).toUpperCase() : '' }
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
        <TableContainer component={ Paper } style={ { height: '100%', borderRadius: 0 } }>
          <Table style={ { width: '100%', height: '100%' } }>
            <TableHead ref={ headerRef }>
              <TableRow>
                { columns.map((column, index) => (
                  <TableCell
                    key={ column.id }
                    style={ { minWidth: column.minWidth, backgroundColor: theme.palette.primary.light } }
                  >
                    <Grid container alignItems='center' ref={ el => columnsRefs.current[index] = el }>
                      <IconButton
                        onClick={ (e) => {
                          setFilterPopoverLoc([e.clientX, e.clientY + 25]);
                          setFilterPopoverOpen(true);
                          setFilterPopoverColumn(column);
                        } }
                        style={ { marginRight: 4, padding: 1 } }>
                        <FilterList fontSize='small'
                                    style={ { color: filters[column.id] === undefined ? theme.palette.primary.main : 'black' } }/>
                      </IconButton>
                      <TableSortLabel
                        active={ orderBy.id === column.id }
                        direction={ orderBy.id === column.id ? order : 'asc' }
                        onClick={ () => handleSort(column) }
                      >
                        <Typography variant='button' style={ { fontWeight: 'bold' } }>{ column.label }</Typography>
                      </TableSortLabel>
                    </Grid>
                  </TableCell>
                )) }
              </TableRow>
            </TableHead>
            <AutoSizer>
              { ({ height, width }) => (
                <TableBody>
                  <VariableSizeList
                    height={ height - (headerRef.current ? headerRef.current?.clientHeight : 0) - 1 }
                    itemCount={ provinces.length }
                    estimatedItemSize={ ProvinceTableType.DEV === type ? 52 : 75 }
                    itemSize={ index => rowHeight(index, width, type, provinces) }
                    width={ Math.max(width, columns.reduce((s, a) => s + a.minWidth, 0)) }
                    itemData={ provinces }
                    itemKey={ (index, data) => data[index].id }
                    overscanCount={ 10 }
                    ref={ listRef }
                  >
                    { renderRow }
                  </VariableSizeList>
                </TableBody>
              ) }
            </AutoSizer>
          </Table>
        </TableContainer>
      </>
      :
      <></>
  )
}

export default ProvinceTable;
