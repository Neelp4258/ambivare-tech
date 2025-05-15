import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CookieConsent from 'react-cookie-consent';

const StyledCookieConsent = styled(CookieConsent)`
  background: var(--navy-blue) !important;
  color: var(--text-secondary) !important;
  font-size: 1rem !important;
  padding: 1rem 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 1rem !important;
  border-top: 1px solid var(--sky-blue) !important;
`;

const Button = styled(motion.button)`
  background: var(--sky-blue) !important;
  color: var(--navy-blue) !important;
  border: none !important;
  padding: 0.5rem 1.5rem !important;
  border-radius: 4px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
  }
`;

const CookieConsentBanner = () => {
  return (
    <StyledCookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="ambivare-cookie-consent"
      style={{ background: 'var(--navy-blue)' }}
      buttonStyle={{
        background: 'var(--sky-blue)',
        color: 'var(--navy-blue)',
        fontSize: '1rem',
        padding: '0.5rem 1.5rem',
        borderRadius: '4px',
        fontWeight: '600',
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. By continuing to browse this site, you agree to our use of cookies.
    </StyledCookieConsent>
  );
};

export default CookieConsentBanner; 