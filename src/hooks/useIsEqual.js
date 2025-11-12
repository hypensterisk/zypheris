/** @format */

import { isEqual } from 'lodash'
import { useMemo } from 'react'

export default function useIsEqual(card, values) {
  return useMemo(() => {
    const { title, website, ...fields } = values
    const draftCard = {
      ...card,
      title,
      website,
      fields: Object.entries(fields).map(([id, field]) => ({ id, ...field })),
    }
    return isEqual(card, draftCard)
  }, [card, values])
}
