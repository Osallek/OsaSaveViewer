import { env } from 'env/env';
import {
  Advisor, Age, AgeAbility, AgeObjective, Area, Building, ColonialRegion, Continent, Country, Disaster, Dlc, Idea,
  IdeaGroup, IdExampleLocalised, IdImageLocalised, IdLocalised, Institution, Localised, Mission, Region, Religion,
  SuperRegion, TradeGood, Wiki
} from 'types/api.types';

export function getWikiImageUrl(path: string): string {
  return `${ env.VITE_WIKI_BASE_URL }/images/${ path }`;
}

export function getFlagUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`flags/${ key }.png`) : getFlagUrl('noFlag');
}

export function getAdvisorUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`advisors/${ key }.png`) : getAdvisorUrl('noAdvisor');
}

export function getReligionUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`religions/${ key }.png`) : getReligionUrl('noReligion');
}

export function getGreatProjectUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`great-projects/${ key }.png`) : getGreatProjectUrl('noGreatProject');
}

export function getIdeaGroupUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`idea-groups/${ key }.png`) : '/eu4/wiki/idea_group.png';
}

export function getTradeGoodUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`trade-goods/${ key }.png`) : getTradeGoodUrl('noTradeGood');
}

export function getEstateUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`estates/${ key }.png`) : getEstateUrl('noEstate');
}

export function getInstitutionUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`institutions/${ key }.png`) : getInstitutionUrl('noInstitution');
}

export function getFactionUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`factions/${ key }.png`) : getFactionUrl('noFaction');
}

export function getDlcUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`dlcs/${ key }.png`) : getDlcUrl('noDlc');
}

export function getMissionUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`missions/${ key }.png`) : getMissionUrl('noMission');
}

export function getBuildingUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`buildings/${ key }.png`) : getBuildingUrl('noBuilding');
}

export function getAgeUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`ages/${ key }.png`) : getAgeUrl('noAge');
}

export function getModifierUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`modifiers/${ key }.png`) : getModifierUrl('noModifier');
}

export function getAgeAbilityUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`age-abilities/${ key }.png`) : getAgeUrl('noAgeAbility');
}

export function getAgeObjectiveUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`age-objectives/${ key }.png`) : getAgeUrl('noAgeObjective');
}

export function getDisasterUrl(key: string | undefined): string {
  return key ? getWikiImageUrl(`disasters/${ key }.png`) : getDisasterUrl('noDisaster');
}

export function getCountry(wiki: Wiki, tag: string): Country | null {
  return wiki.countries[tag] ?? null;
}

export function getCountrysFlag(country: Country): string {
  return getFlagUrl(country.image);
}

export function getProvince(wiki: Wiki, id: number): Localised | null {
  return (wiki.provinces && wiki.provinces[id]) ?? null;
}

export function getRegion(wiki: Wiki, name: string): Region | null {
  return (wiki.regions && wiki.regions[name]) ?? null;
}

export function getSuperRegion(wiki: Wiki, name: string): SuperRegion | null {
  return (wiki.superRegions && wiki.superRegions[name]) ?? null;
}

export function getArea(wiki: Wiki, name: string): Area | null {
  return (wiki.areas && wiki.areas[name]) ?? null;
}

export function getAdvisor(wiki: Wiki, name: string): Advisor | null {
  return wiki.advisors[name] ?? null;
}

export function getAdvisorImage(advisor: Advisor): string {
  return getAdvisorUrl(advisor.image);
}

export function getReligion(wiki: Wiki, name: string): Religion | null {
  return (wiki.religions && wiki.religions[name]) ?? null;
}

export function getReligionImage(religion: Religion): string {
  return getReligionUrl(religion.image);
}

export function getGreatProject(wiki: Wiki, name: string): IdImageLocalised | null {
  return (wiki.greatProjects && wiki.greatProjects[name]) ?? null;
}

export function getGreatProjectImage(greatProject: IdImageLocalised): string {
  return getGreatProjectUrl(greatProject.image);
}

export function getReligiousSchool(wiki: Wiki, name: string): IdLocalised | null {
  if (!wiki.religionGroups) {
    return null;
  }

  for (const group of Object.values(wiki.religionGroups)) {
    if (group.religiousSchools && group.religiousSchools[name]) {
      return group.religiousSchools[name];
    }
  }

  return null;
}

export function getIdea(wiki: Wiki, name: string): Idea | null {
  if (!wiki.ideaGroups) {
    return null;
  }

  for (const group of Object.values(wiki.ideaGroups)) {
    if (group.ideas && group.ideas[name]) {
      return group.ideas[name];
    }
  }

  return null;
}

export function getIdeaGroup(wiki: Wiki, name: string): IdeaGroup | null {
  return (wiki.ideaGroups && wiki.ideaGroups[name]) ?? null;
}

export function getIdeaGroupImage(group: IdeaGroup): string {
  return getIdeaGroupUrl(group.image);
}

export function getTradeGoodImage(good: TradeGood): string {
  return getTradeGoodUrl(good.image);
}

export function getEstate(wiki: Wiki, name: string): IdImageLocalised | null {
  return (wiki.estates && wiki.estates[name]) ?? null;
}

export function getEstateImage(estate: IdImageLocalised): string {
  return getEstateUrl(estate.image);
}

export function getInstitution(wiki: Wiki, name: string): Institution | null {
  return (wiki.institutions && wiki.institutions[name]) ?? null;
}

export function getInstitutionImage(institution: IdImageLocalised): string {
  return getInstitutionUrl(institution.image);
}

export function getFaction(wiki: Wiki, name: string): IdImageLocalised | null {
  return (wiki.factions && wiki.factions[name]) ?? null;
}

export function getFactionImage(faction: IdImageLocalised): string {
  return getFactionUrl(faction.image);
}

export function getDlc(wiki: Wiki, name: string): Dlc | null {
  return (wiki.dlcs && Object.values(wiki.dlcs).find(dlc => dlc.name === name)) ?? null;
}

export function getDlcImage(dlc: IdImageLocalised): string {
  return getDlcUrl(dlc.image);
}

export function getMission(wiki: Wiki, name: string): Mission | null {
  return (wiki.missions && wiki.missions[name]) ?? null;
}

export function getMissionImage(mission: IdImageLocalised): string {
  return getMissionUrl(mission.image);
}

export function getImperialIncident(wiki: Wiki, name: string): IdLocalised | null {
  return (wiki.imperialIncidents && wiki.imperialIncidents[name]) ?? null;
}

export function getIncident(wiki: Wiki, name: string): IdLocalised | null {
  return (wiki.incidents && wiki.incidents[name]) ?? null;
}

export function getContinent(wiki: Wiki, name: string): Continent | null {
  return (wiki.continents && wiki.continents[name]) ?? null;
}

export function getColonialRegion(wiki: Wiki, name: string): ColonialRegion | null {
  return (wiki.colonialRegions && wiki.colonialRegions[name]) ?? null;
}

export function getTradeGood(wiki: Wiki, name: string): TradeGood | null {
  return (wiki.tradeGoods && wiki.tradeGoods[name]) ?? null;
}

export function getIdExampleLocalised(wiki: Wiki, name: string): IdExampleLocalised | null {
  return (wiki.idExampleLocalised && wiki.idExampleLocalised[name]) ?? null;
}

export function getBuilding(wiki: Wiki, name: string): Building | null {
  return (wiki.buildings && wiki.buildings[name]) ?? null;
}

export function getBuildingImage(building: IdImageLocalised): string {
  return getBuildingUrl(building.image);
}

export function getAge(wiki: Wiki, name: string): Age | null {
  return (wiki.ages && wiki.ages[name]) ?? null;
}

export function getAgeImage(age: IdImageLocalised): string {
  return getAgeUrl(age.image);
}

export function getModifierImage(modifier: IdImageLocalised): string {
  return getModifierUrl(modifier.image);
}

export function getAgeAbility(wiki: Wiki, name: string): AgeAbility | null {
  if (!wiki.ages) {
    return null;
  }

  for (const age of Object.values(wiki.ages)) {
    if (age.abilities && age.abilities[name]) {
      return age.abilities[name];
    }
  }

  return null;
}

export function getAgeAbilityImage(age: AgeAbility): string {
  return getAgeAbilityUrl(age.image);
}

export function getAgeObjective(wiki: Wiki, name: string): AgeObjective | null {
  if (!wiki.ages) {
    return null;
  }

  for (const age of Object.values(wiki.ages)) {
    if (age.objectives && age.objectives[name]) {
      return age.objectives[name];
    }
  }

  return null;
}

export function getAgeObjectiveImage(age: AgeObjective): string {
  return getAgeObjectiveUrl(age.image);
}

export function getDisaster(wiki: Wiki, name: string): Disaster | null {
  return (wiki.disasters && wiki.disasters[name]) ?? null;
}

export function getDisasterImage(disaster: IdImageLocalised): string {
  return getDisasterUrl(disaster.image);
}

