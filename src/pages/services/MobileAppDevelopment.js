import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaMobile, FaAndroid, FaApple, FaCode, FaUsers, FaChartLine, FaShieldAlt, FaRocket } from 'react-icons/fa';

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

const PlatformsSection = styled.div`
  margin-top: 6rem;
  text-align: center;
`;

const PlatformsTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--sky-blue);
  margin-bottom: 3rem;
`;

const PlatformsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PlatformCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
`;

const PlatformIcon = styled.div`
  font-size: 3rem;
  color: var(--sky-blue);
  margin-bottom: 1.5rem;
`;

const PlatformTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const PlatformDescription = styled.p`
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

const MobileAppDevelopment = () => {
  const features = [
    {
      icon: <FaMobile />,
      title: 'Native & Cross-Platform',
      description: 'Development for both iOS and Android platforms using native and cross-platform technologies.'
    },
    {
      icon: <FaUsers />,
      title: 'User-Centric Design',
      description: 'Intuitive and engaging user interfaces that provide exceptional user experiences.'
    },
    {
      icon: <FaChartLine />,
      title: 'Performance Optimization',
      description: 'Optimized app performance for smooth operation and minimal resource usage.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security & Privacy',
      description: 'Robust security measures to protect user data and ensure privacy compliance.'
    },
    {
      icon: <FaCode />,
      title: 'Modern Technologies',
      description: 'Utilizing the latest frameworks and tools for cutting-edge mobile solutions.'
    },
    {
      icon: <FaRocket />,
      title: 'Scalable Architecture',
      description: 'Future-proof architecture that can grow with your business needs.'
    }
  ];

  const platforms = [
    {
      icon: <FaApple />,
      title: 'iOS Development',
      description: 'Native iOS app development using Swift and SwiftUI, following Apple\'s design guidelines and best practices.'
    },
    {
      icon: <FaAndroid />,
      title: 'Android Development',
      description: 'Native Android app development using Kotlin and Jetpack Compose, ensuring optimal performance and user experience.'
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
          <Title>Mobile App Development</Title>
          <Subtitle>
            Transform your ideas into powerful mobile applications. We create native and 
            cross-platform mobile apps that deliver exceptional user experiences and drive 
            business growth.
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

        <PlatformsSection>
          <PlatformsTitle>Our Development Platforms</PlatformsTitle>
          <PlatformsGrid>
            {platforms.map((platform, index) => (
              <PlatformCard
                key={platform.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <PlatformIcon>{platform.icon}</PlatformIcon>
                <PlatformTitle>{platform.title}</PlatformTitle>
                <PlatformDescription>{platform.description}</PlatformDescription>
              </PlatformCard>
            ))}
          </PlatformsGrid>
        </PlatformsSection>

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

export default MobileAppDevelopment; 