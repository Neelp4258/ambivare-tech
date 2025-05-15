import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --navy-blue: ${props => props.theme.navyBlue};
    --sky-blue: ${props => props.theme.skyBlue};
    --light-blue: ${props => props.theme.lightBlue};
    --text-primary: ${props => props.theme.textPrimary};
    --text-secondary: ${props => props.theme.textSecondary};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    line-height: 1.6;
    transition: all 0.3s ease;
  }

  .gradient-text {
    background: linear-gradient(45deg, var(--sky-blue), #4FD1C5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section {
    padding: 5rem 0;
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 4px;
    border: 2px solid var(--sky-blue);
    background: transparent;
    color: var(--sky-blue);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(100, 255, 218, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  /* Smooth Scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection Color */
  ::selection {
    background: var(--sky-blue);
    color: var(--navy-blue);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--navy-blue);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--sky-blue);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4FD1C5;
  }

  /* Focus Styles */
  :focus {
    outline: 2px solid var(--sky-blue);
    outline-offset: 2px;
  }

  /* Loading Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }
`;

export default GlobalStyles; 