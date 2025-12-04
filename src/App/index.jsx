/** @format */

import { BrowserRouter, Routes, Route } from 'react-router'

import SplashScreen from '@components/SplashScreen'

import useAppStore from '@hooks/useAppStore'

import Database from './Database'
import Home from './Home'
import Setup from './Setup'
import Unlock from './Unlock'

export default function App() {
  const hasHydrated = useAppStore((state) => state.hasHydrated)
  if (!hasHydrated) return <SplashScreen />
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          index
          element={<Home />}
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
          path='database/*'
          element={<Database />}
        />
      </Routes>
    </BrowserRouter>
  )
}
