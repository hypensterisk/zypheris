/** @format */

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Row, Col, Image, Button, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import useDatabaseStore from '@hooks/useDatabaseStore.js'

export default function CardItem({ card, left, right }) {
  const navigate = useNavigate()
  const data = useDatabaseStore((state) => state.data)
  const setData = useDatabaseStore((state) => state.setData)

  const x = useMotionValue(0)
  const scale = useMotionValue(1)

  async function handleDragEnd(_, { offset }) {
    if (Math.abs(offset.x) < innerWidth * 0.5) {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 10 })
    } else {
      await animate(x, offset.x > 0 ? innerWidth * 1.5 : -(innerWidth * 1.5), {
        duration: 0.3,
        ease: 'easeInOut',
      })
      await animate(scale, 0, { duration: 0.3, ease: 'easeInOut' })
      offset.x > 0 ? left.action() : right.action()
    }
  }
  return (
    <motion.div
      onClick={() => {
        navigate(`/dashboard/card/${card.id}`)
      }}
      style={{ scale }}
      className='position-relative overflow-hidden'
    >
      <div className='position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-between'>
        <CardSwipeAction
          x={x}
          color={left.color}
          icon={left.icon}
          negate={false}
        />
        <CardSwipeAction
          x={x}
          color={right.color}
          icon={right.icon}
          negate
        />
      </div>
      <motion.div
        drag='x'
        style={{ x }}
        onDragEnd={handleDragEnd}
      >
        <ListGroup.Item className='py-3'>
          <Row className='align-items-center'>
            <Col xs='auto'>
              <Image
                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${card.website}`}
                roundedCircle
                width={32}
                height={32}
                alt='favicon'
              />
            </Col>
            <Col>
              <div className='fw-bold'>{card.title}</div>
              <div className='text-muted small'>{card.website}</div>
            </Col>
            <Col xs='auto'>
              <Button
                active
                onClick={(event) => {
                  event.stopPropagation()
                  setData({
                    cards: data.cards.map((value) =>
                      value.id === card.id
                        ? { ...value, isFavorite: !card.isFavorite }
                        : value,
                    ),
                  })
                }}
                variant={card.isFavorite ? 'warning' : 'outline-light'}
              >
                <i
                  className={`fa-${card.isFavorite ? 'solid' : 'regular'} fa-star`}
                />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </motion.div>
    </motion.div>
  )
}

function CardSwipeAction({ x, color, icon, negate }) {
  const width = useTransform(
    x,
    [0, negate ? -innerWidth : innerWidth],
    [0, innerWidth],
  )
  const scale = useTransform(
    x,
    [0, negate ? -(innerWidth * 0.2) : innerWidth * 0.2],
    [0, 1],
  )
  return (
    <motion.div
      style={{ width }}
      className={`h-100 bg-${color} d-flex justify-content-center align-items-center`}
    >
      <motion.i
        style={{ scale }}
        className={`fa-solid fa-2x fa-${icon}`}
      />
    </motion.div>
  )
}
