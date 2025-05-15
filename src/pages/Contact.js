import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const Section = styled.section`
  padding: 5rem 0;
  background: var(--light-blue);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--sky-blue);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  color: var(--text-secondary);
`;

const InfoTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const ContactDetails = styled.div`
  margin-top: 2rem;
`;

const Form = styled.form`
  background: rgba(17, 34, 64, 0.7);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  color: var(--text-primary);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'web-development'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <ContactContainer>
      <Section>
        <Container>
          <Title>Get in Touch</Title>
          <ContactGrid>
            <motion.div {...fadeInUp}>
              <ContactInfo>
                <InfoTitle>Let's Discuss Your Project</InfoTitle>
                <InfoText>
                  Ready to transform your ideas into reality? We're here to help you achieve your digital goals. 
                  Whether you need a new website, mobile app, or digital strategy, our team of experts is ready to assist you.
                </InfoText>
                <ContactDetails>
                  <h3>Get in Touch</h3>
                  <p>
                    <span>📞</span> +91 9373015503
                  </p>
                  <p>
                    <span>✉️</span> contact@ambivare.com
                  </p>
                  <p>
                    <span>📍</span> Mumbai, Maharashtra
                  </p>
                </ContactDetails>
              </ContactInfo>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="service">Service Interested In</Label>
                  <Input
                    as="select"
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="web-development">Web Development</option>
                    <option value="app-development">App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="cloud-solutions">Cloud Solutions</option>
                    <option value="consulting">Technology Consulting</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Project Details</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    required
                  />
                </FormGroup>

                <motion.button
                  className="btn"
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Free Consultation
                </motion.button>
              </Form>
            </motion.div>
          </ContactGrid>
        </Container>
      </Section>
    </ContactContainer>
  );
};

export default Contact; 