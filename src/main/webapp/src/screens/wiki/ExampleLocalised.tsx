import { Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import React from 'react';
import { Localised } from 'types/api.types';
import { getName } from 'utils/data.utils';

interface ExampleLocalisedProps extends TypographyProps {
  main: Localised;
  example?: Localised;
  suffix?: string;
  useExample: boolean;
}

function ExampleLocalised({ main, example, suffix, useExample, ...others }: ExampleLocalisedProps) {
  return (
    <Typography variant='body1' { ...others }>
      { `${ getName((useExample && example) ? example : main) }${ suffix ?? '' }` }
    </Typography>
  )
}

export default ExampleLocalised;
