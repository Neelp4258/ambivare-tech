import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const PricingContainer = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PricingTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 20px;
`;

const PricingSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const PricingGrid = styled.div`
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

const PricingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;

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

const ServiceName = styled.h3`
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

const ViewPricingButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: var(--sky-blue);
  border: 1px solid var(--sky-blue);
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      name: "Website Development",
      description: "Professional website development services with responsive design and modern features.",
      icon: "🌐",
      link: "/pricing/website"
    },
    {
      name: "App Development",
      description: "Custom mobile and web application development for iOS, Android, and cross-platform solutions.",
      icon: "📱",
      link: "/pricing/app"
    },
    {
      name: "UI/UX Design",
      description: "Creative and user-centered design solutions for websites and applications.",
      icon: "🎨",
      link: "/pricing/ui-design"
    },
    {
      name: "Digital Marketing",
      description: "Comprehensive digital marketing services to grow your online presence and reach.",
      icon: "📈",
      link: "/pricing/digital-marketing"
    }
  ];

  return (
    <PricingContainer>
      <PricingHeader>
        <PricingTitle>Our Services & Pricing</PricingTitle>
        <PricingSubtitle>
          Explore our comprehensive range of services and find the perfect solution for your business needs.
        </PricingSubtitle>
      </PricingHeader>

      <PricingGrid ref={ref}>
        {services.map((service, index) => (
          <PricingCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceName>{service.name}</ServiceName>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ViewPricingButton to={service.link}>
              View Pricing
            </ViewPricingButton>
          </PricingCard>
        ))}
      </PricingGrid>
    </PricingContainer>
  );
};

export default Pricing; 