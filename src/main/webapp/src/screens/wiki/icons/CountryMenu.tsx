import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function CountryMenu(props: IconPropsSizeOverrides) {
  return <Avatar variant='square' src='/eu4/wiki/country.png' { ...props }/>
}

export default CountryMenu
