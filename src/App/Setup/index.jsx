/** @format */

import { Routes, Route } from 'react-router'

import Create from './Create.jsx'
import SetupChoice from './SetupChoice.jsx'
import Upload from './Upload.jsx'
import useNoBackNavigation from '../../hooks/useNoBackNavigation.js'

export default function Setup() {
  useNoBackNavigation()
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
