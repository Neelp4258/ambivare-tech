import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Stats from '../components/Stats';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(26, 54, 93, 0.9) 100%);
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--sky-blue), #4FD1C5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(100, 255, 218, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const PlanNote = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 1rem;
  font-style: italic;
  opacity: 0.8;
`;

const Section = styled.section`
  padding: 8rem 0;
  background: var(--light-blue);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--sky-blue), transparent);
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-align: center;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--sky-blue), transparent);
  }

  &:hover {
    transform: translateY(-10px);
    border-color: var(--sky-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  color: var(--sky-blue);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleGetStarted = () => {
    navigate('/requirements');
  };

  return (
    <HomeContainer>
      <Hero>
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Ambivare Tech</Title>
          <Subtitle>Transforming Ideas into Digital Excellence</Subtitle>
          <motion.button
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
          >
            Start Your Project
          </motion.button>
          <PlanNote>The website you are viewing represents our basic plan.</PlanNote>
        </HeroContent>
      </Hero>

      <Section id="what-we-do">
        <SectionTitle>What We Do</SectionTitle>
        <Grid>
          {[
            {
              title: 'Web Development',
              text: 'We create stunning, high-performance websites and web applications using cutting-edge technologies. Our solutions are scalable, secure, and optimized for the best user experience.'
            },
            {
              title: 'App Development',
              text: 'From concept to deployment, we build native and cross-platform mobile applications that deliver exceptional user experiences. Our apps are designed to be intuitive, fast, and feature-rich.'
            },
            {
              title: 'Digital Solutions',
              text: 'We provide end-to-end digital transformation services, helping businesses leverage technology to achieve their goals. Our solutions drive growth, efficiency, and innovation.'
            }
          ].map((item, index) => (
            <Card
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>

      <Stats />

      <Section id="why-choose-us">
        <SectionTitle>Why Choose Us</SectionTitle>
        <Grid>
          {[
            {
              title: 'Expert Team',
              text: 'Our team consists of highly skilled professionals with extensive experience in various technologies. We stay updated with the latest trends and best practices to deliver exceptional results.'
            },
            {
              title: 'Innovation',
              text: 'We embrace innovation and creativity in everything we do. Our solutions are designed to be future-proof, incorporating the latest technologies and methodologies.'
            },
            {
              title: 'Quality Assurance',
              text: 'We maintain the highest standards of quality through rigorous testing and quality control processes. Every project undergoes thorough testing to ensure flawless performance.'
            },
            {
              title: 'Client-Centric Approach',
              text: "We prioritize our clients' needs and work closely with them throughout the project lifecycle. Our transparent communication ensures that your vision is perfectly realized."
            }
          ].map((item, index) => (
            <Card
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>

      <Testimonials />

      <Section id="case-studies">
        <SectionTitle>Case Studies</SectionTitle>
        <Grid>
          {[
            {
              title: 'E-commerce Platform',
              text: 'Developed a scalable e-commerce solution for a retail giant, resulting in a 200% increase in online sales and improved customer satisfaction through enhanced user experience.'
            },
            {
              title: 'Healthcare App',
              text: 'Created a comprehensive patient management system that streamlined healthcare operations, reduced administrative workload by 40%, and improved patient care coordination.'
            },
            {
              title: 'FinTech Solution',
              text: 'Built a secure financial transaction platform that processed over $1M in daily transactions while maintaining 99.99% uptime and implementing advanced security measures.'
            },
            {
              title: 'Educational Platform',
              text: 'Developed an interactive learning platform that increased student engagement by 150% and improved learning outcomes through personalized content delivery.'
            }
          ].map((item, index) => (
            <Card
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>
    </HomeContainer>
  );
};

export default Home; 