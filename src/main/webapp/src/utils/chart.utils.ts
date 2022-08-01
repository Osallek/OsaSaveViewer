import { blue, blueGrey, brown, cyan, deepOrange, green, grey, orange, purple, red, teal, yellow } from '@mui/material/colors';
import amber from '@mui/material/colors/amber';
import { intl } from 'index';
import { AxisDomain } from 'recharts/types/util/types';
import { CountryPreviousSave, Expense, Income, PowerSpent, SaveCountry, SaveEstate } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { colorToHex, formatNumber, getYear, numberComparator, stringComparator } from 'utils/format.utils';
import {
  getBuildingsName, getCountries, getCountrysName, getCulture, getCulturesName, getEstate, getEstatesName, getNbBuildings, getPHistory, getPrevious,
  getProvinces, getRank, getReligion, getReligionsName
} from 'utils/save.utils';

export function incomeToColor(income: Income): string {
  switch (income) {
    case Income.TAXES:
      return green[600];

    case Income.PRODUCTION:
      return green[800];

    case Income.TRADE:
      return green[400];

    case Income.GOLD:
      return green[500];

    case Income.TARIFFS:
      return green[200];

    case Income.VASSALS:
      return green[700];

    case Income.HARBOR_FEES:
      return green[300];

    case Income.SUBSIDES:
      return green[900];
  }

  return green[300];
}

export function expenseToColor(expense: Expense): string {
  switch (expense) {
    case Expense.ADVISORS_MAINTENANCE:
      return red[600];

    case Expense.CONDOTTIERI:
    case Expense.ARMY_MAINTENANCE:
      return red[800];

    case Expense.NAVY_MAINTENANCE:
      return red[400];

    case Expense.FORTS_MAINTENANCE:
      return red[500];

    case Expense.COLONY_MAINTENANCE:
      return red[200];

    case Expense.STATE_MAINTENANCE:
      return red[700];

    case Expense.MISSIONARY_MAINTENANCE:
      return red[300];

    case Expense.SUBSIDES:
      return red[900];

    case Expense.INTERESTS:
      return red[50];

    case Expense.ADVISORS_RECRUITMENT:
      return orange[50];

    case Expense.NAVY_RECRUITMENT:
    case Expense.ARMY_RECRUITMENT:
      return orange[100];

    case Expense.BLOCUS:
    case Expense.PILLAGE:
    case Expense.HARBOR_FEES:
      return orange[200];

    case Expense.CHANGE_COLONY:
      return orange[300];

    case Expense.CORRUPTION:
      return orange[400];

    case Expense.KNOWLEDGE_SHARING:
    case Expense.EMBRACE_INSTITUTION:
      return orange[500];

    case Expense.EVENTS:
      return orange[600];

    case Expense.PEACE:
    case Expense.WAR_REPARATION:
      return orange[700];

    case Expense.GREAT_POWER_ACTIONS:
    case Expense.GIFTS:
      return orange[800];

    case Expense.GREAT_PROJECT:
    case Expense.BUILDINGS_CONSTRUCTION:
    case Expense.UPGRADE_COT:
    case Expense.INVEST_IN_TRADE_COMPANY:
    case Expense.FORTS_CONSTRUCTION:
      return red['A700'];

    case Expense.LOANS:
      return orange[900];

    case Expense.TARIFFS:
    case Expense.SEND_OFFICERS:
    case Expense.SIPHON_INCOME:
    case Expense.SUPPORT_LOYALISTS:
    case Expense.SUPPORT_REBELS:
    case Expense.VASSAL_TRIBUTE:
      return orange['A100'];
  }

  return red[300];
}

export function getIncomeStackBar(country: SaveCountry): Array<any> {
  if (!country.incomes) {
    return [];
  }

  const newState: any = {};
  Object.entries(country.incomes).filter((value, index) => index <= 7).filter(([, value]) => value > 0).forEach(([key, value]) => {
    newState[key] = value;
  })

  return [newState];
}

export function getExpenseStackBar(country: SaveCountry): Array<any> {
  if (!country.expenses) {
    return [];
  }

  const newState: any = {};
  Object.entries(country.expenses).filter((value, index) => index <= 8).filter(([, value]) => value > 0).forEach(([key, value]) => {
    newState[key] = value;
  })

  return [newState];
}

export function getTotalExpenseStackBar(country: SaveCountry): Array<any> {
  if (!country.totalExpenses) {
    return [];
  }

  const newState: any = {};
  Object.entries(country.totalExpenses).filter(([, value]) => value > 0).forEach(([key, value]) => {
    newState[key] = value;
  })

  return [newState];
}

export interface EstatePie {
  name: string;
  value: number;
  color: string;
  item?: SaveEstate;
}

export function getEstatePie(country: SaveCountry, save: MapSave): Array<EstatePie> {
  const array: EstatePie[] = [];

  if (country.estates) {
    country.estates.forEach(estate => {
      const e = getEstate(save, estate.type);

      array.push({ name: getEstatesName(e), value: estate.territory, color: colorToHex(e.color), item: estate });
    })
  }

  array.push({ name: intl.formatMessage({ id: 'country.crown' }), value: 100 - array.reduce((s, e) => s + e.value, 0), color: grey[800] });

  return array.sort((a, b) => -numberComparator(a.value, b.value));
}

export interface ManaSpentBar {
  name: string;
  type: PowerSpent;
  adm?: number;
  dip?: number;
  mil?: number;
  total: number;
  index: number;
}

export function getManaSpentBar(country: SaveCountry): Array<ManaSpentBar> {
  const array: Array<ManaSpentBar> = [];

  Object.values(PowerSpent).filter(value => !value.startsWith('USELESS')).forEach((type, index) => {
    const a: ManaSpentBar = { type, name: intl.formatMessage({ id: `country.mana.${ type }` }), total: 0, index };

    if (country.admPowerSpent && country.admPowerSpent[type] !== undefined) {
      a.adm = country.admPowerSpent[type];
    }

    if (country.dipPowerSpent && country.dipPowerSpent[type] !== undefined) {
      a.dip = country.dipPowerSpent[type];
    }

    if (country.milPowerSpent && country.milPowerSpent[type] !== undefined) {
      a.mil = country.milPowerSpent[type];
    }

    if (a.adm || a.dip || a.mil) {
      a.total = (a.adm ?? 0) + (a.dip ?? 0) + (a.mil ?? 0);
      array.push(a);
    }
  });

  return array.sort((a, b) => -numberComparator(a.total, b.total));
}

export function powerSpentToColor(powerSpent: PowerSpent): string {
  switch (powerSpent) {
    case PowerSpent.IDEAS:
      return green[500];

    case PowerSpent.TECHNOLOGY:
      return blue[500];

    case PowerSpent.STABILITY:
      return amber[500];

    case PowerSpent.DEVELOPMENT:
      return green[300];

    case PowerSpent.SEIZE_COLONY:
    case PowerSpent.BURN_COLONY:
      return red[900];

    case PowerSpent.KILL_NATIVES:
    case PowerSpent.HARSH_TREATMENT:
    case PowerSpent.SCORCHING_EARTH:
      return red[300];

    case PowerSpent.PEACE_DEAL:
      return orange[400];

    case PowerSpent.REDUCE_INFLATION:
    case PowerSpent.REDUCING_WAR_EXHAUSTION:
      return orange[700];

    case PowerSpent.MOVE_CAPITAL:
    case PowerSpent.MOVE_TRADE_CAPITAL:
      return amber[800];

    case PowerSpent.CORING:
      return amber[300];

    case PowerSpent.REMOVE_RIVALRY:
      return orange[200];

    case PowerSpent.CULTURE_CONVERSION:
    case PowerSpent.PROMOTE_CULTURE:
    case PowerSpent.DEMOTE_CULTURE:
    case PowerSpent.SET_PRIMARY_CULTURE:
    case PowerSpent.FORCE_CULTURE:
      return orange[900];

    case PowerSpent.INCREASE_TARIFFS:
    case PowerSpent.CREATE_TRADE_POST:
    case PowerSpent.DECREASE_TARIFFS:
      return deepOrange[700];

    case PowerSpent.SIBERIAN_FRONTIER:
      return deepOrange[500];

    case PowerSpent.MERCANTILISM:
      return green[800];

    case PowerSpent.BARRAGING:
    case PowerSpent.SORTIE_FROM_SIEGE:
    case PowerSpent.BUILD_SUPPLY_DEPOT:
    case PowerSpent.NAVAL_BARRAGING:
    case PowerSpent.FORCING_MARCH:
    case PowerSpent.ASSAULTING:
      return grey[700];

    case PowerSpent.STRENGTHEN_GOVERNMENT:
    case PowerSpent.MILITARIZATION:
    case PowerSpent.PROMOTE_FACTION:
      return blueGrey[900];

    case PowerSpent.OTHER_37:
    case PowerSpent.OTHER_44:
      return teal[800];

    case PowerSpent.HIRING_GENERAL:
      return blueGrey[500];

    case PowerSpent.USELESS_19:
    case PowerSpent.USELESS_24:
    case PowerSpent.USELESS_31:
    case PowerSpent.USELESS_40:
    case PowerSpent.USELESS_BUY_GENERAL:
    case PowerSpent.USELESS_BUY_ADMIRAL:
    case PowerSpent.USELESS_BUY_CONQUISTADOR:
    case PowerSpent.USELESS_BUY_EXPLORER:
    case PowerSpent.USELESS_FORCE_MARCH:
      return 'white';
  }
}

export interface BuildingBar {
  name: string;
  type: string;
  value: number;
}

export function getBuildingsBar(country: SaveCountry, save: MapSave): Array<BuildingBar> {
  return save.buildings.map(building => {
    return {
      name: getBuildingsName(building),
      type: building.name,
      value: getNbBuildings(country, save, building.name),
    }
  }).filter(value => value.value > 0).sort((a, b) => stringComparator(a.name, b.name));
}

export interface ReligionPie {
  name: string;
  type: string;
  value: number;
  dev: number;
  color: string;
}

export function getReligionsPie(country: SaveCountry, save: MapSave): Array<ReligionPie> {
  const record: Record<string, ReligionPie> = {};

  getProvinces(country, save).forEach(province => {
    const religion = getPHistory(province, save).religion;

    if (religion) {
      let element = record[religion];

      if (element) {
        element.value = element.value + 1;
        element.dev = element.dev + (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
      } else {
        const r = getReligion(save, religion);

        record[religion] = {
          name: getReligionsName(r),
          type: religion,
          value: 1,
          dev: (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0),
          color: colorToHex(r.color)
        };
      }
    }
  });

  return Object.values(record).sort((a, b) => -numberComparator(a.value, b.value));
}

export interface CulturePie {
  name: string;
  type: string;
  value: number;
  dev: number;
  color: string;
}

export function getCulturesPie(country: SaveCountry, save: MapSave): Array<CulturePie> {
  const record: Record<string, CulturePie> = {};

  getProvinces(country, save).forEach(province => {
    const culture = getPHistory(province, save).culture;

    if (culture) {
      let element = record[culture];

      if (element) {
        element.value = element.value + 1;
        element.dev = element.dev + (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
      } else {
        const c = getCulture(save, culture);

        record[culture] = {
          name: getCulturesName(c),
          type: culture,
          value: 1,
          dev: (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0),
          color: colorToHex(c.color)
        };
      }
    }
  });

  return Object.values(record).sort((a, b) => -numberComparator(a.value, b.value));
}

export interface HistoryLine {
  year: number;
  value: number;
}

export function getIncomeLine(country: SaveCountry): Array<HistoryLine> {
  const lines: Array<HistoryLine> = [];

  if (country.incomeStatistics) {
    Object.entries(country.incomeStatistics).forEach(([key, value]) => {
      const year = parseInt(key);

      lines.push({ year, value })
    })
  }

  return lines.sort((a, b) => numberComparator(a.year, b.year));
}

export function getNbProvincesLine(country: SaveCountry): Array<HistoryLine> {
  const lines: Array<HistoryLine> = [];

  if (country.nationSizeStatistics) {
    Object.entries(country.nationSizeStatistics).forEach(([key, value]) => {
      const year = parseInt(key);

      lines.push({ year, value })
    })
  }

  return lines.sort((a, b) => numberComparator(a.year, b.year));
}

export interface SaveGradient {
  percent: number;
  color: string;
}

export function getSavesGradient(save: MapSave): Array<SaveGradient> {
  const array: Array<SaveGradient> = [{ percent: 0, color: green[500] }];

  if (save.previousSaves && save.previousSaves.length > 0) {
    const startYear = getYear(save.startDate);
    const endYear = getYear(save.date);

    save.previousSaves.forEach((previousSave, index) => {
      array.push({ percent: (getYear(previousSave.date) - startYear) / (endYear - startYear), color: array[array.length - 1].color });
      array.push({ percent: (getYear(previousSave.date) - startYear) / (endYear - startYear), color: saveToColor(index) });
    });
  }

  array.push({ percent: 100, color: array[array.length - 1].color });

  return array;
}

export function saveToColor(index: number): string {
  switch (index % 10) {
    case 0:
      return '#000000';

    case 1:
      return blue[500];

    case 2:
      return brown[500];

    case 3:
      return yellow[500];

    case 4:
      return grey[700];

    case 5:
      return purple[700];

    case 6:
      return teal[800];

    case 7:
      return orange[600];

    case 8:
      return cyan[600];

    case 9:
      return red[500];
  }

  return green[500];
}

export interface PreviousBar {
  name: string;
  value: number;
  index: number;
  rank: number;
  progress?: number;
}

export function getPreviousBar(country: SaveCountry, save: MapSave, mapper: (previous: CountryPreviousSave) => number, current: (country: SaveCountry) => number): Array<PreviousBar> {
  if (!country.previousSaves || country.previousSaves.length === 0) {
    return [{
      name: `${ intl.formatMessage({ id: 'common.save' }) } 1`,
      value: current(country),
      index: 1,
      rank: getRank(save, country, c => current(c)),
      progress: undefined
    }];
  } else {
    const array = country.previousSaves.map((value, index) => {
      const currentValue = getPrevious(country, index + 1, mapper, current);
      const previousValue = getPrevious(country, index, mapper, current);

      return {
        name: `${ intl.formatMessage({ id: 'common.save' }) } ${ index + 1 }`,
        value: mapper(value),
        index: index + 1,
        rank: getRank(save, country, c => (c.players !== undefined && c.previousSaves && c.previousSaves[index]) ? mapper(c.previousSaves[index]) : 0),
        progress: (currentValue && previousValue) ? ((currentValue / previousValue) - 1) * 100 : undefined
      };
    });

    const currentValue = getPrevious(country, country.previousSaves.length + 1, mapper, current);
    const previousValue = getPrevious(country, country.previousSaves.length + 1 - 1, mapper, current);

    array.push({
      name: `${ intl.formatMessage({ id: 'common.save' }) } ${ country.previousSaves.length + 1 }`,
      value: current(country),
      index: country.previousSaves.length + 1,
      rank: getRank(save, country, c => current(c)),
      progress: (currentValue && previousValue) ? ((currentValue / previousValue) - 1) * 100 : undefined
    });

    return array;
  }
}

export interface PreviousLine {
  [key: string]: string | number;

  name: string;
}

export function getPreviousLine(save: MapSave, mapper: (previous: CountryPreviousSave) => number, current: (country: SaveCountry) => number): Array<PreviousLine> {
  const array: Array<PreviousLine> = [];

  if (save.previousSaves && save.previousSaves.length > 0) {
    save.previousSaves.forEach((value, index) => array.push({ name: `${ intl.formatMessage({ id: 'common.save' }) } ${ index + 1 }` }));
    array.push({ name: `${ intl.formatMessage({ id: 'common.save' }) } ${ save.previousSaves.length + 1 }` });
  } else {
    array.push({ name: `${ intl.formatMessage({ id: 'common.save' }) } 1` });
  }

  getCountries(save).filter(c => c.players && c.players.length > 0)
    .sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b)))
    .forEach(c => {
      getPreviousCLine(c, save, mapper, current).forEach((value, index) => array[index][c.tag] = value);
    });

  return array;
}

export function getPreviousCLine(country: SaveCountry, save: MapSave, mapper: (previous: CountryPreviousSave) => number, current: (country: SaveCountry) => number): Array<number> {
  if (!country.previousSaves || country.previousSaves.length === 0) {
    return [getRank(save, country, c => current(c), true)];
  } else {
    const array = country.previousSaves.map(value => mapper(value));
    array.push(current(country));

    return array;
  }
}

export interface CurrentLine {
  [key: string]: number;

  total: number;
}

export function getCurrentLine(save: MapSave, tags: Array<string>, current: (country: SaveCountry) => number): CurrentLine {
  const line: CurrentLine = { total: 0 };

  getCountries(save).filter(c => c.players && c.players.length > 0).filter(c => tags.includes(c.tag))
    .forEach(c => {
      line[c.tag] = current(c);
    });

  line.total = Object.values(line).reduce((s, n) => s + n, 0);

  return line;
}

export interface SaveChart {
  previous: (previous: CountryPreviousSave) => number,
  current: (country: SaveCountry) => number,
  key: string;
  valueMapper: (n: number) => string;
  domain?: AxisDomain;
}

export const previousCharts: Array<SaveChart> = [
  {
    key: 'dev',
    previous: previous => previous.dev,
    current: country => country.dev,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'income',
    previous: previous => previous.income,
    current: country => country.income ?? 0,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'nbProvinces',
    previous: previous => previous.nbProvince,
    current: country => country.nbProvince,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'maxManpower',
    previous: previous => previous.maxManpower,
    current: country => country.maxManpower,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'armyLimit',
    previous: previous => previous.armyLimit,
    current: country => country.armyLimit,
    valueMapper: n => formatNumber(n),
  },
  {
    key: 'armyProfessionalism',
    previous: previous => previous.armyProfessionalism * 100,
    current: country => (country.armyProfessionalism ?? 0) * 100,
    valueMapper: n => `${ formatNumber(n) }%`,
    domain: [0, 100],
  },
  {
    key: 'losses',
    previous: previous => previous.losses,
    current: country => country.losses ? Object.values(country.losses).reduce((s, n) => s + n, 0) : 0,
    valueMapper: n => formatNumber(n),
  },
];