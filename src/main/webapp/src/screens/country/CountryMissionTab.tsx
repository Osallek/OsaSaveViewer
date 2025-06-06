import { Avatar, Badge, Grid, GridLegacy, Tooltip, Typography } from '@mui/material';
import { ElbowType, Enabled, GroupByType, NavigationMode, PageFitMode } from 'basicprimitives';
import { FamConfigShape, FamDiagram } from 'basicprimitivesreact';
import React, { useEffect, useRef, useState } from 'react';
import theme from 'theme';
import { SaveCountry } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { getLName } from 'utils/data.utils';
import { getMissionsImage, getMissionsName } from 'utils/save.utils';

const getConfig = (country: SaveCountry, save: MapSave): FamConfigShape => ({
  pageFitMode: PageFitMode.None,
  cursorItem: null,
  linesWidth: 1,
  linesColor: 'black',
  hasSelectorCheckbox: Enabled.False,
  lineLevelShift: 20,
  normalItemsInterval: 10,
  dotItemsInterval: 10,
  lineItemsInterval: 10,
  minimumVisibleLevels: country.missions2 ? country.missions2.length : 0,
  arrowsDirection: GroupByType.Children,
  elbowType: ElbowType.Round,
  showExtraArrows: false,
  navigationMode: NavigationMode.Inactive,
  showFrame: true,
  items:
    country.missions2?.map(mission => {
      return ({
        id: mission.name,
        title: getMissionsName(mission),
        label: getMissionsName(mission),
        image: getMissionsImage(mission),
        description: mission.description,
        completed: mission.completed,
        parents: mission.required,
        templateName: mission.completed ? 'missionTemplateCompleted' : 'missionTemplate',
      });
    }),
  templates: [
    {
      name: 'missionTemplate',
      itemSize: { width: 175, height: 100 },
      cursorPadding: { top: 3, bottom: 3, right: 10, left: 10 },
      minimizedItemSize: { width: 3, height: 3 },
      onItemRender: ({ context }: any) => (
        <Tooltip title={ context.description ? getLName(context.description) ?? '' : '' }
                 key={ `tooltip-${ context.name }` }>
          <GridLegacy container alignItems="center" justifyContent="center" flexDirection="column"
                      style={ { minHeight: '100%' } }>
            <Badge color="error" variant="dot">
              <Avatar src={ context.image } alt={ context.title }
                      style={ { width: 60, height: 60, filter: 'grayscale(100%)' } }/>
            </Badge>
            <Typography variant="body2" textAlign="center" style={ {
              backgroundColor: theme.palette.primary.light,
              padding: 4,
              borderRadius: 5,
              color: theme.palette.primary.contrastText,
              filter: 'grayscale(100%)'
            } }>
              { context.title }
            </Typography>
          </GridLegacy>
        </Tooltip>
      ),
    },
    {
      name: 'missionTemplateCompleted',
      itemSize: { width: 175, height: 100 },
      minimizedItemSize: { width: 3, height: 3 },
      onItemRender: ({ context }: any) => (
        <Tooltip title={ context.description ? getLName(context.description) ?? '' : '' }
                 key={ `tooltip-${ context.name }` }>
          <GridLegacy container alignItems="center" justifyContent="center" flexDirection="column"
                      style={ { minHeight: '100%' } }>
            <Badge color="success" variant="dot">
              <Avatar src={ context.image } alt={ context.title } style={ { width: 60, height: 60 } }/>
            </Badge>
            <Typography variant="body2" textAlign="center"
                        style={ {
                          backgroundColor: theme.palette.primary.light,
                          padding: 4,
                          borderRadius: 5,
                          color: theme.palette.primary.contrastText
                        } }>
              { context.title }
            </Typography>
          </GridLegacy>
        </Tooltip>
      ),
    }
  ],
});

interface CountryMissionTabProps {
  country: SaveCountry;
  save: MapSave;
}

function CountryMissionTab({ country, save }: CountryMissionTabProps) {
  const [config, setConfig] = useState<FamConfigShape | undefined>(undefined);

  const mainGrid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (country && country.missions2 && country.missions2.length > 0) {
      setConfig(getConfig(country, save));
    }
  }, [country, save]);

  return (
    <Grid container
          style={ {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: window.innerHeight - (mainGrid.current ? mainGrid.current.offsetTop : 0) - 24
          } }
          ref={ mainGrid }>
      {
        config && <FamDiagram centerOnCursor={ true } config={ config }/>
      }
    </Grid>
  );
}

export default CountryMissionTab;
