import {
  ColorNamedImageLocalised,
  CountryPreviousSave,
  Expense,
  Income,
  Losses,
  NamedImageLocalised,
  NamedLocalised,
  PowerSpent, Region,
  Save,
  SaveArea,
  SaveBattle, SaveContinent,
  SaveCountry,
  SaveCountryState,
  SaveCulture,
  SaveDependency,
  SaveEmpire,
  SaveIdeaGroup,
  SaveInstitution,
  SaveLeader,
  SaveMission,
  SaveMonarch,
  SaveProvince,
  SaveProvinceHistory, SaveRegion,
  SaveReligion,
  SaveSimpleProvince, SaveSuperRegion,
  SaveTradeNode,
  SaveWar
} from 'types/api.types';
import { CleanMapSave, CountryHistory, MapSave, ProvinceHistory } from 'types/map.types';
import {
  fakeTag,
  getBuildingUrl,
  getEstateUrl,
  getFlagUrl,
  getGoodUrl,
  getIdeaGroupUrl,
  getInstitutionUrl,
  getLeaderPersonalityUrl,
  getLName,
  getMissionUrl,
  getPersonalityUrl,
  getPrivilegeUrl,
  getReligionUrl
} from 'utils/data.utils';
import { getYear, numberComparator, stringComparator, toMap } from 'utils/format.utils';

export function convertSave(save: Save, history: boolean): MapSave {
  const newSave: MapSave = {
    ...save,
    currentProvinces: toMap(save.provinces, p => p.id, p => getPHistoryInternal(p, save.date)),
    currentCountries: toMap(save.countries, c => c.tag, c => getCHistoryInternal(c, save.date)),
    countriesMap: toMap(save.countries, c => c.tag, c => c),
    provincesMap: toMap(save.provinces, p => p.id, p => p),
    ready: false
  };

  if (history) {
    const historyWorkers: Array<Worker> = [new Worker('/eu4/script/province_history_worker.js'), new Worker(
      '/eu4/script/province_history_worker.js'),
      new Worker('/eu4/script/province_history_worker.js'), new Worker('/eu4/script/province_history_worker.js'),
      new Worker('/eu4/script/province_history_worker.js'), new Worker('/eu4/script/province_history_worker.js'),
      new Worker('/eu4/script/province_history_worker.js'), new Worker('/eu4/script/province_history_worker.js'),
      new Worker('/eu4/script/province_history_worker.js'), new Worker('/eu4/script/province_history_worker.js')];
    let count = 0;
    const start = new Date();

    for (const worker of historyWorkers) {
      worker.onerror = (event) => {
        count++;
        console.error(event);

        if (count === newSave.provinces.length) {
          console.log('Finished provinces history: ' + (new Date().getTime() - start.getTime()));
          newSave.ready = true;

          for (const worker of historyWorkers) {
            worker.terminate();
          }

          return newSave;
        }
      }
      worker.onmessage = (message) => {
        count++;
        if (message && message.data) {
          newSave.provinces[message.data.i].histories = message.data.histories;

          if (count === newSave.provinces.length) {
            console.log('Finished provinces history: ' + (new Date().getTime() - start.getTime()));
            newSave.ready = true;

            for (const worker of historyWorkers) {
              worker.terminate();
            }

            return newSave;
          }
        }
      };
    }

    for (let i = 0; i < newSave.provinces.length; i++) {
      const province = newSave.provinces[i];

      if (!province.histories) {
        historyWorkers[i % historyWorkers.length].postMessage({ i, history: province.history ?? [] });
      }
    }
  }

  return newSave;
}

export function cleanSave(save: MapSave): CleanMapSave {
  const newSave: CleanMapSave = JSON.parse(JSON.stringify(save));

  delete newSave.id;
  delete newSave.name;
  delete newSave.provinceImage;
  delete newSave.colorsImage;
  delete newSave.teams;
  delete newSave.advisors;
  delete newSave.advisorTypes;
  delete newSave.estates;
  delete newSave.estatePrivileges;
  delete newSave.ideaGroups;
  delete newSave.personalities;
  delete newSave.leaderPersonalities;
  delete newSave.previousSaves;
  delete newSave.wars;
  delete newSave.currentProvinces;
  delete newSave.currentCountries;
  delete newSave.countries;

  if (newSave.provinces) {
    for (const province of newSave.provinces) {
      delete province.history;
      delete province.buildings;
      delete province.colonySize;
      delete province.city;
      delete province.institutions;
    }
  }

  return newSave;
}

export function getCountries(save: MapSave): Array<SaveCountry> {
  return save.countries.filter(c => c.alive);
}

export function getPHistory(province: SaveProvince, save: MapSave, date?: string): ProvinceHistory {
  return (date && save.date !== date) ? getPHistoryInternal(province, date) :
    save.currentProvinces.get(province.id) ?? { date: date ?? save.date };
}

function getPHistoryInternal(province: SaveProvince, date: string): ProvinceHistory {
  let history: ProvinceHistory = { date };

  if (province.histories) {
    for (let i = 0; i < province.histories.length; i++) {
      const h = province.histories[i];

      if (h.date && h.date > date) {
        if (i === 0) {
          return h;
        } else {
          return province.histories[i - 1];
        }
      }
    }

    return province.histories.length > 0 ? province.histories[province.histories.length - 1] : history;
  }

  if (province.history) {
    for (const h of province.history) {
      if (!h.date || h.date <= date) {
        let cores: Set<string> = (history && history.cores) ?? new Set();

        if (h.addCores) {
          h.addCores.forEach(e => cores.add(e));
        }

        if (h.removeCores) {
          h.removeCores.forEach(e => cores.delete(e));
        }

        let claims: Set<string> = (history && history.claims) ?? new Set();

        if (h.addClaims) {
          h.addClaims.forEach(e => claims.add(e));
        }

        if (h.removeClaims) {
          h.removeClaims.forEach(e => claims.delete(e));
        }

        let buildings: Set<string> = (history && history.buildings) ?? new Set();

        if (h.buildings) {
          Object.entries(h.buildings).forEach(([key, value]) => {
            if (value) {
              buildings.add(key);
            } else {
              buildings.delete(key)
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
  }

  return history;
}

export function getProvince(save: MapSave, id: number): SaveProvince | null {
  return save.provincesMap.get(id) ?? null;
}

export function getOceanLakeProvince(save: MapSave, id: number): SaveSimpleProvince | null {
  return save.oceansProvinces.find(province => id === province.id) ?? save.lakesProvinces.find(
    province => id === province.id) ?? null;
}

export function getPDev(province: SaveProvince): number {
  return (province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0);
}

export function getPRealDev(province: SaveProvince): number {
  return ((province.baseTax ?? 0) + (province.baseProduction ?? 0) + (province.baseManpower ?? 0)) * (100 - (province.autonomy ?? 0)) / 100;
}

export function getPManualDev(province: SaveProvince): number {
  return province.improvements ? Object.values(province.improvements).reduce((s, a) => s + a, 0) : 0;
}

export function getProvinces(country: SaveCountry, save: MapSave): SaveProvince[] {
  return save.provinces.filter(p => country.tag === getPHistory(p, save).owner);
}

export function mapProvinces(country: SaveCountry, save: MapSave, predicate: (history: ProvinceHistory) => boolean, acc: (history: SaveProvince) => number): number {
  return save.provinces.filter(p => {
    const history = getPHistory(p, save);
    return country.tag === history.owner && predicate(history);
  }).reduce((s, p) => s + acc(p), 0);
}

export function getPHistories(country: SaveCountry, save: MapSave, predicate: (history: ProvinceHistory) => boolean): ProvinceHistory[] {
  const histories: ProvinceHistory[] = [];

  for (const [, history] of save.currentProvinces) {
    if (history.owner === country.tag && predicate(history)) {
      histories.push(history);
    }
  }

  return histories;
}

export function mapPHistories(country: SaveCountry, save: MapSave, predicate: (history: ProvinceHistory) => boolean, acc: (history: ProvinceHistory) => number): number {
  let sum = 0;

  for (const [, history] of save.currentProvinces) {
    if (history.owner === country.tag && predicate(history)) {
      sum += acc(history);
    }
  }

  return sum;
}

export function getCRealDev(country: SaveCountry, save: MapSave): number {
  return getProvinces(country, save).reduce((s, p) => s + getPRealDev(p), 0);
}

export function getNbImprovements(country: SaveCountry, save: MapSave): number {
  return getProvinces(country, save)
    .reduce((s, p) => s + (p.improvements && p.improvements[country.tag] ? p.improvements[country.tag] : 0), 0);
}

export function getCountry(save: MapSave, tag: string): SaveCountry {
  return save.countriesMap.get(tag) ?? save.countries[0];
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
    return getLName(country) ?? country.tag;
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

export function getMissionsName(mission: SaveMission): string {
  return getLName(mission) ?? mission.name;
}

export function getMissionsImage(mission: SaveMission): string {
  return getMissionUrl(mission.image);
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
  return getLName(religion) ?? religion.name;
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
  return getLName(culture) ?? culture.name;
}

export function getInstitutionName(save: MapSave, indexOrName: number | string): string {
  return getInstitutionsName(getInstitution(save, indexOrName));
}

export function getInstitutionsName(institution: SaveInstitution): string {
  return getLName(institution) ?? institution.name;
}

export function getInstitution(save: MapSave, indexOrName: number | string): SaveInstitution {
  return save.institutions[getInstitutionIndex(save, indexOrName)];
}

export function getInstitutionIndex(save: MapSave, indexOrName: number | string): number {
  if (typeof indexOrName === 'number') {
    return indexOrName;
  }

  return save.institutions.findIndex(institution => indexOrName === institution.name) ?? 0;
}

export function getInstitutionsImage(institution: SaveInstitution): string {
  return getInstitutionUrl(institution.image);
}

export function getInstitutionImage(save: MapSave, indexOrName: number | string): string {
  return getInstitutionsImage(getInstitution(save, indexOrName));
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
  return getLName(building) ?? building.name;
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
  return getLName(good) ?? good.name;
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

export function getTradeNode(save: MapSave, name: string | undefined): SaveTradeNode | undefined {
  return (save.tradeNodes && name) ? save.tradeNodes.find(node => name === node.name) : undefined;
}

export function getTradeNodeName(save: MapSave, name: string | undefined): string {
  if (!name) {
    return '';
  }

  return getTradeNodesName(getTradeNode(save, name));
}

export function getTradeNodesName(node: SaveTradeNode | undefined): string {
  return node ? getLName(node) ?? node.name : '';
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
  return getLName(subjectType) ?? subjectType.name;
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
  return getLName(estate) ?? estate.name;
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
  let name = getLName(privilege);

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
  return getLName(ideaGroup) ?? ideaGroup.name;
}

export function getIdeaGroupsImage(ideaGroup: SaveIdeaGroup): string {
  return getIdeaGroupUrl(ideaGroup.image);
}

export function getIdeaName(idea: NamedImageLocalised): string {
  return getLName(idea) ?? idea.name;
}

export function getPersonality(save: MapSave, name: string): NamedImageLocalised {
  return save.personalities.find(personality => name === personality.name) ?? save.personalities[0];
}

export function getPersonalityName(save: MapSave, name: string): string {
  return getPersonalitysName(getPersonality(save, name));
}

export function getPersonalitysName(personality: NamedImageLocalised): string {
  return getLName(personality) ?? personality.name;
}

export function getPersonalitysImage(personality: NamedImageLocalised): string {
  return getPersonalityUrl(personality.image);
}

export function getLeaderPersonality(save: MapSave, name: string): NamedImageLocalised {
  return save.leaderPersonalities.find(
    leaderPersonality => name === leaderPersonality.name) ?? save.leaderPersonalities[0];
}

export function getLeaderPersonalityName(save: MapSave, name: string): string {
  return getLeaderPersonalitysName(getLeaderPersonality(save, name));
}

export function getLeaderPersonalitysName(leaderPersonality: NamedImageLocalised): string {
  return getLName(leaderPersonality) ?? leaderPersonality.name;
}

export function getLeaderPersonalityImage(save: MapSave, name: string): string {
  return getLeaderPersonalitysImage(getLeaderPersonality(save, name));
}

export function getLeaderPersonalitysImage(leaderPersonality: NamedImageLocalised): string {
  return getLeaderPersonalityUrl(leaderPersonality.image);
}

export function hasAreaDetails(save: MapSave): boolean {
  return save.areas && save.areas.length > 0 && save.areas[0].name !== undefined;
}

export function getArea(save: MapSave, name: string): SaveArea {
  return save.areas.find(value => value.name == name) ?? save.areas[0];
}

export function getProvinceArea(save: MapSave, province: SaveProvince): SaveArea {
  return save.areas.find(value => value.provinces.includes(province.id)) ?? save.areas[0];
}

export function getAreaState(area: SaveArea, tag?: string): SaveCountryState | null {
  return (area.states && tag) ? area.states[tag] : null;
}

export function getAreasName(area: SaveArea): string {
  return getLName(area) ?? area.name;
}

export function getRegion(save: MapSave, name: string): SaveRegion | undefined {
  return save.regions && save.regions.find(value => value.name === name);
}

export function getProvinceRegion(save: MapSave, province: SaveProvince): SaveRegion | undefined {
  const area = getProvinceArea(save, province);
  return getAreaRegion(save, area);
}

export function getAreaRegion(save: MapSave, area: SaveArea): SaveRegion | undefined {
  return save.regions && save.regions.find(value => value.areas.includes(area.name));
}

export function getRegionsName(region: SaveRegion | undefined): string {
  return region ? getLName(region) ?? region.name : '';
}

export function getSuperRegion(save: MapSave, name: string): SaveSuperRegion | undefined {
  return save.superRegions && save.superRegions.find(value => value.name === name);
}

export function getProvinceSuperRegion(save: MapSave, province: SaveProvince): SaveSuperRegion | undefined {
  const region = getProvinceRegion(save, province);
  return region && getRegionSuperRegion(save, region);
}

export function getRegionSuperRegion(save: MapSave, region: SaveRegion): SaveSuperRegion | undefined {
  return save.superRegions && save.superRegions.find(value => value.regions.includes(region.name));
}

export function getSuperRegionsName(region: SaveSuperRegion | undefined): string {
  return region ? getLName(region) ?? region.name : '';
}

export function getContinent(save: MapSave, name: string): SaveContinent | undefined {
  return save.continents && save.continents.find(value => value.name === name);
}

export function getProvinceContinent(save: MapSave, province: SaveProvince): SaveContinent | undefined {
  return save.continents && save.continents.find(value => value.provinces.includes(province.id));
}

export function getContinentsName(continent: SaveContinent | undefined): string {
  return continent ? getLName(continent) ?? continent.name : '';
}

export function getCHistory(country: SaveCountry, save: MapSave, date?: string): CountryHistory {
  return (date && save.date !== date) ? getCHistoryInternal(country, date) : save.currentCountries.get(country.tag) ?? { date: date ?? save.date };
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

export function getSubjects(country: SaveCountry, save: MapSave, date?: string): Array<SaveDependency> {
  return save.diplomacy.dependencies.filter(
    dependency => dependency.first === country.tag && dependency.date <= (date ?? save.date) && (dependency.endDate === undefined || dependency.endDate >= (date ?? save.date)));
}

export function interestingHistory(h: SaveProvinceHistory): boolean {
  return h.owner !== undefined || h.religion !== undefined || h.culture !== undefined || h.tradeGood !== undefined
    || h.hre !== undefined || (h.buildings !== undefined && Object.keys(h.buildings).length > 0);
}

export function getTerritory(country: SaveCountry): number {
  return 100 - (country.estates ? country.estates.reduce((s, e) => s + e.territory, 0) : 0);
}

export function getLoans(country: SaveCountry): number {
  return country.loans ? country.loans.reduce((s, l) => s + l.amount, 0) : 0;
}

export function getStableIncome(country: SaveCountry): number {
  if (!country.incomes) {
    return 0;
  }

  return Object.values(country.incomes).filter((value, index) => index <= 7).reduce((s, d) => s + d, 0)
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
  return Object.values(Income).map(value => getIncome(country, value)).reduce((s, d) => s + d, 0);
}

export function getTotalStableIncome(country: SaveCountry): number {
  return Object.values(Income).filter((value, index) => index <= 7).map(value => getIncome(country, value)).reduce(
    (s, d) => s + d, 0);
}

export function getTotalExpense(country: SaveCountry): number {
  return Object.values(Expense).map(value => getExpense(country, value)).reduce((s, d) => s + d, 0);
}

export function getTotalStableExpense(country: SaveCountry): number {
  return Object.values(Expense).filter((value, index) => index <= 8).map(value => getExpense(country, value)).reduce(
    (s, d) => s + d, 0);
}

export function getTotalTotalExpenses(country: SaveCountry): number {
  return Object.values(Expense).map(value => getTotalExpenses(country, value)).reduce((s, d) => s + d, 0);
}

export function getRank(save: MapSave, country: SaveCountry, mapper: (country: SaveCountry) => number | undefined, onlyPlayer: boolean = false): number {
  return Array.from(new Set<number>(getCountries(save)
    .filter(c => !onlyPlayer || (c.players && c.players.length > 0))
    .map(c => mapper(c) ?? 0)))
    .sort((a, b) => -numberComparator(a, b))
    .indexOf(mapper(country) ?? 0) + 1;
}

export function getMonarchs(save: MapSave, country: SaveCountry): Array<SaveMonarch> {
  const array = country.history.map(h => h.monarch).filter(
    m => m !== undefined && (m.deathDate === undefined || m.deathDate > save.startDate)) as Array<SaveMonarch>;

  return array.sort((a, b) => stringComparator(a.monarchDate ?? '', b.monarchDate ?? ''));
}

export function getLeaders(save: MapSave, country: SaveCountry): Array<SaveLeader> {
  const leaders = country.history.map(h => h.leader).filter(
    m => m !== undefined && (m.deathDate === undefined || m.deathDate > save.startDate)) as Array<SaveLeader>;

  country.history.map(h => h.monarch).forEach(m => {
    if (m !== undefined && m.leader !== undefined) {
      leaders.push(m.leader);
    }
  });

  return leaders.sort((a, b) => stringComparator(a.activation ?? '', b.activation ?? ''));
}

export function getNbBuildings(country: SaveCountry, save: MapSave, building: string): number {
  return getProvinces(country, save).flatMap(province => province.buildings ?? []).filter(
    value => building === value).length;
}

export function getNbReligion(country: SaveCountry, save: MapSave, religion: string): number {
  return mapPHistories(country, save, history => religion === history.religion, () => 1);
}

export function getDevReligion(country: SaveCountry, save: MapSave, religion: string): number {
  return mapProvinces(country, save, history => religion === history.religion,
    (p) => (p.baseTax ?? 0) + (p.baseProduction ?? 0) + (p.baseManpower ?? 0));
}

export function getNbCulture(country: SaveCountry, save: MapSave, culture: string): number {
  return mapPHistories(country, save, history => culture === history.culture, () => 1);
}

export function getDevCulture(country: SaveCountry, save: MapSave, culture: string): number {
  return mapProvinces(country, save, history => culture === history.culture,
    (p) => (p.baseTax ?? 0) + (p.baseProduction ?? 0) + (p.baseManpower ?? 0));
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

export function getSaveIndex(year: number, save: MapSave): number {
  if (!save.previousSaves || save.previousSaves.length === 0) {
    return 1;
  } else {
    let i = 1;

    for (let i1 = 0; i1 < save.previousSaves.length; i1++) {
      const previousSave = save.previousSaves[i1];

      if (getYear(previousSave.date) < year) {
        i = i1 + 2;
      } else {
        break;
      }
    }

    return i;
  }
}

export function getPrevious(country: SaveCountry, index: number, mapper: (previous: CountryPreviousSave) => number, current: (country: SaveCountry) => number): number | undefined {
  if (!country.previousSaves || country.previousSaves.length === 0) {
    if (index === 1) {
      return current(country);
    } else {
      return undefined;
    }
  } else {
    if (index > 0 && country.previousSaves.length >= index) {
      return mapper(country.previousSaves[index - 1]);
    } else if (index === country.previousSaves.length + 1) {
      return current(country);
    } else {
      return undefined;
    }
  }
}

export function getWar(save: MapSave, id: number): SaveWar | undefined {
  return save.wars && save.wars.find(war => id === war.id);
}

export function getWarLosses(war: SaveWar): number {
  return Object.values(war.attackers).map(
      attacker => Object.values(attacker.losses).reduce((s, d) => s + d, 0)).reduce((s, d) => s + d, 0)
    + Object.values(war.defenders).map(
      defender => Object.values(defender.losses).reduce((s, d) => s + d, 0)).reduce((s, d) => s + d, 0);
}

export function getProvinceLosses(war: SaveWar, id: number): number {
  return war.history.filter(h => h.battles && h.battles.length > 0).flatMap(h => h.battles ?? []).filter(
    b => b.location === id).reduce(
    (s, b) => s + getBattleLosses(b), 0);
}

export function getProvinceAllLosses(province: SaveProvince, date?: string): number {
  let losses = 0;

  if (province.losses) {
    for (const l of province.losses) {
      if (!date || !l.date || l.date <= date) {
        losses += l.losses ?? 0;
      }
    }
  }

  return losses;
}

export function getBattleLosses(battle: SaveBattle): number {
  return battle.attacker.losses + battle.defender.losses;
}

export function getWarValue(tag: string, war: SaveWar): number {
  if (Object.keys(war.attackers).includes(tag)) {
    return war.attackers[tag].value / Object.values(war.attackers).map(value => value.value).reduce(
      (s, d) => s + d, 0);
  } else if (Object.keys(war.defenders).includes(tag)) {
    return war.defenders[tag].value / Object.values(war.defenders).map(value => value.value).reduce(
      (s, d) => s + d, 0);
  }

  return 0;
}

export function getTradeNodeValue(node: SaveTradeNode): number {
  return node.incoming.map(value => value.value).reduce((s, n) => s + n, 0);
}

export function getTradeNodeLocalValue(node: SaveTradeNode): number {
  return node.incoming.filter(value => value.from === undefined).map(value => value.value).reduce((s, n) => s + n, 0);
}

export function getTradeNodeIncomingValue(node: SaveTradeNode): number {
  return node.incoming.filter(value => value.from !== undefined).map(value => value.value).reduce((s, n) => s + n, 0);
}

export function getTradeNodeOutgoingValue(node: SaveTradeNode, save: MapSave): number {
  if (!save.tradeNodes) {
    return 0;
  }

  return save.tradeNodes.map(
    n => n.incoming.map(i => i.from === node.name ? i.value : 0).reduce((s, n) => s + n, 0)).reduce((s, n) => s + n, 0);
}
