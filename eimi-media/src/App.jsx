import { GlobalStyles } from './styles/GlobalStyles'
import AppRouter from './components/routing/AppRouter'
import { AuthProvider } from './context/AuthContext'
import { ThemeProviderWrapper } from './context/ThemeContext'

function App() {
  return (
    <ThemeProviderWrapper>
      <GlobalStyles />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProviderWrapper>
  )
}

export default App