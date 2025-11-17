/** @format */

import useDatabaseStore from '@hooks/useDatabaseStore.js'
import Nav from 'react-bootstrap/Nav'

export default function LogoutButton() {
  const { setData, setPassword } = useDatabaseStore((state) => state)
  return (
    <Nav.Link
      onClick={() => {
        setData(null)
        setPassword('')
      }}
    >
      <i className='fa-solid fa-arrow-right-from-bracket' /> Logout
    </Nav.Link>
  )
}
