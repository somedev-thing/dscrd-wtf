import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  void: {
    50: '#f0f4ff',
    100: '#dbe4ff',
    200: '#bac8ff',
    300: '#91a7ff',
    400: '#748ffc',
    500: '#0072ff', // Signature Electric Blue
    600: '#005ce6',
    700: '#0047b3',
    800: '#003380',
    900: '#18181b', // Zinc-900 (Surface)
    950: '#09090b', // Zinc-950 (Background)
  },
  surface: {
    bg: '#09090b',
    card: '#18181b',
    border: '#27272a',
    hover: '#1f1f23',
    elevated: '#27272a',
  },
  accent: {
    blue: '#0072ff',
    blueHover: '#0065e6',
    blueGlow: 'rgba(0, 114, 255, 0.15)',
  },
};

const styles = {
  global: {
    'html, body': {
      bg: '#09090b',
      color: '#fafafa',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: 'tall',
    },
    '::selection': {
      bg: 'rgba(0, 114, 255, 0.3)',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      bg: '#09090b',
    },
    '::-webkit-scrollbar-thumb': {
      bg: '#27272a',
      borderRadius: '3px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: '#3f3f46',
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
      transition: 'all 0.2s',
    },
    variants: {
      solid: {
        bg: 'accent.blue',
        color: 'white',
        _hover: {
          bg: 'accent.blueHover',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 20px rgba(0, 114, 255, 0.3)',
        },
        _active: {
          bg: 'accent.blueHover',
          transform: 'translateY(0)',
        },
      },
      ghost: {
        color: '#a1a1aa',
        _hover: {
          bg: 'surface.hover',
          color: 'white',
        },
      },
      outline: {
        borderColor: 'surface.border',
        color: '#a1a1aa',
        _hover: {
          bg: 'surface.hover',
          borderColor: '#3f3f46',
          color: 'white',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'surface.card',
        borderRadius: 'xl',
        border: '1px solid',
        borderColor: 'surface.border',
        overflow: 'hidden',
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'surface.card',
          border: '1px solid',
          borderColor: 'surface.border',
          color: 'white',
          _hover: {
            bg: 'surface.hover',
          },
          _focus: {
            bg: 'surface.card',
            borderColor: 'accent.blue',
            boxShadow: '0 0 0 1px #0072ff',
          },
          _placeholder: {
            color: '#52525b',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Textarea: {
    variants: {
      filled: {
        bg: 'surface.card',
        border: '1px solid',
        borderColor: 'surface.border',
        color: 'white',
        _hover: {
          bg: 'surface.hover',
        },
        _focus: {
          bg: 'surface.card',
          borderColor: 'accent.blue',
          boxShadow: '0 0 0 1px #0072ff',
        },
        _placeholder: {
          color: '#52525b',
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        bg: 'surface.card',
        border: '1px solid',
        borderColor: 'surface.border',
      },
      overlay: {
        bg: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
      },
    },
  },
  Drawer: {
    baseStyle: {
      dialog: {
        bg: 'surface.bg',
      },
    },
  },
  Menu: {
    baseStyle: {
      list: {
        bg: 'surface.card',
        border: '1px solid',
        borderColor: 'surface.border',
      },
      item: {
        bg: 'transparent',
        _hover: {
          bg: 'surface.hover',
        },
      },
    },
  },
  Badge: {
    variants: {
      subtle: {
        bg: 'accent.blueGlow',
        color: 'accent.blue',
      },
    },
  },
  Tooltip: {
    baseStyle: {
      bg: 'surface.card',
      color: 'white',
      border: '1px solid',
      borderColor: 'surface.border',
      borderRadius: 'lg',
      px: 3,
      py: 2,
    },
  },
};

const fonts = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  fonts,
  radii: {
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
  },
});

export default theme;
