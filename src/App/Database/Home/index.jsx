/** @format */

import useNoBackNavigation from '@hooks/useNoBackNavigation.js'

import Footer from './Footer/index.jsx'
import Header from './Header/index.jsx'
import Main from './Main/index.jsx'

export default function Home() {
  useNoBackNavigation()
  return (
    <div className='d-flex flex-column h-100'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
