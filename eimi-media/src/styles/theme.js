// src/styles/theme.js
export const lightTheme = {
  colors: {
    // Primary colors
    primary: '#1da1f2',
    primaryDark: '#1a91da',
    primaryLight: '#e8f5fe',
    primaryGradient: 'linear-gradient(135deg, #1da1f2, #0d8bf0)',
    
    // Secondary colors
    secondary: '#14171a',
    secondaryLight: '#657786',
    secondaryLighter: '#8899a6',
    
    // Background colors
    background: '#f5f8fa',
    backgroundWhite: '#ffffff',
    backgroundDark: '#e6ecf0',
    backgroundLight: '#f5f8fa',
    
    // Text colors
    text: '#14171a',
    textLight: '#657786',
    textLighter: '#8899a6',
    textWhite: '#ffffff',
    
    // Status colors
    success: '#17bf63',
    error: '#e0245e',
    warning: '#ffad1f',
    info: '#1da1f2',
    
    // Border colors
    border: '#e6ecf0',
    borderLight: '#f5f8fa',
    borderDark: '#ccd6dd',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    
    // Avatar gradient
    avatarGradient: 'linear-gradient(135deg, #1da1f2, #0d8bf0)',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Transparent
    transparent: 'transparent',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
    pill: '50px',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.15)',
  },
  
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    header: 30,
    overlay: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    toast: 80,
    max: 100,
  },
}

export const darkTheme = {
  colors: {
    // Primary colors (keeping same brand colors but slightly adjusted for dark mode)
    primary: '#1da1f2',
    primaryDark: '#1a91da',
    primaryLight: '#1a2d3d',
    primaryGradient: 'linear-gradient(135deg, #1da1f2, #0d8bf0)',
    
    // Secondary colors
    secondary: '#ffffff',
    secondaryLight: '#8899a6',
    secondaryLighter: '#657786',
    
    // Background colors
    background: '#15202b',
    backgroundWhite: '#192734',
    backgroundDark: '#0d1a26',
    backgroundLight: '#22303c',
    
    // Text colors
    text: '#ffffff',
    textLight: '#8899a6',
    textLighter: '#657786',
    textWhite: '#ffffff',
    
    // Status colors
    success: '#17bf63',
    error: '#e0245e',
    warning: '#ffad1f',
    info: '#1da1f2',
    
    // Border colors
    border: '#38444d',
    borderLight: '#22303c',
    borderDark: '#46515c',
    
    // Shadow colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowDark: 'rgba(0, 0, 0, 0.5)',
    shadowLight: 'rgba(0, 0, 0, 0.1)',
    
    // Avatar gradient
    avatarGradient: 'linear-gradient(135deg, #1da1f2, #0d8bf0)',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    
    // Transparent
    transparent: 'transparent',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
    pill: '50px',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.6)',
  },
  
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    header: 30,
    overlay: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    toast: 80,
    max: 100,
  },
}

// Helper function to get theme value
export const getTheme = (theme, path) => {
  return path.split('.').reduce((obj, key) => obj && obj[key], theme)
}

// Theme context for easy access
export const themeContext = {
  light: lightTheme,
  dark: darkTheme,
  default: lightTheme,
}

// Theme provider wrapper
export const ThemeProviderWrapper = ({ children, theme = lightTheme }) => {
  return children
}