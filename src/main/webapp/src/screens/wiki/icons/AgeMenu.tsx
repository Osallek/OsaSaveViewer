import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function AgeMenu(props: IconPropsSizeOverrides) {
  return <Avatar src='/eu4/wiki/age.png' { ...props }/>
}

export default AgeMenu
