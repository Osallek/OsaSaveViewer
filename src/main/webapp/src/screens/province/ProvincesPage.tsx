import { Cancel, FileDownload, FilterList, Home, Map, Search, ViewColumn } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import {
  ColumnsPanelTrigger,
  DataGridPro,
  ExportCsv,
  FilterPanelTrigger,
  gridExpandedRowCountSelector,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar as GridToolbar,
  ToolbarButton,
  useGridApiRef
} from '@mui/x-data-grid-pro';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { api } from 'api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import { Link, useParams } from 'react-router-dom';
import { SaveProvince } from 'types/api.types';
import { MapSave, ProvinceHistory } from 'types/map.types';
import { formatDate, stringComparator } from 'utils/format.utils';
import {
  convertSave,
  getAreasName,
  getAreaState,
  getBuilding,
  getBuildingsImage,
  getBuildingsName,
  getContinentsName,
  getCountries,
  getCountry,
  getCountryFlag,
  getCountryName,
  getCountrysFlag,
  getCountrysName,
  getCultureName,
  getGood,
  getGoodName,
  getGoodsImage,
  getGoodsName,
  getInstitution,
  getInstitutionsImage,
  getInstitutionsName,
  getPDev,
  getPHistory,
  getPManualDev,
  getPRealDev,
  getProvinceArea,
  getProvinceContinent,
  getProvinceRegion,
  getProvinceSuperRegion,
  getRegionsName,
  getReligion,
  getReligionName,
  getReligionsImage,
  getReligionsName,
  getSuperRegionsName,
  hasAreaDetails
} from 'utils/save.utils';

const getListImageColumn = <T, >(theme: Theme, { formatMessage }: IntlShape, type: string, max: number,
                                 valueMapper: (province: SaveProvince) => Iterable<string> | undefined,
                                 objectMapper: (s: string) => T, nameTranslation: (t: T) => string,
                                 idTranslation: (t: T) => string, values: T[],
                                 imageMapper: (t: T) => string, sortValues: boolean = true): GridColDef<SaveProvince> => {
  return {
    field: type,
    type: 'singleSelect',
    headerName: formatMessage({ id: `province.${ type }` }),
    headerAlign: 'left',
    flex: 1,
    hideSortIcons: true,
    display: 'flex',
    minWidth: max * (
      40 + Number.parseInt(theme.spacing(1))
    ) + 20,
    valueGetter: (_value, row) => valueMapper(row) ?? [],
    renderCell: ({ value }) => {
      const values: Iterable<string> = value;
      const objects = values && Array.from(values).map(v => objectMapper(v));

      if (sortValues) {
        objects.sort((a, b) => stringComparator(nameTranslation(a), nameTranslation(b)));
      }

      return objects.map(v => (
        <Tooltip title={ nameTranslation(v) } key={ `tooltip-${ type }-${ idTranslation(v) }` }>
          <Avatar src={ imageMapper(v) } variant="square" style={ { marginRight: theme.spacing(1) } } />
        </Tooltip>
      ));
    },
    valueOptions: values.map((t) => {
      return {
        value: idTranslation(t),
        label: nameTranslation(t)
      };
    }).sort((a, b) => stringComparator(a.label, b.label))
  };
};

const getFlagsColumn = (theme: Theme, intl: IntlShape, save: MapSave, type: string, max: number,
                        mapper: (history: ProvinceHistory) => Set<string> | undefined): GridColDef<SaveProvince> => {
  return getListImageColumn(
    theme,
    intl,
    type,
    max,
    province => mapper(getPHistory(province, save)),
    s => getCountry(save, s),
    getCountrysName,
    t => t.tag,
    getCountries(save),
    getCountrysFlag
  );
};

const CustomToolbar = (save: MapSave, nbFiltered: number): React.ReactElement => {
  const { formatMessage } = useIntl();
  const theme = useTheme();

  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <GridToolbar style={ { backgroundColor: theme.palette.primary.dark } }>
      <Typography variant="h6" color={ theme.palette.primary.contrastText } sx={ { flex: 1, mx: 0.5 } }>
        { formatMessage({ id: 'common.provinces' }) }
      </Typography>

      <Typography variant="body1" color={ theme.palette.primary.contrastText } sx={ { mx: 0.5 } }>
        { nbFiltered === save.provinces.length ?
          `${ formatMessage({ id: 'common.nbRows' }) }: ${ nbFiltered }`
                                               :
          `${ formatMessage({ id: 'common.nbRows' }) }: ${ nbFiltered } ${ formatMessage({ id: 'common.of' }) } ${ save.provinces.length }`
        }
      </Typography>

      <Divider
        orientation="vertical" variant="middle" flexItem sx={ { mx: 0.5, borderColor: theme.palette.primary.contrastText } }
      />

      <Tooltip title={ formatMessage({ id: 'common.columns' }) }>
        <ColumnsPanelTrigger render={ <ToolbarButton /> }>
          <ViewColumn fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Tooltip title={ formatMessage({ id: 'common.filters' }) }>
        <FilterPanelTrigger
          render={ (props, state) => (
            <ToolbarButton { ...props } color="default">
              <Badge badgeContent={ state.filterCount } color="primary" variant="dot">
                <FilterList fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
              </Badge>
            </ToolbarButton>
          ) }
        />
      </Tooltip>

      <Divider
        orientation="vertical" variant="middle" flexItem sx={ { mx: 0.5, borderColor: theme.palette.primary.contrastText } }
      />

      <Tooltip title={ formatMessage({ id: 'common.export' }) }>
        <ToolbarButton
          ref={ exportMenuTriggerRef }
          id="export-menu-trigger"
          aria-controls="export-menu"
          aria-haspopup="true"
          aria-expanded={ exportMenuOpen ? 'true' : undefined }
          onClick={ () => setExportMenuOpen(true) }
        >
          <FileDownload fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
        </ToolbarButton>
      </Tooltip>

      <Menu
        id="export-menu"
        anchorEl={ exportMenuTriggerRef.current }
        open={ exportMenuOpen }
        onClose={ () => setExportMenuOpen(false) }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
        transformOrigin={ { vertical: 'top', horizontal: 'right' } }
        slotProps={ {
          list: {
            'aria-labelledby': 'export-menu-trigger'
          }
        } }
      >
        <ExportCsv render={ <MenuItem /> } onClick={ () => setExportMenuOpen(false) } options={ { delimiter: ';' } }>
          { formatMessage({ id: 'common.downloadCsv' }) }
        </ExportCsv>
      </Menu>

      <QuickFilter>
        <QuickFilterTrigger
          render={ (triggerProps, state) => (
            <Tooltip title={ formatMessage({ id: 'common.search' }) } enterDelay={ 0 }>
              <ToolbarButton
                { ...triggerProps } style={ {
                display: state.expanded ? 'none' : 'inline-flex',
                pointerEvents: state.expanded ? 'none' : 'auto',
                transition: theme.transitions.create(['opacity']),
                gridArea: '1 / 1',
                width: 'min-content',
                height: 'min-content',
                zIndex: 1
              } } color="default" aria-disabled={ state.expanded }
              >
                <Search fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
              </ToolbarButton>
            </Tooltip>
          ) }
        />
        <QuickFilterControl
          render={ ({ ref, ...controlProps }, state) => (
            <TextField
              { ...controlProps } inputRef={ ref }
              aria-label={ formatMessage({ id: 'common.search' }) }
              placeholder={ `${ formatMessage({ id: 'common.search' }) }...` }
              size="small"
              sx={ {
                width: state.expanded ? 260 : 0,
                opacity: state.expanded ? 1 : 0,
                color: theme.palette.primary.contrastText,
                transition: theme.transitions.create(['width', 'opacity']),
                gridArea: '1 / 1',
                overflowX: 'clip',
                '& .MuiInputBase-input': {
                  color: theme.palette.primary.contrastText
                }
              } }
              slotProps={ {
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end" size="small" aria-label="Clear search" material={ { sx: { marginRight: -0.75 } } }
                      >
                        <Cancel fontSize="medium" sx={ { color: theme.palette.primary.contrastText } } />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input
                },
                ...controlProps.slotProps
              } }
            />
          ) }
        />
      </QuickFilter>
    </GridToolbar>
  );
};

export const ProvincesPage = () => {
  const { id } = useParams();
  const intl = useIntl();
  const { formatMessage } = intl;
  const theme = useTheme();
  const gridApiRef = useGridApiRef();

  const [save, setSave] = useState<MapSave>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [maxBuildings, setMaxBuildings] = useState<number>(0);
  const [maxClaims, setMaxClaims] = useState<number>(0);
  const [maxCores, setMaxCores] = useState<number>(0);
  const [maxInstitutions, setMaxInstitutions] = useState<number>(0);
  const [nbFiltered, setNbFiltered] = useState<number>(0);
  const [filterAction, setFilterAction] = React.useState<boolean>(false);
  const appbarRef = useRef<HTMLHeadElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const columns: GridColDef<SaveProvince>[] = useMemo(() => {
    if (!save) {
      return [];
    }

    const columns: GridColDef<SaveProvince>[] = [
      {
        field: 'id',
        type: 'number',
        headerName: formatMessage({ id: 'province.id' }),
        headerAlign: 'left',
        width: 60,
        hideSortIcons: true,
        resizable: false
      }, {
        field: 'name',
        headerName: formatMessage({ id: 'province.name' }),
        headerAlign: 'left',
        width: 140,
        hideSortIcons: true
      }, {
        field: 'owner',
        headerName: formatMessage({ id: 'province.owner' }),
        headerAlign: 'left',
        width: 180,
        hideSortIcons: true,
        display: 'flex',
        valueGetter: (_value, row) => {
          const history = getPHistory(row, save);

          return history.owner && getCountryName(save, history.owner);
        },
        renderCell: ({ row }) => {
          const history = getPHistory(row, save);

          return (
            history.owner &&
            <>
              <Avatar src={ getCountryFlag(save, history.owner) } variant="square" />
              <Typography variant="body1" component="span" style={ { marginLeft: theme.spacing(1) } }>
                { getCountryName(save, history.owner) }
              </Typography>
            </>
          );
        }
      }, {
        field: 'baseTax',
        type: 'number',
        headerName: formatMessage({ id: 'province.baseTax' }),
        headerAlign: 'left',
        width: 80,
        hideSortIcons: true
      }, {
        field: 'baseProduction',
        type: 'number',
        headerName: formatMessage({ id: 'province.baseProduction' }),
        headerAlign: 'left',
        width: 115,
        hideSortIcons: true
      }, {
        field: 'baseManpower',
        type: 'number',
        headerName: formatMessage({ id: 'province.baseManpower' }),
        headerAlign: 'left',
        width: 110,
        hideSortIcons: true
      }, {
        field: 'development',
        type: 'number',
        headerName: formatMessage({ id: 'province.dev' }),
        headerAlign: 'left',
        width: 145,
        hideSortIcons: true,
        valueGetter: (_value, row) => getPDev(row)
      }, {
        field: 'autonomy',
        type: 'number',
        headerName: formatMessage({ id: 'province.autonomy' }),
        headerAlign: 'left',
        width: 115,
        hideSortIcons: true,
        valueGetter: (_value, row) => row.autonomy ? row.autonomy : undefined
      }, {
        field: 'prosperity',
        type: 'number',
        headerName: formatMessage({ id: 'province.prosperity' }),
        headerAlign: 'left',
        width: 115,
        hideSortIcons: true,
        valueGetter: (_value, row) => {
          const history = getPHistory(row, save);
          const area = getProvinceArea(save, row);
          const state = getAreaState(area, history.owner);

          return state && state.prosperity;
        }
      }, {
        field: 'devastation',
        type: 'number',
        headerName: formatMessage({ id: 'province.devastation' }),
        headerAlign: 'left',
        width: 115,
        hideSortIcons: true
      }, {
        field: 'realDev',
        type: 'number',
        headerName: formatMessage({ id: 'province.realDev' }),
        headerAlign: 'left',
        width: 100,
        hideSortIcons: true,
        valueGetter: (_value, row) => getPRealDev(row)
      }, {
        field: 'manualDev',
        type: 'number',
        headerName: formatMessage({ id: 'province.manualDev' }),
        headerAlign: 'left',
        width: 120,
        hideSortIcons: true,
        valueGetter: (_value, row) => getPManualDev(row)
      }, {
        field: 'religion',
        headerName: formatMessage({ id: 'province.religion' }),
        headerAlign: 'left',
        width: 180,
        hideSortIcons: true,
        display: 'flex',
        valueGetter: (_value, row) => {
          const history = getPHistory(row, save);

          return history.religion && getReligionName(save, history.religion);
        },
        renderCell: ({ row }) => {
          const history = getPHistory(row, save);
          const religion = history.religion && getReligion(save, history.religion);

          return (
            religion &&
            <>
              <Avatar src={ getReligionsImage(religion) } variant="square" />
              <Typography variant="body1" component="span" style={ { marginLeft: theme.spacing(1) } }>
                { getReligionsName(religion) }
              </Typography>
            </>
          );
        }
      }, {
        field: 'culture',
        headerName: formatMessage({ id: 'province.culture' }),
        headerAlign: 'left',
        width: 120,
        hideSortIcons: true,
        valueGetter: (_value, row) => {
          const history = getPHistory(row, save);

          return history.culture && getCultureName(save, history.culture);
        }
      }, {
        field: 'good',
        headerName: formatMessage({ id: 'province.good' }),
        headerAlign: 'left',
        width: 200,
        hideSortIcons: true,
        display: 'flex',
        valueGetter: (_value, row) => {
          const history = getPHistory(row, save);

          return history.tradeGood && getGoodName(save, history.tradeGood);
        },
        renderCell: ({ row }) => {
          const history = getPHistory(row, save);
          const good = history.tradeGood && getGood(save, history.tradeGood);

          return (
            good &&
            <>
              <Avatar src={ getGoodsImage(good) } variant="square" />
              <Typography variant="body1" component="span" style={ { marginLeft: theme.spacing(1) } }>
                { getGoodsName(good) }
              </Typography>
            </>
          );
        }
      }, {
        field: 'hre',
        type: 'boolean',
        headerName: formatMessage({ id: 'province.hre' }),
        headerAlign: 'left',
        width: 120,
        hideSortIcons: true,
        valueGetter: (_value, row) => getPHistory(row, save).hre ?? false
      },
      getFlagsColumn(theme, intl, save, 'cores', maxCores, history => history.cores),
      getFlagsColumn(theme, intl, save, 'claims', maxClaims, history => history.claims),
      getListImageColumn(
        theme,
        intl,
        'buildings',
        maxBuildings,
        province => province.buildings ?? [],
        s => getBuilding(save, s),
        getBuildingsName,
        t => t.name,
        save.buildings,
        getBuildingsImage
      ), {
        field: 'nbBuildings',
        type: 'number',
        headerName: formatMessage({ id: 'province.nbBuildings' }),
        headerAlign: 'left',
        width: 120,
        hideSortIcons: true,
        valueGetter: (_value, row) => (
          row.buildings ?? []
        ).length
      },
      getListImageColumn(
        theme,
        intl,
        'institutions',
        maxInstitutions,
        province => province.institutions?.filter(i => i >= 100).map((_progress, index) => getInstitution(save, index).name)
          ?? [],
        s => getInstitution(save, s),
        getInstitutionsName,
        t => t.name,
        save.institutions,
        getInstitutionsImage,
        false
      )
    ];

    let index = columns.findIndex(e => e.field === 'owner') + 1;
    if (hasAreaDetails(save)) {
      columns.splice(index, 0, {
        field: 'area',
        headerName: formatMessage({ id: 'province.area' }),
        headerAlign: 'left',
        width: 120,
        hideSortIcons: true,
        valueGetter: (_value, row) => getAreasName(getProvinceArea(save, row))
      });
      index++;
    }

    if (save.regions) {
      columns.splice(index, 0, {
        field: 'region',
        headerName: formatMessage({ id: 'province.region' }),
        headerAlign: 'left',
        width: 130,
        hideSortIcons: true,
        valueGetter: (_value, row) => getRegionsName(getProvinceRegion(save, row))
      });
      index++;
    }

    if (save.superRegions) {
      columns.splice(index, 0, {
        field: 'superRegion',
        headerName: formatMessage({ id: 'province.superRegion' }),
        headerAlign: 'left',
        width: 130,
        hideSortIcons: true,
        valueGetter: (_value, row) => getSuperRegionsName(getProvinceSuperRegion(save, row))
      });
      index++;
    }

    if (save.continents) {
      columns.splice(index, 0, {
        field: 'continent',
        headerName: formatMessage({ id: 'province.continent' }),
        headerAlign: 'left',
        width: 140,
        hideSortIcons: true,
        valueGetter: (_value, row) => getContinentsName(getProvinceContinent(save, row))
      });
      index++;
    }

    return columns;
  }, [save, formatMessage, theme, intl, maxBuildings, maxCores, maxClaims, maxInstitutions]);

  useEffect(() => {
    ;(
      async () => {
        try {
          if (id) {
            const { data } = await api.save.one(id);

            setSave(convertSave(data, false));
          } else {
            setError(true);
          }
        } catch (e) {
          setError(true);
        }
      }
    )();
  }, [id]);

  useEffect(() => {
    if (save) {
      document.title = `${ save.name } - ${ formatMessage({ id: 'common.provinces' }) }`;

      setMaxBuildings(Math.max(...save.provinces.map(p => p.buildings?.length ?? 0)));
      setMaxClaims(Math.max(...save.provinces.map(p => getPHistory(p, save)).map(h => h.claims?.size ?? 0)));
      setMaxCores(Math.max(...save.provinces.map(p => getPHistory(p, save)).map(h => h.cores?.size ?? 0)));
      setMaxInstitutions(Math.max(...save.provinces.map(p => p.institutions?.filter(i => i >= 100).length ?? 0)));
      setNbFiltered(save.provinces.length);
      setLoading(false);
    }
  }, [save]);

  useEffect(() => {
    setHeight(appbarRef.current?.clientHeight ?? 0);
  }, [appbarRef.current, save, loading]);

  useEffect(() => {
    if (gridRef.current) {
      for (const div of gridRef.current.querySelectorAll('div').values()) {
        if (div.textContent?.trim() === 'MUI X Invalid license key' || div.textContent?.trim() === 'MUI X Missing license key') {
          div.style.display = 'none';
        }
      }
    }
  }, [gridRef.current]);

  useEffect(() => {
    if (gridApiRef && gridApiRef.current) {
      setNbFiltered(gridExpandedRowCountSelector(gridApiRef));
    }
  }, [filterAction]);

  return (
    <>
      { (
          error || (
            !loading && !save
          )
        ) ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }
          >
            <Typography variant="h2" color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant="h3" color={ theme.palette.primary.contrastText }>
              { formatMessage({ id: 'common.saveNotFound' }) }
            </Typography>
            <Link to="/">
              <Home fontSize="large" color="primary" />
            </Link>
          </Grid>
        ) : (
          loading || !save ?
          <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
            <CircularProgress color="primary" />
          </Backdrop>
                           :
          <>
            <AppBar ref={ appbarRef } sx={ { position: 'relative' } }>
              <Toolbar>
                <Grid container alignItems="center">
                  <Link to={ `/save/${ id }` }>
                    <Map color="secondary" />
                  </Link>
                  <Typography sx={ { ml: 2, mr: 2 } } variant="h6" component="div">
                    { `${ save.name } (${ formatDate(save.date) })` }
                  </Typography>
                </Grid>
              </Toolbar>
            </AppBar>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              size={ 12 }
              sx={ { width: '100%', height: `calc(100% - ${ height }px)` } }
            >
              <DataGridPro
                ref={ gridRef }
                apiRef={ gridApiRef }
                slots={ { toolbar: props => CustomToolbar(save, nbFiltered) } }
                showToolbar
                hideFooter
                autoPageSize
                autosizeOnMount
                autosizeOptions={ { includeHeaders: true, includeOutliers: true, columns: ['cores', 'claims'] } }
                loading={ loading }
                initialState={ { pinnedColumns: { left: ['id', 'name'] } } }
                onFilterModelChange={ () => setFilterAction(!filterAction) }
                columns={ columns }
                rows={ save.provinces }
                sx={ {
                  border: 'none',
                  borderRadius: 0
                } }
              />
            </Grid>
          </>
        ) }
    </>
  );
};