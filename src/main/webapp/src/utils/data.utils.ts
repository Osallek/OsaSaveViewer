import * as ENV from 'env/env';
import { eu4Locale } from 'index';
import { IdLocalised, Localised, Localization } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { capitalize } from './format.utils';

export const fakeTag = "---";

export const DATE_EXP = new RegExp('^-?[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$');

export function isValidDate(date?: string | null, save?: MapSave): boolean {
  if (date === undefined || date === null || !DATE_EXP.test(date)) {
    return false;
  }

  if (save) {
    return save.date >= date && save.startDate <= date;
  }

  return true;
}

export function getLName(localised: Localised | IdLocalised): string | undefined {
  return getName(localised.localisations) ?? ('id' in localised ? localised.id : undefined);
}

export function getName(localisations: Record<Localization, string>): string | undefined {
  let name = (localisations !== undefined && localisations[eu4Locale] !== undefined) ?
    capitalize(localisations[eu4Locale]) :
    (localisations !== undefined && localisations[Localization.ENGLISH] !== undefined) ?
      localisations[Localization.ENGLISH] : undefined;

  if (name) {
    name = name.replaceAll('\\n', '');
  }

  return name;
}

export function getDataUrl(path: string): string {
  return `${ ENV.DATA_BASE_URL }/${ path }`;
}

export function getWikiDataUrl(version: string, path: string): string {
  return `${ ENV.WIKI_BASE_URL }/${ version }/${ path }`;
}

export function getFlagUrl(key: string | undefined): string {
  return key ? getDataUrl(`flags/${ key }.png`) : getFlagUrl('noFlag');
}

export function getMissionUrl(key: string | undefined): string {
  return key ? getDataUrl(`missions/${ key }.png`) : getMissionUrl('noMission');
}

export function getReligionUrl(key: string | undefined): string {
  return key ? getDataUrl(`religions/${ key }.png`) : getReligionUrl('noReligion');
}

export function getBuildingUrl(key: string | undefined): string {
  return key ? getDataUrl(`buildings/${ key }.png`) : getBuildingUrl('noBuilding');
}

export function getGoodUrl(key: string | undefined): string {
  return key ? getDataUrl(`goods/${ key }.png`) : getGoodUrl('noGood');
}

export function getEstateUrl(key: string | undefined): string {
  return key ? getDataUrl(`estates/${ key }.png`) : getEstateUrl('noEstate');
}

export function getPrivilegeUrl(key: string | undefined): string {
  return key ? getDataUrl(`privileges/${ key }.png`) : getPrivilegeUrl('noPrivilege');
}

export function getIdeaGroupUrl(key: string | undefined): string {
  return key ? getDataUrl(`idea_groups/${ key }.png`) : getPrivilegeUrl('noIdeaGroup');
}

export function getIdeaUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${ key }.png`) : getPrivilegeUrl('noModifier');
}

export function getPersonalityUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${ key }.png`) : getPersonalityUrl('noModifier');
}

export function getLeaderPersonalityUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${ key }.png`) : getPersonalityUrl('noModifier');
}

export function getProvincesUrl(key: string): string {
  return getDataUrl(`provinces/${ key }.png`);
}

export function getColorsUrl(key: string): string {
  return getDataUrl(`colors/${ key }.png`);
}

export function getDecisions(version: string) {
  return getWikiDataUrl(version, 'decisions.json');
}
