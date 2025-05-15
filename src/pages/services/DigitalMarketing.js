import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaChartLine, FaSearch, FaShareAlt, FaBullhorn, FaEnvelope, FaUsers, FaChartBar, FaRocket } from 'react-icons/fa';

const ServiceContainer = styled.div`
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
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 2rem;
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

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.8;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--sky-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--sky-blue);
`;

const FeatureTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ServicesSection = styled.div`
  margin-top: 6rem;
  text-align: center;
`;

const ServicesTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--sky-blue);
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: var(--sky-blue);
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  background: var(--sky-blue);
  color: var(--navy-blue);
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: block;
  margin: 4rem auto 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PlanNote = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 1rem;
  font-style: italic;
`;

const DigitalMarketing = () => {
  const features = [
    {
      icon: <FaChartLine />,
      title: 'Data-Driven Strategy',
      description: 'Results-oriented marketing strategies based on comprehensive data analysis and market research.'
    },
    {
      icon: <FaSearch />,
      title: 'SEO Optimization',
      description: 'Advanced search engine optimization to improve your online visibility and organic traffic.'
    },
    {
      icon: <FaShareAlt />,
      title: 'Social Media Marketing',
      description: 'Engaging social media campaigns that build brand awareness and foster community growth.'
    },
    {
      icon: <FaBullhorn />,
      title: 'Content Marketing',
      description: 'Compelling content creation that resonates with your target audience and drives engagement.'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Marketing',
      description: 'Strategic email campaigns that nurture leads and drive conversions.'
    },
    {
      icon: <FaChartBar />,
      title: 'Analytics & Reporting',
      description: 'Comprehensive tracking and reporting to measure campaign performance and ROI.'
    }
  ];

  const services = [
    {
      icon: <FaSearch />,
      title: 'Search Engine Optimization',
      description: 'Improve your website\'s visibility in search results and drive organic traffic.'
    },
    {
      icon: <FaShareAlt />,
      title: 'Social Media Management',
      description: 'Build and maintain a strong social media presence across all platforms.'
    },
    {
      icon: <FaBullhorn />,
      title: 'Content Strategy',
      description: 'Create and distribute valuable content that attracts and engages your target audience.'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Marketing',
      description: 'Design and execute effective email campaigns that convert subscribers into customers.'
    }
  ];

  return (
    <ServiceContainer>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Digital Marketing</Title>
          <Subtitle>
            Drive your business growth with our comprehensive digital marketing services. 
            We combine data-driven strategies with creative solutions to help you reach 
            your target audience and achieve your business goals.
          </Subtitle>
        </motion.div>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <ServicesSection>
          <ServicesTitle>Our Marketing Services</ServicesTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesSection>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Start Your Campaign
        </CTAButton>
        <PlanNote>The website you are viewing represents our basic plan.</PlanNote>
      </Section>
    </ServiceContainer>
  );
};

export default DigitalMarketing; 