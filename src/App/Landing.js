import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router'
import localforage from 'localforage'
import {useEffect} from 'react'

export default function Landing() {
  const navigate = useNavigate()
  useEffect(() => {
    localforage.getItem('database')
      .then((value) => {
        if (value !== null) {
          navigate('/unlock')
        }
      })
  }, [])
  return (
    <div className='h-100 d-flex flex-column'>
      <div className='h-50 d-flex flex-column align-items-center justify-content-end'>
        <h1 className='display-1'>Zypheris</h1>
        <h2 className='text-muted'>Zypheris is built for everyone</h2>
      </div>
      <div className='h-50 d-flex align-items-center justify-content-center'>
        <Button as={Link} to='setup' variant='outline-light' size='lg'>Get Started</Button>
      </div>
    </div>
  )
}