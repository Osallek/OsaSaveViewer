import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import ConditionLocalised from 'screens/wiki/condition/ConditionLocalised';
import ConditionLocalisedLink from 'screens/wiki/condition/ConditionLocalisedLink';
import { Condition, Wiki } from 'types/api.types';
import { wikiTypes } from 'types/wiki.types';
import { getGreatProjectImage } from 'utils/wiki.utils';

interface ConditionGreatProjectProps extends TypographyProps {
  wiki: Wiki;
  wikiVersion: string;
  condition: Condition;
  negate: boolean;
  value?: string;
}

function ConditionGreatProject({ wiki, wikiVersion, condition, negate }: ConditionGreatProjectProps): JSX.Element {
  let tier = undefined;
  if (condition.conditions && condition.conditions.tier && condition.conditions.tier.length > 0) {
    tier = condition.conditions.tier[0];
  }

  let type = undefined;
  if (condition.conditions && condition.conditions.type && condition.conditions.type.length > 0) {
    type = condition.conditions.type[0];
  }

  let greatProject = undefined;
  if (type !== undefined && tier !== undefined) {
    greatProject = wiki.greatProjects[type];
  }

  if (greatProject) {
    return (
      <ConditionLocalisedLink wikiVersion={ wikiVersion } negate={ negate } value={ type }
                              colons={ false } avatar={ getGreatProjectImage(greatProject) }
                              record={ wiki.greatProjects } type={ wikiTypes.greatProjects } sx={ { pl: -1 } }
                              suffix={ <ConditionLocalised condition={ 'is_level' } sx={ { display: 'contents' } }
                                                           wikiVersion={ wikiVersion } wiki={ wiki }
                                                           value={ tier }/> }/>
    )
  } else {
    return <></>
  }
}

export default ConditionGreatProject;
