import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import { FaMoon, FaSun, FaUser, FaCog, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.backgroundWhite};
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.header};
  backdrop-filter: blur(10px);
  background: ${props => props.theme.colors.backgroundWhite}ee;
  transition: all ${props => props.theme.transitions.default};
`

const HeaderContent = styled.div`
  max-width: 850px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.bold};

  .badge {
    font-size: ${props => props.theme.typography.fontSize.xs};
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textWhite};
    padding: 2px ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.pill};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.lg};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight}40;
    transform: rotate(20deg);
  }
`

// ============ DROPDOWN MENU ============

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.avatarGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textWhite};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  overflow: hidden;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  border: 2px solid transparent;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme.colors.border};
  min-width: 200px;
  padding: ${props => props.theme.spacing.xs} 0;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: all ${props => props.theme.transitions.default};
  z-index: 1000;
`

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.$danger ? props.theme.colors.error : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
  text-align: left;

  &:hover {
    background: ${props => props.$danger ? `${props.theme.colors.error}10` : props.theme.colors.backgroundLight};
  }

  svg {
    font-size: ${props => props.theme.typography.fontSize.md};
    opacity: 0.7;
  }
`

const DropdownDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xs} 0;
`

const UserInfoDropdown = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const UserFullName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
`

const UserUsername = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.xs};
`

const UserEmail = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.xs};
  opacity: 0.7;
`

const AdminBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textWhite};
  font-size: ${props => props.theme.typography.fontSize.xs};
  padding: 1px ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-left: ${props => props.theme.spacing.xs};
`

const SignInLink = styled(Link)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.pill};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textWhite};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    color: ${props => props.theme.colors.textWhite};
    transform: translateY(-1px);
  }
`

// ============ MAIN HEADER COMPONENT ============

const Header = () => {
  const { user, profile, signOut, isAdmin, loading } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.charAt(0).toUpperCase()
    }
    return profile?.username?.charAt(0).toUpperCase() || 'U'
  }

  const handleSignOut = async () => {
    if (isSigningOut) return
    
    try {
      setIsSigningOut(true)
      setIsDropdownOpen(false)
      
      const { error } = await signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        window.location.href = '/login'
      } else {
        console.log('Sign out successful')
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error during sign out:', error)
      window.location.href = '/login'
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleNavigateToAdmin = () => {
    setIsDropdownOpen(false)
    navigate('/admin')
  }

  const handleNavigateToProfile = () => {
    setIsDropdownOpen(false)
    navigate('/profile')
  }

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Always show the header, even when loading or logged out
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          N-Menashe
          <span className="badge">Beta</span>
        </Logo>
        <Nav>          
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          
          {loading ? (
            <div style={{ color: '#657786', fontSize: '14px' }}>Loading...</div>
          ) : user ? (
            <AvatarContainer ref={dropdownRef}>
              <UserAvatar onClick={toggleDropdown}>
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.full_name} />
                ) : (
                  getInitials()
                )}
              </UserAvatar>

              <DropdownMenu $isOpen={isDropdownOpen}>
                <UserInfoDropdown>
                  <UserFullName>
                    {profile?.full_name || 'User'}
                    {isAdmin && <AdminBadge>Admin</AdminBadge>}
                  </UserFullName>
                  <UserUsername>@{profile?.username || 'username'}</UserUsername>
                  {profile?.email && <UserEmail>{profile.email}</UserEmail>}
                </UserInfoDropdown>

                <DropdownDivider />

                <DropdownItem onClick={handleNavigateToProfile}>
                  <FaUser /> Profile
                </DropdownItem>

                {isAdmin && (
                  <>
                    <DropdownItem onClick={handleNavigateToAdmin}>
                      <FaShieldAlt /> Admin Panel
                    </DropdownItem>
                    <DropdownDivider />
                  </>
                )}

                <DropdownItem 
                  $danger 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <FaSignOutAlt /> {isSigningOut ? 'Signing out...' : 'Sign Out'}
                </DropdownItem>
              </DropdownMenu>
            </AvatarContainer>
          ) : (
            <SignInLink to="/login">Sign In</SignInLink>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header