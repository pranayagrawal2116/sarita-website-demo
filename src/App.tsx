import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/ui/Toast';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductHealthcarePage } from './pages/ProductHealthcarePage';
import { ProductNimblePage } from './pages/ProductNimblePage';
import { ProductBankWarePage } from './pages/ProductBankWarePage';
import { ProductRetailPage } from './pages/ProductRetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceCustomDevPage } from './pages/ServiceCustomDevPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryHealthcarePage } from './pages/IndustryHealthcarePage';
import { IndustryTradePage } from './pages/IndustryTradePage';
import { IndustryBankingPage } from './pages/IndustryBankingPage';
import { IndustryRetailPage } from './pages/IndustryRetailPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { RequestDemoPage } from './pages/RequestDemoPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Customer Support Portal
import { SupportLandingPage } from './pages/SupportLandingPage';
import { RaiseTicketPage } from './pages/RaiseTicketPage';
import { TrackTicketPage } from './pages/TrackTicketPage';
import { TicketDetailsPage } from './pages/TicketDetailsPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { KnowledgeArticlePage } from './pages/KnowledgeArticlePage';
import { AgentDashboardPage } from './pages/AgentDashboardPage';

// B2B Partner Portal
import { PartnerLandingPage } from './pages/PartnerLandingPage';
import { PartnerLoginPage } from './pages/PartnerLoginPage';
import { PartnerRequestAccessPage } from './pages/PartnerRequestAccessPage';
import { PartnerDashboardPage } from './pages/PartnerDashboardPage';
import { PartnerLeadsPage } from './pages/PartnerLeadsPage';
import { PartnerNewLeadPage } from './pages/PartnerNewLeadPage';
import { PartnerOpportunitiesPage } from './pages/PartnerOpportunitiesPage';
import { PartnerResourcesPage } from './pages/PartnerResourcesPage';
import { PartnerProfilePage } from './pages/PartnerProfilePage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/healthcare" element={<ProductHealthcarePage />} />
          <Route path="/products/nimble" element={<ProductNimblePage />} />
          <Route path="/products/bankware" element={<ProductBankWarePage />} />
          <Route path="/products/retail" element={<ProductRetailPage />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/custom-software-development" element={<ServiceCustomDevPage />} />

          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/healthcare" element={<IndustryHealthcarePage />} />
          <Route path="/industries/trade" element={<IndustryTradePage />} />
          <Route path="/industries/cooperative-banking" element={<IndustryBankingPage />} />
          <Route path="/industries/retail" element={<IndustryRetailPage />} />

          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-demo" element={<RequestDemoPage />} />

          {/* Customer Support Portal */}
          <Route path="/support" element={<SupportLandingPage />} />
          <Route path="/support/raise-ticket" element={<RaiseTicketPage />} />
          <Route path="/support/track-ticket" element={<TrackTicketPage />} />
          <Route path="/support/ticket/:id" element={<TicketDetailsPage />} />
          <Route path="/support/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/support/knowledge-base/:slug" element={<KnowledgeArticlePage />} />
          <Route path="/support/agent-dashboard" element={<AgentDashboardPage />} />

          {/* B2B Partner Portal */}
          <Route path="/partners" element={<PartnerLandingPage />} />
          <Route path="/partners/login" element={<PartnerLoginPage />} />
          <Route path="/partners/request-access" element={<PartnerRequestAccessPage />} />
          <Route path="/partners/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/partners/leads" element={<PartnerLeadsPage />} />
          <Route path="/partners/leads/new" element={<PartnerNewLeadPage />} />
          <Route path="/partners/opportunities" element={<PartnerOpportunitiesPage />} />
          <Route path="/partners/resources" element={<PartnerResourcesPage />} />
          <Route path="/partners/profile" element={<PartnerProfilePage />} />

          {/* General & Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Legacy Site URL Redirects (Preserving SEO) */}
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/Home/Index" element={<Navigate to="/" replace />} />
          <Route path="/Home/AboutUs" element={<Navigate to="/about" replace />} />
          <Route path="/Home/ContactUs" element={<Navigate to="/contact" replace />} />
          <Route path="/Home/PartnerProgram" element={<Navigate to="/partners" replace />} />
          <Route path="/Home/Downloads" element={<Navigate to="/resources" replace />} />
          <Route path="/Home/PrivacyPolicy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/Home/Terms" element={<Navigate to="/terms" replace />} />
          <Route path="/OurProducts/SaritaHealthCare" element={<Navigate to="/products/healthcare" replace />} />
          <Route path="/OurProducts/SaritaNimble" element={<Navigate to="/products/nimble" replace />} />
          <Route path="/OurProducts/SaritaBankWare" element={<Navigate to="/products/bankware" replace />} />
          <Route path="/OurProducts/SaritaRetail" element={<Navigate to="/products/retail" replace />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Toast Notifications */}
        <Toast />
      </Router>
    </AppProvider>
  );
};

export default App;
