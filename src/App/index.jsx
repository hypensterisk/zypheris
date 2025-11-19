/** @format */

import { BrowserRouter, Routes, Route } from 'react-router'

import SplashScreen from '@components/SplashScreen'

import useDatabaseStore from '@hooks/useDatabaseStore'

import Dashboard from './Dashboard/index.jsx'
import Landing from './Landing.jsx'
import Setup from './Setup/index.jsx'
import Unlock from './Unlock.jsx'

export default function App() {
  const hasHydrated = useDatabaseStore((state) => state.hasHydrated)
  if (!hasHydrated) return <SplashScreen />
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          index
          element={<Landing />}
        />
        <Route
          path='setup/*'
          element={<Setup />}
        />
        <Route
          path='unlock'
          element={<Unlock />}
        />
        <Route
          path='dashboard/*'
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  )
}
