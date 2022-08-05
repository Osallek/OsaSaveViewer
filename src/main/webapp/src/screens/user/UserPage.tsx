import { Home } from '@mui/icons-material';
import { AppBar, Avatar, Backdrop, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import { api } from 'api';
import { UserContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import SaveTable from 'screens/components/SaveTable';
import SteamLogin from 'screens/user/SteamLogin';
import theme from 'theme';
import { UserInfo } from 'types/api.types';

function UserPage() {
  const params = useParams();
  const intl = useIntl();

  const [pageUser, setPageUser] = useState<UserInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const { id } = params;

  let init = false;

  useEffect(() => {
    ;(async () => {
      try {
        if (id && !init) {
          init = true;
          const { data } = await api.user.one(id);

          setPageUser(data);

          if (user && id === user.id) {
            setUser(data);
          }
        } else if (!id) {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })()
  }, [id]);

  const handleDelete = async (saveId: string) => {
    if (id) {
      try {
        setLoading(true);
        await api.save.delete(saveId);

        const { data } = await api.user.one(id);

        setPageUser(data);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {
        (error || (!loading && !pageUser)) ?
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'common.userNotFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' style={ { width: 40, height: 40 } }/>
            </Link>
          </Grid>
          :
          <>
            <AppBar style={ { position: 'relative' } }>
              <Toolbar style={ { justifyContent: 'center' } }>
                <Grid container item alignItems='center' xs={ 12 } xl={ 10 }>
                  <Link to={ `/` }>
                    <Home color='secondary' style={ { width: 40, height: 40 } }/>
                  </Link>
                  <SteamLogin/>
                </Grid>
              </Toolbar>
            </AppBar>
            {
              (loading || !pageUser) ?
                <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <Grid container justifyContent='center' style={ { padding: 24 } }>
                  <Grid container item xs={ 12 } xl={ 10 }>
                    <Grid container item style={ { margin: 8 } }>
                      {
                        pageUser.image &&
                          <Avatar src={ pageUser.image } variant='square' alt={ pageUser.id }/>
                      }
                      <Typography variant='h4' component='div' style={ { marginLeft: pageUser.image ? 8 : 0 } }>
                        { pageUser.name ?? pageUser.id }
                      </Typography>
                    </Grid>
                    <SaveTable saves={ pageUser?.saves } currentUser={ user?.id } handleDelete={ handleDelete } owner={ false }/>
                  </Grid>
                </Grid>

            }
          </>
      }
    </>
  )
}

export default UserPage;
