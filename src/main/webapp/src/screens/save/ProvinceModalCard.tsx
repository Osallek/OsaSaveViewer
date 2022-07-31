import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, DialogContent, DialogTitle, Grid, LinearProgress, Tooltip, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';
import React from 'react';
import { useIntl } from 'react-intl';
import theme from 'theme';
import { SaveProvince } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatDate, formatNumber, stringComparator } from 'utils/format.utils';
import {
  getArea, getAreaState, getBuilding, getBuildingImage, getBuildingName, getBuildingsImage, getBuildingsName, getCountry, getCountryFlag, getCountryName,
  getCountrysFlag, getCountrysName, getCultureName, getGoodImage, getGoodName, getPDev, getPHistory, getReligionImage, getReligionName, interestingHistory
} from 'utils/save.utils';

interface ProvinceModalCardProps {
  province: SaveProvince;
  save: MapSave;
}

function ProvinceModalCard({ province, save }: ProvinceModalCardProps) {
  const intl = useIntl();
  const history = getPHistory(province, save);
  const state = getAreaState(getArea(save, province), history.owner);
  const timeline = province.history.filter((value, index) => index !== 1).filter(h => interestingHistory(h)).sort((a, b) => -stringComparator(a.date, b.date));

  function LinearProgressWithLabel(props: LinearProgressProps) {
    return (
      <Tooltip title={ `${ Math.round(props.value ?? 0,) }%` }>
        <Box sx={ { display: 'flex', alignItems: 'center', width: '100%' } }>
          <LinearProgress variant="determinate" { ...props } style={ { ...props.style, width: '100%' } }/>
        </Box>
      </Tooltip>
    );
  }

  return (
    <>
      <DialogTitle>
        <Grid container alignItems='center'>
          <Avatar src={ getCountryFlag(save, history.owner) } variant='square' style={ { marginRight: 8 } }/>
          <Typography variant='h5' color='white' component='span'>
            { `${ province.name } (${ province.id })` }
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container item xs={ 12 } md={ timeline.length > 0 ? 6 : 12 } flexDirection='column' alignItems='center'
                rowSpacing={ 1 }>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.owner' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                { history.owner &&
                    <>
                        <Avatar src={ getCountryFlag(save, history.owner) } variant='square'/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountryName(save, history.owner) }
                        </Typography>
                    </>
                }
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.controller' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                { history.controller &&
                    <>
                        <Avatar src={ getCountryFlag(save, history.controller) } variant='square'/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getCountryName(save, history.controller) }
                        </Typography>
                    </>
                }
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.dev' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                  { `${ formatNumber(getPDev(province)) } (${ province.baseTax ?? 0 } / ${ formatNumber(province.baseProduction?? 0) } / ${ province.baseManpower ?? 0 })` }
                </Typography>
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.cores' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                {
                  history.cores &&
                  history.cores.map(value => getCountry(save, value))
                    .sort((a, b) => stringComparator(getCountrysName(a), getCountrysName(b)))
                    .map(value => (
                      <Tooltip title={ getCountrysName(value) } key={ `tooltip-core-${ value.tag }` }>
                        <Avatar src={ getCountrysFlag(value) } variant='square'
                                style={ { marginRight: 8 } }/>
                      </Tooltip>
                    ))
                }
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.religion' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                <Avatar src={ getReligionImage(save, history.religion) } variant='square'/>
                <Typography variant='body1' component='span'
                            style={ { marginLeft: 8 } }>{ getReligionName(save, history.religion) }</Typography>
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.culture' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                <Typography variant='body1' component='span'>{ getCultureName(save, history.culture) }</Typography>
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.devastation' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                <LinearProgressWithLabel variant='determinate' color='error' value={ province.devastation ?? 0 }
                                         style={ { backgroundColor: 'white' } }/>
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.prosperity' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                <LinearProgressWithLabel variant='determinate' color='success'
                                         value={ (state && state.prosperity) ?? 0 }
                                         style={ { backgroundColor: 'white' } }/>
              </Grid>
            </Grid>
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.good' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                { history.tradeGood && history.tradeGood !== 'unknown' &&
                    <>
                        <Avatar src={ getGoodImage(save, history.tradeGood) } variant='square'/>
                        <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                          { getGoodName(save, history.tradeGood) }
                        </Typography>
                    </>
                }
              </Grid>
            </Grid>
            {
              !province.city && province.colonySize &&
              (
                <Grid container item alignItems='center'>
                  <Grid item xs={ 6 }>
                    <Typography variant='h6'>{ intl.formatMessage({ id: 'province.colonySize' }) }:</Typography>
                  </Grid>
                  <Grid container item xs={ 6 } alignItems='center'>
                    <Typography variant='body1' component='span'>{ province.colonySize | 0 }</Typography>
                  </Grid>
                </Grid>
              )
            }
            <Grid container item alignItems='center'>
              <Grid item xs={ 6 }>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.buildings' }) }:</Typography>
              </Grid>
              <Grid container item xs={ 6 } alignItems='center'>
                {
                  province.buildings &&
                  province.buildings.map(value => getBuilding(save, value))
                    .sort((a, b) => stringComparator(getBuildingsName(a), getBuildingsName(b)))
                    .map(value => (
                      <Tooltip title={ getBuildingsName(value) } key={ `tooltip-building-${ value.name }` }>
                        <Avatar src={ getBuildingsImage(value) } variant='square'
                                style={ { marginRight: 8, marginBottom: 8 } }/>
                      </Tooltip>
                    ))
                }
              </Grid>
            </Grid>
          </Grid>
          {
            timeline.length > 0 &&
            (
              <Grid container item xs={ 12 } md={ 6 } alignItems='center' flexDirection='column'>
                <Typography variant='h6'>{ intl.formatMessage({ id: 'province.history' }) }</Typography>
                <Timeline position="left" style={ { padding: 0, marginTop: 0, marginBottom: 0, width: '100%' } }>
                  {
                    timeline.map((h, index) => {
                      let display: string | undefined;
                      let icon: string | undefined;
                      let decoration: string | undefined;

                      if (h.owner) {
                        display = getCountryName(save, h.owner);
                        icon = getCountryFlag(save, h.owner);
                      } else if (h.religion) {
                        display = getReligionName(save, h.religion);
                        icon = getReligionImage(save, h.religion);
                      } else if (h.culture) {
                        display = getCultureName(save, h.culture);
                        icon = '/eu4/province/culture_icon.png';
                      } else if (h.tradeGood) {
                        display = getGoodName(save, h.tradeGood);
                        icon = getGoodImage(save, h.tradeGood);
                      } else if (h.buildings) {
                        Object.entries(h.buildings).forEach(([key, value]) => {
                          display = getBuildingName(save, key);
                          icon = getBuildingImage(save, key);
                          decoration = value ? undefined : 'line-through';
                        })
                      }

                      return (
                        <TimelineItem key={ `timeline-item-${ index }` }>
                          <TimelineOppositeContent style={ { alignSelf: 'center', textDecoration: decoration } }>
                            { display }
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineConnector
                              style={ { backgroundColor: (index === 0) ? theme.palette.primary.main : '#bdbdbd' } }/>
                            <TimelineDot variant='outlined' style={ {
                              borderColor: theme.palette.primary.main,
                              margin: 4,
                              borderRadius: 0
                            } }>
                              <Avatar src={ icon } style={ { width: 36, height: 36 } } variant='square'/>
                            </TimelineDot>
                            <TimelineConnector
                              style={ { backgroundColor: (index === (timeline.length - 1)) ? theme.palette.primary.main : '#bdbdbd' } }/>
                          </TimelineSeparator>
                          <TimelineContent style={ { alignSelf: 'center' } }>
                            { formatDate(h.date) }
                          </TimelineContent>
                        </TimelineItem>
                      )
                    })
                  }
                </Timeline>
              </Grid>
            )
          }
        </Grid>
      </DialogContent>
    </>
  )
}

export default ProvinceModalCard;
