import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

export default function SetupChoice() {
  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center p-3 gap-4'>
      <div className='text-center'>
        <h1>Set Up Database</h1>
        <h2 className='text-muted lead'>
          Choose how you want to set up the database.
        </h2>
      </div>
      <div className='d-flex flex-column gap-2'>
        <Button as={Link} to='create' variant='primary'>
          <i className='fa-solid fa-pencil' /> Create Database
        </Button>
        <Button as={Link} to='upload' variant='success'>
          <i className='fa-solid fa-upload' /> Upload Database
        </Button>
      </div>
    </div>
  )
}
