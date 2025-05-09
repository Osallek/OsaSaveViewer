import {
  GridLegacy,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import React from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import theme from 'theme';
import { Expense, Income, SaveCountry } from 'types/api.types';
import {
  expenseToColor,
  getExpenseStackBar,
  getIncomeStackBar,
  getTotalExpenseStackBar,
  incomeToColor
} from 'utils/chart.utils';
import { formatNumber, numberComparator } from 'utils/format.utils';
import { getTotalStableExpense, getTotalStableIncome, getTotalTotalExpenses } from 'utils/save.utils';

interface CountryEcoTabProps {
  country: SaveCountry;
}

function CountryEcoTab({ country }: CountryEcoTabProps) {
  const intl = useIntl();
  const totalStableIncome = getTotalStableIncome(country);
  const totalStableExpense = getTotalStableExpense(country);
  const stableDiff = totalStableIncome - totalStableExpense;

  return (
    <>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }
                  key={ `grid-incomevsexpense-${ country.tag }` }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.incomeVsExpense' }) }
        </Typography>
        <BarChart
          width={ 600 } height={ 500 }
          data={ [ { name: intl.formatMessage({ id: 'country.income' }), value: totalStableIncome },
            { name: intl.formatMessage({ id: 'country.expense' }), value: totalStableExpense } ] }
          margin={ {
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          } }
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis dataKey='value'/>
          <Tooltip formatter={ (value: number) => {
            return [ formatNumber(value), undefined ];
          } }/>
          <Bar dataKey='value' isAnimationActive={ false }>
            <Cell fill={ green[500] } key={ `cell-income` }/>
            <Cell fill={ red[500] } key={ `cell-expense` }/>
            <LabelList dataKey='value' position='middle' formatter={ (value: number) => formatNumber(value) }
                       fill='inherit' key='label-middle'/>
            <LabelList dataKey='value' position='top' fill={ stableDiff > 0 ? green[500] : red[500] }
                       formatter={ (value: number) => {
                         if (value === totalStableIncome && stableDiff > 0) {
                           return `+${ formatNumber(stableDiff) }`;
                         } else if (value === totalStableExpense && stableDiff < 0) {
                           return `${ formatNumber(stableDiff) }`;
                         }

                         return undefined;
                       } }/>
          </Bar>
        </BarChart>
      </GridLegacy>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }
                  key={ `grid-income-${ country.tag }` }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.income' }) }
        </Typography>
        <BarChart
          width={ 300 } height={ 500 }
          data={ getIncomeStackBar(country) }
          margin={ {
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          } }
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip formatter={ (value: number, name: string) => ([ `${ formatNumber(value) } (${ formatNumber(
            (100 * value) / totalStableIncome) }%)`,
            intl.formatMessage({ id: `country.income.${ name }` }) ]) }/>
          {
            country.incomes &&
            Object.entries(country.incomes).filter((value, index) => index <= 7)
              .filter(([ , value ]) => value > 0)
              .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
              .map(([ key, value ]) => (
                <Bar dataKey={ key } stackId='a' isAnimationActive={ false }
                     fill={ incomeToColor(Income[key as keyof typeof Income]) }>
                  <LabelList dataKey={ key } position='middle' fill='black'
                             formatter={ (value: number) => {
                               return value / totalStableIncome > 0.03 ? `${ formatNumber(value) } (${ formatNumber(
                                 (100 * value) / totalStableIncome) }%)` : '';
                             } }/>
                </Bar>
              ))
          }
        </BarChart>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.color' }) }</TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.type' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.value' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.percent' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { country.incomes &&
                Object.entries(country.incomes).filter((value, index) => index <= 7)
                  .filter(([ , value ]) => value > 0)
                  .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
                  .map(([ key, value ]) => (
                    <TableRow
                      key={ `${ country }-income-${ key }` }
                    >
                      <TableCell align='center'>
                        <div style={ {
                          width: 10,
                          height: 10,
                          backgroundColor: incomeToColor(Income[key as keyof typeof Income]),
                          margin: 'auto'
                        } }/>
                      </TableCell>
                      <TableCell>{ intl.formatMessage({ id: `country.income.${ key }` }) }</TableCell>
                      <TableCell align='right'>{ formatNumber(value) }</TableCell>
                      <TableCell
                        align='right'>{ `${ formatNumber((100 * value) / totalStableIncome) }%` }</TableCell>
                    </TableRow>
                  )) }
              <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
                <TableCell colSpan={ 2 } align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'common.total' }) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(totalStableIncome) }
                  </Typography>
                </TableCell>
                <TableCell style={ { borderBottom: 'none' } }/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }
                  key={ `grid-expense-${ country.tag }` }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.expense' }) }
        </Typography>
        <BarChart
          width={ 300 } height={ 500 }
          data={ getExpenseStackBar(country) }
          margin={ {
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          } }
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip formatter={ (value: number, name: string) => ([ `${ formatNumber(value) } (${ formatNumber(
            (100 * value) / totalStableExpense) }%)`,
            intl.formatMessage({ id: `country.expense.${ name }` }) ]) }/>
          {
            country.expenses &&
            Object.entries(country.expenses).filter((value, index) => index <= 8)
              .filter(([ , value ]) => value > 0)
              .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
              .map(([ key, value ]) => (
                <Bar dataKey={ key } stackId='a' isAnimationActive={ false }
                     fill={ expenseToColor(Expense[key as keyof typeof Expense]) }>
                  <LabelList dataKey={ key } position='middle' fill='black'
                             formatter={ (value: number) => {
                               return value / totalStableExpense > 0.03 ? `${ formatNumber(value) } (${ formatNumber(
                                 (100 * value) / totalStableExpense) }%)` : '';
                             } }/>
                </Bar>
              ))
          }
        </BarChart>
        <TableContainer component={ Paper } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.color' }) }</TableCell>
                <TableCell
                  style={ { color: theme.palette.primary.contrastText } }>{ intl.formatMessage({ id: 'common.type' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>{ intl.formatMessage(
                  { id: 'common.value' }) }</TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>{ intl.formatMessage(
                  { id: 'common.percent' }) }</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { country.expenses &&
                Object.entries(country.expenses).filter((value, index) => index <= 8)
                  .filter(([ key, value ]) => value > 0)
                  .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
                  .map(([ key, value ]) => (
                    <TableRow key={ `${ country }-income-${ key }` }>
                      <TableCell align='center'>
                        <div style={ {
                          width: 10,
                          height: 10,
                          backgroundColor: expenseToColor(Expense[key as keyof typeof Expense]),
                          margin: 'auto'
                        } }/>
                      </TableCell>
                      <TableCell>{ intl.formatMessage({ id: `country.expense.${ key }` }) }</TableCell>
                      <TableCell align='right'>{ formatNumber(value) }</TableCell>
                      <TableCell
                        align='right'>{ `${ formatNumber((100 * value) / totalStableExpense) }%` }</TableCell>
                    </TableRow>
                  )) }
              <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
                <TableCell colSpan={ 2 } align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'common.total' }) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(totalStableExpense) }
                  </Typography>
                </TableCell>
                <TableCell style={ { borderBottom: 'none' } }/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
      <GridLegacy container style={ { alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 8 } }
                  key={ `grid-totalexpense-${ country.tag }` }>
        <Typography variant='h6' style={ { width: '100%', textAlign: 'center', marginBottom: 8 } }>
          { intl.formatMessage({ id: 'country.totalExpense' }) }
        </Typography>
        <BarChart
          width={ 300 } height={ 1000 }
          data={ getTotalExpenseStackBar(country) }
          margin={ {
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          } }
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip formatter={ (value: number, name: string) =>
            ([ `${ formatNumber(value) } (${ formatNumber((100 * value) / getTotalTotalExpenses(country)) }%)`,
              intl.formatMessage({ id: `country.expense.${ name }` }) ]) }/>
          {
            country.totalExpenses &&
            Object.entries(country.totalExpenses).filter(([ , value ]) => value > 0)
              .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
              .map(([ key, value ]) => (
                <Bar dataKey={ key } stackId='a' isAnimationActive={ false }
                     fill={ expenseToColor(Expense[key as keyof typeof Expense]) }>
                  <LabelList dataKey={ key } position='middle' fill='black'
                             formatter={ (value: number) => {
                               return value / getTotalTotalExpenses(country) > 0.02 ? `${ formatNumber(value) } (${ formatNumber(
                                 (100 * value) / getTotalTotalExpenses(country)) }%)` : '';
                             } }/>
                </Bar>
              ))
          }
        </BarChart>
        <TableContainer component={ props => <Paper { ...props } /> } style={ { borderRadius: 0, width: 'auto' } }>
          <Table>
            <TableHead style={ { backgroundColor: theme.palette.primary.dark } }>
              <TableRow>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'common.color' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } }>
                  { intl.formatMessage({ id: 'common.type' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.value' }) }
                </TableCell>
                <TableCell style={ { color: theme.palette.primary.contrastText } } align='right'>
                  { intl.formatMessage({ id: 'common.percent' }) }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { country.totalExpenses &&
                Object.entries(country.totalExpenses).filter(([ key, value ]) => value > 0)
                  .sort(([ , valueA ], [ , valueB ]) => -numberComparator(valueA, valueB))
                  .map(([ key, value ]) => (
                    <TableRow key={ `${ country }-total-expense-${ key }` }>
                      <TableCell align='center'>
                        <div style={ {
                          width: 10,
                          height: 10,
                          backgroundColor: expenseToColor(Expense[key as keyof typeof Expense]),
                          margin: 'auto'
                        } }/>
                      </TableCell>
                      <TableCell>{ intl.formatMessage({ id: `country.expense.${ key }` }) }</TableCell>
                      <TableCell align='right'>{ formatNumber(value) }</TableCell>
                      <TableCell
                        align='right'>{ `${ formatNumber((100 * value) / getTotalTotalExpenses(country)) }%` }</TableCell>
                    </TableRow>
                  )) }
              <TableRow style={ { backgroundColor: theme.palette.primary.light } }>
                <TableCell colSpan={ 2 } align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'common.total' }) }
                  </Typography>
                </TableCell>
                <TableCell align='right' style={ { borderBottom: 'none' } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText }
                              style={ { fontWeight: 'bold' } }>
                    { formatNumber(getTotalTotalExpenses(country)) }
                  </Typography>
                </TableCell>
                <TableCell style={ { borderBottom: 'none' } }/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GridLegacy>
    </>
  )
}

export default CountryEcoTab;
