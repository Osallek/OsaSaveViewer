import { BarChart, Download, Home, PhotoCamera } from '@mui/icons-material';
import { Backdrop, Button, Chip, CircularProgress, Dialog, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { api, endpoints } from 'api';
import * as ENV from 'env/env';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ExportModal from 'screens/save/ExportModal';
import SaveDialog from 'screens/save/SaveDialog';
import SaveMap from 'screens/save/SaveMap';
import { MapMode, mapModes, MapSave } from 'types/map.types';
import { cleanString, formatDate } from 'utils/format.utils';
import { convertSave } from 'utils/save.utils';

function SavePage() {
  const params = useParams();
  const intl = useIntl();
  const theme = useTheme();

  const [save, setSave] = useState<MapSave>();
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [exportingModal, setExportingModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [statDialog, setStatDialog] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.POLITICAL);

  const { id } = params;

  const handleMapMode = (mm: MapMode) => {
    searchParams.set('mapMode', mm);
    setSearchParams(searchParams);
  }

  const download = () => {
    if (id && save) {
      const link = document.createElement('a');
      link.href = ENV.DATA_BASE_URL + endpoints.save.download(id);
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

  useEffect(() => {
    ;(async () => {
      try {
        if (id) {
          const { data } = await api.save.one(id);

          document.title = `${ data.name } (${ formatDate(data.date) })`;

          setSave(convertSave(data));
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
    setMapMode(searchParams.get('mapMode') ? MapMode[searchParams.get('mapMode') as keyof typeof MapMode] : MapMode.POLITICAL);
  }, [searchParams]);

  return (
    <>
      {
        error ?
          (
            <Grid container alignItems='center' justifyContent='center' flexDirection='column'
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
            </Grid>
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
                                  disableRipple key={ `button-${ mm }` }>
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
                                exporting ? <CircularProgress color='secondary' style={ { width: 24, height: 24 } }/> : <PhotoCamera/>
                              }
                            </IconButton>
                        </Tooltip>
                        <ExportModal open={ exportingModal } save={ save } onClose={ () => setExportingModal(false) } onExport={ exportImage }/>
                    </>
                }
                <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady } dataId={ searchParams.get('id') } ref={ mapRef }/>
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
