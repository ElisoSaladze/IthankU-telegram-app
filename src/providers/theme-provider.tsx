import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const theme = createTheme({
    typography: {
      fontFamily: ['Montserrat', 'Arial', 'sans-serif'].join(','),
    },
    palette: {
      primary: {
        main: '#21A54D',
        light: '#A0A0A0',
      },
      secondary: {
        main: '#E7E7E7',
        dark: '#828282',
      },
      info: {
        main: '#222222',
      },
      text: {
        secondary: '#222222B5',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '60px',
            textTransform: 'none',
            padding: 10,
            fontSize: 20,
          },
          containedPrimary: {
            backgroundColor: '#21A54D',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1e9441',
            },
          },
          containedWarning: {
            backgroundColor: 'white',
            color: '#21A54D',
            '&:hover': {
              backgroundColor: 'white',
            },
          },
          containedSecondary: {
            backgroundColor: '#E7E7E7',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#d5d5d5',
            },
          },
          containedSuccess: {
            backgroundColor: 'rgba(224, 255, 235, 0.96)',
            color: '#21A54D',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(202, 247, 204, 0.96)',
            },
          },
          textSecondary: {
            color: 'black',
          },
          sizeSmall: {
            padding: 0,
            fontSize: 16,
          },
          sizeMedium: {
            fontSize: 14,
            padding: '3px 10px',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '23px',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            border: 'none !important',
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderRadius: '18px',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            position: 'static',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: '17px',
            border: `1px solid #21A54D`,
            boxShadow: 'none',
            padding: 0,
            gap: 0,
          },
          list: {
            padding: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '12px',
            color: '#21A54D',
            margin: 0,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 20px',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: '10px 5px',
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
          },
          switchBase: {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#21A54D',
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#33cf4d',
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: '#BFBFBF',
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.7,
            },
          },
          thumb: {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
          },
          track: {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
            transition: 'background-color 500ms',
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            height: '36px',
          },
          grouped: {
            '&:not(:first-of-type)': {
              borderLeft: '1px solid #21A54D',
            },
            '&:not(:last-of-type)': {
              borderRight: '1px solid #21A54D',
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 13,
            textTransform: 'none',
            '&.Mui-selected': {
              backgroundColor: '#21A54D',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#1e9441',
              },
            },
            '&:not(.Mui-selected)': {
              border: '1px solid #21A54D',
              color: '#21A54D',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: 'auto',
          },
          paper: {
            borderTopLeftRadius: '40px',
            borderTopRightRadius: '40px',
            width: '100%',
            height: 'auto',
            padding: '20px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '25px',
            boxShadow: '0px 8px 24px 0px #959DA533',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            position: 'fixed',
            bottom: 0,
            margin: 2,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 15,
            boxShadow: '0px 0px 8px -2px #00000040',
            '&.MuiPaper-rounded': {
              borderRadius: 15,
            },
            '&.MuiPaper-elevation1': {
              boxShadow: '0px 0px 8px -2px #00000040',
            },
            '&:before': {
              display: 'none',
            },
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
