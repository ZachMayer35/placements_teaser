import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004A6C',
    },
    secondary: {
      main: '#74B943',
      contrastText: '#fff'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
});

export default theme;