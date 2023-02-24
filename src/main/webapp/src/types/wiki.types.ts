import { SupportAgent } from '@mui/icons-material';
import React from 'react';
import AdvisorMenu from 'screens/wiki/icons/AdvisorMenu';
import FlagMenu from 'screens/wiki/icons/FlagMenu';
import DecisionMenu from 'screens/wiki/icons/DecisionMenu';
import ModifierMenu from 'screens/wiki/icons/ModifierMenu';
import IdeaGroupMenu from 'screens/wiki/icons/IdeaGroupMenu';
import ReligionMenu from 'screens/wiki/icons/ReligionMenu';
import AgeMenu from '../screens/wiki/icons/AgeMenu';

export type WikiType = {
  path: string;
  icon: React.FC;
}

export const wikiTypes: Record<string, WikiType> = {
  countries: {
    path: 'countries',
    icon: FlagMenu
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
  religions: {
    path: 'religions',
    icon: ReligionMenu
  },
}

