/** @format */

import BaseInputGroup from '@components/BaseInputGroup'
import FeedbackButton from '@components/FeedbackButton'

export default function EditInputGroup({ icon, setValue, children, ...props }) {
  return (
    <BaseInputGroup
      icon={icon}
      hasValidation={true}
      {...props}
    >
      <FeedbackButton
        icon='paste'
        onClick={async () => {
          const value = await navigator.clipboard.readText()
          setValue(value)
        }}
      />
      {children}
    </BaseInputGroup>
  )
}
