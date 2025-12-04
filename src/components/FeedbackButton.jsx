/** @format */

import { useState, useRef, useEffect } from 'react'

import StateButton, { State } from '@components/StateButton'

export default function FeedbackButton({ icon, onClick, ...props }) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  function handleAfterAction(index) {
    setIndex(index)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIndex(0)
    }, 1200)
  }

  function handleClick() {
    navigator.vibrate?.(30)
    setIndex(1)
    Promise.resolve(onClick())
      .then(() => handleAfterAction(2))
      .catch(() => handleAfterAction(3))
  }
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <StateButton
      index={index}
      onClick={handleClick}
      {...props}
    >
      <State
        icon={icon}
        variant='primary'
      />
      <State
        icon='spinner'
        variant='primary'
        disabled
      />
      <State
        icon='check'
        variant='success'
        disabled
      />
      <State
        icon='x'
        variant='danger'
        disabled
      />
    </StateButton>
  )
}
