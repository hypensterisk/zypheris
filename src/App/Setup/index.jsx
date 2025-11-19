/** @format */

import { Routes, Route, Navigate } from 'react-router'

import useAppStore from '@hooks/useAppStore'

import Create from './Create.jsx'
import SetupChoice from './SetupChoice.jsx'
import Upload from './Upload.jsx'
import useNoBackNavigation from '../../hooks/useNoBackNavigation.js'

export default function Setup() {
  useNoBackNavigation()
  const data = useAppStore((state) => state.data)
  const database = useAppStore((state) => state.database)
  const password = useAppStore((state) => state.password)
  if (data) return <Navigate to='/database' />
  if (database && !password) return <Navigate to='/unlock' />
  return (
    <Routes>
      <Route
        index
        element={<SetupChoice />}
      />
      <Route
        path='create'
        element={<Create />}
      />
      <Route
        path='upload'
        element={<Upload />}
      />
    </Routes>
  )
}
