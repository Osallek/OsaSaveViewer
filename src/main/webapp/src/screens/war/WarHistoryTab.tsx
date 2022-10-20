import { Shield } from '@mui/icons-material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Paper, Tooltip, useTheme } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { toPng } from 'html-to-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import SwordIcon from 'screens/components/SwordIcon';
import SwordsIcon from 'screens/components/SwordsIcon';
import { SaveWar } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { cleanString, formatDate, formatNumber, stringComparator } from 'utils/format.utils';
import { getCountryFlag, getCountryName, getOceanLakeProvince, getProvince } from 'utils/save.utils';

interface TimelineItemDecoration {
  display?: React.ReactNode;
  icon?: React.ReactNode;
  date: string;
}

interface WarHistoryTabProps {
  war: SaveWar;
  save: MapSave;
}

function WarHistoryTab({ war, save }: WarHistoryTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  const [timeline, setTimeline] = useState<Array<TimelineItemDecoration>>([]);
  const [exporting, setExporting] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const exportToPng = useCallback(async () => {
    try {
      setExporting(true);
      if (mainRef.current === null) {
        return
      }

      await toPng(mainRef.current, { cacheBust: true, backgroundColor: 'white', filter: domNode => domNode.id !== 'export-button' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.setAttribute('download', `${ cleanString(war.name) }.png`);

          if (document.body) {
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } finally {
      setExporting(false);
    }
  }, [mainRef, setExporting]);

  useEffect(() => {
    setTimeline(war.history.map((h, index) => {
      const decorations: Array<TimelineItemDecoration> = [];

      if (h.addAttacker && h.addAttacker.length > 0) {
        decorations.push({
          icon: (
            <Tooltip title={ intl.formatMessage({ id: 'war.addAttacker' }) }>
              <div>
                <SwordIcon fontSize='large' fill={ green[800] }/>
              </div>
            </Tooltip>
          ),
          display: (
            <Grid container>
              { h.addAttacker.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b))).map(tag => (
                <Tooltip title={ getCountryName(save, tag) } key={ `attacker-${ war.id }-${ tag }` }>
                  <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                </Tooltip>
              )) }
            </Grid>
          ),
          date: h.date
        });
      }

      if (h.addDefender && h.addDefender.length > 0) {
        decorations.push({
          icon: (
            <Tooltip title={ intl.formatMessage({ id: 'war.addDefender' }) }>
              <Shield fontSize='large' style={ { color: green[800] } }/>
            </Tooltip>
          ),
          display: (
            <Grid container>
              { h.addDefender.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b))).map(tag => (
                <Tooltip title={ getCountryName(save, tag) } key={ `defender-${ war.id }-${ tag }` }>
                  <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                </Tooltip>
              )) }
            </Grid>
          ),
          date: h.date
        });
      }

      if (h.remAttacker && h.remAttacker.length > 0) {
        decorations.push({
          icon: (
            <Tooltip title={ intl.formatMessage({ id: 'war.remAttacker' }) }>
              <div>
                <SwordIcon fontSize='large' fill={ red[800] }/>
              </div>
            </Tooltip>
          ),
          display: (
            <Grid container>
              { h.remAttacker.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b))).map(tag => (
                <Tooltip title={ getCountryName(save, tag) } key={ `attacker-${ war.id }-${ tag }` }>
                  <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                </Tooltip>
              )) }
            </Grid>
          ),
          date: h.date
        });
      }

      if (h.remDefender && h.remDefender.length > 0) {
        decorations.push({
          icon: (
            <Tooltip title={ intl.formatMessage({ id: 'war.remDefender' }) }>
              <Shield fontSize='large' style={ { color: red[800] } }/>
            </Tooltip>
          ),
          display: (
            <Grid container>
              { h.remDefender.sort((a, b) => stringComparator(getCountryName(save, a), getCountryName(save, b))).map(tag => (
                <Tooltip title={ getCountryName(save, tag) } key={ `defender-${ war.id }-${ tag }` }>
                  <Avatar src={ getCountryFlag(save, tag) } variant='square' style={ { marginRight: 8, marginBottom: 8 } } component={ Paper }/>
                </Tooltip>
              )) }
            </Grid>
          ),
          date: h.date
        });
      }

      if (h.battles && h.battles.length > 0) {
        decorations.push(...h.battles.map(battle => ({
          icon: (
            <Tooltip title={ intl.formatMessage({ id: 'war.battle' }) }>
              <div>
                <SwordsIcon fontSize='large' fill={ blue[800] }/>
              </div>
            </Tooltip>
          ),
          display: (
            <Card style={ { width: '100%' } }>
              <CardHeader title={ `${ battle.name }` } style={ { backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText } }/>
              <CardContent>
                <Grid container style={ { width: '100%' } }>
                  <Grid container item xs={ 5 } alignItems='end' rowGap={ 1 } flexDirection='column'>
                    <Grid>
                      <Tooltip title={ getCountryName(save, battle.attacker.country) } key={ `defender-${ war.id }-${ battle.attacker.country }` }>
                        <Avatar src={ getCountryFlag(save, battle.attacker.country) } variant='square' component={ Paper }/>
                      </Tooltip>
                    </Grid>
                    {
                      getProvince(save, battle.location) &&
                        <>
                            <Grid container alignItems='center' justifyContent='end' style={ { flexWrap: 'nowrap', textAlign: 'end' } }>
                              { battle.attacker.commander ?? '-' }
                                <Avatar src='/eu4/country/general.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.infantry) }
                                <Avatar src='/eu4/country/infantry.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.cavalry) }
                                <Avatar src='/eu4/country/cavalry.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.artillery) }
                                <Avatar src='/eu4/country/artillery.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                            </Grid>
                        </>
                    }
                    {
                      getOceanLakeProvince(save, battle.location) &&
                        <>
                            <Grid container alignItems='center' justifyContent='end' style={ { flexWrap: 'nowrap', textAlign: 'end' } }>
                              { battle.attacker.commander ?? '-' }
                                <Avatar src='/eu4/country/admiral.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.heavyShip) }
                                <Avatar src='/eu4/country/heavy_ship.png' variant='square' style={ { marginRight: 3, marginLeft: 4, width: 33, height: 25 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.lightShip) }
                                <Avatar src='/eu4/country/light_ship.png' variant='square' style={ { marginLeft: 4, width: 35, height: 27 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.galley) }
                                <Avatar src='/eu4/country/galley.png' variant='square' style={ { marginLeft: 8, marginRight: 3, width: 29, height: 22 } }/>
                            </Grid>
                            <Grid container alignItems='center' justifyContent='end'>
                              { formatNumber(battle.attacker.transport) }
                                <Avatar src='/eu4/country/transport.png' variant='square' style={ { marginLeft: 10, marginRight: 6, width: 24, height: 22 } }/>
                            </Grid>
                        </>
                    }
                  </Grid>
                  <Grid container item xs={ 2 } justifyContent='center' alignItems='center'>
                    <SwordsIcon/>
                  </Grid>
                  <Grid container item xs={ 5 }>
                    <Grid>
                      <Tooltip title={ getCountryName(save, battle.defender.country) } key={ `defender-${ war.id }-${ battle.defender.country }` }>
                        <Avatar src={ getCountryFlag(save, battle.defender.country) } variant='square' component={ Paper }/>
                      </Tooltip>
                    </Grid>
                    {
                      getProvince(save, battle.location) &&
                        <>
                            <Grid container alignItems='center' justifyContent='start' style={ { flexWrap: 'nowrap' } }>
                                <Avatar src='/eu4/country/general.png' variant='square' style={ { marginRight: 4, width: 24, height: 24 } }/>
                              { battle.defender.commander ?? '-' }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/infantry.png' variant='square' style={ { marginRight: 4, width: 24, height: 24 } }/>
                              { formatNumber(battle.defender.infantry) }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/cavalry.png' variant='square' style={ { marginRight: 4, width: 24, height: 24 } }/>
                              { formatNumber(battle.defender.cavalry) }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/artillery.png' variant='square' style={ { marginRight: 4, width: 24, height: 24 } }/>
                              { formatNumber(battle.defender.artillery) }
                            </Grid>
                        </>
                    }
                    {
                      getOceanLakeProvince(save, battle.location) &&
                        <>
                            <Grid container alignItems='center' justifyContent='start' style={ { flexWrap: 'nowrap' } }>
                                <Avatar src='/eu4/country/admiral.png' variant='square' style={ { marginLeft: 4, width: 24, height: 24 } }/>
                              { battle.defender.commander ?? '-' }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/heavy_ship.png' variant='square' style={ { marginRight: 3, width: 33, height: 25 } }/>
                              { formatNumber(battle.defender.heavyShip) }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/light_ship.png' variant='square' style={ { marginRight: 4, width: 35, height: 27 } }/>
                              { formatNumber(battle.defender.lightShip) }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/galley.png' variant='square' style={ { marginLeft: 4, marginRight: 5, width: 29, height: 22 } }/>
                              { formatNumber(battle.defender.galley) }
                            </Grid>
                            <Grid container alignItems='center' justifyContent='start'>
                                <Avatar src='/eu4/country/transport.png' variant='square' style={ { marginLeft: 5, marginRight: 10, width: 24, height: 22 } }/>
                              { formatNumber(battle.defender.transport) }
                            </Grid>
                        </>
                    }
                  </Grid>
                </Grid>
                <Divider variant='middle' style={ { marginBottom: 8, marginTop: 8 } }
                         sx={ {
                           '&::before, &::after': {
                             borderColor: theme.palette.primary.light,
                           },
                         } }>
                  { intl.formatMessage({ id: 'war.losses' }) }
                </Divider>
                <Grid container justifyContent='space-between'>
                  <Grid container item xs={ 5 } justifyContent='end'>
                    { formatNumber(battle.attacker.losses) }
                  </Grid>
                  <Grid container item xs={ 5 } justifyContent='start'>
                    { formatNumber(battle.defender.losses) }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ),
          date: h.date
        })));
      }

      return decorations;
    }).flatMap(value => value ?? []));
  }, [war, save]);

  return (
    <>
      {
        timeline.length > 0 &&
          <Grid container item xs={ 10 } lg={ 8 } xl={ 6 } rowGap={ 2 } style={ { alignItems: 'center', justifyContent: 'center' } } ref={ mainRef }>
              <LoadingButton variant='contained' color='primary' onClick={ exportToPng } loading={ exporting } id='export-button'>
                { intl.formatMessage({ id: 'common.export' }) }
              </LoadingButton>
              <Timeline position="left" style={ { padding: 0, marginTop: 0, marginBottom: 0, width: '100%' } }>
                {
                  timeline.map(({ display, icon, date }, index) => (
                    <TimelineItem key={ `timeline-item-${ index }` }>
                      <TimelineOppositeContent style={ { alignSelf: 'center' } }>
                        { display }
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector style={ { backgroundColor: (index === 0) ? 'transparent' : theme.palette.primary.light } }/>
                        <TimelineDot variant='outlined' style={ { border: 'none', margin: 4 } }>
                          { icon }
                        </TimelineDot>
                        <TimelineConnector style={ { backgroundColor: (index === (timeline.length - 1)) ? 'transparent' : theme.palette.primary.light } }/>
                      </TimelineSeparator>
                      <TimelineContent style={ { alignSelf: 'center' } }>
                        { formatDate(date) }
                      </TimelineContent>
                    </TimelineItem>
                  ))
                }
              </Timeline>
          </Grid>
      }
    </>
  )
}

export default WarHistoryTab;
