import {
  AppBar,
  Avatar,
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import { api } from 'api';
import { UserContext, UserContextProps } from 'App';
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
  const { user } = useContext<UserContextProps>(UserContext);

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'common.name' });

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
              <Grid container item style={ { marginBottom: 16 } }>
                <Card style={ { width: '100%' } }>
                  <CardHeader title={ intl.formatMessage({ id: 'home.howTo' }) }
                              titleTypographyProps={ { variant: 'h4' } }
                              style={ {
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText
                              } }/>
                  <CardContent>
                    <Grid container>
                      <Grid container item flexDirection='column' xs={ 12 } lg={ 6 }>
                        <Typography gutterBottom variant='h5' component='div'>
                          { intl.formatMessage({ id: 'home.required' }) }
                        </Typography>
                        <List style={ { listStyleType: 'disc', paddingTop: 0, marginLeft: 32 } }>
                          <ListItem style={ { display: 'list-item' } }>
                            <Typography variant='body1'>
                              { `${ intl.formatMessage({ id: 'home.steam' }) } ` }
                            </Typography>
                          </ListItem>
                          <ListItem style={ { display: 'list-item' } }>
                            <Typography variant='body1'>
                              { `${ intl.formatMessage({ id: 'home.extractor' }) } ` }
                              <a href='/download-extractor' target='_blank'>
                                { intl.formatMessage({ id: 'home.extractor.download' }) }
                              </a>
                            </Typography>
                          </ListItem>
                        </List>
                        <Typography gutterBottom variant='body1' component='div'>
                          { intl.formatMessage({ id: 'home.start.1' }) }
                        </Typography>
                        <Typography gutterBottom variant='body1' component='div'>
                          { intl.formatMessage({ id: 'home.start.2' }) }
                        </Typography>
                        <div style={ { height: 32 } }/>
                        <Typography gutterBottom variant='h5' component='div'>
                          { intl.formatMessage({ id: 'home.edit' }) }
                        </Typography>
                        <List style={ { listStyleType: 'disc', paddingTop: 0, marginLeft: 32 } }>
                          <ListItem style={ { display: 'list-item' } }>
                            <Typography variant='body1'>
                              { `${ intl.formatMessage({ id: 'home.editor' }) } ` }
                              <a href='/download-editor' target='_blank'>
                                { intl.formatMessage({ id: 'home.editor.download' }) }
                              </a>
                            </Typography>
                          </ListItem>
                        </List>
                        <Typography gutterBottom variant='body1' component='div'>
                          { intl.formatMessage({ id: 'home.editor.1' }) }
                        </Typography>
                      </Grid>
                      <Grid container item justifyContent='center' xs={ 12 } lg={ 6 }>
                        <CardMedia component='img' image={ `/extractor_${ intl.locale }.png` } alt='Extractor'
                                   style={ { maxWidth: 600 } }/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid container item>
                <Typography variant='h4' style={ { margin: 8 } }>
                  { intl.formatMessage({ id: 'home.recent' }) }
                </Typography>
                <SaveTable saves={ saves } currentUser={ user?.id } owner={ true }/>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}

export default HomePage;
