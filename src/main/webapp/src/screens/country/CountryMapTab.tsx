import { Button, CircularProgress, GridLegacy, Tooltip, useTheme } from '@mui/material';
import React, { RefObject, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import SaveMap from 'screens/save/SaveMap';
import { SaveCountry } from 'types/api.types';
import { MapMode, mapModes, MapSave } from 'types/map.types';

interface CountryMapTabProps {
  country: SaveCountry;
  save: MapSave;
  containerRef: RefObject<HTMLDivElement>;
}

function CountryMapTab({ country, save, containerRef }: CountryMapTabProps) {
  const theme = useTheme();
  const intl = useIntl();

  const [mapReady, setMapReady] = useState<boolean>(false);
  const mapRef = useRef<any>(null);
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.DIPLOMACY);

  return (
    <div style={ { width: '100%', height: '100%' } }>
      <GridLegacy container style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.light,
        visibility: mapReady ? 'hidden' : 'visible',
        zIndex: 1,
        position: 'absolute',
      } }>
        <CircularProgress color='primary'/>
      </GridLegacy>
      <div style={ { position: 'fixed', top: 5 + (containerRef.current ? containerRef.current.offsetTop + 24 : 0), left: 29, zIndex: 1 } }>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.DIPLOMACY' }) } key={ 'tooltip-DIPLOMACY' }>
          <Button onClick={ () => setMapMode(MapMode.DIPLOMACY) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ `button-DIPLOMACY` }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.DIPLOMACY].image }_${ MapMode.DIPLOMACY === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.DIPLOMACY' }) }/>
          </Button>
        </Tooltip>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.C_MANUAL_DEV' }) } key={ 'tooltip-C_MANUAL_DEV' }>
          <Button onClick={ () => setMapMode(MapMode.C_MANUAL_DEV) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ `button-C_MANUAL_DEV` }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.C_MANUAL_DEV].image }_${ MapMode.C_MANUAL_DEV === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.C_MANUAL_DEV' }) }/>
          </Button>
        </Tooltip>
        <Tooltip title={ intl.formatMessage({ id: 'map.mod.ONCE_WAR' }) } key={ 'tooltip-ONCE_WAR' }>
          <Button onClick={ () => setMapMode(MapMode.ONCE_WAR) } style={ { padding: 0, minWidth: 0 } } disableRipple key={ `button-ONCE_WAR` }>
            <img
              src={ `/eu4/map/map_mods/${ mapModes[MapMode.ONCE_WAR].image }_${ MapMode.ONCE_WAR === mapMode ? 'on' : 'off' }.png` }
              alt={ intl.formatMessage({ id: 'map.mod.ONCE_WAR' }) }/>
          </Button>
        </Tooltip>
      </div>
      <div style={ {
        width: 'calc(100% - 48px)',
        height: `calc(100% - ${ (containerRef.current ? containerRef.current.offsetTop : 0) + 48 }px)`,
        position: 'absolute',
      } }>
        <SaveMap save={ save } mapMode={ mapMode } setReady={ setMapReady } dataId={ country.tag } ref={ mapRef }/>
      </div>
    </div>
  )
}

export default CountryMapTab;
