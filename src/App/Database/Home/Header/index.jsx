/** @format */

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

import ExportDatabaseButton from './ExportDatabaseButton'
import LogoutButton from './LogoutButton'

export default function Header() {
  return (
    <Navbar
      expand={false}
      className='bg-body-tertiary'
    >
      <Container fluid>
        <Navbar.Brand>Database</Navbar.Brand>
        <Navbar.Toggle className='px-3 py-2'>
          <i className='fa-solid fa-gear' />
        </Navbar.Toggle>
        <Navbar.Offcanvas placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <i className='fa-solid fa-gear' /> Settings
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <ExportDatabaseButton />
              <LogoutButton />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
