import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

export default function ResourcePage() {
    const { selectedLang } = useContext(AppContext)

  console.log(selectedLang)
  return (
    <div>
      <h1>{selectedLang.name}</h1>
    </div>
  )
}
