import React from 'react';
import AdvisorMenu from 'screens/wiki/icons/AdvisorMenu';
import AgeMenu from 'screens/wiki/icons/AgeMenu';
import CountryMenu from 'screens/wiki/icons/CountryMenu';
import DecisionMenu from 'screens/wiki/icons/DecisionMenu';
import IdeaGroupMenu from 'screens/wiki/icons/IdeaGroupMenu';
import ModifierMenu from 'screens/wiki/icons/ModifierMenu';
import ReligionMenu from 'screens/wiki/icons/ReligionMenu';

export type WikiType = {
  path: string;
  icon: React.FC;
}

export const wikiTypes: Record<string, WikiType> = {
  countries: {
    path: 'countries',
    icon: CountryMenu
  },
  decisions: {
    path: 'decisions',
    icon: DecisionMenu
  },
  advisors: {
    path: 'advisors',
    icon: AdvisorMenu
  },
  modifiers: {
    path: 'modifiers',
    icon: ModifierMenu
  },
  ages: {
    path: 'ages',
    icon: AgeMenu
  },
  ideaGroups: {
    path: 'idea-groups',
    icon: IdeaGroupMenu
  },
  religionGroups: {
    path: 'religion-groups',
    icon: ReligionMenu
  },
  religions: {
    path: 'religions',
    icon: ReligionMenu
  },
  provinces: {
    path: 'provinces',
    icon: ReligionMenu
  },
  cultureGroups: {
    path: 'culture-groups',
    icon: ReligionMenu
  },
  cultures: {
    path: 'cultures',
    icon: ReligionMenu
  },
  estatePrivileges: {
    path: 'estate-privileges',
    icon: ReligionMenu
  },
  greatProjects: {
    path: 'great-projects',
    icon: ReligionMenu
  },
  regions: {
    path: 'regions',
    icon: ReligionMenu
  },
  governmentReforms: {
    path: 'government-reforms',
    icon: ReligionMenu
  },
  techGroups: {
    path: 'tech-groups',
    icon: ReligionMenu
  },
  tradeGoods: {
    path: 'trade-goods',
    icon: ReligionMenu
  },
}

