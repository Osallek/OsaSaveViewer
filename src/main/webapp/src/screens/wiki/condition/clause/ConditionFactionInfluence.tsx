import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import ConditionsNumber from 'screens/wiki/condition/ConditionsNumber';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getFaction, getFactionImage } from 'utils/wiki.utils';

interface ConditionTrustProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  negate: boolean;
  value?: string;
}

function ConditionFactionInfluence({ wiki, wikiVersion, condition, negate }: ConditionTrustProps): JSX.Element {
  let name = undefined;
  if (condition.conditions && condition.conditions.faction && condition.conditions.faction.length > 0) {
    name = condition.conditions.faction[0];
  }

  let influence = undefined;
  if (condition.conditions && condition.conditions.influence && condition.conditions.influence.length > 0) {
    influence = condition.conditions.influence [0];
  }

  let faction = influence !== undefined && name !== undefined && getFaction(wiki, name);
  return (
    <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } value={ name } grid={ false }
                            record={ wiki.factions } type={ wikiTypes.factions } sx={ { pl: 0 } } colons={ false }
                            avatar={ faction ? getFactionImage(faction) : undefined }
                            suffix={ <ConditionsNumber condition={ 'faction.influence' } negate={ negate }
                                                       grid={ false }
                                                       value={ influence ? Number(influence) : undefined }/> }/>
  )
}

export default ConditionFactionInfluence;
