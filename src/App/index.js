import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './Landing'
import Setup from './Setup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='setup/*' element={<Setup />} />
      </Routes>
    </BrowserRouter>
  )
}