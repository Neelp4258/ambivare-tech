import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCode, FaMobile, FaPalette, FaChartLine, FaLightbulb } from 'react-icons/fa';

const ServicesContainer = styled.div`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
    border-color: var(--sky-blue);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: var(--sky-blue);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ServiceFeature = styled.li`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '▹';
    color: var(--sky-blue);
    font-size: 1.2rem;
  }
`;

const ServiceButton = styled(motion.button)`
  background: transparent;
  color: var(--sky-blue);
  border: 1px solid var(--sky-blue);
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const Services = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'E-commerce Solutions',
        'Content Management Systems'
      ],
      icon: <FaCode />,
      path: '/services/web-development'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'iOS Development',
        'Android Development',
        'Cross-platform Solutions',
        'App Store Optimization'
      ],
      icon: <FaMobile />,
      path: '/services/mobile-app-development'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience.',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Visual Design'
      ],
      icon: <FaPalette />,
      path: '/services/ui-design'
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your business.',
      features: [
        'SEO Optimization',
        'Social Media Marketing',
        'Content Marketing',
        'Analytics & Reporting'
      ],
      icon: <FaChartLine />,
      path: '/services/digital-marketing'
    },
    {
      title: 'Technology Consulting',
      description: 'Expert technology consulting to guide your digital transformation.',
      features: [
        'Technology Assessment',
        'Digital Strategy',
        'Process Optimization',
        'Security Audits'
      ],
      icon: <FaLightbulb />,
      path: '/services/technology-consulting'
    }
  ];

  return (
    <ServicesContainer>
      <Section>
        <Container>
          <Title>Our Services</Title>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature, idx) => (
                    <ServiceFeature key={idx}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
                <ServiceButton>
                  Learn More →
                </ServiceButton>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </Section>
    </ServicesContainer>
  );
};

export default Services; 