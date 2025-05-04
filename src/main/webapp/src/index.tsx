import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import theme from 'theme';
import App from './App';
import { en, fr } from './i18n/messages';
import './index.css';

const language = navigator.language;
let locale = en.locale;
let messages = en.messages;
export let eu4Locale = en.eu4;

if (language.startsWith("fr")) {
  locale = fr.locale;
  messages = fr.messages;
  eu4Locale = fr.eu4;
}

const cache = createIntlCache();
export const intl = createIntl({
  locale,
  messages,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  onError: err => {}
}, cache);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <RawIntlProvider value={ intl }>
    <ThemeProvider theme={ theme }>
      <App/>
    </ThemeProvider>
  </RawIntlProvider>
  // </React.StrictMode>
);
