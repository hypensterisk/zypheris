/** @format */

import BaseInputGroup from '@components/BaseInputGroup'
import FeedbackButton from '@components/FeedbackButton'

export default function ViewInputGroup({ children, value, ...props }) {
  return (
    <BaseInputGroup
      readOnly
      value={value}
      {...props}
    >
      <FeedbackButton
        icon='copy'
        onClick={() => navigator.clipboard.writeText(value)}
      />
      {children}
    </BaseInputGroup>
  )
}
