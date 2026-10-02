import styled, { keyframes } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { 
  FaHome, 
  FaBook, 
  FaVideo, 
  FaMusic,
  FaPlusCircle,
  FaNewspaper,
  FaChartBar
} from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const NavWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${props => props.theme.zIndex.popover};
  padding: 0 ${props => props.theme.spacing.md};
  pointer-events: none;
  width: auto;
  max-width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    bottom: 20px;
    padding: 0 ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 15px;
    padding: 0 ${props => props.theme.spacing.xs};
  }
`

const NavContainer = styled.nav`
  pointer-events: all;
  background: ${props => props.theme.colors.backgroundWhite}ee;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.pill};
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
  border: 1px solid ${props => props.theme.colors.border}40;
  transition: all ${props => props.theme.transitions.default};
  animation: ${floatAnimation} 3s ease-in-out infinite;
  width: auto;
  min-width: 280px;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.xs};
    min-width: 240px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.xs};
    min-width: 200px;
    border-radius: ${props => props.theme.borderRadius.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    gap: 2px;
    min-width: 160px;
    border-radius: ${props => props.theme.borderRadius.md};
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.pill};
  text-decoration: none;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.textLight};
  transition: all ${props => props.theme.transitions.default};
  position: relative;
  min-width: 44px;
  cursor: pointer;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    min-width: 38px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
    min-width: 34px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
    min-width: 28px;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
    
    .tooltip {
      opacity: 1;
      transform: translateY(-8px);
    }
  }

  ${props => props.$active && `
    color: ${props.theme.colors.primary};
    background: ${props.theme.colors.primaryLight}40;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 3px;
      background: ${props.theme.colors.primary};
      border-radius: ${props.theme.borderRadius.sm};
      
      @media (max-width: ${props.theme.breakpoints.mobile}) {
        width: 12px;
        height: 2px;
        bottom: 1px;
      }
    }
  `}
`

const IconWrapper = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  line-height: 1;
  transition: all ${props => props.theme.transitions.default};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`

const Label = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-top: 2px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 10px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 9px;
    margin-top: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const Tooltip = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.textWhite};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  white-space: nowrap;
  opacity: 0;
  transition: all ${props => props.theme.transitions.default};
  pointer-events: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${props => props.theme.colors.secondary};
  }
`

const NavDivider = styled.div`
  width: 1px;
  height: 30px;
  background: ${props => props.theme.colors.border};
  margin: 0 ${props => props.theme.spacing.xs};
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    height: 26px;
    margin: 0 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 22px;
    margin: 0 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 18px;
    margin: 0 1px;
  }
`

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primaryGradient};
  color: ${props => props.theme.colors.textWhite};
  border: none;
  font-size: ${props => props.theme.typography.fontSize.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  margin-left: ${props => props.theme.spacing.xs};
  text-decoration: none;
  box-shadow: 0 4px 12px ${props => props.theme.colors.primary}60;
  animation: ${pulse} 2s ease-in-out infinite;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 38px;
    height: 38px;
    font-size: ${props => props.theme.typography.fontSize.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 34px;
    height: 34px;
    font-size: ${props => props.theme.typography.fontSize.md};
    box-shadow: 0 3px 10px ${props => props.theme.colors.primary}50;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;
    font-size: ${props => props.theme.typography.fontSize.sm};
    box-shadow: 0 2px 8px ${props => props.theme.colors.primary}40;
    margin-left: ${props => props.theme.spacing.xs};
  }

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px ${props => props.theme.colors.primary}70;
  }

  &:active {
    transform: scale(0.95);
  }
`

const FloatingNavbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/library', icon: FaBook, label: 'Library' },
    { path: '/videos', icon: FaVideo, label: 'Videos' },
    { path: '/audio', icon: FaMusic, label: 'Audio' },
    { path: '/feed', icon: FaNewspaper, label: 'Feed' },
    { path: '/admin', icon: FaChartBar, label: 'Dashboard' }
  ]

  return (
    <NavWrapper>
      <NavContainer>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <NavItem 
              key={item.path} 
              to={item.path} 
              $active={isActive}
            >
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <Label>{item.label}</Label>
              <Tooltip className="tooltip">{item.label}</Tooltip>
            </NavItem>
          )
        })}
        
        <NavDivider />
        
        <CreateButton 
          to="/create"
          title="Create new post"
        >
          <FaPlusCircle />
        </CreateButton>
      </NavContainer>
    </NavWrapper>
  )
}

export default FloatingNavbar