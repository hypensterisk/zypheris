/** @format */

import type { ReactNode, ReactElement } from 'react'
import BaseButton from '@components/BaseButton'
import type { BaseButtonProps } from '@components/BaseButton'

export type StateProps = Partial<BaseButtonProps>
export function State(_props: StateProps): ReactNode {
  return null
}

type Child = ReactElement<StateProps, typeof State>
type Children = [Child, Child, ...Child[]]
export interface StateButtonProps extends Partial<
  Omit<BaseButtonProps, 'index' | 'children'>
> {
  index: number
  children: Children
}

export default function StateButton({
  index,
  children,
  ...baseBaseButtonProps
}: StateButtonProps): ReactNode {
  const overrideBaseButtonProps = children[index]?.props
  if (!overrideBaseButtonProps) throw new Error()
  const finalBaseButtonProps = {
    ...baseBaseButtonProps,
    ...overrideBaseButtonProps,
  }
  if (!finalBaseButtonProps.icon) throw new Error()
  return <BaseButton {...(finalBaseButtonProps as BaseButtonProps)} />
}
