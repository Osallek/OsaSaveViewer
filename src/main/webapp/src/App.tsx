import { Backdrop, CircularProgress } from '@mui/material';
import { api } from 'api';
import AppRouter from 'AppRouter';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import theme from 'theme';
import { UserInfo } from 'types/api.types';
import { STORAGE_NAME } from 'utils/steam.utils';
import './App.css';

export const UserContext = createContext<{ user: UserInfo | undefined, setUser: (user: UserInfo | undefined) => void }>({
  user: undefined,
  setUser: () => {}
});

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    ;(async () => {
      const storedUser = sessionStorage.getItem(STORAGE_NAME);
      const parsedUser: UserInfo = storedUser ? JSON.parse(storedUser) : null;

      try {
        if (!parsedUser) {
          const { data } = await api.user.profile();

          if (data) {
            setUser(data);
            sessionStorage.setItem(STORAGE_NAME, JSON.stringify(data));
          }
        } else {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  return (
    <BrowserRouter>
      {
        loading ?
          (
            <Backdrop open={ loading } style={ { backgroundColor: theme.palette.primary.light } }>
              <CircularProgress color='primary'/>
            </Backdrop>
          )
          :
          (
            <UserContext.Provider value={ { user, setUser } }>
              <AppRouter/>
            </UserContext.Provider>
          )
      }
    </BrowserRouter>
  );
}

export default App;
