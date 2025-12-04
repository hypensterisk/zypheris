/** @format */

import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import { useNavigate } from 'react-router'

import useAppStore from '@hooks/useAppStore'

export default function ContextualActions() {
  const navigate = useNavigate()
  function handleNewCard() {
    const { data } = useAppStore.getState()
    const id = crypto.randomUUID()
    data.cards.push({
      id,
      title: 'facebook/michael',
      website: 'https://facebook.com',
      isArchive: false,
      isTrash: false,
      isFavorite: false,
      fields: [],
    })
    navigate(`/database/card/${id}/edit`)
  }
  return (
    <DropdownButton
      variant='dark'
      align='end'
      title={<i className='fa-solid fa-ellipsis-vertical' />}
    >
      <DropdownItem onClick={handleNewCard}>
        <i className='fa-solid fa-plus' /> New Card
      </DropdownItem>
    </DropdownButton>
  )
}
