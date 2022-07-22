import { intl } from 'index';
import { SaveColor } from 'types/api.types';

export function toRecord<T, V, K extends string | number | symbol>(array: T[], keyMapper: (t: T) => K, valueMapper: (t: T) => V): Record<K, V> {
  return array.reduce((acc, item) => (acc[keyMapper(item)] = valueMapper(item), acc), {} as Record<K, V>)
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

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function formatNumber(number: number | undefined): string {
  return number !== undefined ? intl.formatNumber(number, { maximumFractionDigits: 2 }) : '';
}

export function formatDate(date: string | undefined): string {
  return date ? intl.formatDate(date) : '';
}

export function round1000(v: number): number {
  return round(v, 1000);
}

export function round100(v: number): number {
  return round(v, 100);
}

export function round(v: number, radix: number): number {
  return (Math.floor(v / radix) * radix) | 0;
}

export function colorToHex(color: SaveColor): string {
  return '#' + [color.red, color.green, color.blue].map(x => {
    const hex = x.toString(16);

    return hex.length === 1 ? '0' + hex : hex
  }).join('');
}