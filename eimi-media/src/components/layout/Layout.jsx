import styled from 'styled-components'
import Header from './Header'
import FloatingNavbar from '../navigation/FloatingNavbar'

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.$showNavbar ? '100px' : '0'};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-bottom: ${props => props.$showNavbar ? '80px' : '0'};
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`

const Layout = ({ children, showNavbar = true }) => {
  return (
    <LayoutContainer $showNavbar={showNavbar}>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      {showNavbar && <FloatingNavbar />}
    </LayoutContainer>
  )
}

export default Layout