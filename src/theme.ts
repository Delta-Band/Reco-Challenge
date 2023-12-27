import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F5CED'
    },
    secondary: {
      main: '#FFFFFF'
    }
  },
  typography: {
    h6: {
      fontSize: '1.1rem'
    }
  }
});

export default theme;
