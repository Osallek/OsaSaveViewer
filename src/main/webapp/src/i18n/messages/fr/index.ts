import wikiCommon from 'i18n/messages/fr//wiki/common.i18n';
import common from 'i18n/messages/fr/common.i18n';
import country from 'i18n/messages/fr/country.i18n';
import home from 'i18n/messages/fr/home.i18n';
import map from 'i18n/messages/fr/map.i18n'
import province from 'i18n/messages/fr/province.i18n';
import tradeNode from 'i18n/messages/fr/trade_node.i18n';
import user from 'i18n/messages/fr/user.i18n';
import war from 'i18n/messages/fr/war.i18n';
import wikiAdvisor from 'i18n/messages/fr/wiki/advisor.i18n';
import wikiCondition from 'i18n/messages/fr/wiki/condition.i18n';
import wikiCountry from 'i18n/messages/fr/wiki/country.i18n';
import wikiDecision from 'i18n/messages/fr/wiki/decision.i18n';
import { Localization } from 'types/api.types';
import wikiModifier from './wiki/modifier.i18n';

const fr = {
  locale: 'fr',
  eu4: Localization.FRENCH,
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
    ...wikiCondition,
    ...wikiModifier,
  },
}

export default fr
