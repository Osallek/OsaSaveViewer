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
  colorsImage: string;
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
  missions: Array<SaveMission>;
};

export type Localised = {
  localisations: Record<Localization, string>;
}

export type ImageLocalised = Localised & {
  image?: string;
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
  city: boolean;
  improvements?: Record<string, number>;
  colonySize?: number;
  buildings?: Array<string>;
  history: Array<SaveProvinceHistory>;
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
  hegemony?: Pair<string, number>;
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
  missions?: Array<string>;
  completedMissions?: Array<string>;
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
}
