import { Avatar, Grid, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { api } from 'api';
import { UserContext, UserContextProps } from 'App';
import { intl } from 'index';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRedirectUrl, STORAGE_NAME } from 'utils/steam.utils';

function SteamLogin() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useContext<UserContextProps>(UserContext);

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    handleClose();
    await api.steam.logout();
    sessionStorage.removeItem(STORAGE_NAME);
    setUser(undefined);
  }

  return (
    <Grid container alignItems='center' justifyContent='center' onMouseEnter={ event => setAnchorEl(event.currentTarget) } onMouseLeave={ handleClose }
          style={ { width: 'auto', marginLeft: 'auto' } }>
      {
        user === undefined ?
          <a href={ getRedirectUrl() }>
            <img src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/french/sits_small.png' alt='auth'/>
          </a>
          :
          <>
            <Menu
              id='simple-menu'
              anchorEl={ anchorEl }
              open={ Boolean(anchorEl) }
              onClose={ handleClose }
              MenuListProps={ { onMouseLeave: handleClose } }
              disableScrollLock
            >
              <MenuItem onClick={ handleClose } component={ Link } to={ `/user/${ user.id }` }>
                { intl.formatMessage({ id: 'user.profile' }) }
              </MenuItem>
              <MenuItem onClick={ handleLogout }>
                { intl.formatMessage({ id: 'user.logout' }) }
              </MenuItem>
            </Menu>
            {
              user.image ?
                <Avatar src={ user.image } variant='square' alt={ user.name ?? user.id }/>
                :
                <Avatar variant='square' alt={ user.name ?? user.id }/>
            }
            <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold', marginLeft: 8 } }>
              { user.name ?? user.id }
            </Typography>
          </>
      }
    </Grid>
  )
}

export default SteamLogin;
