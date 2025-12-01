/** @format */

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

import ContextualActions from './ContextualActions'
import ExportDatabaseAction from './ExportDatabaseAction'
import LogoutAction from './LogoutAction'

export default function Header() {
  return (
    <Navbar
      expand={false}
      bg='body-tertiary'
    >
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Brand>Database</Navbar.Brand>
        <ContextualActions />
        <Navbar.Offcanvas>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <i className='fa-solid fa-bars' />
              {' Menu'}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <ExportDatabaseAction />
              <LogoutAction />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
