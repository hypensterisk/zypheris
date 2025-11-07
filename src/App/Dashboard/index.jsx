/** @format */

import Footer from './Footer/index.jsx'
import Header from './Header/index.jsx'
import Main from './Main/index.jsx'
import useNoBackNavigation from '../../hooks/useNoBackNavigation.js'

export default function Dashboard() {
  useNoBackNavigation()
  return (
    <div className='d-flex flex-column h-100'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
