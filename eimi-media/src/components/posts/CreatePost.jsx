import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { usePosts } from '../../hooks/usePosts'
import { useAuth } from '../../hooks/useAuth'

const Container = styled.div`
  background: transparent;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => `${props.theme.colors.error}20`};
  border-radius: ${props => props.theme.borderRadius.sm};
`

const CreatePost = ({ onPostCreated }) => {
  const [header, setHeader] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { createPost } = usePosts()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!header.trim()) {
      setError('Please enter a header')
      return
    }
    
    if (!content.trim()) {
      setError('Please enter some content')
      return
    }

    setLoading(true)
    const { error } = await createPost(header.trim(), content.trim(), imageUrl || null)
    setLoading(false)

    if (error) {
      setError(error)
    } else {
      setHeader('')
      setContent('')
      setImageUrl('')
      // Notify parent that post was created
      if (onPostCreated) {
        onPostCreated()
      }
    }
  }

  if (!user) return null

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Post header..."
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          disabled={loading}
        />
        <Input
          as="textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          rows="3"
        />
        <Input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={loading}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button 
          type="submit" 
          $primary 
          disabled={!header.trim() || !content.trim() || loading}
          style={{ alignSelf: 'flex-end' }}
        >
          {loading ? 'Posting...' : '📜 Post'}
        </Button>
      </Form>
    </Container>
  )
}

export default CreatePost