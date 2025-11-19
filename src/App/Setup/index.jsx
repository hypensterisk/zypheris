/** @format */

import useDatabaseStore from '@hooks/useDatabaseStore'
import { Routes, Route, Navigate } from 'react-router'

import Create from './Create.jsx'
import SetupChoice from './SetupChoice.jsx'
import Upload from './Upload.jsx'
import useNoBackNavigation from '../../hooks/useNoBackNavigation.js'

export default function Setup() {
  useNoBackNavigation()
  const data = useDatabaseStore((state) => state.data)
  const database = useDatabaseStore((state) => state.database)
  const password = useDatabaseStore((state) => state.password)
  if (data) return <Navigate to='/dashboard' />
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
