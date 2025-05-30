import { Close, KeyboardArrowDown, Launch } from '@mui/icons-material';
import {
  AppBar,
  Button,
  GridLegacy,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import CompareTable from 'screens/save/CompareTable';
import CountryTable from 'screens/save/CountryTable';
import GraphTable from 'screens/save/GraphTable';
import ProvinceTable from 'screens/save/ProvinceTable';
import TradeNodeTable from 'screens/save/TradeNodeTable';
import WarTable from 'screens/save/WarTable';
import { MapSave } from 'types/map.types';
import { formatDate } from 'utils/format.utils';
import { getCountries } from 'utils/save.utils';

interface SaveDialogProps {
  save: MapSave;
  id: string;
  onClose: () => void;
}

enum Views {
  PROVINCES,
  COUNTRIES,
  WARS,
  TRADE_NODES,
  GRAPH,
  COMPARE,
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

function SaveDialog({ save, id, onClose }: SaveDialogProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [view, setView] = useState<Views>(Views.COUNTRIES);

  const [provincesTable, setProvincesTable] = useState<ProvinceTableType>(ProvinceTableType.INFO);
  const [provincesAnchorEl, setProvincesAnchorEl] = React.useState<null | HTMLElement>(null);
  const provincesOpen = Boolean(provincesAnchorEl);

  const [countriesTable, setCountriesTable] = useState<CountryTableType>(CountryTableType.DEV);
  const [countriesAnchorEl, setCountriesAnchorEl] = React.useState<null | HTMLElement>(null);
  const countriesOpen = Boolean(countriesAnchorEl);

  const [previousSavesAnchorEl, setPreviousSavesAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const handleOtherClick = (type: Views) => {
    setCountriesAnchorEl(null);
    setProvincesAnchorEl(null);
    setView(type);
  };

  return (
    <>
      <AppBar style={ { position: 'relative' } }>
        <Toolbar>
          <GridLegacy container alignItems="center">
            <IconButton
              edge="start" onClick={ onClose } color="secondary" aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={ { ml: 2, mr: 2 } } variant="h6" component="div">
              { `${ save.name } (${ formatDate(save.date) })` }
            </Typography>
            <Button
              key="button-countries"
              variant="outlined"
              color="secondary"
              sx={ { m: 1 } }
              aria-controls={ countriesOpen ? 'basic-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ countriesOpen ? 'true' : undefined }
              onClick={ handleCountriesClick }
              endIcon={ <KeyboardArrowDown /> }
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
                  <MenuItem
                    onClick={ () => handleCountriesClose(value) }
                    style={ { color: theme.palette.primary.contrastText } }
                    key={ `country-${ value }` }
                  >
                    { intl.formatMessage({ id: `country.${ value }` }) }
                  </MenuItem>
                ))
              }
            </Menu>
            <Button
              key="button-provinces"
              variant="outlined"
              color="secondary"
              sx={ { m: 1 } }
              aria-controls={ provincesOpen ? 'basic-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ provincesOpen ? 'true' : undefined }
              onClick={ handleProvincesClick }
              endIcon={ <KeyboardArrowDown /> }
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
                  <MenuItem
                    onClick={ () => handleProvincesClose(value) }
                    style={ { color: theme.palette.primary.contrastText } }
                    key={ `province-${ value }` }
                  >
                    { intl.formatMessage({ id: `province.${ value }` }) }
                  </MenuItem>
                ))
              }
              <MenuItem
                component={ "a" }
                href={ `${ window.location.pathname }/provinces` }
                target="_blank"
                style={ { color: theme.palette.primary.contrastText } }
                key={ `province-provinces` }
              >
                { intl.formatMessage({ id: 'province.details' }) }
                <ListItemIcon sx={ { ml: theme.spacing(1) } }>
                  <Launch sx={ { color: theme.palette.primary.contrastText } } />
                </ListItemIcon>
              </MenuItem>
            </Menu>
            {
              save.tradeNodes && save.tradeNodes.length > 0 &&
              <Button
                key="button-trade-nodes"
                variant="outlined"
                color="secondary"
                sx={ { m: 1 } }
                onClick={ () => handleOtherClick(Views.TRADE_NODES) }
              >
                { intl.formatMessage({ id: 'common.tradeNodes' }) }
              </Button>
            }
            {
              save.wars && save.wars.length > 0 &&
              <Button
                key="button-wars"
                variant="outlined"
                color="secondary"
                sx={ { m: 1 } }
                onClick={ () => handleOtherClick(Views.WARS) }
              >
                { intl.formatMessage({ id: 'common.wars' }) }
              </Button>
            }
            {
              save.previousSaves && save.previousSaves.length > 0 &&
              <Button
                key="button-graph"
                variant="outlined"
                color="secondary"
                sx={ { m: 1 } }
                onClick={ () => handleOtherClick(Views.GRAPH) }
              >
                { intl.formatMessage({ id: 'common.rank' }) }
              </Button>
            }
            {
              getCountries(save).filter(value => value.players && value.players.length > 0).length > 1 &&
              <Button
                key="button-compare"
                variant="outlined"
                color="secondary"
                sx={ { m: 1 } }
                onClick={ () => handleOtherClick(Views.COMPARE) }
              >
                { intl.formatMessage({ id: 'common.compare' }) }
              </Button>
            }
            {
              save.previousSaves && save.previousSaves.length > 0 &&
              (
                <>
                  <Button
                    key="button-provinces"
                    variant="outlined"
                    color="secondary"
                    aria-controls={ previousSavesOpen ? 'basic-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ previousSavesOpen ? 'true' : undefined }
                    onClick={ event => setPreviousSavesAnchorEl(event.currentTarget) }
                    endIcon={ <KeyboardArrowDown /> }
                    style={ { marginLeft: 'auto' } }
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
                        <MenuItem
                          component={ Link }
                          to={ `/save/${ previousSave.id }` }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={ { color: theme.palette.primary.contrastText } }
                          key={ `save-${ previousSave.id }` }
                        >
                          { `${ previousSave.name } [${ formatDate(previousSave.date) }]` }
                        </MenuItem>
                      ))
                    }
                  </Menu>
                </>
              )
            }
          </GridLegacy>
        </Toolbar>
      </AppBar>
      <CountryTable save={ save } type={ countriesTable } visible={ Views.COUNTRIES === view } />
      <ProvinceTable save={ save } type={ provincesTable } visible={ Views.PROVINCES === view } />
      <TradeNodeTable save={ save } visible={ Views.TRADE_NODES === view } />
      <WarTable save={ save } visible={ Views.WARS === view } />
      <GraphTable save={ save } visible={ Views.GRAPH === view } />
      <CompareTable save={ save } visible={ Views.COMPARE === view } />
    </>
  );
}

export default SaveDialog;
