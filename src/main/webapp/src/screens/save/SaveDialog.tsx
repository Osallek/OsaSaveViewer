import { Close, KeyboardArrowDown } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import CountryTable from 'screens/save/CountryTable';
import ProvinceTable from 'screens/save/ProvinceTable';
import { MapSave } from 'types/map.types';
import { formatDate } from 'utils/format.utils';

interface SaveDialogProps {
  save: MapSave;
  onClose: () => void;
  selectedDate: string;
}

enum Views {
  PROVINCES,
  COUNTRIES
}

export enum ProvinceTableType {
  INFO = 'INFO',
  DEV = 'DEV'
}

export enum CountryTableType {
  INFO = 'INFO',
  DEV = 'DEV',
  ECO = 'ECO',
  ARMY = 'ARMY',
  NAVY = 'NAVY',
  INC = 'INC',
  EXP = 'EXP',
  TOTAL_EXP = 'TOTAL_EXP',
  MANA_SPENT = 'MANA_SPENT',
  LOSSES_ARMY = 'LOSSES_ARMY',
  LOSSES_NAVY = 'LOSSES_NAVY',
}

function SaveDialog({ save, onClose, selectedDate }: SaveDialogProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [ view, setView ] = useState<Views>(Views.COUNTRIES);

  const [ provincesTable, setProvincesTable ] = useState<ProvinceTableType>(ProvinceTableType.INFO);
  const [ provincesAnchorEl, setProvincesAnchorEl ] = React.useState<null | HTMLElement>(null);
  const provincesOpen = Boolean(provincesAnchorEl);

  const [ countriesTable, setCountriesTable ] = useState<CountryTableType>(CountryTableType.DEV);
  const [ countriesAnchorEl, setCountriesAnchorEl ] = React.useState<null | HTMLElement>(null);
  const countriesOpen = Boolean(countriesAnchorEl);

  const [ previousSavesAnchorEl, setPreviousSavesAnchorEl ] = React.useState<null | HTMLElement>(null);
  const previousSavesOpen = Boolean(previousSavesAnchorEl);

  const handleProvincesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProvincesAnchorEl(event.currentTarget);
  };

  const handleProvincesClose = (type: ProvinceTableType) => {
    setProvincesAnchorEl(null);
    setView(Views.PROVINCES);
    setProvincesTable(type);
  };

  const handleCountriesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCountriesAnchorEl(event.currentTarget);
  };

  const handleCountriesClose = (type: CountryTableType) => {
    setCountriesAnchorEl(null);
    setView(Views.COUNTRIES);
    setCountriesTable(type);
  };

  return (
    <>
      <AppBar sx={ { position: 'relative' } }>
        <Toolbar>
          <IconButton
            edge='start'
            onClick={ onClose }
            color='secondary'
            aria-label='close'
          >
            <Close/>
          </IconButton>
          <Typography sx={ { ml: 2, mr: 2 } } variant='h6' component='div'>
            { save.name }
          </Typography>
          <Grid container>
            <Button
              key='button-countries'
              variant='outlined'
              color='secondary'
              sx={ { m: 1 } }
              aria-controls={ countriesOpen ? 'basic-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ countriesOpen ? 'true' : undefined }
              onClick={ handleCountriesClick }
              endIcon={ <KeyboardArrowDown/> }
            >
              { intl.formatMessage({ id: 'common.countries' }) }
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={ countriesAnchorEl }
              open={ countriesOpen }
              onClose={ () => setCountriesAnchorEl(null) }
              MenuListProps={ {
                style: { backgroundColor: theme.palette.primary.light }
              } }
            >
              {
                Object.values(CountryTableType).map(value => (
                  <MenuItem onClick={ () => handleCountriesClose(value) }
                            style={ { color: theme.palette.primary.contrastText } }
                            key={ `country-${ value }` }>
                    { intl.formatMessage({ id: `country.${ value }` }) }
                  </MenuItem>
                ))
              }
            </Menu>
            <Button
              key='button-provinces'
              variant='outlined'
              color='secondary'
              sx={ { m: 1 } }
              aria-controls={ provincesOpen ? 'basic-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ provincesOpen ? 'true' : undefined }
              onClick={ handleProvincesClick }
              endIcon={ <KeyboardArrowDown/> }
            >
              { intl.formatMessage({ id: 'common.provinces' }) }
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={ provincesAnchorEl }
              open={ provincesOpen }
              onClose={ () => setProvincesAnchorEl(null) }
              MenuListProps={ {
                style: { backgroundColor: theme.palette.primary.light }
              } }
            >
              {
                Object.values(ProvinceTableType).map(value => (
                  <MenuItem onClick={ () => handleProvincesClose(value) }
                            style={ { color: theme.palette.primary.contrastText } }
                            key={ `province-${ value }` }>
                    { intl.formatMessage({ id: `province.${ value }` }) }
                  </MenuItem>
                ))
              }
            </Menu>
          </Grid>
          {
            save.previousSaves && save.previousSaves.length > 0 &&
            (
              <>
                <Grid container/>
                <Grid container justifyContent='end'>
                  <Button
                    key='button-provinces'
                    variant='outlined'
                    color='secondary'
                    sx={ { m: 1 } }
                    aria-controls={ previousSavesOpen ? 'basic-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ previousSavesOpen ? 'true' : undefined }
                    onClick={ event => setPreviousSavesAnchorEl(event.currentTarget) }
                    endIcon={ <KeyboardArrowDown/> }
                  >
                    { intl.formatMessage({ id: 'common.previousSaves' }) }
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={ previousSavesAnchorEl }
                    open={ previousSavesOpen }
                    onClose={ () => setPreviousSavesAnchorEl(null) }
                    MenuListProps={ {
                      style: { backgroundColor: theme.palette.primary.light }
                    } }
                  >
                    {
                      save.previousSaves.map(previousSave => (
                        <MenuItem component={ Link } to={ `/save/${ previousSave.id }` } target='_blank'
                                  rel='noopener noreferrer'
                                  style={ { color: theme.palette.primary.contrastText } }
                                  key={ `save-${ previousSave.id }` }>
                          { `${ previousSave.name } [${ formatDate(previousSave.date) }]` }
                        </MenuItem>
                      ))
                    }
                  </Menu>
                </Grid>
              </>
            )
          }
        </Toolbar>
      </AppBar>
      <CountryTable save={ save } selectedDate={ selectedDate } type={ countriesTable }
                    visible={ Views.COUNTRIES === view }/>
      <ProvinceTable save={ save } selectedDate={ selectedDate } type={ provincesTable }
                     visible={ Views.PROVINCES === view }/>
    </>
  )
}

export default SaveDialog;
