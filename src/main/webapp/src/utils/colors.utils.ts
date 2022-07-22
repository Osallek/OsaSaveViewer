import Gradient from 'javascript-color-gradient';
import { SaveColor } from 'types/api.types';

export const OCEAN_COLOR: SaveColor = {
  red: 68,
  green: 107,
  blue: 163,
  alpha: 255
};

export const IMPASSABLE_COLOR: SaveColor = {
  red: 94,
  green: 94,
  blue: 94,
  alpha: 255
};

export const EMPTY_COLOR: SaveColor = {
  red: 148,
  green: 148,
  blue: 149,
  alpha: 255
};

export const GREEN_COLOR: SaveColor = {
  red: 0,
  green: 127,
  blue: 0,
  alpha: 255
}

export const HRE_EMPEROR_COLOR: SaveColor = {
  red: 127,
  green: 0,
  blue: 76,
  alpha: 255
}

export const HRE_ELECTOR_COLOR: SaveColor = {
  red: 153,
  green: 51,
  blue: 0,
  alpha: 255
}

export const RED_COLOR: SaveColor = {
  red: 127,
  green: 0,
  blue: 0,
  alpha: 255
}

export const DEV_GRADIENT = new Gradient().setColorGradient("#7F0000", "#00FF00").setMidpoint(11).getColors().map(hex => hexToColor(hex));
export const DEVASTATION_GRADIENT = new Gradient().setColorGradient("#FF0000", "#7F0000").setMidpoint(11).getColors().map(hex => hexToColor(hex));
export const PROSPERITY_GRADIENT = new Gradient().setColorGradient(colorToHex(EMPTY_COLOR), "#00FF00").setMidpoint(11).getColors().map(hex => hexToColor(hex));

function hexToColor(hex: string): SaveColor {
  const bigint = parseInt(hex.substring(1), 16);

  return {
    red: (bigint >> 16) & 255,
    green: (bigint >> 8) & 255,
    blue: bigint & 255,
    alpha: 255,
  }
}

function colorToHex(color: SaveColor): string {
  return '#' + [color.red, color.green, color.blue].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');
}

export function getGradient(midPoints: number, minColor: string = "#FF0000", maxColor: string = "#00FF00"): Array<SaveColor> {
  return new Gradient().setColorGradient(minColor, maxColor).setMidpoint(midPoints).getColors().map(hex => hexToColor(hex));
}
