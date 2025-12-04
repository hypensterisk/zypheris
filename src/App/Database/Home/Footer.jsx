/** @format */

import { useEffect, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useSearchParams } from 'react-router'

const TABS = [
  ['home', 'fa-home', 'Home'],
  ['favorite', 'fa-star', 'Favorite'],
  ['archive', 'fa-archive', 'Archive'],
  ['trash', 'fa-trash', 'Trash'],
]
const TAB_KEYS = TABS.map(([key]) => key)

export default function Footer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  const handleTabSelect = useCallback(
    (key) => {
      setSearchParams((searchParams) => {
        searchParams.set('tab', key)
        return searchParams
      })
    },
    [setSearchParams],
  )
  useEffect(() => {
    if (!TAB_KEYS.includes(activeTab)) {
      handleTabSelect(TAB_KEYS[0])
    }
  }, [activeTab, handleTabSelect])
  return (
    <Container
      fluid
      className='bg-body-tertiary px-0'
    >
      <Nav
        activeKey={activeTab}
        onSelect={handleTabSelect}
        variant='tabs'
        justify
      >
        {TABS.map(([key, icon, title]) => (
          <Nav.Link
            key={key}
            eventKey={key}
          >
            <i className={`fa-solid ${icon}`} /> {title}
          </Nav.Link>
        ))}
      </Nav>
    </Container>
  )
}
