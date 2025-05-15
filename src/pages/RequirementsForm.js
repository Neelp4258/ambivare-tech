import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FormContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 0;
  background: var(--navy-blue);
`;

const Section = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--sky-blue);
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--sky-blue);
  }
`;

const Form = styled.form`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 3rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  color: var(--sky-blue);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  background: rgba(17, 34, 64, 0.5);
  color: var(--text-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  background: rgba(17, 34, 64, 0.5);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  background: rgba(17, 34, 64, 0.5);
  color: var(--text-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--sky-blue);
  color: var(--navy-blue);
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0;
  width: 200px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const RequirementsForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    websiteType: '',
    services: '',
    products: '',
    content: '',
    pages: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission
    console.log('Form submitted:', formData);
    // Redirect to contact page or show success message
    window.location.href = '/contact';
  };

  return (
    <FormContainer>
      <Section>
        <Title>Tell Us About Your Project</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Type of Website</Label>
            <Select
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              required
            >
              <option value="">Select website type</option>
              <option value="business">Business Website</option>
              <option value="ecommerce">E-commerce Website</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="blog">Blog</option>
              <option value="landing">Landing Page</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Services Offered</Label>
            <TextArea
              name="services"
              value={formData.services}
              onChange={handleChange}
              required
              placeholder="Describe the services your company offers"
            />
          </FormGroup>

          <FormGroup>
            <Label>Products (if any)</Label>
            <TextArea
              name="products"
              value={formData.products}
              onChange={handleChange}
              placeholder="List your products or leave blank if not applicable"
            />
          </FormGroup>

          <FormGroup>
            <Label>Desired Content</Label>
            <TextArea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Describe what content you want on your website"
            />
          </FormGroup>

          <FormGroup>
            <Label>Number of Pages</Label>
            <Select
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required
            >
              <option value="">Select number of pages</option>
              <option value="1-5">1-5 Pages</option>
              <option value="6-10">6-10 Pages</option>
              <option value="11-15">11-15 Pages</option>
              <option value="15+">15+ Pages</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Additional Information</Label>
            <TextArea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any other details you'd like to share about your project"
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Requirements
          </SubmitButton>
        </Form>
      </Section>
    </FormContainer>
  );
};

export default RequirementsForm; 