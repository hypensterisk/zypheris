/** @format */

import useDatabaseStore from '@hooks/useDatabaseStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function useRedirect(handleRedirect) {
  const data = useDatabaseStore((state) => state.data)
  const password = useDatabaseStore((state) => state.password)
  const database = useDatabaseStore((state) => state.database)
  const hasHydrated = useDatabaseStore((state) => state.hasHydrated)

  const navigate = useNavigate()

  useEffect(() => {
    if (!hasHydrated) return
    handleRedirect({ data, password, database }, navigate)
  }, [data, password, database, hasHydrated, navigate, handleRedirect])
}
