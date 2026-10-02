import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { useAuth } from '../../hooks/useAuth'

const Container = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Error = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`

const SwitchText = styled.p`
  text-align: center;
  margin-top: 16px;
  color: ${props => props.theme.colors.textLight};

  a {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <Container>
      <Title>Welcome Back</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" $primary disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        {error && <Error>{error}</Error>}
      </Form>
      <SwitchText>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </SwitchText>
    </Container>
  )
}

export default Login