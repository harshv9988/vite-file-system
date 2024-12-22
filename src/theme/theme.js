import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { reset } from '@theme/reset';

import { themeColors, grey, commonColors } from './colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    htmlFontSize: 10,
  },
  palette: {
    primary: themeColors,
    common: commonColors,
    grey,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            ${reset}
        `,
    },
  },
});

export default theme;
