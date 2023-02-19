import { Flag, Home, ReceiptLong, SupportAgent, SvgIconComponent } from '@mui/icons-material';
import { AppBar, Box, Grid, Icon, Toolbar, Tooltip } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { IdImageLocalised, IdLocalised } from 'types/api.types';
import MenuMenu from './MenuMenu';

type WikiType = {
  type: string;
  icon: SvgIconComponent;
}

const types: Array<WikiType> = [
  {
    type: 'countries',
    icon: Flag
  },
  {
    type: 'decisions',
    icon: ReceiptLong
  },
  {
    type: 'advisors',
    icon: SupportAgent
  },
];

interface WikiBarProps {
  type: string;
  version?: string;
  objects?: Array<IdLocalised>;
  imagedObjects?: Array<IdImageLocalised>;
  children: React.ReactElement;
}

function WikiBar({ version, type, objects, imagedObjects, children }: WikiBarProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const wikiType: WikiType = types.find(value => value.type === type) ?? types[0];

  const handleMenuChange = (value: IdLocalised | IdImageLocalised | null) => {
    if (value) {
      navigate(`/wiki/${ version }/${ wikiType.type }/${ value.id }`)
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
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ wikiType.type }` }) }
                          objects={ Object.values(objects) }
                          onChange={ handleMenuChange }
                />
                :
                imagedObjects &&
                <MenuMenu title={ intl.formatMessage({ id: `wiki.${ wikiType.type }` }) }
                          objects={ Object.values(imagedObjects) }
                          onChange={ handleMenuChange }
                />
            }
            {
              types.filter(value => value !== wikiType).map(value => (
                <Link to={ `/wiki/${ version }/${ value.type }` } key={ value.type } style={ { marginLeft: 8 } }>
                  <Tooltip title={ intl.formatMessage({ id: `wiki.${ value.type }` }) }>
                    <Icon component={ value.icon } color='secondary' style={ { width: 24, height: 24 } }/>
                  </Tooltip>
                </Link>
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
