/** @format */

import { AnimatePresence } from 'framer-motion'
import { ListGroup, Button } from 'react-bootstrap'
import { useParams } from 'react-router'

import CardItem from './CardItem.jsx'
import useDatabaseStore from '../../../hooks/useDatabaseStore.js'

export default function Main() {
  const { '*': splat } = useParams()
  const data = useDatabaseStore((state) => state.data)
  const setData = useDatabaseStore((state) => state.setData)
  return (
    <div className='h-100 position-relative'>
      <AnimatePresence>
        <ListGroup variant='flush'>
          {data.cards
            .filter(({ isTrash, isFavorite, isArchive }) => {
              if (splat === 'trash') {
                return isTrash
              }
              if (splat === 'favorite') {
                return isFavorite && !isArchive && !isTrash
              }
              if (splat === 'archive') {
                return isArchive
              }
              return !isArchive && !isTrash
            })
            .map((card) => {
              const left = {}
              const right = {}
              if (splat === '') {
                left.color = 'success'
                left.icon = 'archive'
                left.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isArchive: true }
                        : value,
                    ),
                  })
                right.color = 'danger'
                right.icon = 'trash'
                right.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isTrash: true }
                        : value,
                    ),
                  })
              }
              if (splat === 'favorite') {
                left.color = 'warning'
                left.icon = 'star-half-alt'
                left.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isFavorite: false }
                        : value,
                    ),
                  })
                right.color = 'danger'
                right.icon = 'trash'
                right.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isTrash: true }
                        : value,
                    ),
                  })
              }
              if (splat === 'trash') {
                left.color = 'primary'
                left.icon = 'arrow-left'
                left.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isTrash: false }
                        : value,
                    ),
                  })
                right.color = 'black'
                right.icon = 'x'
                right.action = () =>
                  setData({
                    cards: data.cards.filter((value) => value.id !== card.id),
                  })
              }
              if (splat === 'archive') {
                left.color = 'info'
                left.icon = 'upload'
                left.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isArchive: false }
                        : value,
                    ),
                  })
                right.color = 'danger'
                right.icon = 'trash'
                right.action = () =>
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isTrash: true }
                        : value,
                    ),
                  })
              }
              return (
                <CardItem
                  key={card.id}
                  card={card}
                  left={left}
                  right={right}
                />
              )
            })}
        </ListGroup>
      </AnimatePresence>

      <Button
        onClick={() => {
          setData({
            cards: [
              ...data.cards,
              {
                id: crypto.randomUUID(),
                title: 'google/example.com',
                website: 'www.google.com',
                isArchive: false,
                isFavorite: false,
                isTrash: false,
              },
            ],
          })
        }}
        variant='primary'
        style={{ position: 'absolute', right: 20, bottom: 20 }}
      >
        <i className='fa-solid fa-plus' />
      </Button>
    </div>
  )
}
