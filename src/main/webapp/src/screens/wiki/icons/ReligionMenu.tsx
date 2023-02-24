import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function ReligionMenu(props: IconPropsSizeOverrides) {
  return <Avatar src='/eu4/wiki/religion.png' { ...props }/>
}

export default ReligionMenu
