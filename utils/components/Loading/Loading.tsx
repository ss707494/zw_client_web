import { CircularProgress } from "@material-ui/core"
import React from 'react'

export const Loading = () => {
  return (
      <div
          style={{width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <CircularProgress
        />
      </div>
  )
}
