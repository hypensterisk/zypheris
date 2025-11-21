/** @format */

import { AES } from 'crypto-js'
import { useFormik } from 'formik'
import { PasswordMeter } from 'password-meter'
import { useState, useMemo, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import isValidFilename from 'valid-filename'
import { object, string } from 'yup'

import useAppStore from '@hooks/useAppStore'

export default function Create() {
  const passwordMeter = useMemo(() => new PasswordMeter(), [])
  const setName = useAppStore((state) => state.setName)
  const setDatabase = useAppStore((state) => state.setDatabase)
  const formik = useFormik({
    initialValues: { name: 'Personal Vault', password: '' },
    validationSchema: object({
      name: string()
        .required('Name is required')
        .trim('Name cannot start or end with whitespace')
        .matches(
          /^[\x20-\x7E]+$/,
          'Name can only contain ASCII printable characters',
        )
        .test('valid-filename', 'Name must be a valid filename', (value) =>
          isValidFilename(value),
        )
        .strict(),
      password: string()
        .required('Password is required')
        .test(
          'password-meter',
          'Password is not strong enough',
          (value) => passwordMeter.getResult(value).percent > 89,
        )
        .strict(),
    }),
    validateOnChange: false,
    onSubmit: ({ name, password }) => {
      const database = AES.encrypt(
        JSON.stringify({ cards: [] }),
        password,
      ).toString()
      setName(`${name}.zyp`)
      setDatabase(database)
    },
  })
  const debouncedValidateForm = useDebouncedCallback(formik.validateForm, 144)
  const handleChange = useCallback(
    (event) => {
      formik.handleChange(event)
      debouncedValidateForm()
    },
    [formik, debouncedValidateForm],
  )
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [debouncedPassword] = useDebounce(formik.values.password, 144)
  const passwordStrength = useMemo(
    () => passwordMeter.getResult(debouncedPassword).percent,
    [passwordMeter, debouncedPassword],
  )
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Create Database</h1>
        <h2 className='text-muted lead'>
          Please enter the name and password for the database
        </h2>
      </div>
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className='d-flex flex-column gap-2'
      >
        <InputGroup hasValidation>
          <InputGroup.Text>
            <i className='fa-solid fa-database' />
          </InputGroup.Text>
          <Form.Control
            autoComplete='new-password'
            isInvalid={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            name='name'
            type='text'
            placeholder='Name'
          />
          <InputGroup.Text>.zyp</InputGroup.Text>
          <Form.Control.Feedback type='invalid'>
            {formik.errors.name}
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <i className='fa-solid fa-key' />
          </InputGroup.Text>
          <Form.Control
            isInvalid={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={handleChange}
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
        <ProgressBar
          animated={formik.values.password !== debouncedPassword}
          variant={
            (passwordStrength <= 34 && 'danger') ||
            (passwordStrength <= 55 && 'warning') ||
            (passwordStrength <= 89 && 'primary') ||
            'success'
          }
          now={passwordStrength}
        />
        <Button
          disabled={!formik.isValid}
          type='submit'
        >
          <i className='fa-solid fa-save' /> Create Database
        </Button>
        <Button
          as={Link}
          to={-1}
          variant='outline-light'
        >
          <i className='fa-solid fa-arrow-left' /> Back
        </Button>
      </Form>
    </div>
  )
}
