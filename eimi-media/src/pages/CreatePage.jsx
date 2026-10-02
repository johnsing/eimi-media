import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import TiptapEditor from '../components/editor/TiptapEditor'

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`

const Form = styled.form`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #14171a;
  margin-bottom: 8px;
  font-size: 14px;
`

const ErrorMessage = styled.div`
  color: #e0245e;
  font-size: 14px;
  text-align: center;
  padding: 8px;
  background: #fff5f5;
  border-radius: 8px;
  margin-top: 12px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: flex-end;
`

const LoginPrompt = styled.div`
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    color: #14171a;
    margin-bottom: 8px;
  }

  p {
    color: #657786;
    margin-bottom: 16px;
  }

  a {
    color: #1da1f2;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ImagePreview = styled.div`
  margin: 12px 0;
  padding: 12px;
  background: #f5f8fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }

  button {
    background: none;
    border: none;
    color: #e0245e;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`

const CreatePage = () => {
  const { user } = useAuth()
  const { createPost, isSubmitting } = usePosts()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  if (!user) {
    return (
      <Container>
        <LoginPrompt>
          <h3>🔒 Please Login</h3>
          <p>You need to be logged in to create a post.</p>
          <Button type="button" $primary onClick={() => navigate('/login')}>
            Login / Sign Up
          </Button>
        </LoginPrompt>
      </Container>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('Please add some content to your post')
      return
    }

    setError('')
    
    const { error } = await createPost(title.trim() || 'Untitled', content, imageUrl || null)
    
    if (error) {
      setError(error)
    } else {
      navigate('/')
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        if (typeof base64 === 'string') {
          setImageUrl(base64)
          setPreviewImage(base64)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <Container>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title (Optional)</Label>
          <Input
            type="text"
            placeholder="Enter a title for your post..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label>Content</Label>
          <TiptapEditor
            content={content}
            onChange={setContent}
            placeholder="Write something amazing..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Image (Optional)</Label>
          <Input
            type="text"
            placeholder="Enter image URL..."
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value)
              setPreviewImage(e.target.value)
            }}
            disabled={isSubmitting}
          />
          <div style={{ marginTop: '8px' }}>
            <Button 
              type="button" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              📤 Upload Image
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          {previewImage && (
            <ImagePreview>
              <img src={previewImage} alt="Preview" />
              <button 
                type="button"
                onClick={() => {
                  setImageUrl('')
                  setPreviewImage('')
                }}
              >
                Remove
              </button>
            </ImagePreview>
          )}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" $primary disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : '📝 Publish Post'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  )
}

export default CreatePage