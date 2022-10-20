import { Home, Map } from '@mui/icons-material';
import { AppBar, Backdrop, CircularProgress, Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import WarHistoryTab from 'screens/war/WarHistoryTab';
import WarInfoTab from 'screens/war/WarInfoTab';
import WarLossesTab from 'screens/war/WarLossesTab';
import WarMapTab from 'screens/war/WarMapTab';
import WarParticipantsTab from 'screens/war/WarParticipantsTab';
import theme from 'theme';
import { SaveWar } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate } from 'utils/format.utils';
import { convertSave, getWar } from 'utils/save.utils';

function WarPage() {
  const params = useParams();
  const intl = useIntl();

  const [save, setSave] = useState<MapSave>();
  const [saveId, setSaveId] = useState<string | undefined>();
  const [warId, setWarId] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [war, setWar] = useState<SaveWar | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  if (saveId !== params.id) {
    setSaveId(params.id);
  }

  if (warId != params.warId) {
    setWarId(Number(params.warId));
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
    if (save && warId) {
      const war = getWar(save, warId);

      if (!war) {
        setError(true);
      } else {
        document.title = `${ save.name } - ${ war.name }`;
        setWar(war);
      }

      setLoading(false);
    }
  }, [save, warId]);

  useEffect(() => {
    setActiveTab(Number(searchParams.get('tab') ?? '1'));
  }, [searchParams]);

  return (
    <>
      { (error || (!loading && (war === undefined || save === undefined))) ?
        (
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'common.warNotFound' }) }
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
            (save && war) &&
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
                    </Grid>
                  </Toolbar>
                  <Toolbar style={ { backgroundColor: theme.palette.primary.dark } }>
                    <Grid container alignItems='center'>
                      <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                        { war.name }
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
                    <Tab label={ intl.formatMessage({ id: 'war.tab.info' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'war.tab.map' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'war.tab.participants' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'war.tab.losses' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'war.tab.history' }) }/>
                    <Grid item style={ { flex: 1 } }/>
                  </Tabs>
                </Grid>
                <Grid container alignItems='start' justifyContent='center' style={ { padding: 24 } } key={ `grid-g-${ warId }` } ref={ containerRef }>
                  {
                    activeTab == 1 && <WarInfoTab war={ war } save={ save }/>
                  }
                  {
                    activeTab == 2 && <WarMapTab war={ war } save={ save } containerRef={ containerRef }/>
                  }
                  {
                    activeTab == 3 && <WarParticipantsTab war={ war } save={ save }/>
                  }
                  {
                    activeTab == 4 && <WarLossesTab war={ war } save={ save }/>
                  }
                  {
                    activeTab == 5 && <WarHistoryTab war={ war } save={ save }/>
                  }
                </Grid>
              </>
            )
        )
      }
    </>
  )
}

export default WarPage;
