import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Modifiers, ModifierType, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { formatNumberPlus, stringLocalisedComparator } from 'utils/format.utils';

export const modifiersGrid = (modifiers: Modifiers, wiki: Wiki) => {
  return <Grid container>
    {
      modifiers.enables &&
      modifiers.enables.map(enable => (
        <Grid container key={ `enable-${ enable.id }` }>
          <Typography variant='body1'>
            { getLName(enable) }
          </Typography>
        </Grid>
      ))
    }
    {
      modifiers.modifiers &&
      Object.entries(modifiers.modifiers)
            .filter(([name]) => wiki.rawModifiers[name])
            .sort(([nameA], [nameB]) => stringLocalisedComparator(wiki.rawModifiers[nameA], wiki.rawModifiers[nameB]))
            .map(([name, value]) => {
              const modifier = wiki.rawModifiers[name];
              let v = '';

              if (modifier.type === ModifierType.MULTIPLICATIVE) {
                v = `${ formatNumberPlus(value * 100) }%`
              } else {
                v = `${ formatNumberPlus(value) }`
              }

              return (
                <Grid container key={ `modifier-${ name }` }>
                  <Typography component='div' variant='body1'>
                    { `${ getLName(modifier) } : ` }
                    <Typography variant='body1' sx={ { fontWeight: 'bold', color: 'green', display: 'inline' } }>
                      { v }
                    </Typography>
                  </Typography>
                </Grid>
              )
            })
    }
  </Grid>;
}
