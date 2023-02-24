import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function ModifierMenu(props: IconPropsSizeOverrides) {
  return <Avatar src='/eu4/wiki/modifier.png' { ...props }/>
}

export default ModifierMenu
