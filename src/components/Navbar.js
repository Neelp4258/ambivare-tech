import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--sky-blue);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
`;

const LogoImage = styled.img`
  height: 65px;
  width: auto;
  margin-right: 0.75rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(RouterLink)`
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: relative;

  &:hover {
    color: var(--sky-blue);
  }

  &:focus {
    outline: none;
  }

  &.active {
    color: var(--sky-blue);
    text-shadow: 0 0 8px rgba(100, 255, 218, 0.5);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--sky-blue);
      box-shadow: 0 0 8px var(--sky-blue);
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav
      style={{
        boxShadow: scrolled ? '0 10px 30px -10px rgba(2,12,27,0.7)' : 'none',
      }}
    >
      <NavContainer>
        <Logo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoImage src="/logo.png" alt="Ambivare Tech Logo" />
          <NavLink to="/">Ambivare Tech</NavLink>
        </Logo>
        <NavLinks>
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Vision', path: '/vision' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.name}
            </NavLink>
          ))}
        </NavLinks>
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 