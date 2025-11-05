import useNoBackNavigation from '../../hooks/useNoBackNavigation.js'
import Header from './Header/index.jsx'
import Main from './Main/index.jsx'
import Footer from './Footer/index.jsx'

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
