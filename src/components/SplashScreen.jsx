/** @format */

import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'

export default function SplashScreen() {
  const favicon = import.meta.env.BASE_URL + 'icon.png'
  return (
    <div className='h-100 d-flex flex-column'>
      <div className='flex-grow-1 d-flex justify-content-center align-items-end'>
        <div className='w-25'>
          <Image
            src={favicon}
            fluid
          />
        </div>
      </div>
      <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
        <Spinner />
      </div>
    </div>
  )
}
