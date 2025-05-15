import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 3rem;
  margin-bottom: 3rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--sky-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ContentTitle = styled.h2`
  color: var(--sky-blue);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ContentText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <AboutContainer>
      <Section>
        <Title>About Us</Title>
        
        <ContentCard
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <ContentTitle>Understanding Software Development</ContentTitle>
          <ContentText>
            Software development is the process of creating, designing, deploying, and maintaining software applications. 
            It's a complex journey that involves understanding user needs, designing solutions, writing code, testing, and 
            continuous improvement. In today's digital age, software development is not just about writing code; it's about 
            creating solutions that solve real-world problems, enhance user experiences, and drive business growth.
          </ContentText>
          <ContentText>
            Modern software development encompasses various methodologies, tools, and technologies. From agile development 
            practices to cloud computing, artificial intelligence, and mobile-first approaches, the field is constantly 
            evolving. This evolution enables us to create more sophisticated, scalable, and user-friendly applications 
            that meet the ever-changing needs of businesses and users.
          </ContentText>
        </ContentCard>

        <ContentCard
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <ContentTitle>What We Do</ContentTitle>
          <ContentText>
            At Ambivare Tech, we specialize in delivering cutting-edge software solutions that transform businesses. 
            Our team of expert developers, designers, and strategists work together to create custom software applications 
            that are not just functional but also innovative and future-proof. We understand that every business has unique 
            needs, which is why we take a personalized approach to every project.
          </ContentText>
          <ContentText>
            Our comprehensive services include web development, mobile app development, UI/UX design, digital marketing, 
            and technology consulting. We leverage the latest technologies and best practices to ensure that our solutions 
            are secure, scalable, and performant. Whether you're a startup looking to establish your digital presence or 
            an enterprise seeking to modernize your systems, we have the expertise to help you achieve your goals.
          </ContentText>
        </ContentCard>
      </Section>
    </AboutContainer>
  );
};

export default About; 