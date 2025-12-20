/** @format */

import type { ComponentPropsWithRef, ReactNode } from 'react'
import Button from 'react-bootstrap/Button'

export interface BaseButtonProps extends Omit<
  ComponentPropsWithRef<typeof Button>,
  'icon' | 'children'
> {
  icon: string
  children?: never
}

export default function BaseButton({
  icon,
  ...buttonProps
}: BaseButtonProps): ReactNode {
  return (
    <Button {...buttonProps}>
      <i className={`fa-solid fa-${icon}`} />
    </Button>
  )
}
