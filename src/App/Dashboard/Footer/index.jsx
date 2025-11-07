/** @format */

import Nav from 'react-bootstrap/Nav'
import { useParams, Link } from 'react-router'

export default function NavigationTabs() {
  const { '*': activeKey } = useParams()
  return (
    <div
      style={{ position: 'sticky', bottom: 0 }}
      className='w-100 bg-body-tertiary'
    >
      <Nav
        justify
        activeKey={activeKey}
        variant='tabs'
      >
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/dashboard'
            eventKey=''
          >
            <i className='fa-solid fa-home' /> Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/dashboard/favorite'
            eventKey='favorite'
          >
            <i className='fa-solid fa-star' /> Favorite
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/dashboard/archive'
            eventKey='archive'
          >
            <i className='fa-solid fa-archive' /> Archive
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/dashboard/trash'
            eventKey='trash'
          >
            <i className='fa-solid fa-trash' /> Trash
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
