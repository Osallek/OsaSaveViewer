import { Avatar } from '@mui/material';
import { IconPropsSizeOverrides } from '@mui/material/Icon/Icon';
import * as React from "react"

function IdeaGroupMenu(props: IconPropsSizeOverrides) {
  return <Avatar src='/eu4/wiki/idea_group.png' { ...props }/>
}

export default IdeaGroupMenu
