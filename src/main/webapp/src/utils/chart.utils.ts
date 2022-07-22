import { green, grey, orange, red } from '@mui/material/colors';
import { intl } from 'index';
import { Expense, Income, SaveCountry, SaveEstate } from 'types/api.types';
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
