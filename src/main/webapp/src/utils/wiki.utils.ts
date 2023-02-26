import * as ENV from 'env/env';
import { Advisor, Country, Idea, IdImageLocalised, IdLocalised, Localised, Religion, Wiki } from 'types/api.types';

export function getWikiImageUrl(path: string): string {
  return `${ ENV.WIKI_BASE_URL }/images/${ path }`;
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

export function getCountry(wiki: Wiki, tag: string): Country | null {
  return wiki.countries[tag] ?? null;
}

export function getCountrysFlag(country: Country): string {
  return getFlagUrl(country.image);
}

export function getProvince(wiki: Wiki, id: number): Localised | null {
  return (wiki.provinces && wiki.provinces[id]) ?? null;
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
