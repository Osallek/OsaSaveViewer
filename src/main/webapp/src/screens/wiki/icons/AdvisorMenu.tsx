import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function AdvisorMenu(props: IconPropsSizeOverrides) {
  return <Avatar variant='square' src='/eu4/wiki/advisor.png' { ...props }/>
}

export default AdvisorMenu
