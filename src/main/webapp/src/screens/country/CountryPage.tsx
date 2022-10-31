import { Home, KeyboardArrowDown, Map } from '@mui/icons-material';
import { AppBar, Avatar, Backdrop, Button, CircularProgress, Grid, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import CountryBuildingTab from 'screens/country/CountryBuildingTab';
import CountryCultureTab from 'screens/country/CountryCultureTab';
import CountryDiplomacyTab from 'screens/country/CountryDiplomacyTab';
import CountryEcoTab from 'screens/country/CountryEcoTab';
import CountryEstateTab from 'screens/country/CountryEstateTab';
import CountryHistoryTab from 'screens/country/CountryHistoryTab';
import CountryIdeaTab from 'screens/country/CountryIdeaTab';
import CountryInfoTab from 'screens/country/CountryInfoTab';
import CountryLeaderTab from 'screens/country/CountryLeaderTab';
import CountryManaTab from 'screens/country/CountryManaTab';
import CountryMapTab from 'screens/country/CountryMapTab';
import CountryMilitaryTab from 'screens/country/CountryMilitaryTab';
import CountryMissionTab from 'screens/country/CountryMissionTab';
import CountryMonarchTab from 'screens/country/CountryMonarchTab';
import CountryReligionTab from 'screens/country/CountryReligionTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, stringComparator } from 'utils/format.utils';
import { convertSave, fakeTag, getCountries, getCountry, getCountrysFlag, getCountrysName, getPlayer } from 'utils/save.utils';

function CountryPage() {
  const params = useParams();
  const intl = useIntl();

  const [save, setSave] = useState<MapSave>();
  const [saveId, setSaveId] = useState<string | undefined>();
  const [tag, setTag] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [country, setCountry] = useState<SaveCountry | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

  const [countriesAnchorEl, setCountriesAnchorEl] = React.useState<null | HTMLElement>(null);
  const countriesOpen = Boolean(countriesAnchorEl);

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState<number>(1);

  if (saveId !== params.id) {
    setSaveId(params.id);
  }

  if (tag !== params.tag) {
    setTag(params.tag);
  }

  const handleTab = (index: number) => {
    searchParams.set('tab', String(index));
    setSearchParams(searchParams);
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (saveId) {
          const { data } = await api.save.one(saveId);

          setSave(convertSave(data, false));
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    })()
  }, [saveId]);

  useEffect(() => {
    if (save && tag) {
      const c = getCountry(save, tag);

      if (c.tag !== tag || !c.alive || c.tag === fakeTag) {
        setError(true);
      } else {
        document.title = `${ save.name } - ${ getCountrysName(c) }`;
        setCountry(c);
      }

      setLoading(false);
    }
  }, [save, tag]);

  useEffect(() => {
    setActiveTab(Number(searchParams.get('tab') ?? '1'));
  }, [searchParams]);

  return (
    <>
      { (error || (!loading && (country === undefined || save === undefined))) ?
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
        (loading ?
            (
              <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
                <CircularProgress color='primary'/>
              </Backdrop>
            )
            :
            (save && country) &&
            (
              <>
                <AppBar sx={ { position: 'relative' } }>
                  <Toolbar>
                    <Grid container alignItems='center'>
                      <Link to={ `/save/${ saveId }` }>
                        <Map color='secondary'/>
                      </Link>
                      <Typography sx={ { ml: 2, mr: 2 } } variant='h6' component='div'>
                        { `${ save.name } (${ formatDate(save.date) })` }
                      </Typography>
                      <Button
                        key='button-countries'
                        variant='outlined'
                        color='secondary'
                        aria-controls={ countriesOpen ? 'basic-menu' : undefined }
                        aria-haspopup='true'
                        aria-expanded={ countriesOpen ? 'true' : undefined }
                        onClick={ event => setCountriesAnchorEl(event.currentTarget) }
                        endIcon={ <KeyboardArrowDown/> }
                        style={ { marginLeft: 'auto' } }
                      >
                        { intl.formatMessage({ id: 'common.countries' }) }
                      </Button>
                      <Menu
                        id='basic-menu'
                        anchorEl={ countriesAnchorEl }
                        open={ countriesOpen }
                        onClose={ () => setCountriesAnchorEl(null) }
                        MenuListProps={ {
                          style: { backgroundColor: theme.palette.primary.light }
                        } }
                      >
                        {
                          getCountries(save).sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b)))
                            .map(c => (
                              <MenuItem component={ Link } to={ `/save/${ saveId }/${ c.tag }` } style={ { color: theme.palette.primary.contrastText } }
                                        key={ `menu-${ c.tag }` } onClick={ () => setCountriesAnchorEl(null) }>
                                { getCountrysName(c) }
                              </MenuItem>
                            ))
                        }
                      </Menu>
                    </Grid>
                  </Toolbar>
                  <Toolbar style={ { backgroundColor: theme.palette.primary.dark } }>
                    <Grid container xs={ 12 } alignItems='center'>
                      <Avatar src={ getCountrysFlag(country) } variant='square' style={ { marginRight: 16 } }/>
                      <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                        { getCountrysName(country) + (getPlayer(country) ? ` (${ getPlayer(country) })` : '') }
                      </Typography>
                    </Grid>
                  </Toolbar>
                </AppBar>
                <Grid item alignItems='center' justifyContent='center' xs={ 12 }>
                  <Tabs
                    value={ activeTab }
                    onChange={ (event, value) => handleTab(value) }
                    variant='scrollable'
                    scrollButtons='auto'
                    style={ { marginBottom: 8 } }
                  >
                    <Grid item style={ { flex: 1 } }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.info' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.map' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.eco' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.estates' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.dip' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.mil' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.ideas' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.rulers' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.leaders' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.mana' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.buildings' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.missions' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.religions' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.cultures' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'country.tab.history' }) }/>
                    <Grid item style={ { flex: 1 } }/>
                  </Tabs>
                </Grid>
                <Grid container alignItems='start' justifyContent='center' style={ { padding: 24 } } key={ `grid-g-${ tag }` } ref={ containerRef }>
                  {
                    activeTab == 1 &&
                      <Grid container item display='flex' xs={ 12 } md={ 12 } lg={ 8 } xl={ 6 } key='gridInfo'>
                          <CountryInfoTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 2 &&
                      <Grid container item key='gridMap'>
                          <CountryMapTab country={ country } save={ save } containerRef={ containerRef }/>
                      </Grid>
                  }
                  {
                    activeTab == 3 &&
                      <Grid container item key='gridEco'>
                          <CountryEcoTab country={ country }/>
                      </Grid>
                  }
                  {
                    activeTab == 4 &&
                      <Grid container key='gridEstate'>
                          <CountryEstateTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 5 &&
                      <Grid container key='gridDiplomacy'>
                          <CountryDiplomacyTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 6 &&
                      <Grid container key='gridMilitary'>
                          <CountryMilitaryTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 7 &&
                      <Grid container key='gridIdea'>
                          <CountryIdeaTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 8 &&
                      <Grid container key='gridMonarch'>
                          <CountryMonarchTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 9 &&
                      <Grid container key='gridLeader'>
                          <CountryLeaderTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 10 &&
                      <Grid container key='gridMana'>
                          <CountryManaTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 11 &&
                      <Grid container key='gridBuilding'>
                          <CountryBuildingTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 12 &&
                      <Grid container style={ { height: '100%' } } key='gridMission'>
                          <CountryMissionTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab == 13 &&
                      <Grid container key='grid1Religion'>
                          <CountryReligionTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab === 14 &&
                      <Grid container key='gridCulture'>
                          <CountryCultureTab country={ country } save={ save }/>
                      </Grid>
                  }
                  {
                    activeTab === 15 &&
                      <Grid container key='gridHistory'>
                          <CountryHistoryTab country={ country } save={ save }/>
                      </Grid>
                  }
                </Grid>
              </>
            )
        )
      }
    </>
  )
}

export default CountryPage;
