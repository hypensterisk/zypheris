import { BrowserRouter, Routes, Route } from 'react-router'

import Landing from './Landing.jsx'
import Setup from './Setup/index.jsx'
import Unlock from './Unlock.jsx'
import Dashboard from './Dashboard/index.jsx'

export default function App() {
  return (
    <BrowserRouter basename='/zypheris'>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='setup/*' element={<Setup />} />
        <Route path='unlock' element={<Unlock />} />
        <Route path='dashboard/*' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
