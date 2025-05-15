import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRocket, FaLightbulb, FaUsers, FaCode } from 'react-icons/fa';

const TestimonialsSection = styled.section`
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.8;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: var(--sky-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--sky-blue);
`;

const CardTitle = styled.h3`
  color: var(--sky-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: center;
`;

const Testimonials = () => {
  const reasons = [
    {
      icon: <FaRocket />,
      title: "Innovative Solutions",
      text: "Our young team brings fresh perspectives and cutting-edge ideas to every project, ensuring innovative solutions that stand out in the market."
    },
    {
      icon: <FaLightbulb />,
      title: "Creative Excellence",
      text: "With a team of young, creative minds, we deliver exceptional designs and solutions that push boundaries and exceed expectations."
    },
    {
      icon: <FaUsers />,
      title: "Dynamic Collaboration",
      text: "Our youthful energy and collaborative approach ensure seamless communication and efficient project delivery, making the development process enjoyable and productive."
    },
    {
      icon: <FaCode />,
      title: "Technical Expertise",
      text: "Despite our young age, our team possesses deep technical knowledge and stays ahead of the latest technologies, delivering robust and future-proof solutions."
    }
  ];

  return (
    <TestimonialsSection>
      <Container>
        <Title>Why Our Clients Choose Us</Title>
        <Subtitle>
          Our young, dynamic team combines creativity with technical expertise to deliver 
          exceptional solutions that drive business growth and innovation.
        </Subtitle>
        <TestimonialsGrid>
          {reasons.map((reason, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <IconWrapper>{reason.icon}</IconWrapper>
              <CardTitle>{reason.title}</CardTitle>
              <CardText>{reason.text}</CardText>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials; 