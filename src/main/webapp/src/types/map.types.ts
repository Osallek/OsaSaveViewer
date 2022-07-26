import { Save, SaveColor, SaveHeir, SaveLeader, SaveMonarch, SaveProvince, SaveQueen } from 'types/api.types';
import {
  DEV_GRADIENT,
  DEVASTATION_GRADIENT,
  EMPTY_COLOR,
  getGradient,
  GREEN_COLOR,
  HRE_ELECTOR_COLOR,
  HRE_EMPEROR_COLOR,
  PROSPERITY_GRADIENT
} from 'utils/colors.utils';
import { getArea, getAreaState, getCHistory, getCountry, getCulture, getEmperor, getGood, getOverlord, getPHistory, getReligion } from 'utils/save.utils';

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
  DEVASTATION = 'DEVASTATION'
}

export interface IMapMode {
  mapMode: MapMode;
  provinceColor: (province: SaveProvince, save: MapSave, date: string, data: any) => SaveColor;
  image: string;
  allowDate: boolean;
  prepare: (save: MapSave, date: string) => any
}

export const mapModes: Record<MapMode, IMapMode> = {
  [MapMode.POLITICAL]: {
    mapMode: MapMode.POLITICAL,
    provinceColor: (province, save, date) => {
      const owner = getPHistory(province, save, date).owner;

      return owner ? getCountry(save, owner).colors.mapColor : EMPTY_COLOR;
    },
    image: 'political',
    allowDate: true,
    prepare: () => {}
  },
  [MapMode.RELIGION]: {
    mapMode: MapMode.RELIGION,
    provinceColor: (province, save, date) => {
      const religion = getPHistory(province, save, date).religion;

      return religion ? getReligion(save, religion).color : EMPTY_COLOR;
    },
    image: 'religion',
    allowDate: true,
    prepare: () => {}
  },
  [MapMode.DEVELOPMENT]: {
    mapMode: MapMode.DEVELOPMENT,
    provinceColor: (province, save, date, data: Record<number, SaveColor>) => {
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
    prepare: (save, date) => {
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
    }
  },
  [MapMode.HRE]: {
    mapMode: MapMode.HRE,
    provinceColor: (province, save, date, { electors, emperor }: { electors: Array<string>, emperor: string }) => {
      const history = getPHistory(province, save, date);

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
    prepare: (save, date) => {
      return {
        electors: save.countries.filter(country => country.history).filter(country => getCHistory(country, date, save).elector).map(value => value.tag),
        emperor: getEmperor(save.hre, date)
      }
    }
  },
  [MapMode.GREAT_POWER]: {
    mapMode: MapMode.GREAT_POWER,
    provinceColor: (province, save, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      return country.greatPowerRank ? country.colors.mapColor : EMPTY_COLOR;
    },
    image: 'great_power',
    allowDate: false,
    prepare: () => {}
  },
  [MapMode.INSTITUTION]: {
    mapMode: MapMode.INSTITUTION,
    provinceColor: (province, save, date, { gradient }: { gradient: Array<SaveColor> }) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);

      return gradient[country.nbInstitutions];
    },
    image: 'institution',
    allowDate: false,
    prepare: (save, date) => {
      return {
        gradient: getGradient(save.institutions.filter(value => value !== undefined && value.origin >= 0).length + 1)
      }
    }
  },
  [MapMode.TECHNOLOGY]: {
    mapMode: MapMode.TECHNOLOGY,
    provinceColor: (province, save, date, {
      gradient,
      min,
      max
    }: { gradient: Array<SaveColor>, min: number, max: number }) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
        return EMPTY_COLOR;
      }

      const country = getCountry(save, owner);
      const tech = country.admTech + country.dipTech + country.milTech;

      return gradient[Math.min((Math.max(min, max - (max - tech) * 1.5 - 1) - min) | 0, gradient.length)];
    },
    image: 'technology',
    allowDate: false,
    prepare: (save, date) => {
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
    }
  },
  [MapMode.GOOD]: {
    mapMode: MapMode.GOOD,
    provinceColor: (province, save, date) => {
      const good = getPHistory(province, save, date).tradeGood;

      return good ? getGood(save, good).color : EMPTY_COLOR;
    },
    image: 'good',
    allowDate: true,
    prepare: () => {}
  },
  [MapMode.CULTURE]: {
    mapMode: MapMode.CULTURE,
    provinceColor: (province, save, date) => {
      const culture = getPHistory(province, save, date).culture;

      return culture ? getCulture(save, culture).color : EMPTY_COLOR;
    },
    image: 'culture',
    allowDate: true,
    prepare: () => {}
  },
  [MapMode.DEVASTATION]: {
    mapMode: MapMode.DEVASTATION,
    provinceColor: (province, save, date, data) => {
      if (province.devastation) {
        return DEVASTATION_GRADIENT[10 - (province.devastation / 10 | 0)];
      }

      const area = getArea(save, province);

      if (!area) {
        return EMPTY_COLOR;
      }

      const owner = getPHistory(province, save, date).owner;
      const state = getAreaState(area, owner);

      if (state) {
        return PROSPERITY_GRADIENT[((state.prosperity ?? 0) / 10 | 0)];
      } else {
        return EMPTY_COLOR;
      }
    },
    image: 'devastation',
    allowDate: false,
    prepare: () => {}
  },
  [MapMode.PLAYERS]: {
    mapMode: MapMode.PLAYERS,
    provinceColor: (province, save, date) => {
      const owner = getPHistory(province, save, date).owner;

      if (!owner) {
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
    prepare: () => {}
  },
}

export type MapSave = Save & {
  currentProvinces: Record<number, ProvinceHistory>;
  currentCountries: Record<string, CountryHistory>;
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
