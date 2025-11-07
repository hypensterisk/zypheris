/** @format */

import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router'

import useDatabaseStore from '../hooks/useDatabaseStore'

export default function Landing() {
  const password = useDatabaseStore((state) => state.password)
  const database = useDatabaseStore((state) => state.database)
  const navigate = useNavigate()
  useEffect(() => {
    if (password !== '') {
      navigate('/dashboard')
      return
    }
    if (database !== null) {
      navigate('/unlock')
      return
    }
  }, [navigate, database, password])
  return (
    <div className='h-100 d-flex flex-column'>
      <div className='h-50 d-flex flex-column align-items-center justify-content-end'>
        <h1 className='display-1'>Zypheris</h1>
        <h2 className='text-muted'>Zypheris is built for everyone</h2>
      </div>
      <div className='h-50 d-flex align-items-center justify-content-center'>
        <Button
          as={Link}
          to='setup'
          variant='outline-light'
          size='lg'
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
