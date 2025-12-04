/** @format */

import { useId } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Image from 'react-bootstrap/Image'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Stack from 'react-bootstrap/Stack'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useNavigate, useLocation } from 'react-router'

export default function CardItem({ card, updateCard, deleteCard }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const { id, title, website, isFavorite, isArchive, isTrash } = card
  function handleMoveToArchive() {
    updateCard(id, { isArchive: true })
  }
  function handleRestoreFromArchive() {
    updateCard(id, { isArchive: false })
  }
  function handleMoveToTrash() {
    updateCard(id, { isTrash: true })
  }
  function handleRestoreFromTrash() {
    updateCard(id, { isTrash: false })
  }
  function handleDeletePermanently() {
    deleteCard(id)
  }
  function handleToggleFavorite(event) {
    const { checked } = event.target
    updateCard(id, { isFavorite: checked })
  }
  function handleViewCard() {
    navigate(`/database/card/${id}`, {
      state: { from: pathname + search + hash },
    })
  }
  const toggleButtonId = useId()
  return (
    <ListGroupItem
      variant={
        isTrash
          ? 'danger'
          : isArchive
            ? 'success'
            : isFavorite
              ? 'warning'
              : 'dark'
      }
      className='d-flex flex-row justify-content-between align-items-center gap-2'
    >
      <div className='flex-shrink-0'>
        <Image
          roundedCircle
          src={`https://icon.horse/icon/${new URL(website).hostname}`}
          width={48}
          height={48}
        />
      </div>
      <Stack
        className='flex-grow-1 overflow-hidden'
        gap={1}
        style={{ minWidth: 0 }}
      >
        <div className='fw-bold text-truncate'>{title}</div>
        <div className='text-muted small text-truncate'>{website}</div>
      </Stack>
      <Stack
        direction='horizontal'
        gap={2}
      >
        <ToggleButton
          type='checkbox'
          checked={isFavorite}
          disabled={isArchive || isTrash}
          id={toggleButtonId}
          onChange={handleToggleFavorite}
          value={1}
          size='sm'
          variant='outline-warning'
        >
          <i className='fa-solid fa-star' />
        </ToggleButton>
        <DropdownButton
          title={<i className='fa-solid fa-ellipsis-vertical' />}
          size='sm'
          variant='outline-light'
        >
          <Dropdown.Item onClick={handleViewCard}>
            <i className='fa-solid fa-eye' /> View Card
          </Dropdown.Item>
          {isTrash ? (
            <>
              <Dropdown.Item onClick={handleRestoreFromTrash}>
                <i className='fa-solid fa-trash-restore' /> Restore From Trash
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeletePermanently}>
                <i className='fa-solid fa-x' /> Delete Permanently
              </Dropdown.Item>
            </>
          ) : (
            <>
              {isArchive ? (
                <Dropdown.Item onClick={handleRestoreFromArchive}>
                  <i className='fa-solid fa-arrow-rotate-left' /> Restore From
                  Archive
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={handleMoveToArchive}>
                  <i className='fa-solid fa-archive' /> Move To Archive
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={handleMoveToTrash}>
                <i className='fa-solid fa-trash' /> Move To Trash
              </Dropdown.Item>
            </>
          )}
        </DropdownButton>
      </Stack>
    </ListGroupItem>
  )
}
