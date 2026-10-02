import { createContext, useContext, useState, useEffect } from 'react'
import { lightTheme, darkTheme } from '../styles/theme'
import { ThemeProvider } from 'styled-components'

const ThemeContext = createContext(null)

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setTheme(darkTheme)
      setIsDarkMode(true)
    } else if (savedTheme === 'light') {
      setTheme(lightTheme)
      setIsDarkMode(false)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        setTheme(darkTheme)
        setIsDarkMode(true)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? lightTheme : darkTheme
    setTheme(newTheme)
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark')
  }

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper')
  }
  return context
}