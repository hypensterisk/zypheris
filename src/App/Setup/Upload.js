import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import localforage from 'localforage'

export default function Upload() {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    if (file === null) return
    await localforage.setItem('database', {
      name: file.name,
      encrypted: await file.text()
    })
    navigate('/unlock')
  }
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Upload Database</h1>
        <h2 className='text-muted lead'>Please select the database file to be uploaded.</h2>
      </div>
      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
        <InputGroup >
          <Form.Control accept='.db' onChange={({ target }) => setFile(target.files[0])} type='file' />
        </InputGroup>
        <Button disabled={file === null} type='submit' variant='success'><i className='fa-solid fa-upload' /> Upload Database</Button>
        <Button as={Link} to='..' path='relative' variant='outline-light'><i className='fa-solid fa-arrow-left' /> Back</Button>
      </Form>
    </div>
  )
}