import { blue, blueGrey, brown, cyan, deepOrange, green, grey, orange, purple, red, teal, yellow } from '@mui/material/colors';
import amber from '@mui/material/colors/amber';
import Gradient from 'javascript-color-gradient';
import { Losses, PowerSpent, SaveColor } from 'types/api.types';

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

export const HALF_GREEN_COLOR: SaveColor = {
  red: 0,
  green: 200,
  blue: 0,
  alpha: 255
}

export const FULL_GREEN_COLOR: SaveColor = {
  red: 0,
  green: 255,
  blue: 0,
  alpha: 255
}

export const BLUE_COLOR: SaveColor = {
  red: 0,
  green: 0,
  blue: 127,
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

export const HALF_RED_COLOR: SaveColor = {
  red: 200,
  green: 0,
  blue: 0,
  alpha: 255
}

export const FULL_RED_COLOR: SaveColor = {
  red: 200,
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

export function lossesToColor(losses: Losses): string {
  switch (losses) {
    case Losses.INFANTRY_ATTRITION:
      return red[300];

    case Losses.INFANTRY_FIGHT:
      return red[700];

    case Losses.CAVALRY_ATTRITION:
      return brown[300];

    case Losses.CAVALRY_FIGHT:
      return brown[700];

    case Losses.ARTILLERY_ATTRITION:
      return blue[300];

    case Losses.ARTILLERY_FIGHT:
      return blue[700];

    case Losses.HEAVY_ATTRITION:
      return orange[300];

    case Losses.HEAVY_FIGHT:
      return orange[700];

    case Losses.HEAVY_STEAL:
      return orange[500];

    case Losses.LIGHT_ATTRITION:
      return green[300];

    case Losses.LIGHT_FIGHT:
      return green[700];

    case Losses.LIGHT_STEAL:
      return green[500];

    case Losses.GALLEY_ATTRITION:
      return teal[300];


    case Losses.GALLEY_FIGHT:
      return teal[700];

    case Losses.GALLEY_STEAL:
      return teal[500];

    case Losses.TRANSPORT_ATTRITION:
      return purple[300];

    case Losses.TRANSPORT_FIGHT:
      return purple[700];

    case Losses.TRANSPORT_STEAL:
      return purple[500];

    default:
      return 'white';
  }
}
