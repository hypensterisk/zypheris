/** @format */

import useNoBackNavigation from '@hooks/useNoBackNavigation'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'

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
