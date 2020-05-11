import React from 'react'
import { useTheme } from '@material-ui/core'

export default function() {
  const theme = useTheme()
  console.log(theme)

  return (
      <div>login</div>
  )
}
