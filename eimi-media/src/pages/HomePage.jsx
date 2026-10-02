import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const HeroSection = styled.div`
  padding: 80px 20px 60px;
  text-align: center;
  position: relative;
`

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #f5c842;
  text-shadow: 0 4px 20px rgba(245, 200, 66, 0.3);
  margin: 0;
  line-height: 1.1;
  letter-spacing: 2px;

  span {
    display: block;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: #ffffff;
    font-weight: 300;
    margin-top: 8px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
`

const PortalBadge = styled(Link)`
  display: inline-block;
  background: rgba(245, 200, 66, 0.15);
  border: 1px solid rgba(245, 200, 66, 0.3);
  border-radius: 50px;
  padding: 12px 30px;
  margin-top: 30px;
  color: #f5c842;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(245, 200, 66, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 200, 66, 0.2);
  }
`
const HomePage = () => {
  return (
    <PageContainer>
      <ContentWrapper>        
        <HeroSection>
          <MainTitle>
            LET MY PEOPLE
            <span>KNOW</span>
          </MainTitle>
          <PortalBadge to="/feed">✨ Start Learning in the N-MENASHE</PortalBadge>
        </HeroSection>
      </ContentWrapper>
    </PageContainer>
  )
}

export default HomePage