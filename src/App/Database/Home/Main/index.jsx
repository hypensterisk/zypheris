/** @format */

import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router'

import useAppStore from '@hooks/useAppStore'

import CardItem from './CardItem'

export default function Main() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const data = useAppStore((state) => state.data)
  const setData = useAppStore((state) => state.setData)
  const cards = data.cards.filter((card) => {
    const { isFavorite, isArchive, isTrash } = card
    if (tab === 'home') {
      return !isArchive && !isTrash
    }
    if (tab === 'favorite') {
      return isFavorite && !isTrash && !isArchive
    }
    if (tab === 'archive') {
      return isArchive && !isTrash
    }
    if (tab === 'trash') {
      return isTrash
    }
    return false
  })
  function updateCard(id, partialUpdate) {
    setData({
      ...data,
      cards: data.cards.map((card) =>
        card.id === id ? { ...card, ...partialUpdate } : card,
      ),
    })
  }
  function deleteCard(id) {
    setData({ ...data, cards: data.cards.filter((card) => card.id !== id) })
  }
  return (
    <div
      className='flex-grow-1 d-flex flex-column'
      style={{ minHeight: 0 }}
    >
      <ListGroup className='flex-grow-1 overflow-scroll'>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            updateCard={updateCard}
            deleteCard={deleteCard}
          />
        ))}
      </ListGroup>
    </div>
  )
}
