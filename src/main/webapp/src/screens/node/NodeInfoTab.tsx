import { Avatar, Card, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import { SaveTradeNode } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { formatNumber } from 'utils/format.utils';
import { getTradeNodeIncomingValue, getTradeNodeLocalValue, getTradeNodeOutgoingValue, getTradeNodeValue } from 'utils/save.utils';

interface NodeInfoTabProps {
  node: SaveTradeNode;
  save: MapSave;
}

function NodeInfoTab({ node, save }: NodeInfoTabProps) {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Grid container item xs={ 10 } md={ 8 } lg={ 6 } xl={ 4 } rowGap={ 2 } style={ { alignItems: 'center', justifyContent: 'center' } }>
      <Grid container alignItems='center' justifyContent='center'>
        <Card style={ { backgroundColor: theme.palette.primary.light, width: '100%' } }>
          <CardContent style={ { backgroundColor: theme.palette.primary.light, paddingBottom: 16 } }>
            <Grid container item>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'tradeNode.totalValue' }) }
                  </Typography>
                </Grid>
                <Grid item alignItems='center'
                      style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { formatNumber(getTradeNodeValue(node)) }
                  </Typography>
                  <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                </Grid>
              </Grid>
              <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'tradeNode.localValue' }) }
                  </Typography>
                </Grid>
                <Grid item alignItems='center'
                      style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { formatNumber(getTradeNodeLocalValue(node)) }
                  </Typography>
                  <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                </Grid>
              </Grid>
              <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'tradeNode.incomingValue' }) }
                  </Typography>
                </Grid>
                <Grid item alignItems='center'
                      style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { formatNumber(getTradeNodeIncomingValue(node)) }
                  </Typography>
                  <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                </Grid>
              </Grid>
              <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'tradeNode.outGoingValue' }) }
                  </Typography>
                </Grid>
                <Grid item alignItems='center'
                      style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, borderRadius: 30 } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { formatNumber(getTradeNodeOutgoingValue(node, save)) }
                  </Typography>
                  <Avatar src={ '/eu4/country/income.png' } variant='square' style={ { width: 36, height: 36, marginLeft: 4 } }/>
                </Grid>
              </Grid>
              <Divider style={ { marginTop: 8, marginBottom: 8, width: '100%' } }/>
              <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item alignItems='center'>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { intl.formatMessage({ id: 'tradeNode.retention' }) }
                  </Typography>
                </Grid>
                <Grid item alignItems='center'
                      style={ { display: 'flex', backgroundColor: theme.palette.primary.main, paddingLeft: 8, paddingRight: 8, borderRadius: 30, height: 36 } }>
                  <Typography variant='body1' color={ theme.palette.primary.contrastText } style={ { fontWeight: 'bold' } }>
                    { `${ formatNumber(node.retention * 100) }%` }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default NodeInfoTab;
