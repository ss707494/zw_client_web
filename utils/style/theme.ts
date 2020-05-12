import { createMuiTheme } from "@material-ui/core";
import {mpStyle} from './common'

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: mpStyle.red,
    },
  }
})
