import { Button, CircularProgress, GridLegacy, Tooltip, useTheme } from '@mui/material';
import React, { RefObject, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import SaveMap from 'screens/save/SaveMap';
import { SaveWar } from 'types/api.types';
import { MapMode, mapModes, MapSave } from 'types/map.types';

interface WarMapTabProps {
  war: SaveWar;
  save: MapSave;
  containerRef: RefObject<HTMLDivElement | null>;
}

function WarMapTab({ war, save, containerRef }: WarMapTabProps) {
  const theme = useTheme();
  const intl = useIntl();

  const [mapReady, setMapReady] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.WAR);

  return (
    <div style={ { width: '100%', height: '100%' } }>
      <GridLegacy container style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.light,
        visibility: mapReady ? 'hidden' : 'visible',
        position: 'absolute',
      } }>
        <CircularProgress color='primary'/>
      </GridLegacy>
      <div style={ { position: 'fixed', top: 5 + (containerRef.current ? containerRef.current.offsetTop + 24 : 0), left: 29, zIndex: 1 } }>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.WAR' }) } key={ 'tooltip-war' }>
          <Button onClick={ () => setMapMode(MapMode.WAR) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ `button-war` }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.WAR].image }_${ MapMode.WAR === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.WAR' }) }/>
          </Button>
        </Tooltip>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.LOSSES' }) } key={ 'tooltip-losses' }>
          <Button onClick={ () => setMapMode(MapMode.LOSSES) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ 'button-losses' }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.LOSSES].image }_${ MapMode.LOSSES === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.LOSSES' }) }/>
          </Button>
        </Tooltip>
      </div>
      <div style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        position: 'absolute',
      } }>
        <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady } dataId={ war.id.toString() } ref={ mapRef }/>
      </div>
    </div>
  )
}

export default WarMapTab;
