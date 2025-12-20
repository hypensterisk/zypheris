/** @format */

import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import StateButton, { State } from '@components/StateButton'
import type { StateButtonProps, StateProps } from '@components/StateButton'

type OnClick = () => void | Promise<void>
export interface FeedbackButtonProps extends Omit<
  StateButtonProps,
  'icon' | 'onClick' | 'index' | 'disabled' | 'variant'
> {
  icon: Required<StateProps>['icon']
  onClick: OnClick
  index?: never
  disabled?: never
  variant?: never
}

export default function FeedbackButton({
  icon,
  onClick,
  ...additionalStateButtonProps
}: FeedbackButtonProps): ReactNode {
  const [index, setIndex] = useState(0)
  const timeoutIdRef = useRef<number | undefined>(undefined)

  function handleAfterAction(index: number) {
    setIndex(index)
    clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = setTimeout(() => {
      setIndex(0)
    }, 1200)
  }

  function handleClick() {
    navigator.vibrate(30)
    setIndex(1)
    Promise.resolve(onClick())
      .then(() => {
        handleAfterAction(2)
      })
      .catch(() => {
        handleAfterAction(3)
      })
  }
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current)
    }
  }, [])

  return (
    <StateButton
      index={index}
      onClick={handleClick}
      disabled
      variant='primary'
      {...additionalStateButtonProps}
    >
      <State
        icon={icon}
        disabled={false}
      />
      <State icon='spinner' />
      <State
        icon='check'
        variant='success'
      />
      <State
        icon='x'
        variant='danger'
      />
    </StateButton>
  )
}
