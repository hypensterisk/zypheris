/** @format */

import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'

import useAppStore from '@hooks/useAppStore'

export default function ContextualActions() {
  function handleNewCard() {
    const { data, setData } = useAppStore.getState()
    setData({
      ...data,
      cards: [
        ...data.cards,
        {
          id: crypto.randomUUID(),
          title: 'facebook/michael',
          website: 'https://facebook.com',
          isArchive: false,
          isTrash: false,
          isFavorite: false,
          fields: [],
        },
      ],
    })
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
