/** @format */

import { AES, enc } from 'crypto-js'
import { useFormik } from 'formik'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { Navigate, useLocation } from 'react-router'
import { object, string } from 'yup'

import useAppStore from '@hooks/useAppStore'

export default function Unlock() {
  const data = useAppStore((state) => state.data)
  const location = useLocation()
  const database = useAppStore((state) => state.database)
  const name = useAppStore((state) => state.name)
  const setPassword = useAppStore((state) => state.setPassword)
  const formik = useFormik({
    initialValues: { password: '' },
    validationSchema: object({
      password: string().required('Password is required').strict(),
    }),
    onSubmit: ({ password }) => {
      try {
        JSON.parse(AES.decrypt(database, password).toString(enc.Utf8))
        setPassword(password)
      } catch {
        formik.setFieldError('password', 'Password is incorrect')
      }
    },
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isDeleteDatabaseModalOpen, setIsDeleteDatabaseModalOpen] =
    useState(false)
  const setName = useAppStore((state) => state.setName)
  const setDatabase = useAppStore((state) => state.setDatabase)
  if (data)
    return (
      <Navigate
        to={location.state?.continue || '/database'}
        replace={true}
      />
    )
  if (!database)
    return (
      <Navigate
        to='/setup'
        replace={true}
      />
    )
  return (
    <>
      <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
        <div className='text-center'>
          <h1>Unlock Database</h1>
          <h2 className='text-muted lead'>
            Enter the password to unlock <code>{name}</code>.
          </h2>
        </div>
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          className='d-flex flex-column gap-2'
        >
          <InputGroup hasValidation>
            <InputGroup.Text>
              <i className='fa-solid fa-key' />
            </InputGroup.Text>
            <Form.Control
              autoComplete='current-password'
              isInvalid={formik.touched.password && !!formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='password'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='Password'
            />
            <Button
              onClick={() =>
                setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
              }
              variant='light'
            >
              <i
                className={`fa-solid ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
              />
            </Button>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
          </InputGroup>
          <Button
            disabled={!formik.isValid || !formik.dirty}
            type='submit'
          >
            <i className='fa-solid fa-lock-open' /> Unlock Database
          </Button>
          <Button
            onClick={() => setIsDeleteDatabaseModalOpen(true)}
            variant='outline-danger'
          >
            <i className='fa-solid fa-trash' /> Delete Database
          </Button>
        </Form>
      </div>
      <Modal
        centered
        show={isDeleteDatabaseModalOpen}
        onHide={() => setIsDeleteDatabaseModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='lead'>
            Deleting this database is permanent and cannot be undone. Are you
            sure you want to continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setIsDeleteDatabaseModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              setName('')
              setDatabase(null)
            }}
          >
            <i className='fa-solid fa-trash' /> Delete Database
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
