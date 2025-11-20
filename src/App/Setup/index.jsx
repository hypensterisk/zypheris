/** @format */

import { Routes, Route, Navigate } from 'react-router'

import useAppStore from '@hooks/useAppStore'

import Create from './Create'
import Home from './Home'
import Upload from './Upload'

export default function Setup() {
  const data = useAppStore((state) => state.data)
  const database = useAppStore((state) => state.database)
  const password = useAppStore((state) => state.password)
  if (data)
    return (
      <Navigate
        to='/database'
        replace={true}
      />
    )
  if (database && !password)
    return (
      <Navigate
        to='/unlock'
        replace={true}
      />
    )
  return (
    <Routes>
      <Route
        index
        element={<Home />}
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
