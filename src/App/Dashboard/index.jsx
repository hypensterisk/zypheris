/** @format */

import { Routes, Route } from 'react-router'

import Card from './Card/index.jsx'
import Home from './Home/index.jsx'

export default function Dashboard() {
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
