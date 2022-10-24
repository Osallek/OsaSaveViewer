import { Button, CircularProgress, Grid, Tooltip, useTheme } from '@mui/material';
import React, { RefObject, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import SaveMap from 'screens/save/SaveMap';
import { SaveTradeNode } from 'types/api.types';
import { MapMode, mapModes, MapSave } from 'types/map.types';

interface NodeMapTabProps {
  node: SaveTradeNode;
  save: MapSave;
  containerRef: RefObject<HTMLDivElement>;
}

function NodeMapTab({ node, save, containerRef }: NodeMapTabProps) {
  const theme = useTheme();
  const intl = useIntl();

  const [mapReady, setMapReady] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.TRADE_NODE);

  return (
    <div style={ { width: '100%', height: '100%' } }>
      <Grid container style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.light,
        visibility: mapReady ? 'hidden' : 'visible',
        position: 'absolute',
      } }>
        <CircularProgress color='primary'/>
      </Grid>
      <div style={ { position: 'fixed', top: 5 + (containerRef.current ? containerRef.current.offsetTop + 24 : 0), left: 29, zIndex: 1 } }>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.TRADE_NODE' }) } key={ 'tooltip-node' }>
          <Button onClick={ () => setMapMode(MapMode.TRADE_NODE) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ `button-node` }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.TRADE_NODE].image }_${ MapMode.TRADE_NODE === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.TRADE_NODE' }) }/>
          </Button>
        </Tooltip>
      </div>
      <div style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        position: 'absolute',
      } }>
        <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady } dataId={ node.name } ref={ mapRef }/>
      </div>
    </div>
  )
}

export default NodeMapTab;
