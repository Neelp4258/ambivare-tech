import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = styled.section`
  padding: 6rem 0;
  background: var(--navy-blue);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
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
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StatCard = styled(motion.div)`
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

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--sky-blue);
  margin-bottom: 1rem;
`;

const StatLabel = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { number: 100, label: 'Projects Completed', suffix: '+' },
    { number: 50, label: 'Happy Clients', suffix: '+' },
    { number: 12, label: 'Team Members', suffix: '+' }
  ];

  return (
    <StatsSection>
      <Container>
        <Title>Our Impact</Title>
        <StatsGrid ref={ref}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <StatNumber>
                {inView && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats; 