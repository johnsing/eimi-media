import styled from 'styled-components'
import PostList from '../components/posts/PostList'

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm};
  }
`

const FeedPage = () => {
  return (
    <Container>
      <PostList />
    </Container>
  )
}

export default FeedPage
