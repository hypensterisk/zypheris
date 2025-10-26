import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { PasswordMeter } from 'password-meter'
import { AES, enc } from 'crypto-js'
import localforage from 'localforage'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useDebounce } from 'use-debounce'

export default function Unlock() {
  const [database, setDatabase] = useState(null)
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: object({
      password: string().required('Please enter the password for the database').test('truth', 'The password you entered is incorrect', (value) => {
        try {
          const decrypted = AES.decrypt(database.encrypted, value).toString(enc.Utf8)
          const parsed = JSON.parse(decrypted)
          return true
        } catch {
          return false
        }
      })
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ password }) => {
      const decrypted = AES.decrypt(database.encrypted, password).toString(enc.Utf8)
      const parsed = JSON.parse(decrypted)
      await localforage.setItem('database', { ...database, parsed })
      navigate('/dashboard')
    }
  })
  useEffect(() => {
    localforage.getItem('database')
      .then(value => {
        if (value === null) {
          navigate('/setup')
          return
        }
        setDatabase(value)
      })
  }, [])
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Unlock Database</h1>
        <h2 className='text-muted lead'>Please enter the password to open the {database ? <code>{database.name}</code> : <span className='placeholder col-4'></span>} database.</h2>
      </div>
      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <InputGroup hasValidation>
          <InputGroup.Text><i className='fa-solid fa-key' /></InputGroup.Text>
          <Form.Control disabled={!database} isInvalid={touched.password && errors.password} value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' type={show ? 'text' : 'password'} placeholder="Password" />
          <Button disabled={!database} onClick={() => setShow(show => !show)} variant='light'><i className={`fa-solid fa-eye${show ? '' : '-slash'}`} /></Button>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
        <Button disabled={!database} type='submit' variant='primary'><i className={`fa-solid fa-${database ? 'save' : 'spinner fa-spin'}`} /> {!database ? 'Loading Database' : 'Create Database'}</Button>
        <Button disabled={!database} onClick={() => setShowAlert(true)} variant='outline-danger'><i className='fa-solid fa-trash' /> Remove Database</Button>
      </Form>
      <Modal centered show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title><i className='fa-solid fa-trash' />Delete <code>{database?.name}</code></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='lead'>If you delete this database, there will be no going back, make sure you really want to delete it.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={async () => {
            await localforage.removeItem('database')
            navigate('/setup')
          }}>Delete database</Button>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}