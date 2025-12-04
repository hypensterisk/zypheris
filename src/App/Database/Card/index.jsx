/** @format */

import { Routes, Route } from 'react-router'

import Edit from './Edit'
import Home from './Home'

export default function Card() {
  return (
    <Routes>
      <Route
        index
        element={<Home />}
      />
      <Route
        path='edit'
        element={<Edit />}
      />
    </Routes>
  )
}
