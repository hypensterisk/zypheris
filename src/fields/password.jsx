/** @format */

import { useState } from 'react'
import { string } from 'yup'

import BaseButton from '@components/BaseButton'
import EditInputGroup from '@components/EditInputGroup'
import StateButton, { State } from '@components/StateButton'
import ViewInputGroup from '@components/ViewInputGroup'

function View({ value }) {
  const [toggled, setToggled] = useState(false)
  return (
    <ViewInputGroup
      icon='lock'
      type={toggled ? 'text' : 'password'}
      value={value}
    >
      <StateButton
        index={toggled ? 1 : 0}
        onClick={() => setToggled((toggled) => !toggled)}
      >
        <State icon='eye-slash' />
        <State icon='eye' />
      </StateButton>
    </ViewInputGroup>
  )
}
function Edit({ name, value, setValue, error, onChange, handleRemove }) {
  return (
    <EditInputGroup
      icon='lock'
      setValue={setValue}
      placeholder='Password'
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
const defaultValue = ''
const type = 'Password'
const validationSchema = string().required('Password is required')

export default { View, Edit, defaultValue, type, validationSchema }
