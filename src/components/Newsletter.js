import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const NewsletterSection = styled.section`
  padding: 6rem 0;
  background: var(--navy-blue);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--sky-blue);
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid rgba(100, 255, 218, 0.1);
  border-radius: 4px;
  background: rgba(17, 34, 64, 0.7);
  color: var(--text-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--sky-blue);
  color: var(--navy-blue);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Message = styled(motion.p)`
  margin-top: 1rem;
  color: ${props => props.success ? 'var(--sky-blue)' : '#ff6b6b'};
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    // For now, we'll just show a success message
    setMessage('Thank you for subscribing to our newsletter!');
    setIsSuccess(true);
    setEmail('');
  };

  return (
    <NewsletterSection>
      <Container>
        <Title>Stay Updated</Title>
        <Subtitle>
          Subscribe to our newsletter to receive the latest updates, news, and insights
          about technology and digital solutions.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            Subscribe
          </SubmitButton>
        </Form>
        {message && (
          <Message
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            success={isSuccess}
          >
            {message}
          </Message>
        )}
      </Container>
    </NewsletterSection>
  );
};

export default Newsletter; 