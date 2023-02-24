import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function DecisionMenu(props: IconPropsSizeOverrides) {
  return <Avatar src='/eu4/wiki/decision.png' { ...props }/>
}

export default DecisionMenu
