import { intl } from 'index';
import { Localised, SaveColor } from 'types/api.types';
import { getLName } from './data.utils';

export function getYear(date: string): number {
  return parseInt(date.substring(0, date.indexOf('-')));
}

export function toRecord<T, V, K extends string | number | symbol>(array: T[], keyMapper: (t: T) => K, valueMapper: (t: T) => V): Record<K, V> {
  return array.reduce((acc, item) => (acc[keyMapper(item)] = valueMapper(item), acc), {} as Record<K, V>)
}

export function toMap<T, V, K extends string | number | symbol>(array: T[], keyMapper: (t: T) => K, valueMapper: (t: T) => V): Map<K, V> {
  return new Map(
    array.map(item => {
      return [keyMapper(item), valueMapper(item)];
    }),
  );
}

export function formatDateObject(d: Date): string {
  return `${d.getFullYear().toString().padStart(4, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

export function cleanString(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function numberComparator(a: number, b: number): number {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else {
    return 0;
  }
}

export function stringComparator(a: string, b: string): number {
  return a.localeCompare(b);
}

export function stringUComparator(a: string | undefined | null, b: string | undefined | null): number {
  if (!a && !b) {
    return 0;
  } else if (!a && b) {
    return -1;
  } else if (a && !b) {
    return 1;
  } else {
    return (a && b) ? a.localeCompare(b) : 0;
  }
}

export function stringLocalisedComparator(a: Localised, b: Localised): number {
  return stringComparator(getLName(a) ?? '', getLName(b) ?? '');
}

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function formatNumber(number: number | undefined, max: number = 2): string {
  return number !== undefined ? intl.formatNumber(number, { maximumFractionDigits: max }) : '';
}

export function formatNumberPlus(number: number | undefined, max: number = 2): string {
  if (number === undefined) {
    return '';
  } else {
    return (number > 0 ? '+' : '') + intl.formatNumber(number, { maximumFractionDigits: max });
  }
}

export function formatDate(date: string | undefined): string {
  return date ? intl.formatDate(date) : '';
}

export function formatTime(date: string | undefined): string {
  return date ? intl.formatTime(date) : '';
}

export function formatDateTime(date: string | undefined): string {
  return `${ formatDate(date) } ${ formatTime(date) }`;
}

export function round1000(v: number): number {
  return round(v, 1000);
}

export function round100(v: number): number {
  return round(v, 100);
}

export function round(v: number = 0, radix: number): number {
  return (Math.floor(v / radix) * radix) | 0;
}

export function colorToHex(color: SaveColor): string {
  return '#' + [color.red, color.green, color.blue].map(x => {
    const hex = x.toString(16);

    return hex.length === 1 ? '0' + hex : hex
  }).join('');
}

export function formatDuration(months: number | undefined): string {
  return months ? `${ intl.formatMessage({ id: 'common.duration.year' }, { years: (months / 12 | 0) }) } 
  ${ intl.formatMessage({ id: 'common.duration.month' }, { months: months % 12 }) }` : '';
}
