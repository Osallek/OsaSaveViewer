import { blueGrey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      light: '#62727F',
      main: blueGrey[800],
      dark: '#102027',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#CCCCCC',
      contrastText: blueGrey[800]
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold'
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'h4'
          },
          style: {
            fontWeight: 'bold',
          },
        }
      ]
    }
  }
});
theme = responsiveFontSizes(theme);

export default theme;
