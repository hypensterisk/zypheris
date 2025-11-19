/** @format */

import $fields from '@fields'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useNavigate, useParams } from 'react-router'

import BaseButton from '@components/BaseButton'
import EditInputGroup from '@components/EditInputGroup'

import useCard from '@hooks/useCard'
import useEditForm from '@hooks/useEditForm'
import useIsEqual from '@hooks/useIsEqual'

export default function Edit() {
  const [show, setShow] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [card, setCard] = useCard(id)
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    submitForm,
  } = useEditForm(card, setCard)
  const isEqual = useIsEqual(card, values)
  function handleHide() {
    if (!isEqual) {
      setShow(true)
    } else {
      navigate(`/dashboard/card/${card.id}`)
    }
  }
  const { title, website, ...fields } = values
  return (
    <>
      <Modal
        show
        animation={false}
        fullscreen
        onHide={handleHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className='fa-solid fa-pencil' />
            {' Edit Card'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            className='d-flex flex-column justify-content-start align-items-center h-100 w-100 gap-2'
          >
            <EditInputGroup
              icon='folder'
              setValue={(value) => setFieldValue('title', value)}
              feedbacks={{ invalid: errors?.title }}
              name='title'
              value={title}
              onChange={handleChange}
              type='text'
              isInvalid={!!errors?.title}
            />
            <EditInputGroup
              icon='globe'
              setValue={(value) => setFieldValue('website', value)}
              feedbacks={{ invalid: errors?.website }}
              name='website'
              value={website}
              onChange={handleChange}
              type='url'
              isInvalid={!!errors?.website}
            />
            {Object.entries(fields).map(([id, { type, value }]) => {
              const { Edit } = $fields[type]
              return (
                <Edit
                  key={id}
                  name={`${id}.value`}
                  value={value}
                  onChange={handleChange}
                  handleRemove={() => {
                    const { [id]: _, ...newValues } = values
                    setValues(newValues)
                  }}
                  error={errors[id]?.value}
                  setValue={(value) => {
                    setFieldValue(id, { type, value })
                  }}
                />
              )
            })}
            <Dropdown drop='down-centered'>
              <Dropdown.Toggle>
                <i className='fa-solid fa-plus' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys($fields).map((type) => (
                  <Dropdown.Item
                    key={type}
                    onClick={() => {
                      setFieldValue(crypto.randomUUID(), {
                        type,
                        value: $fields[type].defaultValue,
                      })
                    }}
                  >
                    {type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BaseButton
            variant={
              isEqual
                ? 'secondary'
                : Object.keys(errors).length > 0
                  ? 'warning'
                  : 'primary'
            }
            disabled={isEqual || Object.keys(errors).length > 0}
            icon='save'
            onClick={submitForm}
          />
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        centered
        onHide={() => {
          setShow((show) => !show)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className='fa-solid fa-warning' />
            {' Unsaved Changes'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {show &&
              getChanges(card, values).map((value, key) => (
                <li key={key}>{value}</li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            onClick={() => {
              navigate(`/dashboard/card/${card.id}`)
            }}
          >
            {'Discard changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function getChanges(card, values) {
  const changes = []
  if (card.title !== values.title) {
    changes.push(`Update title`)
  }
  if (card.website !== values.website) {
    changes.push(`Update website`)
  }
  const { title: _title, website: _website, ...fields } = values
  const keysCard = card.fields.map(({ id }) => id)
  const keysValues = Object.keys(fields)
  keysCard.forEach((key) => {
    const field = card.fields.find(({ id }) => id === key)
    if (!keysValues.includes(key)) {
      return changes.push(`Remove field ${field.type}`)
    }
    if (field.value !== fields[key].value) {
      return changes.push(`Update field ${field.type}`)
    }
  })
  keysValues.forEach((key) => {
    const field = fields[key]
    if (!keysCard.includes(key)) {
      return changes.push(`Add field ${field.type}`)
    }
  })
  return changes
}
