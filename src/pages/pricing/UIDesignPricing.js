import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  }
`;

const CTAButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-color-dark);
  }
`;

const UIDesignPricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Basic UI Design",
      price: "₹15,000",
      features: [
        "5-7 Page Designs",
        "Mobile Responsive Design",
        "Basic Color Scheme",
        "Typography Selection",
        "Basic Icon Set",
        "1 Round of Revisions",
        "Source Files Delivery",
        "Basic Design Guidelines"
      ]
    },
    {
      name: "Professional UI/UX Design",
      price: "₹35,000",
      features: [
        "10-15 Page Designs",
        "Mobile & Tablet Responsive",
        "Custom Color Palette",
        "Custom Typography",
        "Custom Icon Design",
        "User Flow Diagrams",
        "Wireframing",
        "2 Rounds of Revisions",
        "Interactive Prototypes",
        "Design System Creation"
      ]
    },
    {
      name: "Enterprise UI/UX Design",
      price: "₹75,000",
      features: [
        "Unlimited Pages",
        "Full Responsive Design",
        "Custom Design System",
        "Advanced Prototyping",
        "User Research",
        "Usability Testing",
        "Accessibility Compliance",
        "Animation Guidelines",
        "3 Rounds of Revisions",
        "Design Documentation",
        "Design Handoff Support"
      ]
    }
  ];

  return (
    <PricingContainer>
      <PricingHeader>
        <PricingTitle>UI/UX Design Pricing</PricingTitle>
        <PricingSubtitle>
          Choose the perfect design package for your project. All plans include modern design principles and best practices.
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
            <CTAButton onClick={() => window.location.href = '/contact'}>
              Get Started
            </CTAButton>
          </PricingCard>
        ))}
      </PricingGrid>
    </PricingContainer>
  );
};

export default UIDesignPricing; 