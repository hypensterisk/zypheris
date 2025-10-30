import { useEffect } from 'react'

export default function useNoBackNavigation() {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
  }, [])
}
