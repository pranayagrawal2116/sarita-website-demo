import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Stethoscope,
  Ship,
  Landmark,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  DatabaseZap,
  Headphones,
  Users,
  ChevronRight,
  HelpCircle,
  KeyRound,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { HealthcareDashboardMockup } from '../components/mockups/HealthcareDashboardMockup';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { PRODUCTS } from '../data/productsData';
import { COMPANY_INFO } from '../data/companyData';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { ProductId } from '../types';

export const HomePage: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedProductForDemo, setSelectedProductForDemo] = useState<ProductId | 'all'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openDemoWithProduct = (id: ProductId | 'all') => {
    setSelectedProductForDemo(id);
    setDemoModalOpen(true);
  };

  const productIcons: Record<string, React.ReactNode> = {
    healthcare: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    nimble: <Ship className="w-6 h-6 text-blue-600" />,
    bankware: <Landmark className="w-6 h-6 text-amber-600" />,
    retail: <ShoppingCart className="w-6 h-6 text-purple-600" />
  };

  const faqs = [
    {
      q: 'Can Sarita Infotech products be customized to our specific operational forms and reports?',
      a: 'Yes. With over 23 years of specialized enterprise engineering experience, all our flagship products (Sarita HealthCare, Sarita Nimble, Sarita BankWare, and Sarita Retail) support tailored report layouts, custom workflow rules, and seamless legacy data migration.'
    },
    {
      q: 'Do you offer on-premise installation or cloud hosting options?',
      a: 'We support flexible deployment architectures based on your organization’s IT policies. Solutions can be deployed on local high-availability servers within your hospital/office LAN, private clouds, or secure hybrid hosting with automated off-site backups.'
    },
    {
      q: 'What kind of support is included after software implementation?',
      a: 'Every deployment is supported by our structured Annual Maintenance Contracts (AMC). This includes dedicated telephonic helpdesk assistance, remote desktop troubleshooting, regular regulatory updates (such as GST tax changes or DGFT export scheme revisions), and refresher staff training.'
    },
    {
      q: 'How does Sarita Infotech support channel partners and technology distributors?',
      a: 'Our Channel Partner Program provides authorized IT solution providers with generous margin sharing, qualified lead distribution, sales enablement toolkits, and direct tier-2 engineering support.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Sarita Infotech Pvt. Ltd. | Business Software & Development"
        description="Software Solutions Built Around Your Business. 23+ years of enterprise software engineering across healthcare HMIS, EXIM trade documentation, and cooperative banking."
      />
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
              23+ Years of Specialized Enterprise Software Engineering
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Software Solutions Built <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 bg-clip-text text-transparent">
                Around Your Business
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Discover practical business software and technology solutions designed to simplify operations, improve visibility and support your organization's growth.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/products"
                className="btn-primary text-base px-6 py-3 shadow-md hover:shadow-lg transition-all"
              >
                Explore Our Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <button
                onClick={() => openDemoWithProduct('all')}
                className="btn-secondary text-base px-6 py-3"
              >
                <Sparkles className="w-4 h-4 mr-2 text-brand-600" />
                Request a Demo
              </button>
            </div>

            {/* Verified Trust Indicators */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>200+ Enterprise Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Deep Domain Specialization</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-600" />
                <span>Dedicated Annual Support SLAs</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Dashboard Mockup Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200/80 to-slate-400/30 shadow-2xl">
              <HealthcareDashboardMockup />
            </div>
            <div className="mt-3 text-center text-xs text-slate-400">
              Interactive interface mockup previewing Sarita HealthCare operational dashboards. Click the tabs above to explore clinical, bed allocation, and billing screens.
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT PORTFOLIO SECTION */}
      <section className="py-20 bg-white border-b border-slate-200" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-tag">Core Software Suites</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Enterprise Software Built for Critical Industry Workflows
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Every Sarita software product is engineered from decades of on-the-ground operational feedback, delivering mathematical precision and deep workflow control.
            </p>
          </div>

          {/* 4 Core Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="enterprise-card p-6 sm:p-8 flex flex-col justify-between hover:border-brand-300 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                      {productIcons[product.id]}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {product.badge.split('(')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="text-xs font-semibold text-brand-700 mt-1 mb-3">
                    Target: {product.targetAudience.slice(0, 2).join(' • ')}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {product.shortDescription}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Operational Highlights
                    </div>
                    {product.keyFeatures.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>{feat.title}:</strong> {feat.description.split('.')[0]}.</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/products/${product.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 group-hover:underline"
                  >
                    Explore Features & Workflows
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={() => openDemoWithProduct(product.id)}
                    className="btn-secondary text-xs px-3.5 py-2"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center text-sm font-semibold text-slate-700 hover:text-brand-600 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-lg transition-colors"
            >
              Compare All Products & Technical Specifications →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SARITA INFOTECH / CAPABILITIES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="section-tag">Why Sarita Infotech</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                23+ Years of Practical Business Engineering & Proven Partnerships
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                As an enterprise, we exist to aspire and enable organizations in fulfilling their goals, leaving them with greater power, effectiveness, excellence, self-confidence, and peace of mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold mb-3">
                    23+
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Decades of Continuity</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Continuous technical product evolution since our inception in Surat, Gujarat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                    200+
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Enterprise Deployments</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Trusted by hospitals, exporters, cooperative credit societies, and merchants.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                    100%
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Bespoke Customization</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Tailored business forms, local language passbooks, and hardware interfacing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
                    SLA
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Responsive Support</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct phone and remote desktop helpdesk backing your day-to-day operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Services Highlight Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                End-to-End Enterprise Services
              </span>
              <h3 className="text-2xl font-bold text-white">
                Comprehensive Implementation, Customization & Support
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Beyond packaged products, our software architects build bespoke business systems and manage safe data cutovers.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Custom Software Development</h5>
                    <p className="text-xs text-slate-400">Tailored desktop and cloud systems designed for proprietary business processes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DatabaseZap className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Implementation & Legacy Data Migration</h5>
                    <p className="text-xs text-slate-400">Zero data loss transition from legacy spreadsheets or older database systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Annual Maintenance & Support (AMC)</h5>
                    <p className="text-xs text-slate-400">Continuous technical support, statutory tax updates, and system health checks.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  to="/services"
                  className="inline-flex items-center text-sm font-semibold text-brand-300 hover:text-white"
                >
                  Learn About Our Services & Engagement Models →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER SUCCESS STORIES (ILLUSTRATIVE DEMO) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-tag">Case Studies</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Demonstrated Results Across Real Business Environments
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Representative operational transformations based on Sarita Infotech implementation patterns.
              </p>
            </div>
            <Link
              to="/case-studies"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 self-start"
            >
              All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.slice(0, 3).map((study) => (
              <div key={study.id} className="enterprise-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                    <span>{study.industry}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">Demo Study</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug mb-3">
                    {study.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {study.challenge}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-900 block text-[11px] mb-1">Key Outcomes:</span>
                    {study.outcomes.slice(0, 2).map((res, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-semibold text-brand-700">{study.productUsed}</span>
                  <Link to="/case-studies" className="text-slate-500 hover:text-slate-900 font-medium">
                    Read Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED PORTAL CALLOUTS: SUPPORT & PARTNERS */}
      <section className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Support Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <LifeBuoy className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Customer Support & Helpdesk
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Need assistance with product configuration, license updates, or database maintenance? Raise a ticket, track status, or browse our technical documentation.
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-time ticket tracking with conversation timelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Knowledge base guides for analyzer setup, reports, and printers</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <Link to="/support" className="btn-primary bg-emerald-600 hover:bg-emerald-500">
                  Open Support Portal
                </Link>
                <Link to="/support/raise-ticket" className="btn-secondary text-xs">
                  Submit Ticket
                </Link>
              </div>
            </div>

            {/* B2B Partner Portal Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  B2B Channel Partner Portal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Authorized value-added resellers, system integrators, and software consultancies can register prospect leads, track commission pipelines, and download sales collateral.
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    <span>Lead registration and deal stage tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    <span>Approved product brochures, battlecards, and sales decks</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <Link to="/partners/login" className="btn-primary">
                  Partner Portal Login
                </Link>
                <Link to="/partners" className="btn-secondary text-xs">
                  Program Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-tag">Frequently Asked Questions</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Common Questions About Sarita Infotech Software
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-semibold text-slate-900 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      openFaq === idx ? 'rotate-90 text-brand-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            Have a question specific to your organization?{' '}
            <Link to="/contact" className="text-brand-600 font-semibold hover:underline">
              Speak directly with our technical team in Surat →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to Modernize Your Business Workflows?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Schedule a personalized demonstration of Sarita HealthCare, Sarita Nimble, Sarita BankWare, or Sarita Retail tailored to your operational needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openDemoWithProduct('all')}
              className="btn-primary text-base px-6 py-3 bg-brand-500 hover:bg-brand-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Schedule a Demonstration
            </button>
            <Link
              to="/contact"
              className="btn-secondary text-base px-6 py-3 bg-slate-800 text-white border-slate-700 hover:bg-slate-750"
            >
              Contact Our Sales Team
            </Link>
          </div>
          <div className="text-xs text-slate-400 pt-2 font-mono">
            Direct Phone: {COMPANY_INFO.supportPhone} • Surat, Gujarat, India
          </div>
        </div>
      </section>

      <Footer />

      {/* Reusable Demo Request Modal */}
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialProductId={selectedProductForDemo}
      />
    </div>
  );
};
