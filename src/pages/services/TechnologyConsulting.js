import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaLightbulb, FaChartLine, FaUsers, FaCogs, FaShieldAlt, FaRocket, FaCode, FaChartBar } from 'react-icons/fa';

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

const SolutionsSection = styled.div`
  margin-top: 6rem;
  text-align: center;
`;

const SolutionsTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--sky-blue);
  margin-bottom: 3rem;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SolutionCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
`;

const SolutionIcon = styled.div`
  font-size: 3rem;
  color: var(--sky-blue);
  margin-bottom: 1.5rem;
`;

const SolutionTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const SolutionDescription = styled.p`
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

const TechnologyConsulting = () => {
  const features = [
    {
      icon: <FaLightbulb />,
      title: 'Strategic Planning',
      description: 'Comprehensive technology roadmaps aligned with your business objectives.'
    },
    {
      icon: <FaChartLine />,
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation strategies to modernize your business.'
    },
    {
      icon: <FaUsers />,
      title: 'Team Training',
      description: 'Expert training and knowledge transfer to empower your team.'
    },
    {
      icon: <FaCogs />,
      title: 'Process Optimization',
      description: 'Streamline operations and improve efficiency through technology.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security Assessment',
      description: 'Comprehensive security audits and risk management strategies.'
    },
    {
      icon: <FaChartBar />,
      title: 'Performance Analytics',
      description: 'Data-driven insights to optimize your technology investments.'
    }
  ];

  const solutions = [
    {
      icon: <FaRocket />,
      title: 'Digital Strategy',
      description: 'Develop and implement digital strategies that drive business growth and innovation.'
    },
    {
      icon: <FaCode />,
      title: 'Technology Stack',
      description: 'Select and implement the right technology stack for your business needs.'
    },
    {
      icon: <FaUsers />,
      title: 'Team Augmentation',
      description: 'Enhance your team with expert consultants and specialized skills.'
    },
    {
      icon: <FaChartLine />,
      title: 'Business Intelligence',
      description: 'Leverage data analytics to make informed business decisions.'
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
          <Title>Technology Consulting</Title>
          <Subtitle>
            Transform your business with expert technology consulting services. We help you 
            navigate the digital landscape, optimize operations, and implement innovative 
            solutions that drive growth and success.
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

        <SolutionsSection>
          <SolutionsTitle>Our Consulting Solutions</SolutionsTitle>
          <SolutionsGrid>
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <SolutionIcon>{solution.icon}</SolutionIcon>
                <SolutionTitle>{solution.title}</SolutionTitle>
                <SolutionDescription>{solution.description}</SolutionDescription>
              </SolutionCard>
            ))}
          </SolutionsGrid>
        </SolutionsSection>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Schedule Consultation
        </CTAButton>
      </Section>
    </ServiceContainer>
  );
};

export default TechnologyConsulting; 