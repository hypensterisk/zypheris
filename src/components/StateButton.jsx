/** @format */

import BaseButton from '@components/BaseButton'
import { Children, isValidElement } from 'react'

export default function StateButton({ index, children, ...props }) {
  const states = Children.toArray(children)
    .filter(isValidElement)
    .map(({ props }) => props)
  const state = states[index]
  return (
    <BaseButton
      {...props}
      {...state}
    />
  )
}
export function State({ icon: _icon, variant: _variant }) {
  return null
}
