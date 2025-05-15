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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ServiceCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const ServiceName = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 25px;
  line-height: 1.6;
`;

const ViewPricingButton = styled(Link)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-color-dark);
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

      <ServiceGrid ref={ref}>
        {services.map((service, index) => (
          <ServiceCard
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
          </ServiceCard>
        ))}
      </ServiceGrid>
    </PricingContainer>
  );
};

export default Pricing; 