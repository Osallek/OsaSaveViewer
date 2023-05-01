import { Home } from '@mui/icons-material';
import { AppBar, Avatar, Grid, Toolbar, Tooltip } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { IdImageLocalised, IdLocalised } from 'types/api.types';
import { WikiType, wikiTypes } from '../../types/wiki.types';
import MenuMenu from './MenuMenu';

interface WikiBarProps {
  type: WikiType;
  version?: string;
  value?: IdLocalised | null;
  imagedValue?: IdImageLocalised | null;
  objects?: Array<IdLocalised>;
  imagedObjects?: Array<IdImageLocalised>;
  children: React.ReactElement;
  showId?: boolean;
  group?: boolean;
}

function WikiBar({ version, value, imagedValue, type, objects, imagedObjects, children, showId, group }: WikiBarProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleMenuChange = (value: IdLocalised | IdImageLocalised | null) => {
    if (value) {
      navigate(`/wiki/${ version }/${ type.path }/${ value.id }`)
    }
  }

  return (
    <AppBar style={ { position: 'relative' } }>
      <Toolbar style={ { justifyContent: 'center' } }>
        <Grid container item alignItems='center' xs={ 12 } xl={ 10 }>
          <Link to={ `/wiki/${ version }` }>
            <Home color='secondary' style={ { width: 40, height: 40 } }/>
          </Link>
          {
            objects ?
              <MenuMenu title={ intl.formatMessage({ id: `wiki.${ type.path }` }) } showId={ showId }
                        objects={ Object.values(objects) } value={ value } group={ group }
                        onChange={ handleMenuChange }
              />
              :
              imagedObjects &&
              <MenuMenu title={ intl.formatMessage({ id: `wiki.${ type.path }` }) } showId={ showId }
                        objects={ Object.values(imagedObjects) } imagedValue={ imagedValue } group={ group }
                        onChange={ handleMenuChange }
              />
          }
          {
            Object.values(wikiTypes).filter(value => value !== type).map(value => (
              <Tooltip title={ intl.formatMessage({ id: `wiki.${ value.path }` }) } key={ `tooltip-${ value.path }` }>
                <Link to={ `/wiki/${ version }/${ value.path }` } key={ value.path } style={ { marginLeft: 8 } }>
                  <Avatar variant='square' src={ `/eu4/wiki/${ value.icon }.png` } color='secondary'
                          sx={ { width: 24, height: 24 } }/>
                </Link>
              </Tooltip>
            ))
          }
        </Grid>
      </Toolbar>
      {
        children
      }
    </AppBar>
  )
}

export default WikiBar;
