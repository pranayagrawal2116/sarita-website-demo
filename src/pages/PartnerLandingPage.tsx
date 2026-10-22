import React from 'react';
import { Link } from 'react-router-dom';
import {
  KeyRound,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Handshake,
  DollarSign,
  FileText
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';

export const PartnerLandingPage: React.FC = () => {
  const { partnerAuthenticated } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="B2B Channel Partner Program | Sarita Infotech Pvt. Ltd."
        description="Grow your enterprise IT consulting business. Partner with Sarita Infotech to distribute hospital HMIS, trade EXIM, and cooperative banking software."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <Handshake className="w-3.5 h-3.5" />
            Channel Alliances
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Empower Your Clients with Specialized Business Software
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Join the Sarita Infotech Partner Network. Deliver proven Hospital HMIS, Trade EXIM, and Cooperative Banking software with comprehensive margins and dedicated technical backup.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={partnerAuthenticated ? '/partners/dashboard' : '/partners/login'}
              className="btn-primary text-base px-6 py-3"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              {partnerAuthenticated ? 'Access Partner Dashboard' : 'Channel Partner Login'}
            </Link>
            <Link
              to="/partners/request-access"
              className="btn-secondary text-base px-6 py-3 bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
            >
              Apply to Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars of Partnership */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-tag">Value Proposition</span>
          <h2 className="text-3xl font-bold text-slate-900">
            Why Technology Consultancies Partner with Sarita Infotech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="enterprise-card p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Attractive Recurring Revenue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn upfront implementation margins plus continuous recurring commission on annual support agreements (AMC) and client feature expansions.
            </p>
          </div>

          <div className="enterprise-card p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Proven 23-Year Domain Depth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never risk client relationships on unproven software. Our solutions are deployed across 200+ hospitals, export houses, and credit societies.
            </p>
          </div>

          <div className="enterprise-card p-6 sm:p-8 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Engineering Co-Selling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our senior software architects join you during complex hospital or enterprise RFP walkthroughs, providing expert technical backup.
            </p>
          </div>
        </div>

        {/* Our Promise vs Your Promise (from real site data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Our Commitment to Partners:
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Protected territory lead registration to prevent conflict</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Access to complete unbranded and co-branded sales enablement toolkits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Tier-2 and Tier-3 escalated technical engineering support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Transparent commission calculation and timely monthly settlement</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-600" />
              Partner Responsibilities:
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>Local client relationship management and first-level site consultation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>Certified engineer participation in Sarita product updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>Adherence to enterprise data confidentiality and compliance standards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to Access the Partner Portal?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Authorized channel partners can log in directly to register prospective client opportunities, track deal stages, and download product battlecards.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/partners/login" className="btn-primary">
              Log In with Demo Partner Credentials
            </Link>
            <Link to="/partners/request-access" className="btn-secondary text-xs">
              Request Partner Access
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
