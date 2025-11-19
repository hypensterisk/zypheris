/** @format */

import password from '@fields/password'
import username from '@fields/username'

const $fields = Object.fromEntries(
  [username, password].map(($field) => [[$field.type], $field]),
)

export default $fields
