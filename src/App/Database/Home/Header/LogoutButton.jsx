/** @format */

import Nav from 'react-bootstrap/Nav'

import useAppStore from '@hooks/useAppStore'

export default function LogoutButton() {
  const { setData, setPassword } = useAppStore((state) => state)
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
