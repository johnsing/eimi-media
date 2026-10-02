import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.avatarGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textWhite};
  font-size: 40px;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin: 0 auto ${props => props.theme.spacing.md};
`

const Name = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const Username = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`

const ProfilePage = () => {
  const { profile } = useAuth()

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.charAt(0).toUpperCase()
    }
    return profile?.username?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <Container>
      <ProfileCard>
        <Avatar>{getInitials()}</Avatar>
        <Name>{profile?.full_name || 'User'}</Name>
        <Username>@{profile?.username || 'username'}</Username>
        {profile?.email && (
          <p style={{ textAlign: 'center', color: '#657786' }}>
            📧 {profile.email}
          </p>
        )}
      </ProfileCard>
    </Container>
  )
}

export default ProfilePage