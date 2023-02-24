import { Home } from '@mui/icons-material';
import { AppBar, Box, Grid, Icon, Toolbar, Tooltip } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { IdImageLocalised, IdLocalised } from 'types/api.types';
import { WikiType, wikiTypes } from '../../types/wiki.types';
import MenuMenu from './MenuMenu';

interface WikiBarProps {
  type: string;
  version?: string;
  value?: IdLocalised | null;
  imagedValue?: IdImageLocalised | null;
  objects?: Array<IdLocalised>;
  imagedObjects?: Array<IdImageLocalised>;
  children: React.ReactElement;
}

function WikiBar({ version, value, imagedValue, type, objects, imagedObjects, children }: WikiBarProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const wikiType: WikiType = wikiTypes[type];

  const handleMenuChange = (value: IdLocalised | IdImageLocalised | null) => {
    if (value) {
      navigate(`/wiki/${ version }/${ wikiType.path }/${ value.id }`)
    }
  }

  return (
    <>
      <AppBar style={ { position: 'fixed' } }>
        <Toolbar style={ { justifyContent: 'center' } }>
          <Grid container item alignItems='center' xs={ 12 } xl={ 10 }>
            <Link to={ `/wiki/${ version }` }>
              <Home color='secondary' style={ { width: 40, height: 40 } }/>
            </Link>
            {
              objects ?
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ wikiType.path }` }) }
                          objects={ Object.values(objects) } value={ value }
                          onChange={ handleMenuChange }
                />
                :
                imagedObjects &&
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ wikiType.path }` }) }
                          objects={ Object.values(imagedObjects) } imagedValue={ imagedValue }
                          onChange={ handleMenuChange }
                />
            }
            {
              Object.values(wikiTypes).filter(value => value !== wikiType).map(value => (
                <Tooltip title={ intl.formatMessage({ id: `wiki.${ value.path }` }) }>
                  <Link to={ `/wiki/${ version }/${ value.path }` } key={ value.path } style={ { marginLeft: 8 } }>
                    <Icon component={ value.icon } color='secondary' sx={ { width: 24, height: 24 } }/>
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
      <Box sx={ { width: '100%', mt: 16 } }/>
    </>
  )
}

export default WikiBar;
