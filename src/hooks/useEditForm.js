/** @format */

import $fields from '@fields'
import { useFormik } from 'formik'
import objectPath from 'object-path'
import { useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { object, string } from 'yup'

export default function useEditForm(card, setCard) {
  const { title, website, fields } = card
  const fieldsInitialValues = Object.fromEntries(
    fields.map(({ id, ...field }) => [id, field]),
  )
  const initialValues = { title, website, ...fieldsInitialValues }

  function validate(values) {
    const errors = {}
    try {
      getValidationSchema(values).validateSync(values, { abortEarly: false })
    } catch (error) {
      error.inner.forEach(({ path, message }) => {
        objectPath.set(errors, path, message)
      })
    }
    return errors
  }
  function onSubmit(values) {
    const { title, website, ...fields } = values
    setCard({
      ...card,
      title,
      website,
      fields: Object.entries(fields).map(([id, field]) => ({ id, ...field })),
    })
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validate,
    onSubmit,
  })

  const [debouncedValues] = useDebounce(formik.values, 512)
  useEffect(() => {
    formik.validateForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues])

  return formik
}
function getValidationSchema(values) {
  const { title: _title, website: _website, ...fields } = values
  const title = string().required()
  const website = string().url().required()
  const fieldsValidationSchema = Object.fromEntries(
    Object.entries(fields).map(([id, { type }]) => [
      id,
      object({
        type: string().oneOf([type]).required(),
        value: $fields[type].validationSchema,
      }),
    ]),
  )
  return object({ title, website, ...fieldsValidationSchema })
}
