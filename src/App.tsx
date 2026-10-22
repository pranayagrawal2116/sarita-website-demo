import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/ui/Toast';

// Auth Route Guards
import { CustomerProtectedRoute } from './components/auth/CustomerProtectedRoute';
import { AdminProtectedRoute } from './components/auth/AdminProtectedRoute';
import { PartnerProtectedRoute } from './components/auth/PartnerProtectedRoute';

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

// Public Support & Knowledge Base Pages
import { SupportLandingPage } from './pages/SupportLandingPage';
import { RaiseTicketPage } from './pages/RaiseTicketPage';
import { TrackTicketPage } from './pages/TrackTicketPage';
import { TicketDetailsPage } from './pages/TicketDetailsPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { KnowledgeArticlePage } from './pages/KnowledgeArticlePage';
import { AgentDashboardPage } from './pages/AgentDashboardPage';

// Customer Portal Pages
import { CustomerLoginPage } from './pages/customer/CustomerLoginPage';
import { CustomerRegisterPage } from './pages/customer/CustomerRegisterPage';
import { CustomerForgotPasswordPage } from './pages/customer/CustomerForgotPasswordPage';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { CustomerTicketsPage } from './pages/customer/CustomerTicketsPage';
import { CustomerNewTicketPage } from './pages/customer/CustomerNewTicketPage';
import { CustomerTicketDetailPage } from './pages/customer/CustomerTicketDetailPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';

// Central Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminTicketsPage } from './pages/admin/AdminTicketsPage';
import { AdminTicketDetailPage } from './pages/admin/AdminTicketDetailPage';
import { AdminDemosPage } from './pages/admin/AdminDemosPage';
import { AdminDemoDetailPage } from './pages/admin/AdminDemoDetailPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminCustomerDetailPage } from './pages/admin/AdminCustomerDetailPage';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// B2B Channel Partner Portal Pages
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
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Corporate Website */}
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

          {/* Public Knowledge Base & Support Helpdesk */}
          <Route path="/support" element={<SupportLandingPage />} />
          <Route path="/support/raise-ticket" element={<RaiseTicketPage />} />
          <Route path="/support/track-ticket" element={<TrackTicketPage />} />
          <Route path="/support/ticket/:id" element={<TicketDetailsPage />} />
          <Route path="/support/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/support/knowledge-base/:slug" element={<KnowledgeArticlePage />} />
          <Route path="/support/agent-dashboard" element={<AgentDashboardPage />} />

          {/* Authenticated Customer Support & Account Portal */}
          <Route path="/customer/login" element={<CustomerLoginPage />} />
          <Route path="/customer/register" element={<CustomerRegisterPage />} />
          <Route path="/customer/forgot-password" element={<CustomerForgotPasswordPage />} />
          <Route
            path="/customer/dashboard"
            element={
              <CustomerProtectedRoute>
                <CustomerDashboardPage />
              </CustomerProtectedRoute>
            }
          />
          <Route
            path="/customer/tickets"
            element={
              <CustomerProtectedRoute>
                <CustomerTicketsPage />
              </CustomerProtectedRoute>
            }
          />
          <Route
            path="/customer/tickets/new"
            element={
              <CustomerProtectedRoute>
                <CustomerNewTicketPage />
              </CustomerProtectedRoute>
            }
          />
          <Route
            path="/customer/tickets/:id"
            element={
              <CustomerProtectedRoute>
                <CustomerTicketDetailPage />
              </CustomerProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <CustomerProtectedRoute>
                <CustomerProfilePage />
              </CustomerProtectedRoute>
            }
          />

          {/* Centralized Administration Management System */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <AdminProtectedRoute>
                <AdminTicketsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets/:id"
            element={
              <AdminProtectedRoute>
                <AdminTicketDetailPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/demos"
            element={
              <AdminProtectedRoute>
                <AdminDemosPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/demos/:id"
            element={
              <AdminProtectedRoute>
                <AdminDemoDetailPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <AdminProtectedRoute>
                <AdminCustomersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/customers/:id"
            element={
              <AdminProtectedRoute>
                <AdminCustomerDetailPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <AdminProtectedRoute>
                <AdminPartnersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminProtectedRoute>
                <AdminReportsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettingsPage />
              </AdminProtectedRoute>
            }
          />

          {/* B2B Channel Partner Portal */}
          <Route path="/partners" element={<PartnerLandingPage />} />
          <Route path="/partners/login" element={<PartnerLoginPage />} />
          <Route path="/partners/request-access" element={<PartnerRequestAccessPage />} />
          <Route
            path="/partners/dashboard"
            element={
              <PartnerProtectedRoute>
                <PartnerDashboardPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partners/leads"
            element={
              <PartnerProtectedRoute>
                <PartnerLeadsPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partners/leads/new"
            element={
              <PartnerProtectedRoute>
                <PartnerNewLeadPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partners/opportunities"
            element={
              <PartnerProtectedRoute>
                <PartnerOpportunitiesPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partners/resources"
            element={
              <PartnerProtectedRoute>
                <PartnerResourcesPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partners/profile"
            element={
              <PartnerProtectedRoute>
                <PartnerProfilePage />
              </PartnerProtectedRoute>
            }
          />

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
