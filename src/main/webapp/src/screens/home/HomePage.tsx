import { AppBar, Avatar, Backdrop, CircularProgress, Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { api } from 'api';
import { UserContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import SaveTable from 'screens/components/SaveTable';
import SteamLogin from 'screens/user/SteamLogin';
import { ServerSave } from 'types/api.types';

function HomePage() {
  const intl = useIntl();
  const theme = useTheme();

  const [loadingSaves, setLoadingSaves] = useState<boolean>(true);
  const [saves, setSaves] = useState<Array<ServerSave>>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.save.recent();

        setSaves(data ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingSaves(false);
      }
    })()
  }, []);

  return (
    <>
      <AppBar sx={ { position: 'relative' } }>
        <Toolbar style={ { justifyContent: 'center' } }>
          <Grid container item alignItems='center' xs={ 12 } xl={ 10 }>
            <Avatar src={ '/favicon.ico' } alt={ intl.formatMessage({ id: 'common.name' }) } variant='square'/>
            <Typography variant='h6' component='div' style={ { marginLeft: 8 } }>
              { intl.formatMessage({ id: 'common.name' }) }
            </Typography>
            <SteamLogin/>
          </Grid>
        </Toolbar>
      </AppBar>
      { loadingSaves ?
        (
          <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
            <CircularProgress color='primary'/>
          </Backdrop>
        )
        :
        (
          <Grid container justifyContent='center' style={ { padding: 24 } }>
            <Grid container item xs={ 12 } xl={ 10 }>
              <Typography variant='h4' style={ { margin: 8 } }>
                { intl.formatMessage({ id: 'common.recent' }) }
              </Typography>
              <SaveTable saves={ saves } currentUser={ user?.id } owner={ true }/>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}

export default HomePage;
