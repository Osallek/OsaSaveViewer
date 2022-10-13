import { intl } from 'index';
import { Save, SaveColor, SaveCountry, SaveHeir, SaveLeader, SaveMonarch, SaveProvince, SaveQueen, SaveWar } from 'types/api.types';
import {
  DEV_GRADIENT, DEVASTATION_GRADIENT, EMPTY_COLOR, getGradient, GREEN_COLOR, HRE_ELECTOR_COLOR, HRE_EMPEROR_COLOR, PROSPERITY_GRADIENT
} from 'utils/colors.utils';
import { colorToHex, formatDate, formatNumber } from 'utils/format.utils';
import {
  getArea, getAreaState, getCHistory, getCountries, getCountry, getCountryName, getCountrysName, getCulture, getCultureName, getEmperor, getGood, getGoodName,
  getInstitName, getOverlord, getPHistory, getProvinceLosses, getReligion, getReligionName, getSubjects, getSubjectTypeName, getTradeNode, getTradeNodeName,
  getTradeNodesName,
  getWar
} from 'utils/save.utils';

export enum MapMode {
  POLITICAL = 'POLITICAL',
  PLAYERS = 'PLAYERS',
  RELIGION = 'RELIGION',
  DEVELOPMENT = 'DEVELOPMENT',
  HRE = 'HRE',
  GREAT_POWER = 'GREAT_POWER',
  INSTITUTION = 'INSTITUTION',
  TECHNOLOGY = 'TECHNOLOGY',
  GOOD = 'GOOD',
  CULTURE = 'CULTURE',
  DEVASTATION = 'DEVASTATION',
  LOSSES = 'LOSSES',
  WAR = 'WAR',
  MANUAL_DEV = 'MANUAL_DEV',
  DIPLOMACY = 'DIPLOMACY',
  C_MANUAL_DEV = 'C_MANUAL_DEV',
  ONCE_WAR = 'ONCE_WAR',
  TRADE_NODE = 'TRADE_NODE',
}

export interface IMapMode {
  mapMode: MapMode;
  provinceColor: (province: SaveProvince, save: MapSave, data: any, countries: Array<string>) => SaveColor;
  image: string;
  allowDate: boolean;
  prepare: (save: MapSave, dataId: string | null) => any;
  selectable: boolean;
  tooltip?: (province: SaveProvince, save: MapSave, dataId: string | null) => string;
  hasTooltip: boolean;
}

export const mapModes: Record<MapMode, IMapMode> = {
  [MapMode.POLITICAL]: {
    mapMode: MapMode.POLITICAL,
    provinceColor: (province, save, data, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && !countries.includes(owner))) {
        return EMPTY_COLOR;
      }

      return getCountry(save, owner).colors.mapColor;
    },
    image: 'political',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      return `${ province.name } : ${ getCountryName(save, owner) }`;
    },
    hasTooltip: true,
  },
  [MapMode.RELIGION]: {
    mapMode: MapMode.RELIGION,
    provinceColor: (province, save, data, countries) => {
      const history = getPHistory(province, save);

      if (!history.religion || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getReligion(save, history.religion).color;
    },
    image: 'religion',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const religion = getPHistory(province, save).religion;

      if (!religion) {
        return '';
      }

      return `${ province.name } : ${ getReligionName(save, religion) }`;
    },
    hasTooltip: true,
  },
  [MapMode.DEVELOPMENT]: {
    mapMode: MapMode.DEVELOPMENT,
    provinceColor: (province, save, data: Record<number, SaveColor>, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
      let color = Object.values(data)[0];

      for (const value in data) {
        if ((value as unknown as keyof typeof data) > dev) {
          break;
        }

        color = data[value];
      }

      return color;
    },
    image: 'development',
    allowDate: false,
    prepare: (save) => {
      let min = 3;
      let max = Number.MAX_VALUE;

      save.provinces.forEach(province => {
        const dev = (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      min = Math.max(3, min);
      max = Math.min(min + 50, max);

      const toReturn: Record<number, SaveColor> = {};
      const step = (max - min) / (DEV_GRADIENT.length - 1);

      DEV_GRADIENT.forEach((value, index) => {
        toReturn[(min + index * step) | 0] = value;
      });

      return toReturn;
    },
    selectable: true,
    tooltip: (province, save) => {
      return `${ province.name } : ${ province.baseTax ?? 0 }/${ province.baseProduction ?? 0 }/${ province.baseManpower ?? 0 } (${ (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0) })`;
    },
    hasTooltip: true,
  },
  [MapMode.HRE]: {
    mapMode: MapMode.HRE,
    provinceColor: (province, save, { electors, emperor }: { electors: Array<string>, emperor: string }, countries) => {
      const history = getPHistory(province, save);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (history && history.owner) {
        if (emperor === history.owner) {
          return HRE_EMPEROR_COLOR;
        } else if (electors.includes(history.owner)) {
          return HRE_ELECTOR_COLOR;
        }
      }

      return history.hre ? GREEN_COLOR : EMPTY_COLOR;
    },
    image: 'hre',
    allowDate: true,
    prepare: (save) => {
      return {
        electors: getCountries(save).filter(country => country.history).filter(country => getCHistory(country, save).elector).map(value => value.tag),
        emperor: getEmperor(save.hre, save.date)
      }
    },
    selectable: true,
    tooltip: (province, save) => {
      const history = getPHistory(province, save);

      if (!history.owner) {
        return '';
      }

      if (getEmperor(save.hre, save.date) === history.owner) {
        return `${ getCountryName(save, history.owner) } : ${ intl.formatMessage({ id: 'country.emperor' }) }`;
      } else if (getCountries(save).filter(country => country.history).filter(country => getCHistory(country, save).elector).map(value => value.tag).includes(history.owner)) {
        return `${ getCountryName(save, history.owner) } : ${ intl.formatMessage({ id: 'country.elector' }) }`;
      }

      return history.hre ? `${ getCountryName(save, history.owner) } : ${ intl.formatMessage({ id: 'country.hre' }) }` : '';
    },
    hasTooltip: true,
  },
  [MapMode.GREAT_POWER]: {
    mapMode: MapMode.GREAT_POWER,
    provinceColor: (province, save, data, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      return country.greatPowerRank ? country.colors.mapColor : EMPTY_COLOR;
    },
    image: 'great_power',
    allowDate: false,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      if (!country.greatPowerRank) {
        return '';
      }

      return `${ getCountrysName(country) } : ${ country.greatPowerRank }`;
    },
    hasTooltip: true,
  },
  [MapMode.INSTITUTION]: {
    mapMode: MapMode.INSTITUTION,
    provinceColor: (province, save, { gradient }: { gradient: Array<SaveColor> }, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);

      return gradient[country.nbInstitutions];
    },
    image: 'institution',
    allowDate: false,
    prepare: (save) => {
      return {
        gradient: getGradient(save.institutions.filter(value => value !== undefined && value.origin >= 0).length + 1)
      }
    },
    selectable: true,
    tooltip: (province, save) => {
      if (!province.institutions) {
        return '';
      }

      let instit = -1;

      for (let i = 0; i < province.institutions.length; i++) {
        if (province.institutions[i] >= 100) {
          instit = i;
        }
      }

      if (instit < 0) {
        return '';
      }

      return `${ province.name } : ${ getInstitName(save, instit) }`;
    },
    hasTooltip: true,
  },
  [MapMode.TECHNOLOGY]: {
    mapMode: MapMode.TECHNOLOGY,
    provinceColor: (province, save, {
      gradient,
      min,
      max
    }: { gradient: Array<SaveColor>, min: number, max: number }, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      const tech = country.admTech + country.dipTech + country.milTech;

      return gradient[Math.min((Math.max(min, max - (max - tech) * 1.5 - 1) - min) | 0, gradient.length)];
    },
    image: 'technology',
    allowDate: false,
    prepare: (save) => {
      let maxAdm = 1;
      let maxDip = 1;
      let maxMil = 1;
      let minAdm = Number.MAX_VALUE;
      let minDip = Number.MAX_VALUE;
      let minMil = Number.MAX_VALUE;

      save.countries.forEach(country => {
        if (country.alive) {
          maxAdm = Math.max(maxAdm, country.admTech);
          maxDip = Math.max(maxDip, country.dipTech);
          maxMil = Math.max(maxMil, country.milTech);
          minAdm = Math.min(minAdm, country.admTech);
          minDip = Math.min(minDip, country.dipTech);
          minMil = Math.min(minMil, country.milTech);
        }
      });

      const max = maxAdm + maxDip + maxMil;
      const min = minAdm + minDip + minMil;

      return {
        min,
        max,
        gradient: getGradient(max - min)
      }
    },
    selectable: true,
    tooltip: (province, save) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      return `${ getCountrysName(country) } : ${ country.admTech }/${ country.dipTech }/${ country.milTech }`;
    },
    hasTooltip: true,
  },
  [MapMode.GOOD]: {
    mapMode: MapMode.GOOD,
    provinceColor: (province, save, data, countries) => {
      const history = getPHistory(province, save);

      if (!history.tradeGood || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getGood(save, history.tradeGood).color;
    },
    image: 'good',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const good = getPHistory(province, save).tradeGood;

      if (!good) {
        return '';
      }

      return `${ province.name } : ${ getGoodName(save, good) }`;
    },
    hasTooltip: true,
  },
  [MapMode.CULTURE]: {
    mapMode: MapMode.CULTURE,
    provinceColor: (province, save, data, countries) => {
      const history = getPHistory(province, save);

      if (!history.culture || (countries.length > 0 && (!history.owner || !countries.includes(history.owner)))) {
        return EMPTY_COLOR;
      }

      return getCulture(save, history.culture).color;
    },
    image: 'culture',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const culture = getPHistory(province, save).culture;

      if (!culture) {
        return '';
      }

      return `${ province.name } : ${ getCultureName(save, culture) }`;
    },
    hasTooltip: true,
  },
  [MapMode.DEVASTATION]: {
    mapMode: MapMode.DEVASTATION,
    provinceColor: (province, save, data, countries) => {
      const history = getPHistory(province, save);

      if (countries.length > 0 && (!history.owner || !countries.includes(history.owner))) {
        return EMPTY_COLOR;
      }

      if (province.devastation) {
        return DEVASTATION_GRADIENT[10 - (province.devastation / 10 | 0)];
      }

      const area = getArea(save, province);

      if (!area) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save).owner;
      const state = getAreaState(area, owner);

      if (state) {
        return PROSPERITY_GRADIENT[((state.prosperity ?? 0) / 10 | 0)];
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'devastation',
    allowDate: false,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      if (province.devastation) {
        return `${ province.name } : ${ intl.formatMessage({ id: 'province.devastation' }) } : ${ formatNumber(province.devastation) }`;
      } else {
        const area = getArea(save, province);

        if (!area) {
          return '';
        }

        const owner = getPHistory(province, save).owner;
        const state = getAreaState(area, owner);

        if (state) {
          return `${ province.name } : ${ intl.formatMessage({ id: 'province.prosperity' }) } : ${ formatNumber(state.prosperity) }%`;
        } else {
          return '';
        }
      }
    },
    hasTooltip: true,
  },
  [MapMode.PLAYERS]: {
    mapMode: MapMode.PLAYERS,
    provinceColor: (province, save, data, countries) => {
      const owner = getPHistory(province, save).owner;

      if (!owner || (countries.length > 0 && (!owner || !countries.includes(owner)))) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);

      if (country.players && country.players.length > 0) {
        return country.colors.mapColor;
      }

      const overlord = getOverlord(country, save);

      return (overlord && overlord.players && overlord.players.length > 0) ? overlord.colors.mapColor : EMPTY_COLOR;
    },
    image: 'players',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      const country = getCountry(save, owner);

      if (country.players && country.players.length > 0) {
        return `${ getCountrysName(country) } : ${ country.players[0] }`;
      }

      const overlord = getOverlord(country, save);

      return (overlord && overlord.players && overlord.players.length > 0) ? `${ getCountrysName(country) } : ${ overlord.players[0] }` : '';
    },
    hasTooltip: true,
  },
  [MapMode.LOSSES]: {
    mapMode: MapMode.LOSSES,
    provinceColor: (province, save, { war, gradient, maxLosses }: { war: SaveWar, gradient: Array<SaveColor>, maxLosses: number }, countries) => {
      if (!war) {
        return EMPTY_COLOR;
      }

      const losses = getProvinceLosses(war, province.id);

      return losses === 0 ? EMPTY_COLOR : gradient[(losses / maxLosses) * 9 | 0];
    },
    image: 'manpower',
    allowDate: false,
    prepare: (save, dataId) => {
      const war = getWar(save, Number(dataId));
      const gradient = getGradient(10, colorToHex(EMPTY_COLOR), '#FF0000');
      const maxLosses = !war ? 0 : Math.max(...war.history.filter(h => h.battles && h.battles.length > 0).flatMap(h => h.battles ?? []).map(b => b.location).map(loc => getProvinceLosses(war, loc)));

      return { war, gradient, maxLosses };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      const war = getWar(save, Number(dataId));

      if (!war) {
        return '';
      }

      return `${ province.name } : ${ formatNumber(getProvinceLosses(war, province.id)) }`;
    },
    hasTooltip: true,
  },
  [MapMode.WAR]: {
    mapMode: MapMode.WAR,
    provinceColor: (province, save, { war }: { war: SaveWar }, countries) => {
      if (!war) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save, war.startDate).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (Object.keys(war.attackers).includes(owner)) {
        return {
          red: 200,
          green: 0,
          blue: 0,
          alpha: 255
        };
      } else if (Object.keys(war.defenders).includes(owner)) {
        return {
          red: 0,
          green: 200,
          blue: 0,
          alpha: 255
        };
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'diplomacy',
    allowDate: false,
    prepare: (save, dataId) => {
      return { war: getWar(save, Number(dataId)) };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      const war = getWar(save, Number(dataId));

      if (!war) {
        return '';
      }

      const owner = getPHistory(province, save, war.endDate ?? undefined).owner;

      if (!owner) {
        return '';
      }

      if (Object.keys(war.attackers).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'war.attackers' }) }`;
      } else if (Object.keys(war.defenders).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'war.defenders' }) }`;
      } else {
        return '';
      }
    },
    hasTooltip: true,
  },
  [MapMode.MANUAL_DEV]: {
    mapMode: MapMode.MANUAL_DEV,
    provinceColor: (province, save, data: Array<SaveColor>, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

      if (dev <= 0) {
        return EMPTY_COLOR;
      }

      return data[((dev / 3) - 1) | 0];
    },
    image: 'development',
    allowDate: false,
    prepare: (save) => {
      let min = Number.MAX_VALUE;
      let max = 0;

      save.provinces.forEach(province => {
        const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      return getGradient((max / 3) | 0, colorToHex(EMPTY_COLOR), "#00FF00");
    },
    selectable: true,
    tooltip: (province, save, dataId) => {
      const dev = province.improvements ? Object.values(province.improvements).reduce((s, v) => s + v, 0) : 0;

      return `${ province.name } : ${ dev }`;
    },
    hasTooltip: true,
  },
  [MapMode.DIPLOMACY]: {
    mapMode: MapMode.DIPLOMACY,
    provinceColor: (province, save, { country }: { country: SaveCountry | undefined }, countries) => {
      if (!country) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (country.tag === owner) {
        return {
          red: 0,
          green: 255,
          blue: 0,
          alpha: 255
        };
      }

      if (country.alliances && country.alliances.includes(owner)) {
        return {
          red: 97,
          green: 157,
          blue: 237,
          alpha: 255,
        };
      }

      if (country.atWarWith && country.atWarWith.includes(owner)) {
        return {
          red: 255,
          green: 0,
          blue: 0,
          alpha: 255,
        };
      }

      if (getSubjects(country, save).map(value => value.second).includes(owner)) {
        return {
          red: 88,
          green: 176,
          blue: 148,
          alpha: 255,
        };
      }

      if (country.guarantees && country.guarantees.includes(owner)) {
        return {
          red: 156,
          green: 39,
          blue: 176,
          alpha: 255,
        };
      }

      if (country.guarantedBy && country.guarantedBy.includes(owner)) {
        return {
          red: 121,
          green: 39,
          blue: 176,
          alpha: 255,
        };
      }

      if (country.royalMarriages && country.royalMarriages.includes(owner)) {
        return {
          red: 74,
          green: 20,
          blue: 140,
          alpha: 255,
        };
      }

      return EMPTY_COLOR;
    },
    image: 'diplomacy',
    allowDate: false,
    prepare: (save, dataId) => {
      return { country: dataId ? getCountry(save, dataId) : undefined };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      if (!dataId) {
        return '';
      }

      const country = getCountry(save, dataId);
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      if (country.tag === owner) {
        return getCountrysName(country);
      }

      if (country.alliances && country.alliances.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.ally' }) }`;
      }

      if (country.atWarWith && country.atWarWith.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.atWarWith' }) }`;
      }

      if (getSubjects(country, save).map(value => value.second).includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ getSubjectTypeName(save, getSubjects(country, save).find(value => value.second === owner)?.type) }`;
      }

      if (country.guarantees && country.guarantees.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.guaranty' }) }`;
      }

      if (country.guarantedBy && country.guarantedBy.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.guaranteedBy' }) }`;
      }

      if (country.royalMarriages && country.royalMarriages.includes(owner)) {
        return `${ getCountryName(save, owner) } : ${ intl.formatMessage({ id: 'country.royalMarriage' }) }`;
      }

      return '';
    },
    hasTooltip: true,
  },
  [MapMode.C_MANUAL_DEV]: {
    mapMode: MapMode.C_MANUAL_DEV,
    provinceColor: (province, save, { data, tag }: { data: Array<SaveColor>, tag: string | null }, countries) => {
      if (countries.length > 0) {
        const history = getPHistory(province, save);

        if (!history.owner || (history.owner && !countries.includes(history.owner))) {
          return EMPTY_COLOR;
        }
      }

      if (!tag) {
        return EMPTY_COLOR;
      }

      const dev = province.improvements ? province.improvements[tag] ?? 0 : 0;

      if (dev <= 0) {
        return EMPTY_COLOR;
      }

      return data[((dev / 3) - 1) | 0];
    },
    image: 'development',
    allowDate: false,
    prepare: (save, dataId) => {
      let min = Number.MAX_VALUE;
      let max = 0;

      save.provinces.forEach(province => {
        const dev = (province.improvements && dataId) ? province.improvements[dataId] ?? 0 : 0;

        if (dev < min) {
          min = dev;
        }

        if (dev > max) {
          max = dev;
        }
      });

      return { tag: dataId, data: getGradient((max / 3) | 0, colorToHex(EMPTY_COLOR), "#00FF00") };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      if (!dataId) {
        return '';
      }

      return `${ province.name } : ${ province.improvements ? province.improvements[dataId] ?? 0 : 0 }`;
    },
    hasTooltip: true,
  },
  [MapMode.ONCE_WAR]: {
    mapMode: MapMode.ONCE_WAR,
    provinceColor: (province, save, { tag }: { tag: string | null }, countries) => {
      if (!tag) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      if (owner === tag) {
        return {
          red: 0,
          green: 200,
          blue: 0,
          alpha: 255
        };
      }

      if (save.wars && save.wars.find(war => (Object.keys(war.attackers).includes(tag) && Object.keys(war.defenders).includes(owner))
        || (Object.keys(war.defenders).includes(tag) && Object.keys(war.attackers).includes(owner))) !== undefined) {
        return {
          red: 200,
          green: 0,
          blue: 0,
          alpha: 255
        };
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'war',
    allowDate: false,
    prepare: (save, dataId) => {
      return { tag: dataId };
    },
    selectable: false,
    tooltip: (province, save, dataId) => {
      if (!dataId) {
        return '';
      }

      const country = getCountry(save, dataId);
      const owner = getPHistory(province, save).owner;

      if (!owner) {
        return '';
      }

      if (owner === country.tag) {
        return getCountrysName(country);
      }

      const war = save.wars && save.wars.slice().reverse()
        .find(war => (Object.keys(war.attackers).includes(country.tag) && Object.keys(war.defenders).includes(owner))
          || (Object.keys(war.defenders).includes(country.tag) && Object.keys(war.attackers).includes(owner)));

      if (war !== undefined) {
        return `${ getCountryName(save, owner) }: ${ formatDate(war.startDate) }`;
      } else {
        return '';
      }
    },
    hasTooltip: true,
  },
  [MapMode.TRADE_NODE]: {
    mapMode: MapMode.TRADE_NODE,
    provinceColor: (province, save, data, countries) => {
      if (!province.node) {
        return EMPTY_COLOR;
      }

      const node = getTradeNode(save, province.node);

      return node ? node.color : EMPTY_COLOR;
    },
    image: 'node',
    allowDate: true,
    prepare: () => {},
    selectable: true,
    tooltip: (province, save) => {
      const node = getTradeNode(save, province.node);

      if (!node) {
        return '';
      }

      return `${ province.name } : ${ getTradeNodesName(node) }`;
    },
    hasTooltip: true,
  },
}

export type MapSave = Save & {
  currentProvinces: Map<number, ProvinceHistory>;
  currentCountries: Map<string, CountryHistory>;
}

export type ProvinceHistory = {
  date: string;
  capital?: string;
  cores?: Array<string>;
  claims?: Array<string>;
  hre?: boolean;
  baseTax?: number;
  baseProduction?: number;
  baseManpower?: number;
  tradeGood?: string;
  name?: string;
  tribalOwner?: string;
  advisor?: number;
  nativeHostileness?: number;
  nativeFerocity?: number;
  nativeSize?: number;
  owner?: string;
  controller?: string;
  discoveredBy?: Array<string>;
  culture?: string;
  religion?: string;
  city?: boolean;
  buildings?: Array<string>;
}

export type CountryHistory = {
  date: string;
  abolishedSerfdom?: boolean;
  leader?: SaveLeader;
  ideasLevel?: Record<string, string>;
  acceptedCultures?: Array<string>;
  governmentRank?: number;
  capital?: number;
  changedCountryNameFrom?: string;
  changedCountryAdjectiveFrom?: string;
  changedCountryMapcolorFrom?: SaveColor;
  admTech?: number;
  dipTech?: number;
  milTech?: number;
  governmentReforms?: string;
  primaryCulture?: string;
  government?: string;
  religion?: string;
  secondaryReligion?: string;
  technologyGroup?: string;
  unitType?: string;
  changedTagFrom?: string;
  religiousSchool?: string;
  countryFlags?: Record<string, string>;
  decisions?: Record<string, string>;
  queen?: SaveQueen;
  monarchConsort?: SaveQueen;
  monarch?: SaveMonarch;
  monarchHeir?: SaveHeir;
  heir?: SaveHeir;
  monarchForeignHeir?: SaveHeir;
  union?: number;
  tradePort?: number;
  elector?: boolean;
}
