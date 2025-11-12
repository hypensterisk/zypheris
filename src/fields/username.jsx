/** @format */

import BaseButton from '@components/BaseButton'
import EditInputGroup from '@components/EditInputGroup'
import ViewInputGroup from '@components/ViewInputGroup'
import { string } from 'yup'

function View({ value }) {
  return (
    <ViewInputGroup
      icon='user-circle'
      value={value}
    />
  )
}
function Edit({ name, value, setValue, error, onChange, handleRemove }) {
  return (
    <EditInputGroup
      icon='user-circle'
      placeholder='Username'
      setValue={setValue}
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={error}
      feedbacks={{ invalid: error }}
    >
      <BaseButton
        icon='trash'
        onClick={handleRemove}
        variant='danger'
      />
    </EditInputGroup>
  )
}
const defaultValue = 'hypensterisk'
const type = 'Username'
const validationSchema = string().required()

export default { View, Edit, defaultValue, type, validationSchema }
