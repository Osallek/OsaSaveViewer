import { Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { ExampleLocalised } from 'types/api.types';
import { getName } from 'utils/data.utils';

interface ExampleLocalisedProps extends TypographyProps {
  example: ExampleLocalised;
  suffix?: string;
  useExample: boolean;
}

function LocalisedExample({ example, suffix, useExample, ...others }: ExampleLocalisedProps) {
  return (
    <Typography variant='body1' { ...others }>
      { `${ getName(useExample ? example.localisationsExample : example.localisations) }${ suffix ?? '' }` }
    </Typography>
  )
}

export default LocalisedExample;
