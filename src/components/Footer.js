import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import Newsletter from './Newsletter';

const FooterContainer = styled.footer`
  background: var(--navy-blue);
  padding: 4rem 0 2rem;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: var(--sky-blue);
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: var(--text-secondary);
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--sky-blue);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: var(--text-secondary);
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Ambivare Tech</FooterTitle>
          <p style={{ color: 'var(--text-secondary)' }}>
            Transforming ideas into digital excellence through innovative solutions
            and cutting-edge technology.
          </p>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/vision">Vision</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/services/web-development">Web Development</FooterLink>
          <FooterLink to="/services/mobile-app-development">Mobile App Development</FooterLink>
          <FooterLink to="/services/ui-design">UI/UX Design</FooterLink>
          <FooterLink to="/services/digital-marketing">Digital Marketing</FooterLink>
          <FooterLink to="/services/technology-consulting">Technology Consulting</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <p style={{ color: 'var(--text-secondary)' }}>
            Email: contact@ambivare.com<br />
            Phone: +91 9373015503<br />
            Address: Mumbai, Maharashtra
          </p>
        </FooterSection>
      </FooterContent>

      <Newsletter />

      <Copyright>
        © {new Date().getFullYear()} Ambivare Tech. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 