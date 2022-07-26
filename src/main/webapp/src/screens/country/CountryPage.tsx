import { Home, KeyboardArrowDown, Map } from '@mui/icons-material';
import {
  AppBar, Avatar, Backdrop, Button, Card, CardContent, CircularProgress, Divider, Grid, Menu, MenuItem, Tab, Tabs, Toolbar, Typography
} from '@mui/material';
import { api } from 'api';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import CountryBuildingTab from 'screens/country/CountryBuildingTab';
import CountryCultureTab from 'screens/country/CountryCultureTab';
import CountryDiplomacyTab from 'screens/country/CountryDiplomacyTab';
import CountryEcoTab from 'screens/country/CountryEcoTab';
import CountryEstateTab from 'screens/country/CountryEstateTab';
import CountryIdeaTab from 'screens/country/CountryIdeaTab';
import CountryLeaderTab from 'screens/country/CountryLeaderTab';
import CountryManaTab from 'screens/country/CountryManaTab';
import CountryMilitaryTab from 'screens/country/CountryMilitaryTab';
import CountryMonarchTab from 'screens/country/CountryMonarchTab';
import CountryReligionTab from 'screens/country/CountryReligionTab';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatNumber, stringComparator } from 'utils/format.utils';
import {
  convertSave, fakeTag, getCountries, getCountry, getCountrysFlag, getCountrysName, getCultureName, getPlayer, getReligionImage, getReligionName
} from 'utils/save.utils';

function CountryPage() {
  const params = useParams();
  const intl = useIntl();

  const [save, setSave] = useState<MapSave>();
  const [saveId, setSaveId] = useState<string | undefined>();
  const [tag, setTag] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [country, setCountry] = useState<SaveCountry | undefined>(undefined);

  const [countriesAnchorEl, setCountriesAnchorEl] = React.useState<null | HTMLElement>(null);
  const countriesOpen = Boolean(countriesAnchorEl);

  const [activeTab, setActiveTab] = React.useState<number>(1);

  if (saveId !== params.id) {
    setSaveId(params.id);
  }

  if (tag !== params.tag) {
    setTag(params.tag);
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (saveId) {
          const { data } = await api.save.one(saveId);

          setSave(convertSave(data));
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
        setCountry(getCountry(save, tag));
      }

      setLoading(false);
      setActiveTab(1);
    }
  }, [save, tag]);

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
              <Backdrop open>
                <CircularProgress color='primary'/>
              </Backdrop>
            )
            :
            (save && country) &&
            (
              <>
                <AppBar sx={ { position: 'relative' } }>
                  <Toolbar>
                    <Link to={ `/save/${ saveId }` }>
                      <Map color='secondary'/>
                    </Link>
                    <Typography sx={ { ml: 2, mr: 2 } } variant='h6' component='div'>
                      { save.name }
                    </Typography>
                    <Grid container/>
                    <Grid container justifyContent='end'>
                      <Button
                        key='button-countries'
                        variant='outlined'
                        color='secondary'
                        sx={ { m: 1 } }
                        aria-controls={ countriesOpen ? 'basic-menu' : undefined }
                        aria-haspopup='true'
                        aria-expanded={ countriesOpen ? 'true' : undefined }
                        onClick={ event => setCountriesAnchorEl(event.currentTarget) }
                        endIcon={ <KeyboardArrowDown/> }
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
                          getCountries(save).sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b))).map(c => (
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
                <Grid container alignItems='center' justifyContent='center' style={ { padding: 24 } } key={ `grid-g-${ tag }` }>
                  <Grid item alignItems='center' justifyContent='center' xs={ 12 }>
                    <Tabs
                      value={ activeTab }
                      onChange={ (event, value) => setActiveTab(value) }
                      variant='scrollable'
                      scrollButtons='auto'
                      style={ { marginBottom: 8 } }
                      centered
                    >
                      <Grid item style={ { flex: 1 } }/>
                      <Tab label={ intl.formatMessage({ id: 'country.tab.info' }) }/>
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
                  <Grid container item display={ activeTab === 1 ? 'flex' : 'none' } xs={ 12 } md={ 8 } lg={ 4 } xl={ 3 } key='grid0'>
                    <Card style={ { backgroundColor: theme.palette.primary.light, width: '100%' } }>
                      <CardContent style={ { backgroundColor: theme.palette.primary.light } }>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.dev' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.dev) }
                            </Typography>
                            <Avatar src='/eu4/country/dev.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.income' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.income) }
                            </Typography>
                            <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.religion' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { getReligionName(save, country.religion) }
                            </Typography>
                            <Avatar src={ getReligionImage(save, country.religion) } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.culture' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { getCultureName(save, country.primaryCulture) }
                            </Typography>
                            <Avatar src='/eu4/country/culture.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.prestige' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.prestige) }
                            </Typography>
                            <Avatar src='/eu4/country/prestige.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.tech' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { `${ country.admTech } / ${ country.dipTech } / ${ country.milTech }` }
                            </Typography>
                            <Avatar src='/eu4/country/tech.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.innovativeness' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { `${ formatNumber(country.innovativeness) }%` }
                            </Typography>
                            <Avatar src='/eu4/country/innovativeness.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.nbProvinces' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { country.nbProvince }
                            </Typography>
                            <Avatar src='/eu4/country/province.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.manpower' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { country.maxManpower }
                            </Typography>
                            <Avatar src='/eu4/country/manpower.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.armyLimit' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.armyLimit) }
                            </Typography>
                            <Avatar src='/eu4/country/land_limit.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.armyMorale' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.armyMorale) }
                            </Typography>
                            <Avatar src='/eu4/country/land_morale.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.armyProfessionalism' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { `${ formatNumber((country.armyProfessionalism ?? 0) * 100) }%` }
                            </Typography>
                            <Avatar src='/eu4/country/professionalism.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.sailors' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { country.maxSailors / 1000 }
                            </Typography>
                            <Avatar src='/eu4/country/sailors.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.navalLimit' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.navalLimit) }
                            </Typography>
                            <Avatar src='/eu4/country/naval_limit.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                        <Divider color={ theme.palette.primary.main } style={ { marginTop: 16, marginBottom: 16 } }/>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item alignItems='center'>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { intl.formatMessage({ id: 'country.navalMorale' }) }
                            </Typography>
                          </Grid>
                          <Grid item alignItems='center'
                                style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                              { formatNumber(country.navalMorale) }
                            </Typography>
                            <Avatar src='/eu4/country/naval_morale.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid container item display={ activeTab === 2 ? 'block' : 'none' } key='grid1'>
                    <CountryEcoTab country={ country }/>
                  </Grid>
                  <Grid container display={ activeTab === 3 ? 'block' : 'none' } key='grid2'>
                    <CountryEstateTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 4 ? 'block' : 'none' } key='grid3'>
                    <CountryDiplomacyTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 5 ? 'block' : 'none' } key='grid4'>
                    <CountryMilitaryTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 6 ? 'block' : 'none' } key='grid5'>
                    <CountryIdeaTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 7 ? 'block' : 'none' } key='grid6'>
                    <CountryMonarchTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 8 ? 'block' : 'none' } key='grid7'>
                    <CountryLeaderTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 9 ? 'block' : 'none' } key='grid8'>
                    <CountryManaTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 10 ? 'block' : 'none' } key='grid9'>
                    <CountryBuildingTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 11 ? 'block' : 'none' } key='grid10'>
                    Missions
                  </Grid>
                  <Grid container display={ activeTab === 12 ? 'block' : 'none' } key='grid11'>
                    <CountryReligionTab country={ country } save={ save }/>
                  </Grid>
                  <Grid container display={ activeTab === 13 ? 'block' : 'none' } key='grid12'>
                    <CountryCultureTab country={ country } save={ save }/>
                  </Grid>
                </Grid>
              </>
            )
        )
      }
    </>
  )
}

export default CountryPage;
