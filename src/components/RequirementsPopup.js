import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
`;

const PopupContainer = styled(motion.div)`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  position: relative;
  border: 1px solid var(--sky-blue);
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
  margin: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--sky-blue);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  background: #2a2a2a;
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  background: #2a2a2a;
  color: var(--text-primary);
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--sky-blue);
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--sky-blue);
  color: var(--navy-blue);
  border: none;
  padding: 1rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.4);
  }
`;

const RequirementsPopup = ({ isOpen, onClose, serviceType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: '',
    budget: '',
    timeline: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <PopupContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <h2 style={{ color: 'var(--sky-blue)', marginBottom: '1.5rem' }}>
              Tell us about your {serviceType} requirements
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="requirements">Project Requirements</Label>
                <TextArea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Input
                  type="text"
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Requirements
              </SubmitButton>
            </Form>
          </PopupContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default RequirementsPopup; 