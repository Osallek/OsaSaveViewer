import { Avatar, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatNumber } from 'utils/format.utils';
import { getCultureName, getReligionImage, getReligionName } from 'utils/save.utils';

interface CountryInfoTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryInfoTab({ country, save }: CountryInfoTabProps) {
  const intl = useIntl();

  return (
    <Card style={ { backgroundColor: theme.palette.primary.light, width: '100%' } }>
      <CardContent style={ { backgroundColor: theme.palette.primary.light } }>
        <Grid container columnSpacing={ 3 }>
          <Grid container item xs={ 6 }>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.absolutism' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { formatNumber(country.absolutism ?? 0) }
                </Typography>
                <Avatar src='/eu4/country/absolutism.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.inflation' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { formatNumber(country.inflation ?? 0) }
                </Typography>
                <Avatar src='/eu4/country/inflation.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.corruption' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { formatNumber(country.corruption ?? 0) }
                </Typography>
                <Avatar src='/eu4/country/corruption.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={ 6 }>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.powerProjection' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { formatNumber(country.powerProjection ?? 0) }
                </Typography>
                <Avatar src='/eu4/country/power_projection.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }
                        imgProps={ { style: { width: 11 } } }/>
              </Grid>
            </Grid>
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.discipline' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { `${ formatNumber((1 + country.discipline) * 100) }%` }
                </Typography>
                <Avatar src='/eu4/country/discipline.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.armyTradition' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { `${ formatNumber(country.armyTradition ?? 0) }%` }
                </Typography>
                <Avatar src='/eu4/country/land_tradition.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
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
            <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item alignItems='center'>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { intl.formatMessage({ id: 'country.navalTradition' }) }
                </Typography>
              </Grid>
              <Grid item alignItems='center'
                    style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                  { `${ formatNumber(country.navyTradition ?? 0) }%` }
                </Typography>
                <Avatar src='/eu4/country/naval_tradition.png' variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(CountryInfoTab);
