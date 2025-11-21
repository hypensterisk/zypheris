/** @format */

import { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Link } from 'react-router'

import useAppStore from '@hooks/useAppStore'

export default function Upload() {
  const [file, setFile] = useState(null)
  const setName = useAppStore((state) => state.setName)
  const setDatabase = useAppStore((state) => state.setDatabase)
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      if (!file) return
      const name = file.name
      const database = await file.text()
      setName(name)
      setDatabase(database)
    },
    [file, setName, setDatabase],
  )
  const handleChange = useCallback(
    (event) => {
      const file = event.target.files.at(0)
      setFile(file)
    },
    [setFile],
  )
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Upload Database</h1>
        <h2 className='text-muted lead'>
          Please select the database file to be uploaded.
        </h2>
      </div>
      <Form
        onSubmit={handleSubmit}
        className='d-flex flex-column gap-2'
      >
        <InputGroup>
          <Form.Control
            accept='.zyp'
            onChange={handleChange}
            type='file'
          />
        </InputGroup>
        <Button
          disabled={!file}
          type='submit'
          variant='success'
        >
          <i className='fa-solid fa-upload' /> Upload Database
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
