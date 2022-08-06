import { BarChart, Home } from '@mui/icons-material';
import { Backdrop, Button, Chip, CircularProgress, Dialog, Grid, Tooltip, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import SaveDialog from 'screens/save/SaveDialog';
import SaveMap from 'screens/save/SaveMap';
import theme from 'theme';
import { MapMode, mapModes, MapSave } from 'types/map.types';
import { convertSave } from 'utils/save.utils';

function SavePage() {
  const params = useParams();
  const intl = useIntl();

  const [save, setSave] = useState<MapSave>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [statDialog, setStatDialog] = useState<boolean>(false);

  const [mapMode, setMapMode] = useState<MapMode>(MapMode.POLITICAL);

  const { id } = params;

  useEffect(() => {
    ;(async () => {
      try {
        if (id) {
          const { data } = await api.save.one(id);

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

  return (
    <>
      <Backdrop open={ loading || !mapReady } style={ { backgroundColor: theme.palette.primary.light } }>
        <CircularProgress color='primary'/>
      </Backdrop>
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
                    .map((mm) => (
                      <Tooltip title={ intl.formatMessage({ id: `map.mod.${ mm }` }) } key={ `tooltip-${ mm }` }>
                        <Button onClick={ () => setMapMode(MapMode[mm]) } style={ { padding: 0, minWidth: 0 } }
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
              <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady }/>
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
          )
      }
    </>
  )
}

export default SavePage;
