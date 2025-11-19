/** @format */

import { useState } from 'react'
import { Toast, ToastContainer, Nav } from 'react-bootstrap'

import useAppStore from '@hooks/useAppStore.js'

export default function ExportDatabaseButton() {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  })
  const database = useAppStore((state) => state.database)
  const name = useAppStore((state) => state.name)
  async function handleClick() {
    try {
      const fileHandle = await window.showSaveFilePicker({
        id: 'backup',
        startIn: 'documents',
        suggestedName: name,
        types: [
          {
            description: 'Any kind of binary data',
            accept: { 'application/octet-stream': ['.bin'] },
          },
        ],
      })
      const writable = await fileHandle.createWritable()
      await writable.write(database)
      await writable.close()
      setToast({
        message: 'Database exported successfully',
        type: 'success',
        show: true,
      })
    } catch ({ name }) {
      if (name !== 'AbortError') {
        setToast({
          message: 'Failed to export database',
          type: 'danger',
          show: true,
        })
      }
    }
  }
  return (
    <>
      <Nav.Link onClick={handleClick}>
        <i className='fa-solid fa-download' /> Export Database
      </Nav.Link>
      <ToastContainer
        position='bottom-end'
        className='p-3'
      >
        <Toast
          show={toast.show}
          onClose={() => setToast((toast) => ({ ...toast, show: false }))}
          bg={toast.type}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton>
            <i
              className={`fa-solid fa-${toast.type === 'success' ? 'circle-check text-success' : 'triangle-exclamation text-danger'} me-1`}
            />{' '}
            <strong className='me-auto'>
              {toast.type === 'success' ? 'Success' : 'Error'}
            </strong>
          </Toast.Header>
          <Toast.Body className='text-white'>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
