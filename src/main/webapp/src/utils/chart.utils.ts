import { blue, blueGrey, deepOrange, green, grey, lime, orange, red, teal, yellow } from '@mui/material/colors';
import amber from '@mui/material/colors/amber';
import { intl } from 'index';
import { Expense, Income, PowerSpent, SaveCountry, SaveEstate } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { colorToHex, numberComparator } from 'utils/format.utils';
import { getEstate, getEstatesName } from 'utils/save.utils';

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
