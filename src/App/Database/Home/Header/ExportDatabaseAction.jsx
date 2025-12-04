/** @format */

import { useCallback, useState } from 'react'
import NavLink from 'react-bootstrap/NavLink'

import useAppStore from '@hooks/useAppStore'

export default function ExportDatabaseAction() {
  const [isExporting, setIsExporting] = useState(false)
  const handleExportDatabase = useCallback(async () => {
    setIsExporting(true)
    const { name, database } = useAppStore.getState()
    const options = { suggestedName: name }
    try {
      const fileHandle = await showSaveFilePicker(options)
      const writable = await fileHandle.createWritable()
      await writable.write(database)
      await writable.close()
    } finally {
      setIsExporting(false)
    }
  }, [])
  return (
    <NavLink
      disabled={isExporting}
      onClick={handleExportDatabase}
    >
      <i
        className={`fa-solid ${isExporting ? 'fa-spinner fa-spin' : 'fa-download'}`}
      />
      {' Export Database'}
    </NavLink>
  )
}
