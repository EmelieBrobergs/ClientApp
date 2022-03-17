import { createTheme } from '@mui/material/styles';
import color from "./color";

// Declare customStyle parameters
declare module "@mui/material/styles" {
    interface Theme {
      status: {
        alarm: {
          primary: string;
          secondary: string;
        }
        warning: {
          primary: string;
          secondary: string;
        }
        ok: {
          primary: string;
          secondary: string;
        }
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        alarm?: {
          primary?: string;
          secondary?: string;
        }
        warning?: {
          primary?: string;
          secondary?: string;
        }
        ok?: {
          primary?: string;
          secondary?: string;
        }
      };
    }
  }
  
  const theme = createTheme({
    // mui Styles - overrides default: https://mui.com/customization/palette/
    palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#3F4346',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
          contrastText: "#C7CCCD"
        },
        secondary: {
          light: "#F7F7F7",
          main: "#F5F5F5",
          // dark: will be calculated from palette.secondary.main,
          contrastText: "#222121",
        },
        error: {
          light: color.Red200,
          main: color.Red100,
        },
        warning: {
          light: color.Gold200,
          main: color.Gold100,
        },
        info: {
          light: color.Blue100,
          main: color.Blue100,
          dark: color.Purple100
        },
        success: {
          light: color.Green300,
          main: color.Green200,
          dark: color.Green100
        },
        text: {
          // primary: color.Grey100
          primary: "#222121"
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
    // more mui..
    typography: {
      subtitle1: {
        fontSize: 12,
      },
    },
    //custom Styles
    status: {
      alarm: {
        primary: color.Red100,
        secondary: color.Red200
      },
      warning: {
        primary: color.Gold100,
        secondary: color.Gold200
      },
      ok: {
        primary: color.Green100,
        secondary: color.Green300
      }
    },
  });

  export default {
      theme
  };