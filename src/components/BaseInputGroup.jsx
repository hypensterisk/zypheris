/** @format */

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default function BaseInputGroup({
  size,
  hasValidation,
  icon,
  children,
  feedbacks,
  ...props
}) {
  return (
    <InputGroup
      size={size}
      hasValidation={hasValidation}
    >
      <InputGroup.Text>
        <i className={`fa-solid fa-${icon}`} />
      </InputGroup.Text>
      <Form.Control {...props} />
      {children}
      {feedbacks?.valid && (
        <Form.Control.Feedback type='valid'>
          {feedbacks.valid}
        </Form.Control.Feedback>
      )}
      {feedbacks?.invalid && (
        <Form.Control.Feedback type='invalid'>
          {feedbacks.invalid}
        </Form.Control.Feedback>
      )}
    </InputGroup>
  )
}
