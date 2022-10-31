import { Home, KeyboardArrowDown, Map } from '@mui/icons-material';
import { AppBar, Backdrop, Button, CircularProgress, Grid, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { api } from 'api';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import NodeCountriesTab from 'screens/node/NodeCountriesTab';
import NodeIncomingTab from 'screens/node/NodeIncomingTab';
import NodeInfoTab from 'screens/node/NodeInfoTab';
import NodeMapTab from 'screens/node/NodeMapTab';
import NodeOutgoingTab from 'screens/node/NodeOutgoingTab';
import theme from 'theme';
import { SaveTradeNode } from 'types/api.types';
import { MapSave } from 'types/map.types';
import { colorToHex, formatDate, stringComparator } from 'utils/format.utils';
import { convertSave, getTradeNode, getTradeNodesName } from 'utils/save.utils';

function NodePage() {
  const params = useParams();
  const intl = useIntl();

  const [save, setSave] = useState<MapSave>();
  const [saveId, setSaveId] = useState<string | undefined>();
  const [nodeId, setNodeId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [node, setNode] = useState<SaveTradeNode | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const [nodesAnchorEl, setNodesAnchorEl] = React.useState<null | HTMLElement>(null);
  const nodesOpen = Boolean(nodesAnchorEl);

  if (saveId !== params.id) {
    setSaveId(params.id);
  }

  if (nodeId !== params.nodeId) {
    setNodeId(params.nodeId);
  }

  const handleTab = (index: number) => {
    searchParams.set('tab', String(index));
    setSearchParams(searchParams);
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (saveId) {
          const { data } = await api.save.one(saveId);

          setSave(convertSave(data, false));
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    })()
  }, [saveId]);

  useEffect(() => {
    if (save && nodeId) {
      const node = getTradeNode(save, nodeId);

      if (!node) {
        setError(true);
      } else {
        document.title = `${ save.name } - ${ getTradeNodesName(node) }`;
        setNode(node);
        console.log(node);
      }

      setLoading(false);
    }
  }, [save, nodeId]);

  useEffect(() => {
    setActiveTab(Number(searchParams.get('tab') ?? '1'));
  }, [searchParams]);

  return (
    <>
      { (error || (!loading && (node === undefined || save === undefined))) ?
        (
          <Grid container alignItems='center' justifyContent='center' flexDirection='column'
                style={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'common.nodeNotFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary'/>
            </Link>
          </Grid>
        )
        :
        (loading ?
            (
              <Backdrop open style={ { backgroundColor: theme.palette.primary.light } }>
                <CircularProgress color='primary'/>
              </Backdrop>
            )
            :
            (save && node) &&
            (
              <>
                <AppBar sx={ { position: 'relative' } }>
                  <Toolbar>
                    <Grid container alignItems='center'>
                      <Link to={ `/save/${ saveId }` }>
                        <Map color='secondary'/>
                      </Link>
                      <Typography sx={ { ml: 2, mr: 2 } } variant='h6' component='div'>
                        { `${ save.name } (${ formatDate(save.date) })` }
                      </Typography>
                      <Button
                        key='button-nodes'
                        variant='outlined'
                        color='secondary'
                        aria-controls={ nodesOpen ? 'basic-menu' : undefined }
                        aria-haspopup='true'
                        aria-expanded={ nodesOpen ? 'true' : undefined }
                        onClick={ event => setNodesAnchorEl(event.currentTarget) }
                        endIcon={ <KeyboardArrowDown/> }
                        style={ { marginLeft: 'auto' } }
                      >
                        { intl.formatMessage({ id: 'common.tradeNodes' }) }
                      </Button>
                      <Menu
                        id='basic-menu'
                        anchorEl={ nodesAnchorEl }
                        open={ nodesOpen }
                        onClose={ () => setNodesAnchorEl(null) }
                        MenuListProps={ {
                          style: { backgroundColor: theme.palette.primary.light }
                        } }
                      >
                        {
                          save.tradeNodes
                          && save.tradeNodes.sort((a, b) => stringComparator(getTradeNodesName(a), getTradeNodesName(b)))
                            .map(node => (
                              <MenuItem component={ Link } to={ `/save/${ saveId }/trade-node/${ node.name }` }
                                        style={ { color: theme.palette.primary.contrastText } }
                                        key={ `menu-${ node.name }` } onClick={ () => setNodesAnchorEl(null) }>
                                { getTradeNodesName(node) }
                              </MenuItem>
                            ))
                        }
                      </Menu>
                    </Grid>
                  </Toolbar>
                  <Toolbar style={ { backgroundColor: theme.palette.primary.dark } }>
                    <Grid container alignItems='center'>
                      <div style={ {
                        width: 10,
                        height: 10,
                        backgroundColor: colorToHex(node.color),
                        marginRight: 4
                      } }/>
                      <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                        { getTradeNodesName(node) }
                      </Typography>
                    </Grid>
                  </Toolbar>
                </AppBar>
                <Grid item alignItems='center' justifyContent='center' xs={ 12 }>
                  <Tabs
                    value={ activeTab }
                    onChange={ (event, value) => handleTab(value) }
                    variant='scrollable'
                    scrollButtons='auto'
                    style={ { marginBottom: 8 } }
                  >
                    <Grid item style={ { flex: 1 } }/>
                    <Tab label={ intl.formatMessage({ id: 'tradeNode.tab.info' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'tradeNode.tab.map' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'tradeNode.tab.countries' }) }/>
                    <Tab label={ intl.formatMessage({ id: 'tradeNode.incomingValue' }) }/>
                    {
                      (!node.retention || node.retention < 1) &&
                        <Tab label={ intl.formatMessage({ id: 'tradeNode.outGoingValue' }) }/>
                    }
                    <Grid item style={ { flex: 1 } }/>
                  </Tabs>
                </Grid>
                <Grid container alignItems='start' justifyContent='center' style={ { padding: 24 } } key={ `grid-g-${ nodeId }` } ref={ containerRef }>
                  {
                    activeTab == 1 && <NodeInfoTab node={ node } save={ save }/>
                  }
                  {
                    activeTab == 2 && <NodeMapTab node={ node } save={ save } containerRef={ containerRef }/>
                  }
                  {
                    activeTab == 3 && <NodeCountriesTab node={ node } save={ save }/>
                  }
                  {
                    activeTab == 4 && <NodeIncomingTab node={ node } save={ save }/>
                  }
                  {
                    activeTab == 5 && <NodeOutgoingTab node={ node } save={ save }/>
                  }
                </Grid>
              </>
            )
        )
      }
    </>
  )
}

export default NodePage;
