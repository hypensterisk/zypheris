import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { PasswordMeter } from 'password-meter'
import { AES } from 'crypto-js'
import localforage from 'localforage'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useDebounce } from 'use-debounce'

export default function Create() {
  const pm = new PasswordMeter()
  const [show, setShow] = useState(false)
  const [percent, setPercent] = useState(0)
  const navigate = useNavigate()
  const { setFieldError, setFieldTouched, handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: object({
      name: string().required('Please enter a name for the database'),
      password: string().required('Please enter the password for the database').test('strength', 'Password is not secure enough', (value) => {
        const { percent } = pm.getResult(value)
        return percent > 75
      })
    }),
    onSubmit: async ({ name, password }) => {
      await localforage.setItem('database', {
        name,
        encrypted: AES.encrypt(JSON.stringify({}), password).toString()
      })
      navigate('/unlock')
    }
  })
  const [password] = useDebounce(values.password, 200)
  useEffect(() => {
    const { percent } = pm.getResult(password)
    setPercent(percent)
    if (password !== '' && percent <= 75) {
      setFieldError('password', 'Weak')
      setFieldTouched('password', true)
      console.log(touched, errors)
    }
  }, [password])
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Create Database</h1>
        <h2 className='text-muted lead'>Please enter the name and password for the database</h2>
      </div>
      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <InputGroup hasValidation>
          <InputGroup.Text><i className='fa-solid fa-file' /></InputGroup.Text>
          <Form.Control isInvalid={touched.name && errors.name} value={values.name} onChange={handleChange} onBlur={handleBlur} name='name' type='text' placeholder="Name" />
          <InputGroup.Text>.db</InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </InputGroup>
        <InputGroup hasValidation>
          <InputGroup.Text><i className='fa-solid fa-key' /></InputGroup.Text>
          <Form.Control isInvalid={touched.password && errors.password} value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' type={show ? 'text' : 'password'} placeholder="Password" />
          <Button onClick={() => setShow(show => !show)} variant='light'><i className={`fa-solid fa-eye${show ? '' : '-slash'}`} /></Button>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
        <ProgressBar animated={values.password !== password} variant={  percent > 25 ? percent > 50 ? percent > 75 ? 'success' : 'primary' : 'warning' : 'danger'} now={percent} />
        <Button disabled={values.name === '' || values.password === '' || errors.name || errors.password || percent <= 75} type='submit' variant='primary'><i className='fa-solid fa-save' /> Create Database</Button>
        <Button as={Link} to='..' path='relative' variant='outline-light'><i className='fa-solid fa-arrow-left' /> Back</Button>
      </Form>
    </div>
  )
}