import { Translate } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import React from 'react';
import { useIntl } from 'react-intl';

interface ExampleIconProps extends IconButtonProps {
  onClick: () => void;
}

function ExampleIcon({ onClick, ...others }: ExampleIconProps) {
  const intl = useIntl();

  return (
    <Tooltip title={ intl.formatMessage({ id: 'wiki.common.example' }) }>
      <IconButton onClick={ onClick } { ...others }>
        <Translate/>
      </IconButton>
    </Tooltip>
  )
}

export default ExampleIcon;
