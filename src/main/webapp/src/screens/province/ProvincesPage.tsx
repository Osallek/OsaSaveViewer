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
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar as GridToolbar,
  ToolbarButton
} from '@mui/x-data-grid-pro';
import { api } from 'api';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { MapSave } from 'types/map.types';
import { formatDate } from 'utils/format.utils';
import {
  convertSave,
  getCountryFlag,
  getCountryName,
  getCultureName,
  getGood,
  getGoodName,
  getGoodsImage,
  getGoodsName,
  getPDev,
  getPHistory,
  getPManualDev,
  getPRealDev,
  getReligion,
  getReligionName,
  getReligionsImage,
  getReligionsName
} from 'utils/save.utils';

const CustomToolbar = (): React.ReactElement => {
  const { formatMessage } = useIntl();
  const theme = useTheme();

  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <GridToolbar style={ { backgroundColor: theme.palette.primary.dark } }>
      <Typography variant="h6" color={ theme.palette.primary.contrastText } sx={ { flex: 1, mx: 0.5 } }>
        { formatMessage({ id: 'common.provinces' }) }
      </Typography>

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
  const { formatMessage } = useIntl();
  const theme = useTheme();

  const [save, setSave] = useState<MapSave>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const appbarRef = useRef<HTMLHeadElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
          div.remove();
        }
      }
    }
  }, [gridRef.current]);

  return (
    <>
      { (
          error || (
            !loading && (
              save === undefined
            )
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
                slots={ { toolbar: CustomToolbar } }
                showToolbar
                autoPageSize
                autosizeOptions={ { includeHeaders: true, includeOutliers: true } }
                hideFooter
                loading={ loading }
                initialState={ { pinnedColumns: { left: ['id', 'name'] } } }
                columns={ [
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
                  }
                ] }
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