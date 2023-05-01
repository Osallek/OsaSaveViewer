import { Avatar, Card, CardActionArea, CardContent, CardHeader, Collapse, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import theme from 'theme';
import { IdeaGroup } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { getIdeaGroupImage } from 'utils/wiki.utils';

interface IdeaGroupCardProps {
  group: IdeaGroup;
}

function IdeaGroupCard({ group }: IdeaGroupCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState<number>(4);

  return (
    <Card sx={ { width: '100%' } } elevation={ expanded ? 1 : 0 }>
      <CardActionArea onClick={ () => setExpanded(!expanded) }>
        <CardHeader disableTypography
                    title={
                      <Grid container item alignItems='center'>
                        <Typography variant='h5'
                                    sx={ {
                                      color: theme.palette.primary.contrastText,
                                      fontWeight: 'bold',
                                      mr: 1
                                    } }>
                          { getLName(group) }
                        </Typography>
                        <Avatar
                          src={ `/eu4/wiki/${ group.category.toLowerCase() }.png` }
                          variant='square' sx={ { width: 28, height: 28 } }/>
                      </Grid>
                    }
                    avatar={ <Avatar src={ getIdeaGroupImage(group) }
                                     variant='square'/> }
                    sx={ {
                      backgroundColor: theme.palette.primary.dark, borderBottomRightRadius: borderRadius,
                      borderBottomLeftRadius: borderRadius
                    } }
        />
      </CardActionArea>
      <Collapse in={ expanded } timeout="auto" unmountOnExit
                addEndListener={ (node, done) => setBorderRadius(expanded ? 0 : 4) }>
        <CardContent>
          dfd
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default IdeaGroupCard;
