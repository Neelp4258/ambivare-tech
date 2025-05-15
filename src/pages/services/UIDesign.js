import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaPalette, FaUsers, FaMobile, FaDesktop, FaChartLine, FaLightbulb, FaCode, FaRocket } from 'react-icons/fa';

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
  text-align: center;
`;

const ProcessTitle = styled.h2`
  font-size: 2.5rem;
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
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -1rem;
    width: 2rem;
    height: 2px;
    background: var(--sky-blue);
    display: none;
  }

  @media (min-width: 768px) {
    &::before {
      display: block;
    }
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
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 auto 1rem;
`;

const StepTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
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

const UIDesign = () => {
  const features = [
    {
      icon: <FaPalette />,
      title: 'Creative Design',
      description: 'Unique and engaging visual designs that capture attention and communicate your brand message.'
    },
    {
      icon: <FaUsers />,
      title: 'User Research',
      description: 'In-depth user research to understand your target audience and their needs.'
    },
    {
      icon: <FaMobile />,
      title: 'Responsive Design',
      description: 'Seamless experiences across all devices and screen sizes.'
    },
    {
      icon: <FaChartLine />,
      title: 'Conversion Focus',
      description: 'Design strategies that drive user engagement and increase conversion rates.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'Cutting-edge design solutions that set you apart from competitors.'
    },
    {
      icon: <FaRocket />,
      title: 'Rapid Prototyping',
      description: 'Quick iteration and testing of design concepts to ensure optimal results.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding your business goals, target audience, and project requirements.'
    },
    {
      number: '02',
      title: 'Research',
      description: 'Conducting user research, competitor analysis, and market trends study.'
    },
    {
      number: '03',
      title: 'Design',
      description: 'Creating wireframes, mockups, and interactive prototypes.'
    },
    {
      number: '04',
      title: 'Testing',
      description: 'User testing and feedback collection to refine the design.'
    },
    {
      number: '05',
      title: 'Delivery',
      description: 'Final design assets and documentation for implementation.'
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
          <Title>UI/UX Design</Title>
          <Subtitle>
            Create exceptional digital experiences with our comprehensive UI/UX design services. 
            We combine creativity with user-centered design principles to deliver engaging and 
            effective solutions.
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
          <ProcessTitle>Our Design Process</ProcessTitle>
          <ProcessSteps>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
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

export default UIDesign; 