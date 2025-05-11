import { FilterList, Launch } from '@mui/icons-material';
import {
    Autocomplete,
    Avatar,
    Card,
    CardContent,
    Checkbox,
    ClickAwayListener,
    FormControlLabel,
    GridLegacy,
    IconButton,
    Paper,
    Popper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { intl } from 'index';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CountryTableType } from 'screens/save/SaveDialog';
import { Expense, Income, Losses, PowerSpent, SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import {
    cleanString,
    formatDate,
    formatNumber,
    numberComparator,
    round,
    round1000,
    stringComparator
} from 'utils/format.utils';
import {
    getCountries,
    getCountrysFlag,
    getCountrysName,
    getCRealDev,
    getDiscipline,
    getExpense,
    getIncome,
    getLoans,
    getLosses,
    getManaSpent,
    getNbImprovements,
    getPlayer,
    getStableIncome,
    getTerritory,
    getTotalExpense,
    getTotalExpenses,
    getTotalIncome,
    getTotalTotalExpenses,
    isAdm,
    isDip,
    isMil
} from 'utils/save.utils';

const onlyPlayers = 'onlyPlayers';

interface Column {
  id: string;
  label: string;
  minWidth: number;
  value: (save: MapSave, country: SaveCountry, width?: number) => React.ReactNode;
  comparatorValue: (save: MapSave, country: SaveCountry) => number | string | undefined;
  filterValues: (save: MapSave) => Array<string | number>;
  filter: ((save: MapSave, country: SaveCountry, filter: (string | number | undefined)[]) => boolean);
}

function getNameColumn(): Column {
  return {
    id: 'name',
    label: intl.formatMessage({ id: 'country.name' }),
    minWidth: 200,
    value: (save, country, width) => (
      <GridLegacy container alignItems="center" flexWrap="nowrap" key={ `name-${ country.tag }-info` }
                  style={ { width } }>
        <Avatar src={ getCountrysFlag(country) } variant="square" component={ Paper }/>
        <Typography variant="body1" component="span"
                    style={ { whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginLeft: 8, overflow: 'hidden' } }>
          { getCountrysName(country) }
        </Typography>
        <GridLegacy item flexGrow={ 1 }/>
        <Link to={ country.tag } target="_blank" rel="noopener noreferrer">
          <Launch color="primary"/>
        </Link>
      </GridLegacy>
    ),
    comparatorValue: (save, country) => getCountrysName(country),
    filterValues: save => Array.from(
      new Set<string>(getCountries(save).map(c => getCountrysName(c)).sort(stringComparator))),
    filter: (save, country, filter) => filter.includes(getCountrysName(country)),
  };
}

function getPlayerColumn(): Column {
  return {
    id: 'player',
    label: intl.formatMessage({ id: 'country.player' }),
    minWidth: 170,
    value: (save, country) => getPlayer(country),
    comparatorValue: (save, country) => getPlayer(country),
    filterValues: save => Array.from(
      new Set<string>(getCountries(save).flatMap(c => c.players ? c.players.flat() : []).sort(stringComparator))),
    filter: (save, country, filter) => {
      if (filter === undefined || filter.length === 0) {
        return true;
      }

      if (country.players === undefined || country.players.length === 0) {
        return false;
      }

      return filter.find(value => typeof value === 'string' && country.players?.includes(value)) !== undefined;
    },
  };
}

function getColumns(type: CountryTableType, save: MapSave): Column[] {
  let col: Column[];
  let max: number;
  let radix: number;

  switch (type) {
    case CountryTableType.DEV:
      const devMax = Math.max(...getCountries(save).map(country => country.dev));
      const devRadix = devMax >= 5000 ? 1000 : devMax >= 500 ? 100 : 10;
      const realdevMax = Math.max(...getCountries(save).map(country => getCRealDev(country, save)));
      const realdevRadix = realdevMax >= 5000 ? 1000 : realdevMax >= 500 ? 100 : 10;
      const manualdevMax = Math.max(...getCountries(save).map(country => getNbImprovements(country, save)));
      const manualdevRadix = manualdevMax >= 5000 ? 1000 : manualdevMax >= 500 ? 100 : 10;

      return [
        getNameColumn(),
        {
          id: 'dev',
          label: intl.formatMessage({ id: 'country.dev' }),
          minWidth: 100,
          value: (save, country) =>
            <Typography variant="body1">
              { formatNumber(country.dev) }
            </Typography>,
          comparatorValue: (save, country) => country.dev,
          filterValues: (save) => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.dev, devRadix)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.dev, devRadix)),
        },
        {
          id: 'realdev',
          label: intl.formatMessage({ id: 'country.realDev' }),
          minWidth: 100,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getCRealDev(country, save)) }
            </Typography>
          ),
          comparatorValue: (save, country) => getCRealDev(country, save),
          filterValues: (save) => Array.from(
            new Set<number>(getCountries(save)
              .map(country => round(getCRealDev(country, save), realdevRadix))
              .sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(getCRealDev(country, save), realdevRadix)),
        },
        {
          id: 'avedev',
          label: intl.formatMessage({ id: 'country.averageDev' }),
          minWidth: 100,
          value: (save, country) =>
            <Typography variant="body1">
              { formatNumber(country.dev / country.nbProvince) }
            </Typography>,
          comparatorValue: (save, country) => country.dev / country.nbProvince,
          filterValues: (save) => Array.from(
            new Set<number>(
              getCountries(save).map(country => round(country.dev / country.nbProvince, 5)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.dev / country.nbProvince, 5)),
        },
        {
          id: 'manualdev',
          label: intl.formatMessage({ id: 'country.manualDev' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(
            getNbImprovements(country, save)) }</Typography>,
          comparatorValue: (save, country) => getNbImprovements(country, save),
          filterValues: (save) => Array.from(
            new Set<number>(getCountries(save)
              .map(country => round(getNbImprovements(country, save), manualdevRadix))
              .sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(getNbImprovements(country, save), manualdevRadix)),
        },
        getPlayerColumn(),
      ];

    case CountryTableType.INFO:
      return [
        getNameColumn(),
        {
          id: 'provinces',
          label: intl.formatMessage({ id: 'country.nbProvinces' }),
          minWidth: 100,
          value: (save, country) => (
            <Typography variant="body1">
              { country.nbProvince }
            </Typography>
          ),
          comparatorValue: (save, country) => country.nbProvince,
          filterValues: (save) => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.nbProvince, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.nbProvince, 10)),
        },
        {
          id: 'ideas',
          label: intl.formatMessage({ id: 'country.ideas' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">
            { country.ideaGroups ? Object.values(country.ideaGroups)
              .filter((value, index) => index > 0)
              .reduce((s, a) => s + a, 0) : 0 }
          </Typography>,
          comparatorValue: (save, country) => country.ideaGroups ? Object.values(country.ideaGroups)
            .filter((value, index) => index > 0)
            .reduce((s, a) => s + a, 0) : 0,
          filterValues: save => Array.from(new Set<number>(getCountries(save).map(
            c => (c.ideaGroups ? Object.values(c.ideaGroups)
              .filter((value, index) => index > 0)
              .reduce((s, a) => s + a, 0) : 0)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(
            country.ideaGroups ? Object.values(country.ideaGroups)
              .filter((value, index) => index > 0)
              .reduce((s, a) => s + a, 0) : 0),
        },
        {
          id: 'tech',
          label: intl.formatMessage({ id: 'country.tech' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">
            { `${ country.admTech ?? 0 } / ${ country.dipTech ?? 0 } / ${ country.milTech ?? 0 } ` }
          </Typography>,
          comparatorValue: (save, country) => (country.admTech ?? 0) + (country.dipTech ?? 0) + (country.milTech ?? 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(
              country => (country.admTech ?? 0) + (country.dipTech ?? 0) + (country.milTech ?? 0))
            .sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(
            (country.admTech ?? 0) + (country.dipTech ?? 0) + (country.milTech ?? 0)),
        },
        {
          id: 'prestige',
          label: intl.formatMessage({ id: 'country.prestige' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.prestige ?? 0) }</Typography>,
          comparatorValue: (save, country) => country.prestige ?? 0,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.prestige, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.prestige, 10)),
        },
        {
          id: 'innovativeness',
          label: intl.formatMessage({ id: 'country.innovativeness' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.innovativeness ?? 0) }</Typography>,
          comparatorValue: (save, country) => country.innovativeness ?? 0,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.innovativeness, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.innovativeness, 10)),
        },
        {
          id: 'pp',
          label: intl.formatMessage({ id: 'country.powerProjection' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.powerProjection ?? 0) }</Typography>,
          comparatorValue: (save, country) => country.powerProjection ?? 0,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.powerProjection, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.powerProjection, 10)),
        },
        {
          id: 'greatpower',
          label: intl.formatMessage({ id: 'country.greatPower' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ country.greatPowerRank ?? '' }</Typography>,
          comparatorValue: (save, country) => country.greatPowerRank,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => country.greatPowerRank ?? 1).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(country.greatPowerRank),
        },
        getPlayerColumn(),
      ];

    case CountryTableType.ECO:
      const incomeMax = Math.max(...getCountries(save).map(country => country.income ?? 0));
      const incomeRadix = incomeMax >= 5000 ? 1000 : incomeMax >= 500 ? 100 : 10;
      const loanMax = Math.max(...getCountries(save).map(country => getLoans(country)));
      const loanRadix = loanMax >= 5000 ? 1000 : loanMax >= 500 ? 100 : 10;

      return [
        getNameColumn(),
        {
          id: 'income',
          label: intl.formatMessage({ id: 'country.income' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(country.income) }</Typography>,
          comparatorValue: (save, country) => country.income ?? 0,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.income, incomeRadix)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.income, incomeRadix)),
        },
        {
          id: 'loans',
          label: intl.formatMessage({ id: 'country.loans' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(getLoans(country)) }</Typography>,
          comparatorValue: (save, country) => getLoans(country),
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(getLoans(country), loanRadix)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(getLoans(country), loanRadix)),
        },
        {
          id: 'inflation',
          label: intl.formatMessage({ id: 'country.inflation' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(country.inflation) }</Typography>,
          comparatorValue: (save, country) => country.inflation ?? 0,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.inflation, 2)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.inflation, 2)),
        },
        {
          id: 'mercantilism',
          label: intl.formatMessage({ id: 'country.mercantilism' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(country.mercantilism) }</Typography>,
          comparatorValue: (save, country) => country.mercantilism ?? 0,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.mercantilism, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.mercantilism, 10)),
        },
        {
          id: 'corruption',
          label: intl.formatMessage({ id: 'country.corruption' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(country.corruption) }</Typography>,
          comparatorValue: (save, country) => country.corruption ?? 0,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => round(country.corruption, 2)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.corruption, 2)),
        },
        {
          id: 'territory',
          label: intl.formatMessage({ id: 'country.territory' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(
            getTerritory(country)) + '%' }</Typography>,
          comparatorValue: (save, country) => getTerritory(country),
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(getTerritory(country), 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(getTerritory(country), 10)),
        },
        {
          id: 'lastBankrupt',
          label: intl.formatMessage({ id: 'country.lastBankrupt' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatDate(country.lastBankrupt) }</Typography>,
          comparatorValue: (save, country) => country.lastBankrupt,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).filter(country => country.lastBankrupt)
              .map(country => country.lastBankrupt ? Number.parseInt(
                country.lastBankrupt.slice(0, 4)) : 0).sort(numberComparator))),
          filter: (save, country, filter) =>
            country.lastBankrupt !== undefined && filter.includes(Number.parseInt(country.lastBankrupt.slice(0, 4))),
        },
        getPlayerColumn()
      ];

    case CountryTableType.ARMY:
      return [
        getNameColumn(),
        {
          id: 'armyMorale',
          label: intl.formatMessage({ id: 'country.armyMorale' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.armyMorale) }</Typography>,
          comparatorValue: (save, country) => country.armyMorale,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => country.armyMorale | 0).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(country.armyMorale | 0),
        },
        {
          id: 'discipline',
          label: intl.formatMessage({ id: 'country.discipline' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(getDiscipline(country)) }</Typography>,
          comparatorValue: (save, country) => getDiscipline(country),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => getDiscipline(country) | 0).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(getDiscipline(country) | 0),
        },
        {
          id: 'armyLimit',
          label: intl.formatMessage({ id: 'country.armyLimit' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.armyLimit) }</Typography>,
          comparatorValue: (save, country) => country.armyLimit,
          filterValues: save => Array.from(
            new Set<number>(
              getCountries(save).map(country => round(country.armyLimit, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.armyLimit, 10)),
        },
        {
          id: 'maxManpower',
          label: intl.formatMessage({ id: 'country.maxManpower' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(country.maxManpower) }</Typography>,
          comparatorValue: (save, country) => country.maxManpower,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.maxManpower, 10000)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.maxManpower, 10000)),
        },
        {
          id: 'armyTradition',
          label: intl.formatMessage({ id: 'country.armyTradition' }),
          minWidth: 100,
          value: (save, country) => <Typography variant="body1">{ formatNumber(
            country.armyTradition ?? 0) }</Typography>,
          comparatorValue: (save, country) => country.armyTradition ?? 0,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.armyTradition, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.armyTradition, 10)),
        },
        {
          id: 'armyProfessionalism',
          label: intl.formatMessage({ id: 'country.armyProfessionalism' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber((country.armyProfessionalism ?? 0) * 100) }</Typography>,
          comparatorValue: (save, country) => (country.armyProfessionalism ?? 0) * 100,
          filterValues: save => Array.from(
            new Set<number>(
              getCountries(save).map(country => round((country.armyProfessionalism ?? 0) * 100, 10)).sort(
                numberComparator))),
          filter: (save, country, filter) => filter.includes(round((country.armyProfessionalism ?? 0) * 100, 10)),
        },
        getPlayerColumn()
      ];

    case CountryTableType.NAVY:
      return [
        getNameColumn(),
        {
          id: 'navalMorale',
          label: intl.formatMessage({ id: 'country.navalMorale' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.navalMorale) }</Typography>,
          comparatorValue: (save, country) => country.navalMorale,
          filterValues: save => Array.from(
            new Set<number>(getCountries(save).map(country => country.navalMorale | 0).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(country.navalMorale | 0),
        },
        {
          id: 'navalLimit',
          label: intl.formatMessage({ id: 'country.navalLimit' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.navalLimit) }</Typography>,
          comparatorValue: (save, country) => country.navalLimit,
          filterValues: save => Array.from(
            new Set<number>(
              getCountries(save).map(country => round(country.navalLimit, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.navalLimit, 10)),
        },
        {
          id: 'maxSailors',
          label: intl.formatMessage({ id: 'country.maxSailors' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.maxSailors / 1000) }</Typography>,
          comparatorValue: (save, country) => country.maxSailors / 1000,
          filterValues: save => Array.from(new Set<number>(
            getCountries(save).map(country => round(country.maxSailors / 1000, 5000)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.maxSailors / 1000, 5000)),
        },
        {
          id: 'navalTradition',
          label: intl.formatMessage({ id: 'country.navalTradition' }),
          minWidth: 100,
          value: (save, country) => <Typography
            variant="body1">{ formatNumber(country.navyTradition ?? 0) }</Typography>,
          comparatorValue: (save, country) => country.navyTradition ?? 0,
          filterValues: save => Array.from(
            new Set<number>(
              getCountries(save).map(country => round(country.navyTradition ?? 0, 10)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(round(country.navyTradition ?? 0, 10)),
        },
        getPlayerColumn()
      ];

    case CountryTableType.EXP:
      col = Object.values(Expense).map((value, index) => {
        const max = Math.max(
          ...getCountries(save).map(country => country.expenses ? country.expenses[value] : 0));
        const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

        return {
          id: value,
          label: intl.formatMessage({ id: `country.expense.${ value }` }),
          minWidth: 200,
          value: (save, country) => (
            <>
              <Typography variant="body1" component="span">
                { formatNumber(country.expenses ? country.expenses[value] : 0) }
              </Typography>
            </>
          ),
          comparatorValue: (save, country) => country.expenses && country.expenses[value] ? country.expenses[value] : 0,
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round((country.expenses && country.expenses[value] ? country.expenses[value] : 0), radix))
            .sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(
            round((country.expenses && country.expenses[value] ? country.expenses[value] : 0), radix))
        };
      });

      max = Math.max(...getCountries(save)
        .flatMap(country => Object.values(Expense)
          .map(value => getExpense(country, value))
          .reduce((s, d) => s + (d ?? 0), 0)));
      radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

      return [
        getNameColumn(),
        {
          id: 'totalexp',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getTotalExpense(country)) }
            </Typography>
          ),
          comparatorValue: (save, country) => getTotalExpense(country),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getTotalExpense(country), radix))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getTotalExpense(country), radix))
        },
        ...col,
        getPlayerColumn(),
      ];

    case CountryTableType.INC:
      col = Object.values(Income).map((value, index) => {
        const max = Math.max(...getCountries(save).map(country => getIncome(country, value)));
        const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

        return {
          id: value,
          label: intl.formatMessage({ id: `country.income.${ value }` }),
          minWidth: 175,
          value: (save, country) => (
            <>
              <Typography variant="body1" component="span">
                { formatNumber(getIncome(country, value)) }
              </Typography>
              {
                index <= 7 &&
                  <Typography variant="body1" component="span" style={ { marginLeft: 8 } }>
                    { `(${ formatNumber(getIncome(country, value) * 100 / getStableIncome(country)) }%)` }
                  </Typography>
              }
            </>
          ),
          comparatorValue: (save, country) => getIncome(country, value),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getIncome(country, value), radix)).sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getIncome(country, value), radix))
        };
      });

      max = Math.max(...getCountries(save)
        .flatMap(
          country => Object.values(Income).map(value => getIncome(country, value)).reduce((s, d) => s + (d ?? 0), 0)));
      radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

      return [
        getNameColumn(),
        {
          id: 'totalinc',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getTotalIncome(country)) }
            </Typography>
          ),
          comparatorValue: (save, country) => Object.values(Income)
            .map(value => getIncome(country, value))
            .reduce((s, d) => s + (d ?? 0), 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getTotalIncome(country), radix))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getTotalIncome(country), radix))
        },
        ...col,
        getPlayerColumn(),
      ];

    case CountryTableType.TOTAL_EXP:
      col = Object.values(Expense).map((value, index) => {
        const max = Math.max(...getCountries(save).map(country => getTotalExpenses(country, value)));
        const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

        return {
          id: value,
          label: intl.formatMessage({ id: `country.expense.${ value }` }),
          minWidth: 200,
          value: (save, country) => (
            <>
              <Typography variant="body1" component="span">
                { formatNumber(getTotalExpenses(country, value)) }
              </Typography>
            </>
          ),
          comparatorValue: (save, country) => getTotalExpenses(country, value),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getTotalExpenses(country, value), radix)).sort(numberComparator))),
          filter: (save, country, filter) => filter.includes(
            round(getTotalExpenses(country, value), radix))
        };
      });

      max = Math.max(...getCountries(save)
        .flatMap(country => Object.values(Expense)
          .map(value => getTotalExpenses(country, value))
          .reduce((s, d) => s + (d ?? 0), 0)));
      radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

      return [
        getNameColumn(),
        {
          id: 'totaltotalexp',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getTotalTotalExpenses(country)) }
            </Typography>
          ),
          comparatorValue: (save, country) => Object.values(Expense)
            .map(value => getTotalExpenses(country, value))
            .reduce((s, d) => s + (d ?? 0), 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getTotalTotalExpenses(country), radix))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getTotalTotalExpenses(country), radix))
        },
        ...col,
        getPlayerColumn(),
      ];

    case CountryTableType.MANA_SPENT:
      col = Object.values(PowerSpent)
        .filter(value => !value.startsWith('USELESS') && !value.startsWith('OTHER'))
        .map(value => {
          const max = Math.max(...getCountries(save).map(country => getManaSpent(country, value) | 0));
          const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

          return {
            id: value,
            label: intl.formatMessage({ id: `country.mana.${ value }` }),
            minWidth: 250,
            value: (save, country) => (
              <>
                <GridLegacy container flexDirection="column" alignItems="center">
                  {
                    ((isAdm(value) ? 1 : 0) + (isDip(value) ? 1 : 0) + (isMil(value) ? 1 : 0) > 1) ?
                      (
                        <>
                          <Typography variant="body1">
                            { `${ formatNumber(
                              country.admPowerSpent ? country.admPowerSpent[value] : 0) } / ${ formatNumber(
                              country.dipPowerSpent ? country.dipPowerSpent[value] : 0) } / ${ formatNumber(
                              country.milPowerSpent ? country.milPowerSpent[value] : 0) }` }
                          </Typography>
                          <Typography variant="body1">
                            { `(${ formatNumber(getManaSpent(country, value)) })` }
                          </Typography>
                        </>
                      )
                      :
                      (
                        <Typography variant="body1">
                          { `${ formatNumber(
                            (isAdm(value) && country.admPowerSpent) ? country.admPowerSpent[value] :
                              ((isDip(value) && country.dipPowerSpent) ? country.dipPowerSpent[value] :
                                ((isMil(value) && country.milPowerSpent) ? country.milPowerSpent[value] :
                                  undefined))) }` }
                        </Typography>
                      )
                  }
                </GridLegacy>
              </>
            ),
            comparatorValue: (save, country) => getManaSpent(country, value),
            filterValues: save => Array.from(new Set<number>(getCountries(save)
              .map(country => round(getManaSpent(country, value), radix)).sort(numberComparator))),
            filter: (save, country, filter) =>
              filter.includes(round(getManaSpent(country, value), radix))
          };
        });

      return [
        getNameColumn(),
        {
          id: 'totalmana',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <GridLegacy container flexDirection="column" alignItems="center">
              <Typography variant="body1">
                { `${ formatNumber(
                  Object.values(PowerSpent)
                    .map(value => country.admPowerSpent ? country.admPowerSpent[value] : 0)
                    .reduce((s, d) => s + (d ?? 0), 0)) } / 
                ${ formatNumber(
                  Object.values(PowerSpent)
                    .map(value => country.dipPowerSpent ? country.dipPowerSpent[value] : 0)
                    .reduce((s, d) => s + (d ?? 0), 0)) } /
                 ${ formatNumber(
                  Object.values(PowerSpent)
                    .map(value => country.milPowerSpent ? country.milPowerSpent[value] : 0)
                    .reduce((s, d) => s + (d ?? 0), 0)) }` }
              </Typography>
              <Typography variant="body1">
                { `(${ formatNumber(Object.values(PowerSpent)
                  .map(value => getManaSpent(country, value))
                  .reduce((s, d) => s + (d ?? 0), 0)) })` }
              </Typography>
            </GridLegacy>
          ),
          comparatorValue: (save, country) => Object.values(PowerSpent).map(value => getManaSpent(country, value))
            .reduce((s, d) => s + (d ?? 0), 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round1000(
              Object.values(PowerSpent).map(value => getManaSpent(country, value)).reduce((s, d) => s + (d ?? 0), 0)))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round1000(
              Object.values(PowerSpent).map(value => getManaSpent(country, value)).reduce((s, d) => s + (d ?? 0), 0)))
        },
        ...col,
        getPlayerColumn(),
      ];

    case CountryTableType.LOSSES_ARMY:
      col = Object.values(Losses).filter((value, index) => index <= 8 && ((index + 1) % 3) !== 0).map(value => {
        const max = Math.max(...getCountries(save).map(country => getLosses(country, value) | 0));
        const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

        return {
          id: value,
          label: intl.formatMessage({ id: `country.losses.${ value }` }),
          minWidth: 250,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getLosses(country, value)) }
            </Typography>
          ),
          comparatorValue: (save, country) => getLosses(country, value),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getLosses(country, value), radix)).sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getLosses(country, value), radix))
        };
      });

      return [
        getNameColumn(),
        {
          id: 'totallossesarmy',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(
                Object.values(Losses)
                  .filter((value, index) => index <= 8)
                  .map(value => getLosses(country, value))
                  .reduce((s, d) => s + (d ?? 0), 0)) }
            </Typography>
          ),
          comparatorValue: (save, country) => Object.values(Losses)
            .filter((value, index) => index <= 8)
            .map(value => getLosses(country, value))
            .reduce((s, d) => s + (d ?? 0), 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round1000(
              Object.values(Losses)
                .filter((value, index) => index <= 8)
                .map(value => getLosses(country, value))
                .reduce((s, d) => s + (d ?? 0), 0)))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(
              round1000(Object.values(Losses)
                .filter((value, index) => index <= 8)
                .map(value => getLosses(country, value))
                .reduce((s, d) => s + (d ?? 0), 0)))
        },
        ...col,
        getPlayerColumn(),
      ];


    case CountryTableType.LOSSES_NAVY:
      col = Object.values(Losses).filter((value, index) => index > 8).map(value => {
        const max = Math.max(...getCountries(save).map(country => getLosses(country, value) | 0));
        const radix = max >= 5000 ? 1000 : max >= 500 ? 100 : 10;

        return {
          id: value,
          label: intl.formatMessage({ id: `country.losses.${ value }` }),
          minWidth: 250,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(getLosses(country, value)) }
            </Typography>
          ),
          comparatorValue: (save, country) => getLosses(country, value),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round(getLosses(country, value), radix)).sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(round(getLosses(country, value), radix))
        };
      });

      return [
        getNameColumn(),
        {
          id: 'totallossesnavy',
          label: intl.formatMessage({ id: 'common.total' }),
          minWidth: 200,
          value: (save, country) => (
            <Typography variant="body1">
              { formatNumber(
                Object.values(Losses)
                  .filter((value, index) => index > 8)
                  .map(value => getLosses(country, value))
                  .reduce((s, d) => s + (d ?? 0), 0)) }
            </Typography>
          ),
          comparatorValue: (save, country) => Object.values(Losses)
            .filter((value, index) => index > 8)
            .map(value => getLosses(country, value))
            .reduce((s, d) => s + (d ?? 0), 0),
          filterValues: save => Array.from(new Set<number>(getCountries(save)
            .map(country => round1000(
              Object.values(Losses)
                .filter((value, index) => index > 8)
                .map(value => getLosses(country, value))
                .reduce((s, d) => s + (d ?? 0), 0)))
            .sort(numberComparator))),
          filter: (save, country, filter) =>
            filter.includes(
              round1000(Object.values(Losses)
                .filter((value, index) => index > 8)
                .map(value => getLosses(country, value))
                .reduce((s, d) => s + (d ?? 0), 0)))
        },
        ...col,
        getPlayerColumn(),
      ];
  }
}

interface CountryTableProps {
  save: MapSave;
  type: CountryTableType;
  visible: boolean;
}

function CountryTable({ save, type, visible }: CountryTableProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [ columns, setColumns ] = useState<Column[]>([]);
  const [ orderBy, setOrderBy ] = useState<Column | undefined>(undefined);
  const [ order, setOrder ] = useState<'asc' | 'desc'>('asc');
  const [ countries, setCountries ] = useState<SaveCountry[]>([]);

  const [ filters, setFilters ] = useState<Record<string, (string | number)[]>>({});
  const [ filterPopoverOpen, setFilterPopoverOpen ] = useState<boolean>(false);
  const [ filterPopoverLoc, setFilterPopoverLoc ] = useState<number[]>([ 0, 0 ]);
  const [ filterPopoverColumn, setFilterPopoverColumn ] = useState<Column>(columns[0]);
  const filterPopoverDiv = useRef<HTMLDivElement>(null);

  const columnsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<FixedSizeList<SaveCountry[]>>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const handleSort = (column: Column) => {
    const isAsc = orderBy === undefined || (orderBy.id === column.id && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  if (Object.keys(filters).length > 0) {
    for (const key of Object.keys(filters)) {
      if (key !== onlyPlayers && !columns.map(value => value.id).includes(key)) {
        delete filters[key];
      }
    }
  }

  useEffect(() => {
    if (orderBy === undefined) {
      setOrderBy(columns[columns.length - 1]);
      setOrder('asc');
    }

    setCountries(getCountries(save).filter(country => {
        if (Object.keys(filters).length === 0) {
          return true;
        }

        for (const [ key, value ] of Object.entries(filters)) {
          if (key === onlyPlayers && (country.players === undefined || country.players.length === 0)) {
            return false;
          } else {
            const column = columns.find(c => c.id === key);

            if (column) {
              if (!column.filter(save, country, value)) {
                return false;
              }
            }
          }
        }

        return true;
      }).sort((a, b) => {
        let va;
        let vb;

        if (orderBy !== undefined) {
          va = orderBy.comparatorValue(save, a);
          vb = orderBy.comparatorValue(save, b);
        } else {
          const col = columns[columns.length - 1];

          if (col !== undefined) {
            va = col.comparatorValue(save, a);
            vb = col.comparatorValue(save, b);
          } else {
            return 0;
          }
        }

        if (typeof va === 'number' && typeof vb === 'number') {
          return 'asc' === order ? numberComparator(va, vb) : -numberComparator(va, vb);
        } else if (typeof va === 'string' && typeof vb === 'string') {
          return 'asc' === order ? stringComparator(va, vb) : -stringComparator(va, vb);
        } else if (va !== undefined && vb === undefined) {
          return 'asc' === order ? -1 : 1;
        } else if (va === undefined && vb !== undefined) {
          return 'asc' === order ? 1 : -1;
        }

        return 0;
      })
    );

    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, [ columns, filters, order, orderBy, save, type ]);

  useEffect(() => {
    columnsRefs.current = columnsRefs.current.slice(0, columns.length);
  }, [ columns ]);

  useEffect(() => {
    setColumns(getColumns(type, save));

    if (listRef.current) {
      listRef.current.scrollToItem(0, 'start');
    }
  }, [ type, save ]);

  useEffect(() => {
    setOrderBy(columns[columns.length - 1]);
    setOrder('asc');
  }, [ columns ]);

  const renderRow = ({ index, style }: ListChildComponentProps<SaveCountry[]>) => {
    const country = countries[index];

    return (
      <Tooltip title={ getCountrysName(country) } followCursor key={ `tooltip-${ country.tag }` }>
        <TableRow hover role="checkbox" tabIndex={ -1 } key={ country.tag }
                  style={ { ...style, backgroundColor: index % 2 === 1 ? 'white' : theme.palette.action.focus } }>
          { columns.map((column, cIndex) => {
            return (
              <TableCell key={ column.id }
                         style={ {
                           minWidth: columnsRefs.current[cIndex] ? columnsRefs.current[cIndex]?.clientWidth : column.minWidth,
                           paddingRight: cIndex === columns.length - 1 ? 0 : 16,
                           paddingLeft: cIndex === columns.length - 1 ? 8 : 16,
                           borderBottom: 'none'
                         } }>
                { column.value(save, country,
                  columnsRefs.current[cIndex] ? columnsRefs.current[cIndex]?.clientWidth : column.minWidth) }
              </TableCell>
            );
          }) }
        </TableRow>
      </Tooltip>
    );
  };

  return (
    visible &&
    <>
        <div ref={ filterPopoverDiv }
             style={ { position: 'fixed', left: filterPopoverLoc[0], top: filterPopoverLoc[1] } }/>
      {
        filterPopoverOpen && filterPopoverDiv.current &&
        (
          <ClickAwayListener onClickAway={ () => setFilterPopoverOpen(false) }>
            <Popper open
                    anchorEl={ filterPopoverDiv.current }
                    placement="bottom-start"
                    style={ { zIndex: 1500 } }
            >
              <Card style={ {
                minWidth: 300,
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
                borderStyle: 'solid'
              } }>
                <CardContent style={ { color: 'white', paddingTop: 8, paddingBottom: 8 } }>
                  <Autocomplete
                    multiple
                    disablePortal
                    options={ filterPopoverColumn.filterValues(save) }
                    getOptionLabel={ option => option.toString() }
                    groupBy={ (option) => typeof option === 'string' ? cleanString(option.slice(0, 1)).toUpperCase() : '' }
                    renderInput={ (params) =>
                      <TextField { ...params }
                                 label={ filterPopoverColumn.label }
                                 variant="filled"
                                 color="primary"
                      /> }
                    value={ filters[filterPopoverColumn.id] ?? [] }
                    onChange={ (event, newInputValue) => {
                      if (!newInputValue || newInputValue.length === 0) {
                        setFilters(prevState => {
                          const newState: Record<string, (string | number) []> = {};
                          for (let key in prevState) {
                            if (key !== filterPopoverColumn.id) {
                              newState[key] = prevState[key];
                            }
                          }

                          return newState;
                        });
                      } else {
                        setFilters(prevState => ({
                          ...prevState,
                          [filterPopoverColumn.id]: newInputValue
                        }));
                      }
                    } }
                  />
                </CardContent>
              </Card>
            </Popper>
          </ClickAwayListener>
        )
      }
        <GridLegacy>
            <FormControlLabel
                control={ <Checkbox checked={ Object.keys(filters).includes(onlyPlayers) }
                                    onChange={ (event, checked) => {
                                      if (!checked) {
                                        setFilters(prevState => {
                                          const newState: Record<string, (string | number) []> = {};
                                          for (let key in prevState) {
                                            if (key !== onlyPlayers) {
                                              newState[key] = prevState[key];
                                            }
                                          }

                                          return newState;
                                        });
                                      } else {
                                        setFilters(prevState => ({
                                          ...prevState,
                                          [onlyPlayers]: [ 'true' ]
                                        }));
                                      }
                                    } }/>
                }
                label={ intl.formatMessage({ id: 'country.onlyPlayers' }) }
                style={ { padding: 8 } }/>
        </GridLegacy>
        <TableContainer component={ Paper } style={ { height: `100%`, borderRadius: 0 } }>
            <Table style={ { width: '100%', height: `calc(100% - ${ headerRef.current?.clientHeight ?? 0 }px)` } }>
                <TableHead ref={ headerRef }>
                    <TableRow>
                      { columns.map((column, index) => (
                        <TableCell
                          key={ column.id }
                          style={ { minWidth: column.minWidth, backgroundColor: theme.palette.primary.light } }
                        >
                          <GridLegacy container alignItems="center" ref={ el => {
                            columnsRefs.current[index] = el;
                          } }
                                      style={ { flexFlow: 'nowrap' } }>
                            <IconButton
                              onClick={ (e) => {
                                setFilterPopoverLoc([ e.clientX, e.clientY + 25 ]);
                                setFilterPopoverOpen(true);
                                setFilterPopoverColumn(column);
                              } }
                              style={ { marginRight: 4, padding: 0 } }>
                              <FilterList fontSize="small"
                                          style={ { color: filters[column.id] === undefined ? theme.palette.primary.contrastText : theme.palette.primary.main } }/>
                            </IconButton>
                            <TableSortLabel
                              active={ column.id === (orderBy && orderBy.id) }
                              direction={ column.id === (orderBy && orderBy.id) ? order : 'asc' }
                              onClick={ () => handleSort(column) }
                              sx={ {
                                '& .MuiTableSortLabel-icon': {
                                  color: `${ theme.palette.primary.contrastText } !important`,
                                }
                              } }
                            >
                              <Typography variant="button"
                                          style={ { fontWeight: 'bold', color: theme.palette.primary.contrastText } }>
                                { column.label }
                              </Typography>
                            </TableSortLabel>
                          </GridLegacy>
                        </TableCell>
                      )) }
                    </TableRow>
                </TableHead>
                <AutoSizer>
                  { ({ height, width }) =>
                    <TableBody>
                      <FixedSizeList
                        height={ height ?? 0 - (headerRef.current?.clientHeight ?? 0) - 1 }
                        itemCount={ countries.length }
                        itemSize={ 72 }
                        width={ Math.max(width ?? 0, columns.reduce((s, a) => s + a.minWidth, 0)) }
                        itemData={ countries }
                        itemKey={ (index, data) => `${ data[index].tag }-${ type }` }
                        overscanCount={ 15 }
                        ref={ listRef }
                      >
                        { renderRow }
                      </FixedSizeList>
                    </TableBody>
                  }
                </AutoSizer>
            </Table>
        </TableContainer>
    </>
  );
}

export default CountryTable;
