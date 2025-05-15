import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCode, FaMobile, FaSearch, FaServer, FaShieldAlt, FaRocket } from 'react-icons/fa';

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

const ProcessSection = styled.div`
  margin-top: 6rem;
`;

const ProcessTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: var(--sky-blue);
  margin-bottom: 3rem;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProcessStep = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -2rem;
    width: 2rem;
    height: 2px;
    background: var(--sky-blue);
    display: ${props => props.last ? 'none' : 'block'};
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: var(--sky-blue);
  color: var(--navy-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
`;

const StepTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
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

const WebDevelopment = () => {
  const features = [
    {
      icon: <FaCode />,
      title: 'Custom Web Development',
      description: 'Tailored web solutions built with cutting-edge technologies to meet your specific business needs.'
    },
    {
      icon: <FaMobile />,
      title: 'Responsive Design',
      description: 'Mobile-first approach ensuring your website looks and functions perfectly across all devices.'
    },
    {
      icon: <FaSearch />,
      title: 'SEO Optimization',
      description: 'Built-in search engine optimization to improve your website\'s visibility and ranking.'
    },
    {
      icon: <FaServer />,
      title: 'Performance Optimization',
      description: 'Fast loading times and optimal performance through advanced optimization techniques.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security Implementation',
      description: 'Robust security measures to protect your website and user data from potential threats.'
    },
    {
      icon: <FaRocket />,
      title: 'Scalable Solutions',
      description: 'Future-proof architecture that grows with your business needs.'
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Discovery & Planning',
      description: 'Understanding your requirements and creating a detailed project roadmap.'
    },
    {
      number: '2',
      title: 'Design & Prototyping',
      description: 'Creating wireframes and visual designs that align with your brand.'
    },
    {
      number: '3',
      title: 'Development',
      description: 'Building your website using modern technologies and best practices.'
    },
    {
      number: '4',
      title: 'Testing & Quality Assurance',
      description: 'Thorough testing to ensure everything works perfectly.'
    },
    {
      number: '5',
      title: 'Launch & Support',
      description: 'Deploying your website and providing ongoing maintenance and support.'
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
          <Title>Web Development</Title>
          <Subtitle>
            Transform your digital presence with our expert web development services. 
            We create stunning, high-performance websites that drive results and deliver 
            exceptional user experiences.
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

        <ProcessSection>
          <ProcessTitle>Our Development Process</ProcessTitle>
          <ProcessSteps>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                last={index === processSteps.length - 1}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessSection>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Start Your Project
        </CTAButton>
      </Section>
    </ServiceContainer>
  );
};

export default WebDevelopment; 