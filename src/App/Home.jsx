/** @format */

import Button from 'react-bootstrap/Button'
import { Link, Navigate } from 'react-router'

import useAppStore from '@hooks/useAppStore'

export default function Home() {
  const password = useAppStore((state) => state.password)
  const database = useAppStore((state) => state.database)
  const data = useAppStore((state) => state.data)
  if (data)
    return (
      <Navigate
        to='/database'
        replace={true}
      />
    )
  if (database && !password)
    return (
      <Navigate
        to='/unlock'
        replace={true}
      />
    )
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
          replace={true}
          variant='outline-light'
          size='lg'
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
