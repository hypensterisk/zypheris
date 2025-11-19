/** @format */

import Nav from 'react-bootstrap/Nav'

import useDatabaseStore from '@hooks/useDatabaseStore.js'

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
