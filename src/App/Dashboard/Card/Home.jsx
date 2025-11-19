/** @format */

import $fields from '@fields'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useNavigate, useParams } from 'react-router'

import BaseButton from '@components/BaseButton'
import ViewInputGroup from '@components/ViewInputGroup'

import useCard from '@hooks/useCard'

export default function Home() {
  const { id } = useParams()
  const [card] = useCard(id)
  const navigate = useNavigate()

  function handleHide() {
    navigate('/dashboard')
  }
  function handleEdit() {
    navigate(`/dashboard/card/${id}/edit`)
  }

  return (
    <Modal
      fullscreen={true}
      animation={false}
      scrollable={true}
      show={true}
      onHide={handleHide}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>
          <i className='fa-solid fa-id-card' />
          {' View Card'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='d-flex flex-column justify-content-start align-items-stretch h-100 w-100 gap-2'>
          <ViewInputGroup
            icon='folder'
            value={card.title}
          />
          <ViewInputGroup
            icon='globe'
            value={card.website}
          >
            <BaseButton
              icon='external-link'
              href={card.website}
            />
          </ViewInputGroup>
          {card.fields.map(({ id, type, value }) => {
            const { View } = $fields[type]
            return (
              <View
                key={id}
                value={value}
              />
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <BaseButton
          icon='pencil'
          onClick={handleEdit}
        />
      </Modal.Footer>
    </Modal>
  )
}
