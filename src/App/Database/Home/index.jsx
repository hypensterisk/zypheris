/** @format */

import Footer from './Footer'
import Header from './Header'
import Main from './Main'

export default function Home() {
  return (
    <div className='d-flex flex-column h-100'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
