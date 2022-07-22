import React from "react"

import { Route, Routes } from "react-router-dom"
import CountryPage from 'screens/country/CountryPage';
import SavePage from 'screens/save/SavePage';

const AppRouter: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/save/:id" element={ <SavePage/> }/>
      <Route path="/save/:id/:tag" element={ <CountryPage/> }/>
      <Route path="*" element={ <></> }/>
    </Routes>
  )
}

export default AppRouter
