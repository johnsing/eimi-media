import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: all ${props => props.theme.transitions.default};
  background-color: ${props => props.theme.colors.backgroundWhite};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight}40;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLighter};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: all ${props => props.theme.transitions.default};
  background-color: ${props => props.theme.colors.backgroundWhite};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight}40;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLighter};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Input = ({ as, ...props }) => {
  if (as === 'textarea') {
    return <StyledTextArea {...props} />
  }
  return <StyledInput {...props} />
}