import { ProvinceHistory } from 'types/map.types';

export type Pair<K, V> = {
  key?: K;
  value?: V;
}

export enum Localization {
  SPANISH = 'SPANISH',
  ENGLISH = 'ENGLISH',
  GERMAN = 'GERMAN',
  FRENCH = 'FRENCH'
}

export type Save = {
  startDate: string;
  date: string;
  id: string;
  name: string;
  provinceImage: string;
  nbProvinces: number;
  teams: Array<SaveTeam>;
  provinces: Array<SaveProvince>;
  oceansProvinces: Array<SaveSimpleProvince>;
  lakesProvinces: Array<SaveSimpleProvince>;
  impassableProvinces: Array<SaveSimpleProvince>;
  countries: Array<SaveCountry>;
  areas: Array<SaveArea>;
  advisors: Array<SaveAdvisor>;
  cultures: Array<SaveCulture>;
  religions: Array<SaveReligion>;
  hre: SaveEmpire;
  celestialEmpire: SaveCelestialEmpire;
  institutions: Array<SaveInstitution>;
  diplomacy: SaveDiplomacy;
  buildings: Array<NamedImageLocalised>;
  advisorTypes: Array<NamedImageLocalised>;
  tradeGoods: Array<ColorNamedImageLocalised>;
  estates: Array<ColorNamedImageLocalised>;
  estatePrivileges: Array<NamedImageLocalised>;
  subjectTypes: Array<NamedLocalised>;
  ideaGroups: Array<SaveIdeaGroup>;
  personalities: Array<NamedImageLocalised>;
  leaderPersonalities: Array<NamedImageLocalised>;
  previousSaves?: Array<PreviousSave>;
  wars?: Array<SaveWar>;
  tradeNodes?: Array<SaveTradeNode>;
};

export type Localised = {
  localisations: Record<Localization, string>;
}

export type ExampleLocalised = Localised & {
  localisationsExample: Record<Localization, string>;
}

export type IdExampleLocalised = ExampleLocalised & IdLocalised;

export type IdLocalised = Localised & {
  id: string;
}

export type ImageLocalised = Localised & {
  image?: string;
}

export type IdImageLocalised = ImageLocalised & {
  id: string;
}

export type NamedImageLocalised = ImageLocalised & {
  name: string;
}

export type NamedLocalised = Localised & {
  name: string;
}

export type SaveTeam = {
  name: string;
  members: Array<string>;
}

export type SaveSimpleProvince = {
  id: number;
  name: string;
}

export type SaveProvince = SaveSimpleProvince & {
  baseTax?: number;
  baseProduction?: number;
  baseManpower?: number;
  devastation?: number;
  autonomy?: number;
  institutions?: Array<number>;
  city?: boolean;
  node?: string;
  improvements?: Record<string, number>;
  colonySize?: number;
  buildings?: Array<string>;
  history?: Array<SaveProvinceHistory>;
  histories?: Array<ProvinceHistory>;
  losses?: Array<ProvinceLosses>;
  greatProjects?: Array<SaveGreatProject>;
}

export type SaveProvinceHistory = {
  date: string;
  capital?: string;
  addCores?: Array<string>;
  addClaims?: Array<string>;
  removeCores?: Array<string>;
  removeClaims?: Array<string>;
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
  buildings?: Record<string, boolean>;
}

export type ProvinceLosses = {
  date: string;
  losses: number;
}

export type SaveCountry = ImageLocalised & {
  tag: string;
  customName?: string;
  players?: Array<string>;
  greatPowerRank?: number;
  flags?: Record<string, string>;
  hiddenFlags?: Record<string, string>;
  variables?: Record<string, number>;
  colors: SaveColors;
  milTech: number;
  admTech: number;
  dipTech: number;
  estates?: Array<SaveEstate>;
  hegemony?: Record<string, number>;
  rivals: Array<string>;
  powerProjection: number;
  loans?: Array<SaveLoan>;
  ideaGroups: Record<string, number>;
  government: SaveGovernment;
  leader?: Array<SaveLeader>;
  advisors?: Array<number>;
  admPowerSpent?: Record<PowerSpent, number>;
  dipPowerSpent?: Record<PowerSpent, number>;
  milPowerSpent?: Record<PowerSpent, number>;
  customNationalIdeas?: Array<SaveCustomNationalIdea>;
  incomeStatistics?: Record<number, number>;
  nationSizeStatistics?: Record<number, number>;
  scoreStatistics?: Record<number, number>;
  inflationStatistics?: Record<number, number>;
  alliances?: Array<string>;
  guarantees?: Array<string>;
  guarantedBy?: Array<string>;
  knowledgeSharing?: string;
  knowledgeSharingBy?: string;
  subsidies?: Record<string, number>;
  subsidiesBy?: Record<string, number>;
  royalMarriages?: Array<string>;
  supportIndependence?: Array<string>;
  supportIndependenceBy?: Array<string>;
  transferTradePowers?: Array<string>;
  transferTradePowersBy?: Array<string>;
  warReparations?: Array<string>;
  warReparationsBy?: string;
  atWarWith?: Array<string>;
  warnings?: Array<string>;
  warningsBy?: Array<string>;
  prestige?: number;
  stability?: number;
  income?: number;
  inflation?: number;
  corruption?: number;
  religion?: string;
  primaryCulture?: string;
  acceptedCultures?: Array<string>;
  treasury?: number;
  armyProfessionalism?: number;
  absolutism?: number;
  mercantilism?: number;
  navyTradition?: number;
  armyTradition?: number;
  lastBankrupt?: string;
  manpower: number;
  maxManpower: number;
  armyLimit: number;
  armyMorale: number;
  discipline: number;
  sailors: number;
  maxSailors: number;
  navalLimit: number;
  navalMorale: number;
  innovativeness: number;
  losses?: Record<Losses, number>;
  history: Array<SaveCountryHistory>;
  alive: boolean;
  nbInstitutions: number;
  expenses?: Record<Expense, number>;
  incomes?: Record<Income, number>;
  totalExpenses?: Record<Expense, number>;
  changedTag: Record<string, string>;
  nbProvince: number;
  dev: number;
  previousSaves: Array<CountryPreviousSave>;
  missions2?: Array<SaveMission>;
}

export enum Losses {
  INFANTRY_FIGHT = 'INFANTRY_FIGHT',
  INFANTRY_ATTRITION = 'INFANTRY_ATTRITION',
  INFANTRY_STEAL = 'INFANTRY_STEAL',
  CAVALRY_FIGHT = 'CAVALRY_FIGHT',
  CAVALRY_ATTRITION = 'CAVALRY_ATTRITION',
  CAVALRY_STEAL = 'CAVALRY_STEAL',
  ARTILLERY_FIGHT = 'ARTILLERY_FIGHT',
  ARTILLERY_ATTRITION = 'ARTILLERY_ATTRITION',
  ARTILLERY_STEAL = 'ARTILLERY_STEAL',
  HEAVY_FIGHT = 'HEAVY_FIGHT',
  HEAVY_ATTRITION = 'HEAVY_ATTRITION',
  HEAVY_STEAL = 'HEAVY_STEAL',
  LIGHT_FIGHT = 'LIGHT_FIGHT',
  LIGHT_ATTRITION = 'LIGHT_ATTRITION',
  LIGHT_STEAL = 'LIGHT_STEAL',
  GALLEY_FIGHT = 'GALLEY_FIGHT',
  GALLEY_ATTRITION = 'GALLEY_ATTRITION',
  GALLEY_STEAL = 'GALLEY_STEAL',
  TRANSPORT_FIGHT = 'TRANSPORT_FIGHT',
  TRANSPORT_ATTRITION = 'TRANSPORT_ATTRITION',
  TRANSPORT_STEAL = 'TRANSPORT_STEAL'
}

export enum PowerSpent {
  IDEAS = 'IDEAS',
  TECHNOLOGY = 'TECHNOLOGY',
  STABILITY = 'STABILITY',
  USELESS_BUY_GENERAL = 'USELESS_BUY_GENERAL',
  USELESS_BUY_ADMIRAL = 'USELESS_BUY_ADMIRAL',
  USELESS_BUY_CONQUISTADOR = 'USELESS_BUY_CONQUISTADOR',
  USELESS_BUY_EXPLORER = 'USELESS_BUY_EXPLORER',
  DEVELOPMENT = 'DEVELOPMENT',
  USELESS_FORCE_MARCH = 'USELESS_FORCE_MARCH',
  ASSAULTING = 'ASSAULTING',
  SEIZE_COLONY = 'SEIZE_COLONY',
  BURN_COLONY = 'BURN_COLONY',
  KILL_NATIVES = 'KILL_NATIVES',
  SCORCHING_EARTH = 'SCORCHING_EARTH',
  PEACE_DEAL = 'PEACE_DEAL',
  REDUCE_INFLATION = 'REDUCE_INFLATION',
  MOVE_CAPITAL = 'MOVE_CAPITAL',
  CORING = 'CORING',
  REMOVE_RIVALRY = 'REMOVE_RIVALRY',
  USELESS_19 = 'USELESS_19',
  CULTURE_CONVERSION = 'CULTURE_CONVERSION',
  HARSH_TREATMENT = 'HARSH_TREATMENT',
  REDUCING_WAR_EXHAUSTION = 'REDUCING_WAR_EXHAUSTION',
  PROMOTE_FACTION = 'PROMOTE_FACTION',
  USELESS_24 = 'USELESS_24',
  INCREASE_TARIFFS = 'INCREASE_TARIFFS',
  MERCANTILISM = 'MERCANTILISM',
  DECREASE_TARIFFS = 'DECREASE_TARIFFS',
  MOVE_TRADE_CAPITAL = 'MOVE_TRADE_CAPITAL',
  CREATE_TRADE_POST = 'CREATE_TRADE_POST',
  SORTIE_FROM_SIEGE = 'SORTIE_FROM_SIEGE',
  USELESS_31 = 'USELESS_31',
  SET_PRIMARY_CULTURE = 'SET_PRIMARY_CULTURE',
  PROMOTE_CULTURE = 'PROMOTE_CULTURE',
  DEMOTE_CULTURE = 'DEMOTE_CULTURE',
  STRENGTHEN_GOVERNMENT = 'STRENGTHEN_GOVERNMENT',
  MILITARIZATION = 'MILITARIZATION',
  OTHER_37 = 'OTHER_37',
  BARRAGING = 'BARRAGING',
  SIBERIAN_FRONTIER = 'SIBERIAN_FRONTIER',
  USELESS_40 = 'USELESS_40',
  BUILD_SUPPLY_DEPOT = 'BUILD_SUPPLY_DEPOT',
  NAVAL_BARRAGING = 'NAVAL_BARRAGING',
  OTHER_44 = 'OTHER_44',
  FORCING_MARCH = 'FORCING_MARCH',
  HIRING_GENERAL = 'HIRING_GENERAL',
  FORCE_CULTURE = 'FORCE_CULTURE', //Failed seems to be hiring generals
}

export enum Expense {
  ADVISORS_MAINTENANCE = 'ADVISORS_MAINTENANCE',
  ARMY_MAINTENANCE = 'ARMY_MAINTENANCE',
  NAVY_MAINTENANCE = 'NAVY_MAINTENANCE',
  FORTS_MAINTENANCE = 'FORTS_MAINTENANCE',
  COLONY_MAINTENANCE = 'COLONY_MAINTENANCE',
  STATE_MAINTENANCE = 'STATE_MAINTENANCE',
  MISSIONARY_MAINTENANCE = 'MISSIONARY_MAINTENANCE',
  SUBSIDES = 'SUBSIDES',
  INTERESTS = 'INTERESTS',
  HARBOR_FEES = 'HARBOR_FEES',
  WAR_REPARATION = 'WAR_REPARATION',
  ARMY_RECRUITMENT = 'ARMY_RECRUITMENT',
  NAVY_RECRUITMENT = 'NAVY_RECRUITMENT',
  FORTS_CONSTRUCTION = 'FORTS_CONSTRUCTION',
  BUILDINGS_CONSTRUCTION = 'BUILDINGS_CONSTRUCTION',
  SUPPORT_REBELS = 'SUPPORT_REBELS',
  LOANS = 'LOANS',
  GIFTS = 'GIFTS',
  ADVISORS_RECRUITMENT = 'ADVISORS_RECRUITMENT',
  EVENTS = 'EVENTS',
  PEACE = 'PEACE',
  VASSAL_TRIBUTE = 'VASSAL_TRIBUTE',
  TARIFFS = 'TARIFFS',
  SUPPORT_LOYALISTS = 'SUPPORT_LOYALISTS',
  SEND_OFFICERS = 'SEND_OFFICERS',
  SIPHON_INCOME = 'SIPHON_INCOME',
  CONDOTTIERI = 'CONDOTTIERI',
  CORRUPTION = 'CORRUPTION',
  EMBRACE_INSTITUTION = 'EMBRACE_INSTITUTION',
  GREAT_POWER_ACTIONS = 'GREAT_POWER_ACTIONS',
  KNOWLEDGE_SHARING = 'KNOWLEDGE_SHARING',
  INVEST_IN_TRADE_COMPANY = 'INVEST_IN_TRADE_COMPANY',
  CHANGE_COLONY = 'CHANGE_COLONY',
  BLOCUS = 'BLOCUS',
  PILLAGE = 'PILLAGE',
  GREAT_PROJECT = 'GREAT_PROJECT',
  UPGRADE_COT = 'UPGRADE_COT',
  UNKNOWN_2 = 'UNKNOWN_2',
}

export enum Income {
  TAXES = 'TAXES',
  PRODUCTION = 'PRODUCTION',
  TRADE = 'TRADE',
  GOLD = 'GOLD',
  TARIFFS = 'TARIFFS',
  VASSALS = 'VASSALS',
  HARBOR_FEES = 'HARBOR_FEES',
  SUBSIDES = 'SUBSIDES',
  WAR_REPARATIONS = 'WAR_REPARATIONS',
  INTERESTS = 'INTERESTS',
  GIFT = 'GIFT',
  EVENTS = 'EVENTS',
  SPOILS_OF_WAR = 'SPOILS_OF_WAR',
  TREASURE_FLEET = 'TREASURE_FLEET',
  SIPHON_INCOME = 'SIPHON_INCOME',
  CONDOTTIERI = 'CONDOTTIERI',
  KNOWLEDGE_SHARING = 'KNOWLEDGE_SHARING',
  BLOCUS = 'BLOCUS',
  PILLAGE = 'PILLAGE',
}

export type SaveCountryHistory = {
  date: string;
  abolishedSerfdom?: boolean;
  leader?: SaveLeader;
  ideasLevel?: Record<string, boolean>;
  acceptedCultures?: Array<string>;
  removeAcceptedCultures?: Array<string>;
  governmentRank?: number;
  capital?: number;
  changedCountryNameFrom?: string;
  changedCountryAdjectiveFrom?: string;
  changedCountryMapcolorFrom?: SaveColor;
  admTech?: number;
  dipTech?: number;
  milTech?: number;
  addGovernmentReform?: string;
  primaryCulture?: string;
  government?: string;
  religion?: string;
  secondaryReligion?: string;
  technologyGroup?: string;
  unitType?: string;
  changedTagFrom?: string;
  religiousSchool?: string;
  setCountryFlag?: string;
  decision?: string;
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

export enum Power {
  ADM = 'ADM',
  DIP = 'DIP',
  MIL = 'MIL'
}

export type SaveMonarch = {
  monarchDate?: string;
  id: number;
  country: string;
  personalities?: Array<string>;
  name: string;
  monarchName?: string;
  adm: number;
  dip: number;
  mil: number;
  female: boolean;
  regent: boolean;
  culture: string;
  religion: string;
  dynasty?: string;
  birthDate: string;
  deathDate?: string;
  leader?: SaveLeader;
  duration?: number;
}

export type SaveQueen = SaveMonarch & {
  consort: boolean;
  queenRegent: boolean;
  countryOfOrigin?: string;
}

export type SaveHeir = SaveMonarch & {
  claim: number;
}

export type SaveColor = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type SaveColors = {
  customColors?: SaveCustomColor;
  revolutionaryColors?: SaveColor;
  mapColor: SaveColor;
  countryColor: SaveColor;
}

export type SaveAdvisor = {
  id: number;
  name: string;
  type: string;
  birth: string;
  hire?: string;
  death?: string;
  skill: number;
  location: number;
  female: boolean;
  culture: string;
  religion: string;
}

export type SaveInstitution = NamedImageLocalised & {
  origin: number;
}

export type ColorNamedImageLocalised = NamedImageLocalised & {
  color: SaveColor;
}

export type SaveArea = {
  provinces: Array<number>;
  investments?: Record<string, Array<string>>;
  states?: Record<string, SaveCountryState>;
}

export type SaveCountryState = {
  prosperity?: number;
  patriarch?: boolean;
  pasha?: boolean;
  holyOrder?: string;
  edict?: string;
}

export type SaveLeader = {
  id: number;
  name: string;
  type: SaveLeaderType;
  female: boolean;
  manuever: number;
  fire: number;
  shock: number;
  siege: number;
  personality?: string;
  activation?: string;
  deathDate?: string;
  duration?: number;
}

export enum SaveLeaderType {
  GENERAL = 'GENERAL',
  ADMIRAL = 'ADMIRAL',
  CONQUISTADOR = 'CONQUISTADOR',
  EXPLORER = 'EXPLORER',
}

export type SaveEmpire = {
  oldEmperors: Array<SaveOldEmperor>;
  dismantled: boolean;
  mainLineReforms: Record<string, boolean>;
  leftBranchReforms: Record<string, boolean>;
  rightBranchReforms: Record<string, boolean>;
  influence: number;
  dismantleDate?: string;
}

export type SaveCelestialEmpire = SaveEmpire & {
  decree?: string;
}

export type SaveOldEmperor = {
  country: string;
  date: string;
  id: number;
}

export type SaveLoan = {
  expiryDate: string;
  amount: number;
  interest: number;
}

export type SaveCustomColor = {
  flagColors: SaveColor;
  flag?: number;
  color?: number;
}

export type SaveCustomNationalIdea = {
  level: number;
  index: number;
  name: string;
}

export type SaveGovernment = {
  type: string;
  reforms: Array<string>;
}

export type SaveEstateModifier = {
  value?: number;
  name: string;
  date?: string;
}

export type SaveEstate = {
  type: string;
  loyalty: number;
  influence: number;
  influenceFromTerritory: number;
  territory: number;
  grantedPrivileges?: Array<string>;
  influenceModifiers?: Array<SaveEstateModifier>;
  loyaltyModifiers?: Array<SaveEstateModifier>;
  activeInfluences?: Array<number>;
  activeLoyalties?: Array<number>;
}

export type SaveCulture = Localised & {
  group: string;
  name: string;
  color: SaveColor;
}

export type SaveReligion = NamedImageLocalised & {
  group: string;
  color: SaveColor;
  icon?: number;
  hreReligion: boolean;
  hreHereticReligion: boolean;
  enable?: string;
  nbProvinces: number;
  defender?: string;
}

export type SaveRelation = {
  first: string;
  second: string;
  date: string;
}

export type SaveDependency = SaveRelation & {
  type: string;
  endDate: string;
}

export type SaveDiplomacy = {
  dependencies: Array<SaveDependency>;
  alliances: Array<SaveRelation>;
}

export type PreviousSave = {
  id: string;
  date: string;
  name: string;
}

export type CountryPreviousSave = {
  date: string;
  tag: string;
  image: string;
  dev: number;
  income: number;
  nbProvince: number;
  maxManpower: number;
  armyLimit: number;
  armyProfessionalism: number;
  losses: number;
}

export type SaveIdeaGroup = NamedImageLocalised & {
  ideas: Array<NamedImageLocalised>;
}

export type UserInfo = {
  id: string;
  name?: string;
  image?: string;
  saves?: Array<ServerSave>;
}

export type ServerSave = {
  name: string;
  creationDate: string;
  hideAll?: boolean;
  date: string;
  id: string;
  country: string;
  countryName: Localised;
  flag: string;
  version: string;
  nbPlayers: number;
  ownerId: string;
  ownerName?: string;
  ownerImage?: string;
}

export type SaveMission = NamedImageLocalised & {
  required?: Array<string>;
  completed: boolean;
  description?: Localised;
}

export type SaveWar = {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
  duration?: number;
  finished: boolean;
  attackers: Record<string, SaveWarParticipant>;
  defenders: Record<string, SaveWarParticipant>;
  score?: number;
  outcome?: number;
  history: Array<SaveWarHistory>;
}

export type SaveWarParticipant = {
  value: number;
  tag: string;
  promisedLand: boolean;
  losses: Record<Losses, number>;
}

export type SaveWarHistory = {
  date: string;
  addAttacker?: Array<string>;
  addDefender?: Array<string>;
  remAttacker?: Array<string>;
  remDefender?: Array<string>;
  battles?: Array<SaveBattle>;
}

export type SaveBattle = {
  date: string;
  name: string;
  location: number;
  result: boolean;
  attacker: SaveCombatant;
  defender: SaveCombatant;
}

export type SaveCombatant = {
  cavalry: number;
  artillery: number;
  infantry: number;
  galley: number;
  lightShip: number;
  heavyShip: number;
  transport: number;
  losses: number;
  country: string;
  commander: string;
}

export type SaveTradeNodeCountry = {
  tag: string;
  value: number;
  provincePower?: number;
  hasCapital: boolean;
  money?: number;
  shipPower?: number;
  steerPower?: number;
  lightShip?: number;
}

export type SaveTradeNodeIncoming = {
  from?: string;
  value: number;
  added: number;
}

export type SaveTradeNode = NamedLocalised & {
  retention: number;
  color: SaveColor;
  countries?: Array<SaveTradeNodeCountry>;
  incoming: Array<SaveTradeNodeIncoming>;
}

export type SaveGreatProject = Localised & {
  name: string;
  level: number;
  maxLevel: number;
}

export type Color = {
  red: number;
  green: number;
  blue: number;
  rgb: Array<number>;
  hex: string;
}

export type Wiki = {
  decisions: Record<string, Decision>;
  countries: Record<string, Country>;
  advisors: Record<string, Advisor>;
  idExampleLocalised: Record<string, IdExampleLocalised>;
  idLocalised: Record<string, IdLocalised>;
  modifiers: Record<string, Modifier>;
  ages: Record<string, Age>;
  ideaGroups: Record<string, IdeaGroup>;
  tradeGoods: Record<string, TradeGood>;
  religions: Record<string, Religion>;
  estatePrivileges: Record<string, IdLocalised>;
  provinces: Record<string, Province>;
  cultures: Record<string, Culture>;
  cultureGroups: Record<string, CultureGroup>;
  religionGroups: Record<string, ReligionGroup>;
  greatProjects: Record<string, GreatProject>;
  regions: Record<string, Region>;
  superRegions: Record<string, SuperRegion>;
  continents: Record<string, Continent>;
  areas: Record<string, Area>;
  governmentReforms: Record<string, IdLocalised>;
  techGroups: Record<string, TechGroup>;
  centersOfTrade: Record<string, CenterOfTrade>;
  churchAspects: Record<string, ChurchAspect>;
  units: Record<string, Unit>;
  tradeNodes: Record<string, TradeNode>;
  technologies: Record<Power, TechnologyType>;
  estates: Record<string, IdImageLocalised>;
  institutions: Record<string, Institution>;
  factions: Record<string, Faction>;
  dlcs: Record<string, Dlc>;
  missions: Record<string, Mission>;
  disasters: Record<string, Disaster>;
  imperialIncidents: Record<string, IdLocalised>;
  incidents: Record<string, IdLocalised>;
  colonialRegions: Record<string, ColonialRegion>;
  buildings: Record<string, Building>;
  parliamentActions: Record<string, IdLocalised>;
  estateActions: Record<string, IdLocalised>;
  policies: Record<string, Policy>;
}

export type Condition = {
  conditions?: Record<string, Array<string>>;
  scopes?: Record<string, Array<Condition>>
  clauses?: Record<string, Array<Condition>>
}

export type Effects = {
  limit?: Condition;
  ifEffect?: Effects;
  elseIfEffect?: Array<Effects>;
  elseEffect?: Effects;
  effects?: Record<string, Array<Effects>>;
  regions?: Record<string, Array<Effects>>;
  areas?: Record<string, Array<Effects>>;
  countries?: Record<string, Array<Effects>>;
  provinces?: Record<string, Array<Effects>>;
  units?: Record<string, Array<Effects>>;
  countryEvents?: Array<Event>;
  addCountryModifiers?: Array<AddModifier>;
}

export type Decision = IdExampleLocalised & {
  description: ExampleLocalised;
  major: boolean;
  aiImportance?: number;
  doNotCore?: number;
  doNotIntegrate?: string;
  potential: Condition;
  provincesToHighlight?: Condition;
  allow: Condition;
  effects: Effects;
}

export type Event = {
  id: string;
  days?: number;
  random?: number;
  tooltip?: string;
}

export type AddModifier = {
  name: string;
  duration?: number;
  isHidden?: boolean;
  desc?: string;
}

export type Country = IdImageLocalised & {
  graphicalCulture?: string;
  historicalCouncil?: string;
  historicalScore?: number;
  historicalIdeaGroups?: Array<string>;
  monarchNames?: Record<string, number>;
  historicalUnits?: Array<string>;
  leaderNames?: Array<string>;
  shipNames?: Array<string>;
  armyNames?: Array<string>;
  fleetNames?: Array<string>;
  color?: Color;
  revolutionaryColors?: Array<Color>;
  ideasGroup?: string;
  decisions?: Array<string>;
  possibleMissions: Array<MissionTreesCondition>;
  historyItems: Record<string, CountryHistoryItem>;
}

export type MissionTreesCondition = {
  condition: Record<string, Condition>;
  trees: Record<number, Array<string>>;
}

export type CountryHistoryItem = {
  technologyGroup?: string;
  unitType?: string;

  mercantilism?: number;

  capital?: number;

  changedTagFrom?: string;

  fixedCapital?: number;

  government?: string;

  religiousSchool?: string;

  nationalFocus?: string;

  governmentLevel?: number;

  primaryCulture?: string;

  religion?: string;

  joinLeague?: string;

  addArmyProfessionalism?: number;

  addAcceptedCultures?: Array<string>;

  removeAcceptedCultures?: Array<string>;

  historicalFriends?: Array<string>;

  historicalEnemies?: Array<string>;

  elector?: boolean;

  revolutionTarget?: boolean;

  clearScriptedPersonalities?: boolean;

  changeEstateLandShares?: Record<string, number>;

  addHeirPersonalities?: Array<string>;

  addRulerPersonalities?: Array<string>;

  addQueenPersonalities?: Array<string>;

  setEstatePrivilege?: Array<string>;

  addGovernmentReform?: Array<string>;

  setCountryFlag?: Array<string>;

  monarch: Monarch;

  queen: Queen;

  heir: Heir;

  leaders: Array<Leader>;
}

export type Monarch = {
  name?: string;

  monarchName?: string;

  dynasty?: string;

  birthDate?: string;

  deathDate?: string;

  adm?: number;

  dip?: number;

  mil?: number;

  female?: boolean;

  regent?: boolean;

  culture?: string;

  religion?: string;

  personalities: Array<string>;

  leader: Leader;
}

export type Queen = Monarch & {
  countryOfOrigin?: string;
  consort: boolean;
}

export type Heir = Monarch & {
  countryOfOrigin?: number;
}

export type Leader = {
  name: string;
  manuever: number;
  fire: number;
  shock: number;
  siege: number;
  personality: string;
  deathDate: string;
}

export type Modifiers = {
  enables?: Array<string>;
  modifiers?: Record<string, number>;
}

export type Modifier = IdLocalised & {
  modifiers?: Modifiers;
}

export type Advisor = IdImageLocalised & {
  power: Power;
  allowOnlyMale: boolean;
  allowOnlyFemale: boolean;
  skillScaledModifier?: Modifiers;
  modifiers?: Modifiers;
}

export type Religion = IdImageLocalised & {
  color: Color;
  hreReligion: boolean;
  hreHereticReligion: boolean;
  useAuthority: boolean;
  useReligiousReforms: boolean;
  usesAnglicanPower: boolean;
  usesHussitePower: boolean;
  usesChurchPower: boolean;
  useFervor: boolean;
  hasPatriarchs: boolean;
  misguidedHeretic: boolean;
  useFetishistCult: boolean;
  useDoom: boolean;
  usePersonalDeity: boolean;
  usesIsolationism: boolean;
  usesKarma: boolean;
  usesPiety: boolean;
  usesHarmony: boolean;
  canHaveSecondaryReligion: boolean;
  allowedCenterConversion?: Array<string>;
  aspects?: Array<string>;
  blessings?: Array<string>;
  heretic?: Array<string>;
  holySites?: Array<string>;
  date?: string;
  papacy?: ReligionPapacy;
  icons: Array<ReligionIcon>;
  religionGroup: string;
  countryModifiers?: Modifiers;
  countryModifiersAsSecondary?: Modifiers;
  willGetCenter?: Condition;
  harmonizedModifier?: string;
}

export type ReligionIcon = IdLocalised & {
  modifiers?: Modifiers;
  allow?: Condition;
}

export type ReligionPapacy = {
  tag?: string;
  electionCost?: number;
  harshModifiers?: Modifiers;
  neutralModifiers?: Modifiers;
  concilatoryModifiers?: Modifiers;
  concessions: Array<ReligionPapacyConcession>;
}

export type ReligionPapacyConcession = IdLocalised & {
  harshModifiers?: Modifiers;
  concilatoryModifiers?: Modifiers;
}

export type Area = IdLocalised & {
  region: string;
  provinces: Array<number>;
  color: Color;
}

export type Region = IdLocalised & {
  superRegion: string;
  areas: Array<string>;
  provinces: Array<number>;
  color: Color;
  monsoon: Array<MinMax<MonthDay>>
}

export type SuperRegion = IdLocalised & {
  regions: Array<string>;
  provinces: Array<number>;
  color: Color;
}

export type Continent = IdLocalised & {
  provinces: Array<number>;
  color: Color;
}

export type ReligionGroup = IdLocalised & {
  religions: Array<string>;
  defenderOfFaith: boolean;
  canFormPersonalUnions: boolean;
  centerOfReligion?: number;
  flagsWithEmblemPercentage?: number;
  flagEmblemIndexRange?: Record<number, number>;
  harmonizedModifier?: string;
  crusadeName?: string;
  religiousSchools?: Record<string, ReligiousSchool>;
}

export type ReligiousSchool = IdImageLocalised & {
  potentialInviteScholar?: Condition;
  canInviteScholar?: Condition;
  onInviteScholar?: Effects;
  inviteScholarModifierDisplay?: string;
  modifiers?: Modifiers;
}

export type IdeaGroup = IdImageLocalised & {
  category: Power;
  free: boolean;
  trigger?: Condition;
  start?: Modifiers;
  bonus?: Modifiers;
  ideas?: Record<string, Idea>;
}

export type Idea = IdImageLocalised & {
  modifiers?: Modifiers;
  description?: Localised;
}

export type TradeGood = IdImageLocalised & {
  color: Color;
  tradeModifiers?: Modifiers;
  provinceModifiers?: Modifiers;
  basePrice?: number;
  goldType: boolean;
}

export type TechGroup = IdLocalised & {
  startLevel: number;
  startCostModifier: number;
  primitive: boolean;
  unitType?: string;
  nationDesignerCost?: NationDesignerCost;
  nationDesignerTrigger?: Condition;
}

export type NationDesignerCost = {
  trigger?: Condition;
  value: number;
}

export type CenterOfTrade = {
  level: number;
  cost?: number;
  type: 'INLAND' | 'COASTAL';
  provinceModifiers?: Modifiers;
  stateModifiers?: Modifiers;
  globalModifiers?: Modifiers;
}

export type Unit = IdLocalised & {
  description?: Localised;
  unitType: string;
  type: UnitType;
  maneuver?: number;
  offensiveMorale?: number;
  defensiveMorale?: number;
  offensiveFire?: number;
  defensiveFire?: number;
  offensiveShock?: number;
  defensiveShock?: number;
  hullSize?: number;
  baseCannons?: number;
  sailSpeed?: number;
  spriteLevel?: number;
}

export enum UnitType {
  INFANTRY = 'INFANTRY',
  CAVALRY = 'CAVALRY',
  ARTILLERY = 'ARTILLERY',
  HEAVY_SHIP = 'HEAVY_SHIP',
  LIGHT_SHIP = 'LIGHT_SHIP',
  GALLEY = 'GALLEY',
  TRANSPORT = 'TRANSPORT',
}

export type TradeNode = IdLocalised & {
  location?: number;
  color: Color;
  inland: boolean;
  aiWillPropagateThroughTrade: boolean;
  end: boolean;
  provinces?: Array<number>;
  outgoings?: Array<TradeNodeOutgoing>;
}

export type TradeNodeOutgoing = {
  id: string;
  path?: Array<number>;
  controls?: Array<Point>;
}

export type Point = {
  x: number;
  y: number;
}

export type TechnologyType = {
  aheadOfTime?: Modifiers;
  technologies?: Array<Technology>;
}

export type Technology = Localised & {
  number: number;
  year: number;
  type: Power;
  modifiers?: Modifiers;
}

export type ChurchAspect = IdLocalised & {
  modifiers?: Modifiers;
  cost?: number;
}

export type GreatProject = IdImageLocalised & {
  start: number;
  date?: string;
  time?: number;
  buildingCost: number;
  startingTier: number;
  type: GreatProjectType;
  canBeMoved: boolean;
  tiers?: Array<GreatProjectTier>;
  canUpgradeTrigger?: Condition;
  canUseModifiersTrigger?: Condition;
  keepTrigger?: Condition;
  buildTrigger?: Condition;
  onBuilt?: Effects;
  onDestroy?: Effects;
}

export enum GreatProjectType {
  MONUMENT = 'MONUMENT',
  CANAL = 'CANAL',
}

export type  GreatProjectTier = {
  name: string;
  time?: number;
  buildingCost: number;
  provinceModifiers?: Modifiers;
  areaModifiers?: Modifiers;
  countryModifiers?: Modifiers;
  onUpgraded?: Effects;
}

export type Dlc = IdImageLocalised & {
  name: string;
  category?: string;
  recommendations?: Array<string>;
  interestingCountries?: Array<string>;
}

export type Mission = IdImageLocalised & {
  required?: Array<string>;
  completedBy?: string;
  description?: Localised;
  generic: boolean;
}

export type MinMax<T> = {
  min?: T;
  max?: T;
}

export type MonthDay = {
  month: number;
  day: number;
}

export type ColonialRegion = IdLocalised & {
  provinces?: Array<number>;
  color: Color;
  taxIncome?: number;
  nativeSize?: number;
  nativeFerocity?: number;
  nativeHostileness?: number;
  tradeGoods?: Record<string, number>;
  cultures?: Record<string, number>;
  religions?: Record<string, number>;
}

export type Building = IdImageLocalised & {
  cost?: number;
  time?: number;
  makeObsolete?: string;
  onePerCountry: boolean;
  allowInGoldProvinces: boolean;
  indestructible: boolean;
  onmap: boolean;
  influencingFort: boolean;
  manufactory?: Array<string>;
  bonusManufactory?: Array<string>;
  governmentSpecific: boolean;
  showSeparate: boolean;
  modifier?: Modifiers;
  buildTrigger?: Condition;
}

export type Age = IdImageLocalised & {
  start: number;
  religiousConflicts: boolean;
  canStart?: Condition;
  papacy?: number;
  absolutism?: Record<string, number>;
  objectives?: Record<string, AgeObjective>;
  abilities?: Record<string, AgeAbility>;
}

export type AgeObjective = IdImageLocalised & {
  allow?: Condition;
  trigger: Condition;
}

export type AgeAbility = IdImageLocalised & {
  allow?: Condition;
  modifiers?: Modifiers;
  effects?: Effects;
  rules?: Array<string>;
}

export type Institution = IdImageLocalised & {
  bonus?: Modifiers;
  embracementSpeed?: Modifiers;
  tradeCompanyEfficiency?: number;
  startChance?: number;
  historicalStartProvince?: number;
  historicalStartDate?: string;
  onStart?: string;
  history?: Condition;
  canStart?: Condition;
  canEmbrace?: Condition;
}

export type Province = IdLocalised & {
  name?: string;
  isOcean: boolean;
  isLake: boolean;
  climate?: string;
  monsoon?: string;
  winter?: string;
  terrainCategory?: string;
  area?: string;
  continent?: string;
  tradeCompany?: string;
  historyItems?: Record<string, ProvinceHistoryItem>;
}

export type ProvinceHistoryItem = {
  owner?: string;
  controller?: string;
  addCores?: Array<string>;
  removeCores?: Array<string>;
  isCity?: boolean;
  culture?: string;
  religion?: string;
  baseTax?: number;
  baseProduction?: number;
  baseManpower?: number;
  tradeGood?: string;
  hre?: boolean;
  capital?: string;
  discoveredBy?: Array<string>;
  reformationCenter?: boolean;
  seatInParliament?: boolean;
  unrest?: number;
  centerOfTrade?: number;
  extraCost?: number;
  nativeSize?: number;
  nativeHostileness?: number;
  nativeFerocity?: number;
  addPermanentModifier?: Array<ModifierApply>;
  removeProvinceModifier?: Array<ModifierApply>;
  newBuildings?: Array<string>;
  removeBuildings?: Array<string>;
}

export type ModifierApply = {
  modifier?: string;
  duration: number;
}

export type Culture = IdLocalised & {
  group?: string;
  primary?: string;
  maleNames?: Array<string>;
  femaleNames?: Array<string>;
  dynastyNames?: Array<string>;
}

export type CultureGroup = IdLocalised & {
  cultures?: Array<string>;
  maleNames?: Array<string>;
  femaleNames?: Array<string>;
  dynastyNames?: Array<string>;
}

export type Faction = IdImageLocalised & {
  category: Power;
  modifiers?: Modifiers;
  trigger?: Condition;
  names?: Array<Names>;
}

export type Names = IdLocalised & {
  trigger?: Condition;
}

export type Disaster = IdImageLocalised & {
  description: ExampleLocalised;
  potential: Condition;
  canStart: Condition;
  canStop: Condition;
  progress: Modifiers;
  modifier: Modifiers;
  onStart?: string;
  onEnd?: string;
  monthlyEvents?: Array<string>;
  randomEvents?: Record<string, number>;
}

export type Policy = IdLocalised & {
  category: Power;
  allow?: Condition;
  potential?: Condition;
  modifiers?: Modifiers;
}
