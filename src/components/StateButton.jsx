/** @format */

import { Children, isValidElement } from 'react'

import BaseButton from '@components/BaseButton'

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
