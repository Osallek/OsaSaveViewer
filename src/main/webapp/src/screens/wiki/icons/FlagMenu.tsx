import { Flag } from '@mui/icons-material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function FlagMenu(props: IconPropsSizeOverrides) {
  return <Flag { ...props } style={ { color: '#5DAA44' } }/>
}

export default FlagMenu
