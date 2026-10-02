import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { TiDelete } from 'react-icons/ti'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`

const Card = styled.div`
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.default};
  animation: ${fadeIn} 0.3s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  ${props => props.$isDeleting && `
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
    transition: all 0.3s ease;
  `}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.xs};
`

const Heading = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.3;
  flex: 1;
  letter-spacing: -0.5px;

  &::first-letter {
    color: ${props => props.theme.colors.primary};
    font-size: 1.2em;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: ${props => props.theme.spacing.xs} 0;
  opacity: 0.5;
  letter-spacing: 4px;
  font-weight: 300;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all ${props => props.theme.transitions.default};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  &:hover {
    color: ${props => props.theme.colors.error};
    opacity: 1;
    transform: scale(1.1);
    background: ${props => `${props.theme.colors.error}10`};
  }

  &:active {
    transform: scale(0.9);
  }
`

const Content = styled.div`
  margin: ${props => props.theme.spacing.sm} 0;
  font-size: ${props => props.theme.typography.fontSize.md};
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  padding-left: ${props => props.theme.spacing.xs};

  p {
    margin: 0 0 ${props => props.theme.spacing.xs} 0;
  }

  ul, ol {
    padding-left: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.xs} 0;
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.xs} 0;
    color: ${props => props.theme.colors.textLight};
  }

  code {
    background: ${props => props.theme.colors.backgroundLight};
    padding: 2px 6px;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }

  pre {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.textWhite};
    padding: ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.xs} 0;

    code {
      background: transparent;
      color: ${props => props.theme.colors.textWhite};
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.sm};
    margin: ${props => props.theme.spacing.xs} 0;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.xs};
  padding-top: ${props => props.theme.spacing.xs};
  border-top: 1px solid ${props => props.theme.colors.border};
  opacity: 0.4;
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textLight};
  letter-spacing: 3px;
`

const AdminBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textWhite};
  font-size: ${props => props.theme.typography.fontSize.xs};
  padding: 2px ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-left: ${props => props.theme.spacing.xs};
`

// ============ SKELETON COMPONENTS ============

const SkeletonCard = styled.div`
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const SkeletonLine = styled.div`
  height: ${props => props.$height || '16px'};
  width: ${props => props.$width || '100%'};
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin: ${props => props.$margin || '0'};
`

const SkeletonHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.xs};
`

const SkeletonContent = styled.div`
  margin: ${props => props.theme.spacing.sm} 0;
`

export const PostCardSkeleton = () => {
  return (
    <SkeletonCard>
      <SkeletonHeading>
        <SkeletonLine $width="60%" $height="28px" />
        <SkeletonLine $width="30px" $height="30px" style={{ borderRadius: '50%' }} />
      </SkeletonHeading>
      <SkeletonContent>
        <SkeletonLine $margin="8px 0" />
        <SkeletonLine $width="80%" $margin="8px 0" />
        <SkeletonLine $width="60%" $margin="8px 0" />
      </SkeletonContent>
      <SkeletonLine $width="40%" $height="12px" $margin="8px 0 0 auto" />
    </SkeletonCard>
  )
}

// ============ MAIN POST CARD ============

const PostCard = ({ post }) => {
  const { user, isAdmin } = useAuth()
  const { deletePost } = usePosts()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true)
      await deletePost(post.id)
    }
  }

  const canDelete = user?.id === post.user_id || isAdmin

  return (
    <Card $isDeleting={isDeleting}>
      <Header>
        <Heading>
          {post.header || 'Untitled Post'}
          {post.profiles?.is_admin && <AdminBadge>Admin</AdminBadge>}
        </Heading>
        {canDelete && (
          <DeleteButton onClick={handleDelete} disabled={isDeleting}>
            <TiDelete />
          </DeleteButton>
        )}
      </Header>

      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </Card>
  )
}

export default PostCard