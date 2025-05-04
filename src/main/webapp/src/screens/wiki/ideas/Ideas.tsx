import { Home } from '@mui/icons-material';
import {
  Autocomplete, Avatar, Backdrop, Card, CardContent, CardHeader, Chip, CircularProgress, GridLegacy, TextField, Toolbar,
  Typography
} from '@mui/material';
import { api } from 'api';
import { WikiContext } from 'AppRouter';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { modifiersGrid } from 'screens/wiki/ModifiersGrid';
import WikiBar from 'screens/wiki/WikiBar';
import theme from 'theme';
import { IdeaGroup, IdLocalised, Modifiers, Policy, Wiki } from 'types/api.types';
import { getLName } from 'utils/data.utils';
import { stringComparator, stringLocalisedComparator, stringUComparator } from 'utils/format.utils';
import { getIdeaGroupImage } from 'utils/wiki.utils';

function Ideas() {
  const { version } = useParams();
  const intl = useIntl();
  const { wikiState } = useContext(WikiContext)!;

  const [wiki, setWiki] = useState<Wiki>();
  const [ideaGroups, setIdeaGroups] = useState<Array<IdeaGroup>>();
  const [tagIdeas, setTagIdeas] = useState<Array<IdeaGroup>>();
  const [policies, setPolicies] = useState<Array<Policy>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedIdeas, setSelectedIdeas] = useState<Array<IdeaGroup>>([]);
  const [selectedTag, setSelectedTag] = useState<IdeaGroup | null>(null);
  const [selectedPolicies, setSelectedPolicies] = useState<Array<Policy>>([]);
  const [modifiers, setModifiers] = useState<Modifiers | undefined>(undefined);

  useEffect(() => {
    if (!wiki && version && wikiState && wikiState.wikis && wikiState.wikis[version]) {
      const wiki = wikiState.wikis[version];
      setWiki(wiki);
      setIdeaGroups(
        Object.values(wiki.ideaGroups)
              .filter(i => i.category !== undefined)
              .sort((a, b) => stringComparator(a.category, b.category) || stringLocalisedComparator(a, b)));
      setPolicies(
        Object.values(wiki.policies)
              .filter(i => i.category != undefined)
              .sort((a, b) => stringComparator(a.category, b.category) || stringLocalisedComparator(a, b)));
      setTagIdeas(
        Object.values(wiki.ideaGroups)
              .filter(i => i.free && i.start && (i.start.modifiers || i.start.enables))
              .sort(stringLocalisedComparator));
      document.title = intl.formatMessage({ id: 'wiki.ideaGroups' });
      setLoading(false);
      setError(false);
    }
  }, [wikiState, version, wiki, intl]);

  useEffect(() => {
    const modifs: Array<Modifiers> = [];

    if (selectedIdeas) {
      for (const group of selectedIdeas) {
        if (group.start) {
          modifs.push(group.start);
        }

        if (group.bonus) {
          modifs.push(group.bonus);
        }

        if (group.ideas) {
          for (const idea of Object.values(group.ideas)) {
            if (idea.modifiers) {
              modifs.push(idea.modifiers);
            }
          }
        }
      }
    }

    if (selectedTag) {
      if (selectedTag.start) {
        modifs.push(selectedTag.start);
      }

      if (selectedTag.bonus) {
        modifs.push(selectedTag.bonus);
      }

      if (selectedTag.ideas) {
        for (const idea of Object.values(selectedTag.ideas)) {
          if (idea.modifiers) {
            modifs.push(idea.modifiers);
          }
        }
      }
    }

    if (selectedPolicies) {
      for (const policy of selectedPolicies) {
        if (policy.modifiers) {
          modifs.push(policy.modifiers);
        }
      }
    }

    if (!modifs || modifs.length <= 0) {
      setModifiers(undefined);
      return;
    }

    const enables: Array<IdLocalised> = [];
    let modif: Record<string, number> = {};

    for (const m of modifs) {
      if (m.enables) {
        enables.push(...m.enables);
      }

      if (m.modifiers) {
        for (const [name, value] of Object.entries(m.modifiers)) {
          modif[name] = (modif[name] ?? 0) + value;
        }
      }
    }

    setModifiers({ enables, modifiers: modif });
  }, [selectedIdeas, selectedTag, selectedPolicies]);

  return (
    <>
      {
        (error || (!loading && (!ideaGroups || !version || !wiki))) ?
          <GridLegacy container alignItems='center' justifyContent='center' flexDirection='column'
                sx={ { height: '100%', width: '100%', backgroundColor: theme.palette.primary.light } }>
            <Typography variant='h2' color={ theme.palette.primary.contrastText }>
              404
            </Typography>
            <Typography variant='h3' color={ theme.palette.primary.contrastText }>
              { intl.formatMessage({ id: 'wiki.ideas.notFound' }) }
            </Typography>
            <Link to='/'>
              <Home fontSize='large' color='primary' sx={ { width: 40, height: 40 } }/>
            </Link>
          </GridLegacy>
          :
          <>
            <WikiBar  group={ false }>
              <Toolbar sx={ { justifyContent: 'center', backgroundColor: theme.palette.primary.dark } }>
                <Typography variant='h6' color={ theme.palette.primary.contrastText }>
                  { intl.formatMessage({ id: 'wiki.ideas' }) }
                </Typography>
              </Toolbar>
            </WikiBar>
            {
              (loading || !ideaGroups || !policies || !tagIdeas || !wiki || !version) ?
                <Backdrop open sx={ { backgroundColor: theme.palette.primary.light } }>
                  <CircularProgress color='primary'/>
                </Backdrop>
                :
                <GridLegacy container sx={ { alignItems: 'flex-start', justifyContent: 'center', padding: 3 } }>
                  <GridLegacy container item xs={ 12 } md={ 6 } xl={ 5 } rowGap={ 2 }
                        sx={ { flexDirection: 'column' } } style={ { paddingTop: 0, paddingLeft: 0 } }>
                    <GridLegacy container item>
                      <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
                        <CardHeader title={ intl.formatMessage({ id: 'wiki.ideas.tagIdeas' }) }
                                    titleTypographyProps={ {
                                      color: theme.palette.primary.contrastText, fontWeight: 'bold'
                                    } }
                                    style={ { backgroundColor: theme.palette.primary.dark } }/>
                        <CardContent>
                          <Autocomplete
                            id='select-tag'
                            fullWidth
                            options={ tagIdeas }
                            getOptionLabel={ option => `${ getLName(option) } (${ option.id })` }
                            getOptionDisabled={ option => option === selectedTag }
                            renderOption={ (props, option) => {
                              return (
                                <li { ...props }>
                                  <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                                    <Avatar src={ getIdeaGroupImage(option) } variant='square'
                                            style={ { display: 'inline-block' } }/>
                                    <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                                      { `${ getLName(option) } (${ option.id })` }
                                    </Typography>
                                  </GridLegacy>
                                </li>
                              )
                            } }
                            renderInput={ (params) => (
                              <TextField { ...params }
                                         InputProps={ {
                                           ...params.InputProps,
                                           sx: { color: theme.palette.primary.contrastText, fontWeight: 'bold' }
                                         } }
                                         variant='outlined'/>) }
                            value={ selectedTag }
                            onChange={ (event, value) => setSelectedTag(value) }
                          />
                        </CardContent>
                      </Card>
                    </GridLegacy>
                    <GridLegacy container item>
                      <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
                        <CardHeader title={ intl.formatMessage({ id: 'wiki.ideas.ideas' }) }
                                    titleTypographyProps={ {
                                      color: theme.palette.primary.contrastText, fontWeight: 'bold'
                                    } }
                                    style={ { backgroundColor: theme.palette.primary.dark } }/>
                        <CardContent>
                          <Autocomplete
                            id='select-ideas'
                            multiple
                            fullWidth
                            groupBy={ option => intl.formatMessage({ id: `wiki.ideaGroups.${ option.category }` }) }
                            options={ ideaGroups }
                            getOptionLabel={ option => getLName(option) ?? option.id }
                            getOptionDisabled={ option => selectedIdeas.includes(option) }
                            renderOption={ (props, option) => {
                              return (
                                <li { ...props }>
                                  <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                                    <Avatar src={ getIdeaGroupImage(option) } variant='square'
                                            style={ { display: 'inline-block' } }/>
                                    <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                                      { getLName(option) }
                                    </Typography>
                                  </GridLegacy>
                                </li>
                              )
                            } }
                            renderTags={ (value: readonly IdeaGroup[], getTagProps) =>
                              value.map((option: IdeaGroup, index: number) => (
                                <Chip label={ getLName(option) }
                                      avatar={ <Avatar src={ getIdeaGroupImage(option) } variant='circular'/> }
                                      { ...getTagProps({ index }) }
                                      style={ {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText
                                      } }/>
                              ))
                            }
                            renderInput={ (params) => (<TextField { ...params } variant='outlined'/>) }
                            value={ selectedIdeas }
                            onChange={ (event, value) => setSelectedIdeas(value) }
                          />
                        </CardContent>
                      </Card>
                    </GridLegacy>
                    <GridLegacy container item>
                      <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
                        <CardHeader title={ intl.formatMessage({ id: 'wiki.ideas.policies' }) }
                                    titleTypographyProps={ {
                                      color: theme.palette.primary.contrastText, fontWeight: 'bold'
                                    } }
                                    style={ { backgroundColor: theme.palette.primary.dark } }/>
                        <CardContent>
                          <Autocomplete
                            id='select-ideas'
                            multiple
                            fullWidth
                            groupBy={ option => intl.formatMessage({ id: `wiki.policy.${ option.category }` }) }
                            options={ policies }
                            isOptionEqualToValue={ (option, value) => option.id === value.id }
                            getOptionLabel={ option => getLName(option) ?? option.id }
                            getOptionDisabled={ option => selectedPolicies.includes(option) ||
                              !option.groups.every(i => selectedIdeas.map(g => g.id).includes(i)) }
                            renderOption={ (props, option) => {
                              return (
                                <li { ...props }>
                                  <GridLegacy container item alignItems='center' style={ { width: '100%' } } key={ props.id }>
                                    <Avatar src={ `/eu4/wiki/${ option.category.toLowerCase() }.png` } variant='square'
                                            style={ { display: 'inline-block' } }/>
                                    <Typography variant='body1' component='span' style={ { marginLeft: 8 } }>
                                      { `${ getLName(option) } (${ option.groups.map(g => getLName(wiki?.ideaGroups[g]))
                                                                         .sort(stringUComparator)
                                                                         .join(' + ') })` }
                                    </Typography>
                                  </GridLegacy>
                                </li>
                              )
                            } }
                            renderTags={ (value: readonly Policy[], getTagProps) =>
                              value.map((option: Policy, index: number) => (
                                <Chip label={ getLName(option) }
                                      avatar={ <Avatar src={ `/eu4/wiki/${ option.category.toLowerCase() }.png` }
                                                       variant='circular'/> }
                                      { ...getTagProps({ index }) }
                                      style={ {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText
                                      } }/>
                              ))
                            }
                            renderInput={ (params) => (<TextField { ...params } variant='outlined'/>) }
                            value={ selectedPolicies }
                            onChange={ (event, value) => setSelectedPolicies(value) }
                          />
                        </CardContent>
                      </Card>
                    </GridLegacy>
                  </GridLegacy>
                  <GridLegacy container item xs={ 12 } md={ 10 } lg={ 6 } xl={ 5 } sx={ { paddingLeft: 3 } }>
                    { modifiers && (
                      <Card style={ { width: '100%', backgroundColor: theme.palette.primary.light } }>
                        <CardHeader title={ intl.formatMessage({ id: 'wiki.ideas.total' }) }
                                    titleTypographyProps={ {
                                      color: theme.palette.primary.contrastText, fontWeight: 'bold'
                                    } }
                                    sx={ { backgroundColor: theme.palette.primary.dark } }/>
                        <CardContent sx={ { backgroundColor: theme.palette.background.paper } }>
                          { modifiersGrid(modifiers, wiki) }
                        </CardContent>
                      </Card>
                    ) }
                  </GridLegacy>
                </GridLegacy>
            }
          </>
      }
    </>
  )
}

export default Ideas;
