import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base styles */
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundLight};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderDark};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.secondary};
    transition: color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Inputs */
  input, textarea, select {
    font-family: inherit;
    transition: all 0.2s ease;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Container */
  .container {
    max-width: 750px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 ${({ theme }) => theme.spacing.sm};
    }
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .text-muted {
    color: ${({ theme }) => theme.colors.textLight};
  }

  .mt-1 { margin-top: ${({ theme }) => theme.spacing.sm}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.md}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.lg}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing.xl}; }

  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.sm}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.md}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.lg}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing.xl}; }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .gap-1 { gap: ${({ theme }) => theme.spacing.sm}; }
  .gap-2 { gap: ${({ theme }) => theme.spacing.md}; }
  .gap-3 { gap: ${({ theme }) => theme.spacing.lg}; }

  .hidden {
    display: none !important;
  }

  /* Loading animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Dark mode specific overrides */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: ${({ theme }) => 
        theme.colors.background || '#15202b'};
    }
  }
`