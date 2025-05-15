import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RequirementsPopup from '../../components/RequirementsPopup';

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

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PricingCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanName = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 15px;
`;

const Price = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: bold;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const Feature = styled.li`
  padding: 10px 0;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:before {
    content: "✓";
    color: var(--primary-color);
    font-weight: bold;
  }
`;

const CTAButton = styled(motion.button)`
  background: var(--sky-blue);
  color: var(--navy-blue);
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const UIUXPricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleGetStarted = (planName) => {
    setSelectedPlan(planName);
    setIsPopupOpen(true);
  };

  const plans = [
    {
      name: "Basic Design",
      price: "₹25,000",
      features: [
        "5 Pages Design",
        "Mobile Responsive",
        "Basic Wireframes",
        "Color Scheme",
        "Typography",
        "2 Revisions"
      ]
    },
    {
      name: "Professional Design",
      price: "₹50,000",
      features: [
        "10 Pages Design",
        "Mobile Responsive",
        "Detailed Wireframes",
        "Custom Color Scheme",
        "Typography System",
        "Icon Design",
        "3 Revisions",
        "Design System"
      ]
    },
    {
      name: "Enterprise Design",
      price: "₹1,00,000",
      features: [
        "Unlimited Pages",
        "Mobile Responsive",
        "Advanced Wireframes",
        "Custom Design System",
        "Animation Guidelines",
        "Interactive Prototypes",
        "5 Revisions",
        "Design Documentation"
      ]
    }
  ];

  return (
    <PricingContainer>
      <PricingHeader>
        <PricingTitle>UI/UX Design Pricing</PricingTitle>
        <PricingSubtitle>
          Choose the perfect plan for your design needs. All plans include modern design principles and user-centered approach.
        </PricingSubtitle>
      </PricingHeader>

      <PricingGrid ref={ref}>
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <PlanName>{plan.name}</PlanName>
            <Price>{plan.price}</Price>
            <FeaturesList>
              {plan.features.map((feature, idx) => (
                <Feature key={idx}>{feature}</Feature>
              ))}
            </FeaturesList>
            <CTAButton
              onClick={() => handleGetStarted(plan.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </CTAButton>
          </PricingCard>
        ))}
      </PricingGrid>

      <RequirementsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        serviceType={`${selectedPlan} UI/UX Design`}
      />
    </PricingContainer>
  );
};

export default UIUXPricing; 