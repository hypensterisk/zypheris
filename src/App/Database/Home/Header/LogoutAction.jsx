/** @format */

import { useCallback } from 'react'
import Nav from 'react-bootstrap/Nav'

import useAppStore from '@hooks/useAppStore'

export default function LogoutAction() {
  const handleLogout = useCallback(() => {
    const { setData, setPassword } = useAppStore.getState()
    setPassword('')
    setData(null)
  }, [])
  return (
    <Nav.Link onClick={handleLogout}>
      <i className='fa-solid fa-arrow-right-from-bracket' /> Logout
    </Nav.Link>
  )
}
