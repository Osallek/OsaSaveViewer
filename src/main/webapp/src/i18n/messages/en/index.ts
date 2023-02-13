import wikiCommon from 'i18n/messages/en//wiki/common.i18n';
import common from 'i18n/messages/en/common.i18n';
import country from 'i18n/messages/en/country.i18n';
import home from 'i18n/messages/en/home.i18n';
import map from 'i18n/messages/en/map.i18n'
import province from 'i18n/messages/en/province.i18n';
import tradeNode from 'i18n/messages/en/trade_node.i18n';
import user from 'i18n/messages/en/user.i18n';
import war from 'i18n/messages/en/war.i18n';
import wikiAdvisor from 'i18n/messages/en/wiki/advisor.i18n';
import wikiCountry from 'i18n/messages/en/wiki/country.i18n';
import wikiDecision from 'i18n/messages/en/wiki/decision.i18n';
import { Localization } from 'types/api.types';

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
    ...tradeNode,
    ...wikiDecision,
    ...wikiCountry,
    ...wikiAdvisor,
    ...wikiCommon,
  },
}

export default en
