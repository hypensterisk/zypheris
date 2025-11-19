/** @format */

import { Routes, Route } from 'react-router'

import Edit from './Edit.jsx'
import Home from './Home.jsx'

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
