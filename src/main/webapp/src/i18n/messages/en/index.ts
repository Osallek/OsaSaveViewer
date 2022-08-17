import { Localization } from 'types/api.types';
import common from './common.i18n';
import country from './country.i18n';
import home from './home.i18n';
import map from './map.i18n'
import province from './province.i18n';
import user from './user.i18n';
import war from './war.i18n';

const en = {
  locale: 'en',
  eu4: Localization.ENGLISH,
  messages: {
    ...map,
    ...province,
    ...common,
    ...country,
    ...user,
    ...home,
    ...war,
  },
}

export default en
