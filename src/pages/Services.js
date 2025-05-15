import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCode, FaMobile, FaPalette, FaChartLine, FaCloud, FaLightbulb } from 'react-icons/fa';

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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--sky-blue);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--sky-blue);
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  color: var(--sky-blue);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "→";
    color: var(--sky-blue);
  }
`;

const ServiceLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--sky-blue);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: var(--text-primary);
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
          <ServiceGrid>
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
                    <Feature key={idx}>{feature}</Feature>
                  ))}
                </ServiceFeatures>
                <ServiceLink to={service.path}>
                  Learn More →
                </ServiceLink>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </Container>
      </Section>
    </ServicesContainer>
  );
};

export default Services; 