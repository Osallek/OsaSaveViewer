import { Theme } from '@mui/material';
import * as React from "react";
import {
  ColorNamedImageLocalised,
  NamedImageLocalised,
  NamedLocalised,
  PreviousSave,
  Save,
  SaveAdvisor,
  SaveArea,
  SaveCelestialEmpire,
  SaveColor,
  SaveContinent,
  SaveCountry,
  SaveCulture,
  SaveDiplomacy,
  SaveEmpire,
  SaveHeir,
  SaveIdeaGroup,
  SaveInstitution,
  SaveLeader,
  SaveMonarch,
  SaveProvince,
  SaveQueen,
  SaveRegion,
  SaveReligion,
  SaveSimpleProvince,
  SaveSuperRegion,
  SaveTeam,
  SaveTradeNode,
  SaveWar
} from 'types/api.types';

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
  DEVASTATION = 'DEVASTATION',
  LOSSES = 'LOSSES',
  WAR = 'WAR',
  MANUAL_DEV = 'MANUAL_DEV',
  DIPLOMACY = 'DIPLOMACY',
  C_MANUAL_DEV = 'C_MANUAL_DEV',
  ONCE_WAR = 'ONCE_WAR',
  TRADE_NODE = 'TRADE_NODE',
  BUILDINGS = 'BUILDINGS',
  GREAT_PROJECTS = 'GREAT_PROJECTS',
  AREAS = 'AREAS',
  REGIONS = 'REGIONS',
  SUPER_REGIONS = 'SUPER_REGIONS',
  CONTINENTS = 'CONTINENTS',
}

export interface IMapMode {
  mapMode: MapMode;
  provinceColor: (province: SaveProvince, save: MapSave, data: any, countries: Array<string>, date?: string) => SaveColor;
  image: string;
  allowDate: boolean;
  prepare: (save: MapSave, dataId: string | null, date?: string) => any;
  selectable: boolean;
  tooltip?: (province: SaveProvince, save: MapSave, dataId: string | null, date?: string) => string;
  hasTooltip: boolean;
  supportDate: boolean;
  selectRenderInput?: (value: string | null, save: MapSave, theme: Theme) => React.ReactNode;
  selectItems?: (save: MapSave, theme: Theme) => React.ReactNode[];
}

export type MapSave = Save & {
  currentProvinces: Map<number, ProvinceHistory>;
  currentCountries: Map<string, CountryHistory>;
  countriesMap: Map<string, SaveCountry>;
  provincesMap: Map<number, SaveProvince>;
  ready: boolean;
}

export type CleanMapSave = {
  startDate?: string;
  date?: string;
  id?: string;
  name?: string;
  provinceImage?: string;
  colorsImage?: string;
  nbProvinces?: number;
  teams?: Array<SaveTeam>;
  provinces?: Array<SaveProvince>;
  oceansProvinces?: Array<SaveSimpleProvince>;
  lakesProvinces?: Array<SaveSimpleProvince>;
  impassableProvinces?: Array<SaveSimpleProvince>;
  countries?: Array<SaveCountry>;
  areas?: Array<SaveArea>;
  regions?: Array<SaveRegion>;
  superRegions?: Array<SaveSuperRegion>;
  continents?: Array<SaveContinent>;
  advisors?: Array<SaveAdvisor>;
  cultures?: Array<SaveCulture>;
  religions?: Array<SaveReligion>;
  hre?: SaveEmpire;
  celestialEmpire?: SaveCelestialEmpire;
  institutions?: Array<SaveInstitution>;
  diplomacy?: SaveDiplomacy;
  buildings?: Array<NamedImageLocalised>;
  advisorTypes?: Array<NamedImageLocalised>;
  tradeGoods?: Array<ColorNamedImageLocalised>;
  estates?: Array<ColorNamedImageLocalised>;
  estatePrivileges?: Array<NamedImageLocalised>;
  subjectTypes?: Array<NamedLocalised>;
  ideaGroups?: Array<SaveIdeaGroup>;
  personalities?: Array<NamedImageLocalised>;
  leaderPersonalities?: Array<NamedImageLocalised>;
  previousSaves?: Array<PreviousSave>;
  wars?: Array<SaveWar>;
  tradeNodes?: Array<SaveTradeNode>;
  currentProvinces?: Map<number, ProvinceHistory>;
  currentCountries?: Map<string, CountryHistory>;
  countriesMap?: Map<string, SaveCountry>;
  provincesMap?: Map<number, SaveProvince>;
  ready?: boolean;
}

export type ProvinceHistory = {
  date: string;
  capital?: string;
  cores?: Set<string>;
  claims?: Set<string>;
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
  buildings?: Set<string>;
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
