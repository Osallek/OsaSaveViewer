import * as ENV from 'env/env';

export function getDataUrl(path: string): string {
  return `${ ENV.DATA_BASE_URL }/${ path }`;
}

export function getFlagUrl(key: string| undefined): string {
  return key ? getDataUrl(`flags/${key}.png`) : getFlagUrl('noFlag');
}

export function getReligionUrl(key: string | undefined): string {
  return key ? getDataUrl(`religions/${key}.png`) : getReligionUrl('noReligion');
}

export function getBuildingUrl(key: string | undefined): string {
  return key ? getDataUrl(`buildings/${key}.png`) : getBuildingUrl('noBuilding');
}

export function getGoodUrl(key: string | undefined): string {
  return key ? getDataUrl(`goods/${key}.png`) : getGoodUrl('noGood');
}

export function getEstateUrl(key: string | undefined): string {
  return key ? getDataUrl(`estates/${key}.png`) : getEstateUrl('noEstate');
}

export function getPrivilegeUrl(key: string | undefined): string {
  return key ? getDataUrl(`privileges/${key}.png`) : getPrivilegeUrl('noPrivilege');
}

export function getIdeaGroupUrl(key: string | undefined): string {
  return key ? getDataUrl(`idea_groups/${key}.png`) : getPrivilegeUrl('noIdeaGroup');
}

export function getIdeaUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${key}.png`) : getPrivilegeUrl('noModifier');
}

export function getPersonalityUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${key}.png`) : getPersonalityUrl('noModifier');
}

export function getLeaderPersonalityUrl(key: string | undefined): string {
  return key ? getDataUrl(`modifiers/${key}.png`) : getPersonalityUrl('noModifier');
}

export function getProvincesUrl(key: string): string {
  return getDataUrl(`provinces/${key}.png`);
}

export function getColorsUrl(key: string): string {
  return getDataUrl(`colors/${key}.png`);
}
