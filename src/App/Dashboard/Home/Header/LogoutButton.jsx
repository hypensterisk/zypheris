/** @format */

import useDatabaseStore from '@hooks/useDatabaseStore.js'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router'

export default function LogoutButton() {
  const { setData, setPassword } = useDatabaseStore((state) => state)
  const navigate = useNavigate()
  return (
    <Nav.Link
      onClick={() => {
        setData(null)
        setPassword('')
        navigate('/unlock')
      }}
    >
      <i className='fa-solid fa-arrow-right-from-bracket' /> Logout
    </Nav.Link>
  )
}
