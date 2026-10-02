import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${props => {
    if (props.$primary) return props.theme.colors.primary
    if (props.$danger) return props.theme.colors.error
    if (props.$success) return props.theme.colors.success
    return 'transparent'
  }};
  
  color: ${props => {
    if (props.$primary || props.$danger || props.$success) return props.theme.colors.textWhite
    return props.theme.colors.primary
  }};
  
  border: ${props => {
    if (props.$primary || props.$danger || props.$success) return 'none'
    return `2px solid ${props.theme.colors.primary}`
  }};
  
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all ${props => props.theme.transitions.default};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  margin: ${props => props.$margin || '0'};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background-color: ${props => {
      if (props.$primary) return props.theme.colors.primaryDark
      if (props.$danger) return '#c01a4e'
      if (props.$success) return '#13a656'
      return props.theme.colors.primaryLight
    }};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`

export const Button = ({ 
  children, 
  primary, 
  danger, 
  success, 
  fullWidth, 
  margin, 
  ...props 
}) => {
  return (
    <StyledButton 
      $primary={primary} 
      $danger={danger}
      $success={success}
      $fullWidth={fullWidth}
      $margin={margin}
      {...props}
    >
      {children}
    </StyledButton>
  )
}