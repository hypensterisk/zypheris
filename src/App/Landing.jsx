/** @format */

import useRedirect from '@hooks/useRedirect'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

export default function Landing() {
  useRedirect(({ database, data, password }, navigate) => {
    if (data) return navigate('/dashboard')
    if (database && !password) return navigate('/unlock')
  })

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
