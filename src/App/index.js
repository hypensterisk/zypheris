import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './Landing'
import Setup from './Setup'
import Unlock from './Unlock'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='setup/*' element={<Setup />} />
        <Route path='unlock' element={<Unlock />} />
      </Routes>
    </BrowserRouter>
  )
}