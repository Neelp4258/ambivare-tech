import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Vision from './pages/Vision';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileAppDevelopment from './pages/services/MobileAppDevelopment';
import UIDesign from './pages/services/UIDesign';
import DigitalMarketing from './pages/services/DigitalMarketing';
import TechnologyConsulting from './pages/services/TechnologyConsulting';
import RequirementsForm from './pages/RequirementsForm';
import GlobalStyles from './styles/GlobalStyles';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import CookieConsentBanner from './components/CookieConsent';
import styled, { ThemeProvider } from 'styled-components';
import WebsitePricing from './pages/pricing/WebsitePricing';
import AppPricing from './pages/pricing/AppPricing';
import UIDesignPricing from './pages/pricing/UIDesignPricing';
import DigitalMarketingPricing from './pages/pricing/DigitalMarketingPricing';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`;

const theme = {
  background: '#0A192F',
  text: '#64FFDA',
  navyBlue: '#0A192F',
  skyBlue: '#64FFDA',
  lightBlue: '#112240',
  textPrimary: '#64FFDA',
  textSecondary: '#8892B0'
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContainer>
            <GlobalStyles />
            <ParticleBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
              <Route path="/services/ui-design" element={<UIDesign />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/technology-consulting" element={<TechnologyConsulting />} />
              <Route path="/requirements" element={<RequirementsForm />} />
              <Route path="/pricing/website" element={<WebsitePricing />} />
              <Route path="/pricing/app" element={<AppPricing />} />
              <Route path="/pricing/ui-design" element={<UIDesignPricing />} />
              <Route path="/pricing/digital-marketing" element={<DigitalMarketingPricing />} />
            </Routes>
            <Footer />
            <ScrollToTop />
            <CookieConsentBanner />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
