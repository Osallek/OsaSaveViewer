import React from "react"

import { Navigate, Route, Routes } from "react-router-dom"
import CountryPage from 'screens/country/CountryPage';
import HomePage from 'screens/home/HomePage';
import SavePage from 'screens/save/SavePage';
import UserPage from 'screens/user/UserPage';
import WarPage from 'screens/war/WarPage';

const AppRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/save/:id" element={ <SavePage/> }/>
      <Route path="/save/:id/:tag" element={ <CountryPage/> }/>
      <Route path="/user/:id" element={ <UserPage/> }/>
      <Route path="/save/:id/war/:warId" element={ <WarPage/> }/>
      <Route path="/" element={ <HomePage/> }/>
      <Route path="*" element={ <Navigate to="/" replace/> }/>
    </Routes>
  )
}

export default AppRouter
