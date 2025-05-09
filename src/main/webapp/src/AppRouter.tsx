import React, { createContext, useState } from "react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CountryPage from 'screens/country/CountryPage';
import HomePage from 'screens/home/HomePage';
import NodePage from 'screens/node/NodePage';
import SavePage from 'screens/save/SavePage';
import UserPage from 'screens/user/UserPage';
import WarPage from 'screens/war/WarPage';
import Ideas from 'screens/wiki/ideas/Ideas';
import PoliciesList from 'screens/wiki/policies/PoliciesList';
import { Wiki } from 'types/api.types';
import DecisionPage from './screens/wiki/decision/DecisionPage';
import IdeasGroupsList from './screens/wiki/ideaGroups/IdeaGroupList';
import DecisionsList from "./screens/wiki/decision/DecisionsList";

export type WikiState = {
  versions?: Record<string, string>;
  wikis?: Record<string, Wiki>;
}

export const WikiContext = createContext<{
  wikiState: WikiState;
  setWikiState: React.Dispatch<React.SetStateAction<WikiState>>
} | null>(null);

const AppRouter: React.FunctionComponent = () => {
  const location = useLocation();
  const state = location.state as WikiState;
  const [wikiState, setWikiState] = useState<WikiState>({});

  if (!wikiState && state && state.versions) {
    setWikiState(state);
  }

  return (
    <WikiContext.Provider value={ { wikiState, setWikiState } }>
      <Routes>
        <Route path="/save/:id" element={ <SavePage/> }/>
        <Route path="/save/:id/:tag" element={ <CountryPage/> }/>
        <Route path="/user/:id" element={ <UserPage/> }/>
        <Route path="/save/:id/war/:warId" element={ <WarPage/> }/>
        <Route path="/save/:id/trade-node/:nodeId" element={ <NodePage/> }/>
        <Route path="/wiki" element={ <HomePage/> }/>
        <Route path="/wiki/:version" element={ <HomePage/> }/>
        <Route path="/wiki/:version/decisions" element={ <DecisionsList/> }/>
        <Route path="/wiki/:version/decisions/:id" element={ <DecisionPage/> }/>
        <Route path="/wiki/:version/idea-groups" element={ <IdeasGroupsList/> }/>
        <Route path="/wiki/:version/idea-groups/:id" element={ <IdeasGroupsList/> }/>
        <Route path="/wiki/:version/policies" element={ <PoliciesList/> }/>
        <Route path="/wiki/:version/ideas" element={ <Ideas/> }/>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="*" element={ <Navigate to="/" replace/> }/>
      </Routes>
    </WikiContext.Provider>
  );
};

export default AppRouter;
