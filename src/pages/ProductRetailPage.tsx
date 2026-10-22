import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Boxes,
  Clock,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  Sparkles,
  ArrowRight,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { RetailDashboardMockup } from '../components/mockups/RetailDashboardMockup';
import { BrochureModal } from '../components/common/BrochureModal';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { ReviewNotice } from '../components/ui/ReviewNotice';
import { PRODUCTS } from '../data/productsData';

export const ProductRetailPage: React.FC = () => {
  const product = PRODUCTS.find((p) => p.id === 'retail')!;
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Sarita Retail | Retail POS, Barcode Billing & Multi-Store Inventory"
        description="High-speed barcode retail POS, batch-wise expiry tracking, vendor management, and multi-counter sales reporting software."
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80">
              <ShoppingCart className="w-3.5 h-3.5 text-purple-600" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {product.heroSubheadline}
            </p>

            {/* Prototype Verification Callout */}
            <div className="max-w-2xl mx-auto">
              <ReviewNotice
                label="Content Review Notice"
                message="Retail feature specifications shown in this prototype represent typical retail industry requirements and are marked for client verification with Sarita Infotech product leads."
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                id="schedule-walkthrough-btn"
                onClick={() => setDemoOpen(true)}
                className="btn-primary text-base px-6 py-3 bg-purple-600 hover:bg-purple-500 shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Schedule Retail POS Demonstration
              </button>
              <button
                id="download-brochure-btn"
                onClick={() => setBrochureOpen(true)}
                className="btn-secondary text-base px-6 py-3"
              >
                <Download className="w-4 h-4 mr-2 text-slate-600" />
                Download Brochure
              </button>
            </div>
          </div>

          <div className="mt-12 max-w-5xl mx-auto">
            <RetailDashboardMockup />
          </div>
        </div>
      </section>

      {/* Target Audience & Problems */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <span className="section-tag">Target Retailers</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Designed for High-Speed Counter Operations
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Serving single-store merchants, supermarkets, apparel showrooms, hardware dealers, and multi-branch retail distribution outlets.
            </p>
            <div className="space-y-2.5 pt-2">
              {product.targetAudience.map((aud, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>{aud}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="section-tag">Retail Challenges Addressed</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Reduce Counter Queues & Stop Stock Leakages
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminate checkout bottlenecks during peak evening hours, control batch-wise expiry dates, and reconcile cashier shifts with total cash drawer accuracy.
            </p>
            <div className="space-y-2.5 pt-2">
              {product.businessProblems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{prob}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-tag">Core Modules</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Complete POS Checkout, Stock & GST Reporting
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.keyFeatures.map((feat, idx) => (
              <div key={idx} className="enterprise-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Workflow */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-tag">Store Operations</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Retail Workflow from Goods Inward to Checkout
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {product.workflow.map((step) => (
              <div key={step.stepNumber} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  0{step.stepNumber}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block mb-1">
                  {step.roleOrModule}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-tag">Proven Results</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Measurable Advantages for Retail Owners
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.benefits.map((b, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-purple-600 font-mono mb-1">{b.metric}</div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{b.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions: Sarita Retail
          </h3>
          <div className="space-y-3">
            {product.faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-slate-800 flex justify-between items-center hover:bg-slate-50 text-sm"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Accelerate Your Store Checkout Speed</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Schedule an interactive demonstration of Sarita Retail with barcode scanner and receipt printer simulation.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button onClick={() => setDemoOpen(true)} className="btn-primary bg-purple-600 hover:bg-purple-500">
              Schedule Demonstration
            </button>
            <button onClick={() => setBrochureOpen(true)} className="btn-secondary text-xs">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        product={product}
      />
      <DemoRequestModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        initialProductId="retail"
      />
    </div>
  );
};
