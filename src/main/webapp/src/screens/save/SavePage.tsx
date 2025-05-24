import { BarChart, Clear, Download, Home, PhotoCamera, PlayArrow, Stop } from '@mui/icons-material';
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  createTheme,
  Dialog,
  GridLegacy,
  IconButton,
  Select,
  ThemeProvider,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { api, endpoints } from 'api';
import { env } from 'env/env';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { mapModes } from 'screens/components/MapModes';
import ExportModal from 'screens/save/ExportModal';
import SaveDialog from 'screens/save/SaveDialog';
import SaveMap from 'screens/save/SaveMap';
import { MapMode, MapSave } from 'types/map.types';
import { isValidDate } from 'utils/data.utils';
import { cleanString, formatDate } from 'utils/format.utils';
import { convertSave } from 'utils/save.utils';

function SavePage() {
  const { id } = useParams();
  const intl = useIntl();
  const theme = useTheme();

  const [save, setSave] = useState<MapSave>();
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [exportingModal, setExportingModal] = useState<boolean>(false);
  const [timelapse, setTimelapse] = useState<boolean>(false);
  const [maxTimelapse, setMaxTimelapse] = useState<boolean>(false);
  const [timelapseId, setTimelapseId] = useState<NodeJS.Timeout | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [statDialog, setStatDialog] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.POLITICAL);
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [selectable, setSelectable] = useState<string | null>(null);

  const handleMapMode = (mm: MapMode) => {
    if (mm !== mapMode || !searchParams.has('mapMode')) {
      searchParams.delete('id');
      searchParams.set('mapMode', mm);
      setSearchParams(searchParams);
    }
  }

  const handleDate = (date?: string) => {
    if (date) {
      searchParams.set('date', date);
    } else {
      searchParams.delete('date');
    }

    setSearchParams(searchParams);
  }

  const handleSelectable = (selectable: string | null) => {
    if (selectable) {
      searchParams.set('id', selectable);
    } else {
      searchParams.delete('id');
    }

    setSearchParams(searchParams);
  }

  const clearSelectable = () => {
    handleSelectable(null);
  }

  const download = () => {
    if (id && save) {
      const link = document.createElement('a');
      link.href = env.VITE_DATA_BASE_URL + endpoints.save.download(id);
      link.setAttribute('download', `${ cleanString(save.name).replace('.eu4', '') }.eu4`);

      if (document.body) {
        document.body.appendChild(link);
        link.click();
      }
    }
  }

  const exportImage = async (mm: MapMode, countries: Array<string>) => {
    try {
      setExportingModal(false);
      setExporting(true);

      await mapRef.current.exportImage(mm, countries);
    } finally {
      setExporting(false);
    }
  }

  const runTimelapse = () => {
    if (timelapse || timelapseId || !save || maxTimelapse) {
      if (timelapseId) {
        clearInterval(timelapseId);
      }

      setTimelapse(false);
      setTimelapseId(undefined);
    } else {
      setTimelapse(true);
      setMaxTimelapse(false);
      searchParams.set('date', save.startDate);
      setTimelapseId(setInterval(() => {
        const date = searchParams.get('date');
        if (save && date) {
          let d = new Date(date);

          if (date < save.startDate) {
            d = new Date(save.startDate);
          } else if (date >= save.date) {
            d = new Date(save.date);
            setMaxTimelapse(true);
          } else {
            d = new Date(d.getFullYear() + 1, 0, 1);
          }

          handleDate(`${ d.getFullYear().toString().padStart(4, "0") }-${ (d.getMonth() + 1).toString().padStart(2,
            "0") }-${ d.getDate().toString().padStart(2, "0") }`);
        }
      }, 400));
    }
  }
  const datePickerTheme = createTheme({
    components: {
      // @ts-ignore
      MuiPickersSectionList: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            width: 'auto !important',
            padding: '0px !important'
          }
        }
      }
    }
  });

  useEffect(() => {
    if (maxTimelapse && timelapseId) {
      clearInterval(timelapseId);
    }

    setTimelapse(false);
    setTimelapseId(undefined);
    setMaxTimelapse(false);
  }, [maxTimelapse]);

  useEffect(() => {
    ;(async () => {
      try {
        if (id) {
          const { data } = await api.save.one(id);

          document.title = `${ data.name } (${ formatDate(data.date) })`;

          setSave(convertSave(data, true));
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })()
  }, [id]);

  useEffect(() => {
    const mmParam = searchParams.get('mapMode');

    if (mmParam) {
      if (MapMode[mmParam as keyof typeof MapMode] !== mapMode) {
        setMapMode(MapMode[mmParam as keyof typeof MapMode]);
      }
    } else {
      handleMapMode(MapMode.POLITICAL);
    }
  }, [searchParams]);

  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      if (!isValidDate(dateParam, save)) {
        if (save) {
          handleDate(save.date);
        } else {
          handleDate(undefined);
        }
      } else {
        if (!moment(dateParam, 'YYYY-MM-DD').isSame(date)) {
          setDate(moment(dateParam, 'YYYY-MM-DD'));
        }
      }
    } else if (save) {
      handleDate(save.date);
    }

    if (mapModes[mapMode].selectRenderInput) {
      if (searchParams.get('id')) {
        if (searchParams.get('id') !== selectable) {
          setSelectable(searchParams.get('id'));
        }
      } else {
        if (selectable !== null) {
          setSelectable(null);
        }
      }
    } else {
      if (selectable !== null) {
        setSelectable(null);
      }
    }
  }, [save, searchParams]);

  return (
    <>
      {
        error ?
          (
            <GridLegacy container alignItems='center' justifyContent='center' flexDirection='column'
                        style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
              <Typography variant='h2' color={ theme.palette.primary.contrastText }>
                404
              </Typography>
              <Typography variant='h3' color={ theme.palette.primary.contrastText }>
                { intl.formatMessage({ id: 'common.saveNotFound' }) }
              </Typography>
              <Link to='/'>
                <Home fontSize='large' color='primary'/>
              </Link>
            </GridLegacy>
          )
          :
          (
            <>
              <Backdrop open={ loading || !mapReady } style={ { backgroundColor: theme.palette.primary.light } }>
                <CircularProgress color='primary'/>
              </Backdrop>
              <div style={ { height: '100%', visibility: mapReady ? 'visible' : 'hidden', overflow: 'hidden' } }>
                <Link to='/'>
                  <Home style={ {
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    padding: 4,
                    width: 24,
                    height: 24,
                    borderRadius: '50%'
                  } }/>
                </Link>
                <div style={ { position: 'fixed', top: 5, left: 45 } }>
                  {
                    Object.values(MapMode)
                      .filter(mm => mapModes[MapMode[mm]].selectable)
                      .map((mm) => (
                        <Tooltip title={ intl.formatMessage({ id: `map.mod.${ mm }` }) } key={ `tooltip-${ mm }` }>
                          <Button onClick={ () => handleMapMode(MapMode[mm]) } style={ { padding: 0, minWidth: 0 } }
                                  disableRipple key={ `button-${ mm }` } disabled={ timelapse }>
                            <img
                              src={ `/eu4/map/map_mods/${ mapModes[MapMode[mm]].image }_${ mm === mapMode ? 'on' : 'off' }.png` }
                              alt={ mm }/>
                          </Button>
                        </Tooltip>
                      ))
                  }
                </div>
                {
                  save &&
                  <Chip label={ intl.formatMessage({ id: 'common.graph' }) }
                        icon={ <BarChart style={ { color: 'white' } }/> }
                        onClick={ () => setStatDialog(true) }
                        style={ {
                          position: 'absolute',
                          top: 48,
                          left: 5,
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2em'
                        } }/>
                }
                {
                  save &&
                  <div style={ {
                    position: 'absolute',
                    top: 48,
                    left: 230,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '16px',
                  } }>
                    <LocalizationProvider dateAdapter={ AdapterMoment } adapterLocale={ intl.locale }>
                      <ThemeProvider theme={ datePickerTheme }>
                        <DatePicker
                          openTo='year'
                          views={ ['year', 'month', 'day'] }
                          minDate={ moment(save.startDate, 'YYYY-MM-DD') }
                          maxDate={ moment(save.date, 'YYYY-MM-DD') }
                          value={ date }
                          disabled={ timelapse }
                          onChange={ value => handleDate(value?.format('YYYY-MM-DD')) }
                          format={ 'YYYY-MM-DD' }
                          slotProps={ {
                            openPickerIcon: {
                              sx: {
                                color: theme.palette.primary.contrastText,
                              },
                            }
                          } }
                        />
                      </ThemeProvider>
                    </LocalizationProvider>
                  </div>
                }
                {
                  save && mapModes[mapMode].selectItems && mapModes[mapMode].selectRenderInput &&
                  <div style={ {
                    position: 'absolute',
                    top: 48,
                    left: 389,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '16px',
                  } }>
                    <Select
                      id='mapmod-selectable'
                      value={ selectable ?? '' }
                      variant='standard'
                      onChange={ event => handleSelectable(event.target.value as string) }
                      disableUnderline
                      displayEmpty
                      renderValue={ value => mapModes[mapMode].selectRenderInput &&
                        mapModes[mapMode].selectRenderInput(value, save, theme) }
                      sx={ {
                        "& .MuiSelect-iconStandard": { display: selectable ? 'none' : '' },
                        fontSize: '1.0em',
                        paddingTop: '1px',
                        paddingLeft: 2,
                        borderRadius: '16px',
                        minWidth: 120,
                      } }
                      endAdornment={
                        <IconButton onClick={ clearSelectable } style={ {
                          display: selectable ? '' : 'none',
                          width: 16,
                          height: 16,
                          marginRight: 8
                        } }>
                          <Clear/>
                        </IconButton>
                      }
                    >
                      { mapModes[mapMode].selectItems(save, theme) }
                    </Select>
                  </div>
                }
                {
                  save &&
                  <>
                    <Tooltip title={ intl.formatMessage({ id: 'common.download' }) }>
                      <IconButton onClick={ download } style={ {
                        position: 'absolute',
                        top: 92,
                        left: 5,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2em',
                        borderRadius: '50%',
                      } }>
                        <Download/>
                      </IconButton>
                    </Tooltip>
                  </>
                }
                {
                  save &&
                  <>
                    <Tooltip title={ intl.formatMessage({ id: 'common.export' }) }>
                      <IconButton onClick={ () => setExportingModal(true) } disabled={ exporting } style={ {
                        position: 'absolute',
                        top: 92,
                        left: 52,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2em',
                        borderRadius: '50%',
                      } }>
                        {
                          (exporting || timelapse) ?
                            <CircularProgress color='secondary' style={ { width: 24, height: 24 } }/> :
                            <PhotoCamera/>
                        }
                      </IconButton>
                    </Tooltip>
                    <ExportModal open={ exportingModal } save={ save } onClose={ () => setExportingModal(false) }
                                 onExport={ exportImage }/>
                  </>
                }
                {
                  save &&
                  <>
                    <Tooltip title={ intl.formatMessage({ id: 'common.timelapse' }) }>
                      <IconButton onClick={ runTimelapse } style={ {
                        position: 'absolute',
                        top: 92,
                        left: 99,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2em',
                        borderRadius: '50%',
                      } }>
                        {
                          timelapse ? <Stop/> : <PlayArrow/>
                        }
                      </IconButton>
                    </Tooltip>
                  </>
                }
                <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady } dataId={ searchParams.get('id') }
                         date={ date?.format('YYYY-MM-DD') } ref={ mapRef }/>
                {
                  save &&
                  (
                    <Dialog
                      keepMounted
                      fullScreen
                      open={ statDialog }
                      onClose={ () => setStatDialog(false) }
                      closeAfterTransition
                    >
                      <SaveDialog save={ save } onClose={ () => setStatDialog(false) }/>
                    </Dialog>
                  )
                }
              </div>
            </>
          )
      }
    </>
  )
}

export default SavePage;
