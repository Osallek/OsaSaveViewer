import React from "react"

import { Navigate, Route, Routes } from "react-router-dom"
import CountryPage from 'screens/country/CountryPage';
import HomePage from 'screens/home/HomePage';
import NodePage from 'screens/node/NodePage';
import SavePage from 'screens/save/SavePage';
import UserPage from 'screens/user/UserPage';
import WarPage from 'screens/war/WarPage';
import Ideas from 'screens/wiki/ideas/Ideas';
import PoliciesList from 'screens/wiki/policies/PoliciesList';
import DecisionPage from './screens/wiki/decision/DecisionPage';
import IdeasGroupsList from './screens/wiki/ideaGroups/IdeaGroupList';

const AppRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/save/:id" element={ <SavePage/> }/>
      <Route path="/save/:id/:tag" element={ <CountryPage/> }/>
      <Route path="/user/:id" element={ <UserPage/> }/>
      <Route path="/save/:id/war/:warId" element={ <WarPage/> }/>
      <Route path="/save/:id/trade-node/:nodeId" element={ <NodePage/> }/>
      <Route path="/wiki" element={ <HomePage/> }/>
      <Route path="/wiki/:version" element={ <HomePage/> }/>
      <Route path="/wiki/:version/decisions" element={ <HomePage/> }/>
      <Route path="/wiki/:version/decisions/:id" element={ <DecisionPage/> }/>
      <Route path="/wiki/:version/idea-groups" element={ <IdeasGroupsList/> }/>
      <Route path="/wiki/:version/policies" element={ <PoliciesList/> }/>
      <Route path="/wiki/:version/ideas" element={ <Ideas/> }/>
      <Route path="/" element={ <HomePage/> }/>
      <Route path="*" element={ <Navigate to="/" replace/> }/>
    </Routes>
  )
}

export default AppRouter
