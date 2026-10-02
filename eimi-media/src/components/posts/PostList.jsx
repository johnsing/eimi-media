import styled from 'styled-components'
import { useState, useEffect, useCallback, useRef } from 'react'
import PostCard, { PostCardSkeleton } from './PostCard'
import { usePosts } from '../../hooks/usePosts'

const Container = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const Empty = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }

  .emoji {
    font-size: 48px;
    display: block;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => `${props.theme.colors.error}10`};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => `${props.theme.colors.error}30`};
  color: ${props => props.theme.colors.error};

  p {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  button {
    margin-top: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.lg};
    background: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.textWhite};
    border: none;
    border-radius: ${props => props.theme.borderRadius.pill};
    cursor: pointer;
    font-size: ${props => props.theme.typography.fontSize.sm};
    transition: all ${props => props.theme.transitions.default};

    &:hover {
      background: ${props => `${props.theme.colors.error}dd`};
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`


const LoadMoreContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md} 0;
`

const LoadMoreButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textWhite};
  border: none;
  border-radius: ${props => props.theme.borderRadius.pill};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all ${props => props.theme.transitions.default};
  font-weight: ${props => props.theme.typography.fontWeight.medium};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const LoadingMoreText = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.sm};
  padding: ${props => props.theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`

const PostList = () => {
  const { 
    posts, 
    loading, 
    error, 
    hasMore, 
    totalCount,
    refreshPosts,
    loadMore 
  } = usePosts()
  
  const [retryCount, setRetryCount] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const observerRef = useRef(null)
  const lastPostRef = useRef(null)

  // Auto-retry on error after 5 seconds (max 3 retries)
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1)
        refreshPosts()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, retryCount, refreshPosts])

  // Reset retry count when posts load successfully
  useEffect(() => {
    if (!error && posts.length > 0) {
      setRetryCount(0)
    }
  }, [error, posts])

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          handleLoadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current)
    }

    return () => {
      if (lastPostRef.current) {
        observer.unobserve(lastPostRef.current)
      }
      observer.disconnect()
    }
  }, [posts, hasMore, loading, loadingMore])

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    await loadMore()
    setLoadingMore(false)
  }

  const handleRetry = () => {
    setRetryCount(0)
    refreshPosts()
  }

  // Show loading skeletons
  if (loading && posts.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          {[1, 2, 3].map(i => (
            <PostCardSkeleton key={i} />
          ))}
        </LoadingContainer>
      </Container>
    )
  }

  // Show error
  if (error && posts.length === 0) {
    return (
      <Container>
        <ErrorContainer>
          <p>⚠️ {error}</p>
          {retryCount > 0 && retryCount < 3 && (
            <p style={{ fontSize: '12px', opacity: 0.7 }}>
              Auto-retrying... ({retryCount}/3)
            </p>
          )}
          <button onClick={handleRetry}>
            {retryCount >= 3 ? 'Manual Retry' : 'Try Again'}
          </button>
        </ErrorContainer>
      </Container>
    )
  }

  // Show empty state
  if (posts.length === 0) {
    return (
      <Container>
        <Empty>
          <span className="emoji">📜</span>
          <h3>No posts yet</h3>
          <p>Be the first to share your Torah insights with the community!</p>
        </Empty>
      </Container>
    )
  }

  return (
    <Container>

      {posts.map((post, index) => {
        const isLast = index === posts.length - 1
        return (
          <div 
            key={post.id} 
            ref={isLast ? lastPostRef : null}
          >
            <PostCard post={post} />
          </div>
        )
      })}

      {loadingMore && (
        <LoadingMoreText>
          <span>⏳</span> Loading more posts...
        </LoadingMoreText>
      )}


      {hasMore && !loadingMore && (
        <LoadMoreContainer>
          <LoadMoreButton 
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            Load More
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </Container>
  )
}

export default PostList