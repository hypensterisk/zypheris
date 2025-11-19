/** @format */

import { Routes, Route, Navigate, useLocation } from 'react-router'

import useDatabaseStore from '@hooks/useDatabaseStore'

import Card from './Card/index.jsx'
import Home from './Home/index.jsx'

export default function Dashboard() {
  const location = useLocation()
  const database = useDatabaseStore((state) => state.database)
  const password = useDatabaseStore((state) => state.password)
  if (!database) return <Navigate to='/setup' />
  if (!password)
    return (
      <Navigate
        to='/unlock'
        state={{ continue: location.pathname }}
      />
    )
  return (
    <Routes>
      <Route
        path='*'
        element={<Home />}
      />
      <Route
        path='card/:id/*'
        element={<Card />}
      />
    </Routes>
  )
}
