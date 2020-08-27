import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'

export const DateWrapperApollo = (el: any) => {

  return (
      <MuiPickersUtilsProvider
          utils={DateFnsUtils}
      >
        {el}
      </MuiPickersUtilsProvider>
  )
}
