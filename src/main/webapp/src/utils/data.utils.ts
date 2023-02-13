import * as ENV from 'env/env';
import { eu4Locale } from '../index';
import { Localised, Localization } from '../types/api.types';
import { capitalize } from './format.utils';

export function getName(localised: Localised): string | undefined {
  let name = (localised.localisations !== undefined && localised.localisations[eu4Locale] !== undefined) ?
    capitalize(localised.localisations[eu4Locale]) :
    (localised.localisations !== undefined && localised.localisations[Localization.ENGLISH] !== undefined) ?
      localised.localisations[Localization.ENGLISH] : undefined;

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
