/** @format */

import Button from 'react-bootstrap/Button'

export default function BaseButton({ icon, ...props }) {
  return (
    <Button {...props}>
      <i className={`fa-solid fa-${icon}`} />
    </Button>
  )
}
