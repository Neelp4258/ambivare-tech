import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const VisionContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 0;
  background: var(--navy-blue);
`;

const Section = styled.section`
  max-width: 1200px;
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

const ManagementCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const ManagementTitle = styled.h2`
  color: var(--sky-blue);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ManagementText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(motion.a)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--sky-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const Vision = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const services = [
    {
      title: 'HR Recruitment Services',
      description: 'Professional recruitment solutions for your business needs',
      link: 'https://www.dazzlo.co.in'
    },
    {
      title: 'SAAS Services',
      description: 'Cloud-based software solutions for modern businesses',
      link: 'https://www.dazzlo.co.in'
    },
    {
      title: 'Web Development',
      description: 'Custom web solutions tailored to your requirements',
      link: 'https://www.dazzlo.co.in'
    },
    {
      title: 'Infrastructure',
      description: 'Comprehensive IT infrastructure solutions',
      link: 'https://www.dazzlo.co.in'
    }
  ];

  return (
    <VisionContainer>
      <Section>
        <Title>Our Management</Title>
        
        <ManagementCard
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <ManagementTitle>Managed by Dazzlo Enterprises Pvt Ltd</ManagementTitle>
          <ManagementText>
            We are proud to be managed by Dazzlo Enterprises Pvt Ltd, a leading provider of comprehensive business solutions. 
            Their expertise and guidance help us deliver exceptional services to our clients.
          </ManagementText>
        </ManagementCard>

        <Title>Other Services by Dazzlo</Title>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeInUp}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>
    </VisionContainer>
  );
};

export default Vision; 