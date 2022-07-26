import { eu4Locale } from 'index';
import {
  ColorNamedImageLocalised, Expense, Income, Localised, Localization, Losses, NamedImageLocalised, NamedLocalised, PowerSpent, Save, SaveArea, SaveCountry,
  SaveCountryState, SaveCulture, SaveDependency, SaveEmpire, SaveIdeaGroup, SaveLeader, SaveMonarch, SaveProvince, SaveProvinceHistory, SaveReligion
} from 'types/api.types';
import { CountryHistory, MapSave, ProvinceHistory } from 'types/map.types';
import {
  getBuildingUrl, getEstateUrl, getFlagUrl, getGoodUrl, getIdeaGroupUrl, getLeaderPersonalityUrl, getPersonalityUrl, getPrivilegeUrl, getReligionUrl
} from 'utils/data.utils';
import { capitalize, numberComparator, stringComparator, toRecord } from 'utils/format.utils';

export const fakeTag = "---";

export function convertSave(save: Save): MapSave {
  return {
    ...save,
    currentProvinces: toRecord(save.provinces, p => p.id, p => getPHistoryInternal(p, save.date)),
    currentCountries: toRecord(save.countries, c => c.tag, c => getCHistoryInternal(c, save.date)),
  }
}

export function getName(localised: Localised): string | undefined {
  return (localised.localisations !== undefined && localised.localisations[eu4Locale] !== undefined) ?
    capitalize(localised.localisations[eu4Locale]) :
    (localised.localisations !== undefined && localised.localisations[Localization.ENGLISH] !== undefined) ?
      localised.localisations[Localization.ENGLISH] : undefined;
}

export function getCountries(save: MapSave): Array<SaveCountry> {
  return save.countries.filter(c => c.tag !== fakeTag).filter(c => c.alive);
}

export function getPHistory(province: SaveProvince, save: MapSave, date: string = save.date): ProvinceHistory {
  return date === save.date ? save.currentProvinces[province.id] : getPHistoryInternal(province, date);
}

function getPHistoryInternal(province: SaveProvince, date: string): ProvinceHistory {
  let history: ProvinceHistory = { date };

  for (const h of province.history) {
    if (!h.date || h.date <= date) {
      let cores: Array<string> = (history && history.cores) ?? [];

      if (h.addCores) {
        cores = cores.concat(h.addCores);
      }

      if (h.removeCores) {
        cores = cores.filter(e => !h.removeCores?.includes(e))
      }

      let claims: Array<string> = (history && history.claims) ?? [];

      if (h.addClaims) {
        claims = claims.concat(h.addClaims);
      }

      if (h.removeClaims) {
        claims = claims.filter(e => !h.removeClaims?.includes(e))
      }

      let buildings: Array<string> = (history && history.buildings) ?? [];

      if (h.buildings) {
        Object.entries(h.buildings).forEach(([key, value]) => {
          if (value) {
            buildings.concat(key);
          } else {
            buildings.filter(item => item !== key)
          }
        })
      }

      history = {
        ...(typeof history === 'object' ? history : {}),
        ...h,
        owner: fakeTag === h.owner ? undefined : (h.owner ?? history.owner),
        cores,
        claims,
        buildings
      };
    } else {
      break;
    }
  }

  return history;
}

export function getProvince(save: MapSave, id: number): SaveProvince | null {
  return save.provinces.find(province => id === province.id) ?? null;
}

export function getPDev(province: SaveProvince): number {
  return (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
}

export function getPRealDev(province: SaveProvince): number {
  return ((province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0)) * (100 - (province.autonomy ?? 0)) / 100;
}

export function getProvinces(country: SaveCountry, save: MapSave, selectedDate: string = save.date): SaveProvince[] {
  return save.provinces.filter(p => country.tag === getPHistory(p, save, selectedDate).owner);
}

export function getCRealDev(country: SaveCountry, save: MapSave, selectedDate: string): number {
  return getProvinces(country, save, selectedDate).reduce((s, p) => s + getPRealDev(p), 0);
}

export function getNbImprovements(country: SaveCountry, save: MapSave, selectedDate: string): number {
  return getProvinces(country, save, selectedDate)
    .reduce((s, p) => s + (p.improvements && p.improvements[country.tag] ? p.improvements[country.tag] : 0), 0);
}

export function getCountry(save: MapSave, tag: string): SaveCountry {
  return save.countries.find(country => tag === country.tag) ?? save.countries[0];
}

export function getCountryName(save: MapSave, tag: string | undefined): string {
  if (!tag || tag === fakeTag) {
    return '';
  }

  return getCountrysName(getCountry(save, tag));
}

export function getCountrysName(country: SaveCountry): string {
  if (country.customName) {
    return country.customName;
  } else {
    return getName(country) ?? country.tag;
  }
}

export function getCountrysFlag(country: SaveCountry): string {
  return getFlagUrl(country.image);
}

export function getCountryFlag(save: MapSave, tag: string | undefined): string {
  if (!tag || tag === fakeTag) {
    return getFlagUrl('noFlag');
  }

  return getCountrysFlag(getCountry(save, tag));
}

export function getReligion(save: MapSave, name: string): SaveReligion {
  return save.religions.find(religion => name === religion.name) ?? save.religions[0];
}

export function getReligionName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getReligionsName(getReligion(save, name));
}

export function getReligionsName(religion: SaveReligion): string {
  return getName(religion) ?? religion.name;
}

export function getReligionsImage(religion: SaveReligion): string {
  return getReligionUrl(religion.image);
}

export function getReligionImage(save: MapSave, name: string | undefined): string {
  if (!name) {
    return getReligionUrl('noReligion');
  }

  return getReligionsImage(getReligion(save, name));
}

export function getCulture(save: MapSave, name: string): SaveCulture {
  return save.cultures.find(culture => name === culture.name) ?? save.cultures[0];
}

export function getCultureName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getCulturesName(getCulture(save, name));
}

export function getCulturesName(culture: SaveCulture): string {
  return getName(culture) ?? culture.name;
}

export function getBuilding(save: MapSave, name: string): NamedImageLocalised {
  return save.buildings.find(building => name === building.name) ?? save.buildings[0];
}

export function getBuildingName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getBuildingsName(getBuilding(save, name));
}

export function getBuildingsName(building: NamedImageLocalised): string {
  return getName(building) ?? building.name;
}

export function getBuildingsImage(building: NamedImageLocalised): string {
  return getBuildingUrl(building.image);
}

export function getBuildingImage(save: MapSave, name: string | undefined): string {
  if (!name) {
    return getBuildingUrl('noBuilding');
  }

  return getBuildingsImage(getBuilding(save, name));
}

export function getGood(save: MapSave, name: string): ColorNamedImageLocalised {
  return save.tradeGoods.find(good => name === good.name) ?? save.tradeGoods[0];
}

export function getGoodName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getGoodsName(getGood(save, name));
}

export function getGoodsName(good: ColorNamedImageLocalised): string {
  return getName(good) ?? good.name;
}

export function getGoodsImage(good: ColorNamedImageLocalised): string {
  return getGoodUrl(good.image);
}

export function getGoodImage(save: MapSave, name: string | undefined): string {
  if (!name) {
    return getGoodUrl('noGood');
  }

  return getGoodsImage(getGood(save, name));
}

export function getSubjectType(save: MapSave, name: string): NamedLocalised {
  return save.subjectTypes.find(subjectType => name === subjectType.name) ?? save.subjectTypes[0];
}

export function getSubjectTypeName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getSubjectTypesName(getSubjectType(save, name));
}

export function getSubjectTypesName(subjectType: NamedLocalised): string {
  return getName(subjectType) ?? subjectType.name;
}

export function getEstate(save: MapSave, name: string): ColorNamedImageLocalised {
  return save.estates.find(estate => name === estate.name) ?? save.estates[0];
}

export function getEstateName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getEstatesName(getEstate(save, name));
}

export function getEstatesName(estate: ColorNamedImageLocalised): string {
  return getName(estate) ?? estate.name;
}

export function getEstatesImage(estate: ColorNamedImageLocalised): string {
  return getEstateUrl(estate.image);
}

export function getEstateImage(save: MapSave, name: string | undefined): string {
  if (!name) {
    return getEstateUrl('noEstate');
  }

  return getEstatesImage(getEstate(save, name));
}

export function getPrivilege(save: MapSave, name: string): NamedImageLocalised {
  return save.estatePrivileges.find(privilege => name === privilege.name) ?? save.estatePrivileges[0];
}

export function getPrivilegesName(privilege: NamedImageLocalised, estate: ColorNamedImageLocalised): string {
  let name = getName(privilege);

  if (!name) {
    return privilege.name;
  }

  name = name.replace('$ESTATE_NAME$', getEstatesName(estate));
  name = name.replace(/\[Root\.(.*?)\]/, getEstatesName(estate));

  return name;
}

export function getPrivilegesImage(privilege: NamedImageLocalised): string {
  return getPrivilegeUrl(privilege.image);
}

export function getIdeaGroup(save: MapSave, name: string): SaveIdeaGroup {
  return save.ideaGroups.find(ideaGroup => name === ideaGroup.name) ?? save.ideaGroups[0];
}

export function getIdeaGroupName(save: MapSave, name: string): string {
  return getIdeaGroupsName(getIdeaGroup(save, name));
}

export function getIdeaGroupsName(ideaGroup: SaveIdeaGroup): string {
  return getName(ideaGroup) ?? ideaGroup.name;
}

export function getIdeaGroupsImage(ideaGroup: SaveIdeaGroup): string {
  return getIdeaGroupUrl(ideaGroup.image);
}

export function getIdeaName(idea: NamedImageLocalised): string {
  return getName(idea) ?? idea.name;
}

export function getPersonality(save: MapSave, name: string): NamedImageLocalised {
  return save.personalities.find(personality => name === personality.name) ?? save.personalities[0];
}

export function getPersonalityName(save: MapSave, name: string): string {
  return getPersonalitysName(getPersonality(save, name));
}

export function getPersonalitysName(personality: NamedImageLocalised): string {
  return getName(personality) ?? personality.name;
}

export function getPersonalitysImage(personality: NamedImageLocalised): string {
  return getPersonalityUrl(personality.image);
}

export function getLeaderPersonality(save: MapSave, name: string): NamedImageLocalised {
  return save.leaderPersonalities.find(leaderPersonality => name === leaderPersonality.name) ?? save.leaderPersonalities[0];
}

export function getLeaderPersonalityName(save: MapSave, name: string): string {
  return getLeaderPersonalitysName(getLeaderPersonality(save, name));
}

export function getLeaderPersonalitysName(leaderPersonality: NamedImageLocalised): string {
  return getName(leaderPersonality) ?? leaderPersonality.name;
}

export function getLeaderPersonalityImage(save: MapSave, name: string): string {
  return getLeaderPersonalitysImage(getLeaderPersonality(save, name));
}

export function getLeaderPersonalitysImage(leaderPersonality: NamedImageLocalised): string {
  return getLeaderPersonalityUrl(leaderPersonality.image);
}

export function getArea(save: MapSave, province: SaveProvince): SaveArea {
  return save.areas.find(value => value.provinces.includes(province.id)) ?? save.areas[0];
}

export function getAreaState(area: SaveArea, tag?: string): SaveCountryState | null {
  return (area.states && tag) ? area.states[tag] : null;
}

export function getCHistory(country: SaveCountry, date: string, save: MapSave): CountryHistory {
  return date === save.date ? save.currentCountries[country.tag] : getCHistoryInternal(country, date);
}

function getCHistoryInternal(country: SaveCountry, date: string): CountryHistory {
  let history: CountryHistory = { date };

  if (!country.history) {
    return history;
  }

  for (const h of country.history) {
    if (!h.date || h.date <= date) {
      let acceptedCultures: Array<string> = (history && history.acceptedCultures) ?? [];

      if (h.acceptedCultures) {
        acceptedCultures = acceptedCultures.concat(h.acceptedCultures);
      }

      if (h.removeAcceptedCultures) {
        acceptedCultures = acceptedCultures.filter(e => !h.removeAcceptedCultures?.includes(e))
      }

      let ideasLevel: Record<string, string> = (history && history.ideasLevel) ?? {};

      if (h.ideasLevel) {
        Object.entries(h.ideasLevel).forEach(([key, value]) => {
          if (value) {
            ideasLevel[key] = h.date;
          } else {
            delete ideasLevel[key];
          }
        });
      }

      let countryFlags: Record<string, string> = (history && history.countryFlags) ?? {};

      if (h.setCountryFlag) {
        countryFlags[h.setCountryFlag] = h.date;
      }

      let decisions: Record<string, string> = (history && history.decisions) ?? {};

      if (h.decision) {
        decisions[h.decision] = h.date;
      }

      history = {
        ...(typeof history === 'object' ? history : {}),
        ...h,
        acceptedCultures,
        ideasLevel,
        countryFlags,
        decisions,
      };

      if (history.union && h.monarch && h.monarch.country === country.tag) {
        delete history.union;
      }
    } else {
      break;
    }
  }

  return history;
}

export function getEmperor(empire: SaveEmpire, date: string): string | undefined {
  if ((empire.dismantleDate && date <= empire.dismantleDate) || !empire.oldEmperors || empire.oldEmperors.length === 0) {
    return undefined;
  }

  let tag = empire.oldEmperors[0].country;

  for (const oldEmperor of empire.oldEmperors) {
    if (oldEmperor.date > date) {
      break;
    }

    tag = oldEmperor.country;
  }

  return tag;
}

export function getOverlord(country: SaveCountry, save: MapSave): SaveCountry | undefined {
  const overlord = save.diplomacy.dependencies.find(dependency => dependency.second === country.tag);

  return overlord ? getCountry(save, overlord.first) : undefined;
}

export function getSubjects(country: SaveCountry, save: MapSave): Array<SaveDependency> {
  return save.diplomacy.dependencies.filter(dependency => dependency.first === country.tag);
}

export function interestingHistory(h: SaveProvinceHistory): boolean {
  return h.owner !== undefined || h.religion !== undefined || h.culture !== undefined || h.city !== undefined || h.tradeGood !== undefined
    || h.hre !== undefined || (h.buildings !== undefined && Object.keys(h.buildings).length > 0);
}

export function getTerritory(country: SaveCountry): number {
  return 100 - (country.estates ? country.estates.reduce((s, e) => s + e.territory ?? 0, 0) : 0);
}

export function getLoans(country: SaveCountry): number {
  return country.loans ? country.loans.reduce((s, l) => s + l.amount ?? 0, 0) : 0;
}

export function getStableIncome(country: SaveCountry): number {
  if (!country.incomes) {
    return 0;
  }

  return Object.values(country.incomes).filter((value, index) => index <= 7).reduce((s, d) => s + d ?? 0, 0)
}

export function getManaSpent(country: SaveCountry, type: PowerSpent): number {
  return (country.admPowerSpent ? country.admPowerSpent[type] ?? 0 : 0) + (country.dipPowerSpent ? country.dipPowerSpent[type] ?? 0 : 0) + (country.milPowerSpent ? country.milPowerSpent[type] ?? 0 : 0);
}

export function getLosses(country: SaveCountry, type: Losses): number {
  return (country.losses !== undefined && country.losses[type] !== undefined) ? country.losses[type] : 0;
}

export function getIncome(country: SaveCountry, type: Income): number {
  return (country.incomes !== undefined && country.incomes[type] !== undefined) ? country.incomes[type] : 0;
}

export function getExpense(country: SaveCountry, type: Expense): number {
  return (country.expenses !== undefined && country.expenses[type] !== undefined) ? country.expenses[type] : 0;
}

export function getTotalExpenses(country: SaveCountry, type: Expense): number {
  return (country.totalExpenses !== undefined && country.totalExpenses[type] !== undefined) ? country.totalExpenses[type] : 0;
}

export function getDiscipline(country: SaveCountry): number {
  return (1 + country.discipline) * 100;
}

export function getPlayer(country: SaveCountry): string | undefined {
  return country.players ? country.players[country.players.length - 1] : undefined;
}

export function getTotalIncome(country: SaveCountry): number {
  return Object.values(Income).map(value => getIncome(country, value)).reduce((s, d) => s + d ?? 0, 0);
}

export function getTotalStableIncome(country: SaveCountry): number {
  return Object.values(Income).filter((value, index) => index <= 7).map(value => getIncome(country, value)).reduce((s, d) => s + d ?? 0, 0);
}

export function getTotalExpense(country: SaveCountry): number {
  return Object.values(Expense).map(value => getExpense(country, value)).reduce((s, d) => s + d ?? 0, 0);
}

export function getTotalStableExpense(country: SaveCountry): number {
  return Object.values(Expense).filter((value, index) => index <= 8).map(value => getExpense(country, value)).reduce((s, d) => s + d ?? 0, 0);
}

export function getTotalTotalExpenses(country: SaveCountry): number {
  return Object.values(Expense).map(value => getTotalExpenses(country, value)).reduce((s, d) => s + d ?? 0, 0);
}

export function getRank(save: MapSave, country: SaveCountry, mapper: (country: SaveCountry) => number | undefined): number {
  return Array.from(new Set<number>(getCountries(save).map(c => mapper(c) ?? 0))).sort((a, b) => -numberComparator(a, b)).indexOf(mapper(country) ?? 0) + 1;
}

export function getMonarchs(country: SaveCountry): Array<SaveMonarch> {
  const array = country.history.map(h => h.monarch).filter(m => m !== undefined) as Array<SaveMonarch>;

  return array.sort((a, b) => stringComparator(a.monarchDate ?? '', b.monarchDate ?? ''));
}

export function getLeaders(country: SaveCountry): Array<SaveLeader> {
  const leaders = country.history.map(h => h.leader).filter(m => m !== undefined) as Array<SaveLeader>;

  country.history.map(h => h.monarch).forEach(m => {
    if (m !== undefined && m.leader !== undefined) {
      leaders.push(m.leader);
    }
  });

  return leaders.sort((a, b) => stringComparator(a.activation ?? '', b.activation ?? ''));
}

export function getNbBuildings(country: SaveCountry, save: MapSave, building: string): number {
  return getProvinces(country, save).flatMap(province => province.buildings ?? []).filter(value => building === value).length;
}

export function getNbReligion(country: SaveCountry, save: MapSave, religion: string): number {
  return getProvinces(country, save).filter(province => religion === getPHistory(province, save).religion).length;
}

export function getDevReligion(country: SaveCountry, save: MapSave, religion: string): number {
  return getProvinces(country, save).filter(province => religion === getPHistory(province, save).religion).reduce((s, p) => s + (p.baseTax ?? 0) + (p.baseProduction ?? 0) + (p.baseManpower ?? 0), 0);
}

export function getNbCulture(country: SaveCountry, save: MapSave, culture: string): number {
  return getProvinces(country, save).filter(province => culture === getPHistory(province, save).culture).length;
}

export function getDevCulture(country: SaveCountry, save: MapSave, culture: string): number {
  return getProvinces(country, save).filter(province => culture === getPHistory(province, save).culture).reduce((s, p) => s + (p.baseTax ?? 0) + (p.baseProduction ?? 0) + (p.baseManpower ?? 0), 0);
}

export function isAdm(powerSpent: PowerSpent): boolean {
  switch (powerSpent) {
    case PowerSpent.IDEAS:
    case PowerSpent.TECHNOLOGY:
    case PowerSpent.DEVELOPMENT:
    case PowerSpent.REDUCE_INFLATION:
    case PowerSpent.MOVE_CAPITAL:
    case PowerSpent.STABILITY:
    case PowerSpent.CORING:
    case PowerSpent.PROMOTE_FACTION:
    case PowerSpent.INCREASE_TARIFFS:
    case PowerSpent.DECREASE_TARIFFS:
    case PowerSpent.OTHER_44:
      return true;

    case PowerSpent.USELESS_BUY_GENERAL:
    case PowerSpent.USELESS_BUY_ADMIRAL:
    case PowerSpent.USELESS_BUY_CONQUISTADOR:
    case PowerSpent.USELESS_FORCE_MARCH:
    case PowerSpent.ASSAULTING:
    case PowerSpent.SEIZE_COLONY:
    case PowerSpent.BURN_COLONY:
    case PowerSpent.KILL_NATIVES:
    case PowerSpent.SCORCHING_EARTH:
    case PowerSpent.PEACE_DEAL:
    case PowerSpent.USELESS_BUY_EXPLORER:
    case PowerSpent.REMOVE_RIVALRY:
    case PowerSpent.USELESS_19:
    case PowerSpent.CULTURE_CONVERSION:
    case PowerSpent.HARSH_TREATMENT:
    case PowerSpent.REDUCING_WAR_EXHAUSTION:
    case PowerSpent.USELESS_24:
    case PowerSpent.MERCANTILISM:
    case PowerSpent.MOVE_TRADE_CAPITAL:
    case PowerSpent.CREATE_TRADE_POST:
    case PowerSpent.SORTIE_FROM_SIEGE:
    case PowerSpent.USELESS_31:
    case PowerSpent.SET_PRIMARY_CULTURE:
    case PowerSpent.PROMOTE_CULTURE:
    case PowerSpent.DEMOTE_CULTURE:
    case PowerSpent.STRENGTHEN_GOVERNMENT:
    case PowerSpent.MILITARIZATION:
    case PowerSpent.OTHER_37:
    case PowerSpent.BARRAGING:
    case PowerSpent.SIBERIAN_FRONTIER:
    case PowerSpent.USELESS_40:
    case PowerSpent.BUILD_SUPPLY_DEPOT:
    case PowerSpent.FORCING_MARCH:
    case PowerSpent.HIRING_GENERAL:
    case PowerSpent.FORCE_CULTURE:
    case PowerSpent.NAVAL_BARRAGING:
      return false;
  }
}

export function isDip(powerSpent: PowerSpent): boolean {
  switch (powerSpent) {
    case PowerSpent.IDEAS:
    case PowerSpent.TECHNOLOGY:
    case PowerSpent.DEVELOPMENT:
    case PowerSpent.PEACE_DEAL:
    case PowerSpent.REMOVE_RIVALRY:
    case PowerSpent.CULTURE_CONVERSION:
    case PowerSpent.REDUCING_WAR_EXHAUSTION:
    case PowerSpent.PROMOTE_FACTION:
    case PowerSpent.MERCANTILISM:
    case PowerSpent.MOVE_TRADE_CAPITAL:
    case PowerSpent.CREATE_TRADE_POST:
    case PowerSpent.SET_PRIMARY_CULTURE:
    case PowerSpent.PROMOTE_CULTURE:
    case PowerSpent.DEMOTE_CULTURE:
    case PowerSpent.SIBERIAN_FRONTIER:
    case PowerSpent.OTHER_44:
    case PowerSpent.FORCE_CULTURE:
      return true;

    case PowerSpent.STABILITY:
    case PowerSpent.USELESS_BUY_GENERAL:
    case PowerSpent.USELESS_BUY_ADMIRAL:
    case PowerSpent.USELESS_BUY_CONQUISTADOR:
    case PowerSpent.USELESS_BUY_EXPLORER:
    case PowerSpent.USELESS_FORCE_MARCH:
    case PowerSpent.ASSAULTING:
    case PowerSpent.SEIZE_COLONY:
    case PowerSpent.BURN_COLONY:
    case PowerSpent.KILL_NATIVES:
    case PowerSpent.SCORCHING_EARTH:
    case PowerSpent.REDUCE_INFLATION:
    case PowerSpent.MOVE_CAPITAL:
    case PowerSpent.CORING:
    case PowerSpent.USELESS_19:
    case PowerSpent.HARSH_TREATMENT:
    case PowerSpent.USELESS_24:
    case PowerSpent.DECREASE_TARIFFS:
    case PowerSpent.INCREASE_TARIFFS:
    case PowerSpent.SORTIE_FROM_SIEGE:
    case PowerSpent.USELESS_31:
    case PowerSpent.STRENGTHEN_GOVERNMENT:
    case PowerSpent.MILITARIZATION:
    case PowerSpent.OTHER_37:
    case PowerSpent.BARRAGING:
    case PowerSpent.USELESS_40:
    case PowerSpent.BUILD_SUPPLY_DEPOT:
    case PowerSpent.NAVAL_BARRAGING:
    case PowerSpent.FORCING_MARCH:
    case PowerSpent.HIRING_GENERAL:
      return false;
  }
}

export function isMil(powerSpent: PowerSpent): boolean {
  switch (powerSpent) {
    case PowerSpent.IDEAS:
    case PowerSpent.TECHNOLOGY:
    case PowerSpent.DEVELOPMENT:
    case PowerSpent.ASSAULTING:
    case PowerSpent.SEIZE_COLONY:
    case PowerSpent.BURN_COLONY:
    case PowerSpent.KILL_NATIVES:
    case PowerSpent.SCORCHING_EARTH:
    case PowerSpent.HARSH_TREATMENT:
    case PowerSpent.PROMOTE_FACTION:
    case PowerSpent.SORTIE_FROM_SIEGE:
    case PowerSpent.STRENGTHEN_GOVERNMENT:
    case PowerSpent.MILITARIZATION:
    case PowerSpent.BARRAGING:
    case PowerSpent.BUILD_SUPPLY_DEPOT:
    case PowerSpent.NAVAL_BARRAGING:
    case PowerSpent.OTHER_44:
    case PowerSpent.FORCING_MARCH:
    case PowerSpent.FORCE_CULTURE:
    case PowerSpent.HIRING_GENERAL:
      return true;

    case PowerSpent.USELESS_24:
    case PowerSpent.INCREASE_TARIFFS:
    case PowerSpent.MERCANTILISM:
    case PowerSpent.DECREASE_TARIFFS:
    case PowerSpent.MOVE_TRADE_CAPITAL:
    case PowerSpent.CREATE_TRADE_POST:
    case PowerSpent.REDUCING_WAR_EXHAUSTION:
    case PowerSpent.STABILITY:
    case PowerSpent.USELESS_BUY_GENERAL:
    case PowerSpent.USELESS_BUY_ADMIRAL:
    case PowerSpent.USELESS_BUY_CONQUISTADOR:
    case PowerSpent.USELESS_FORCE_MARCH:
    case PowerSpent.USELESS_BUY_EXPLORER:
    case PowerSpent.PEACE_DEAL:
    case PowerSpent.REDUCE_INFLATION:
    case PowerSpent.MOVE_CAPITAL:
    case PowerSpent.CORING:
    case PowerSpent.REMOVE_RIVALRY:
    case PowerSpent.USELESS_19:
    case PowerSpent.CULTURE_CONVERSION:
    case PowerSpent.USELESS_31:
    case PowerSpent.SET_PRIMARY_CULTURE:
    case PowerSpent.PROMOTE_CULTURE:
    case PowerSpent.DEMOTE_CULTURE:
    case PowerSpent.OTHER_37:
    case PowerSpent.SIBERIAN_FRONTIER:
    case PowerSpent.USELESS_40:
      return false;
  }
}
