import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Activity,
  BedDouble,
  Receipt,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Layers,
  ChevronDown,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { HealthcareDashboardMockup } from '../components/mockups/HealthcareDashboardMockup';
import { BrochureModal } from '../components/common/BrochureModal';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { ReviewNotice } from '../components/ui/ReviewNotice';
import { PRODUCTS } from '../data/productsData';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const ProductHealthcarePage: React.FC = () => {
  const product = PRODUCTS.find((p) => p.id === 'healthcare')!;
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Embedded Demo Form State
  const [embeddedName, setEmbeddedName] = useState('');
  const [embeddedOrg, setEmbeddedOrg] = useState('');
  const [embeddedEmail, setEmbeddedEmail] = useState('');
  const [embeddedPhone, setEmbeddedPhone] = useState('');
  const [embeddedBeds, setEmbeddedBeds] = useState('50-100 beds');
  const [embeddedSubmitted, setEmbeddedSubmitted] = useState(false);

  const handleEmbeddedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (embeddedName && embeddedEmail && embeddedPhone) {
      setEmbeddedSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Sarita HealthCare | Hospital Management Information System (HMIS)"
        description="Enterprise HMIS software for multispeciality hospitals, OPD/IPD workflows, patient registration, OT scheduling, pharmacy, and ABDM interoperability roadmap."
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {product.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setDemoOpen(true)}
                className="btn-primary text-base px-6 py-3 bg-emerald-600 hover:bg-emerald-500 shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Schedule Hospital Walkthrough
              </button>
              <button
                onClick={() => setBrochureOpen(true)}
                className="btn-secondary text-base px-6 py-3"
              >
                <Download className="w-4 h-4 mr-2 text-slate-600" />
                Download Brochure
              </button>
            </div>
          </div>

          {/* Interactive Mockup */}
          <div className="mt-12 max-w-5xl mx-auto">
            <HealthcareDashboardMockup />
            <div className="text-center text-xs text-slate-400 mt-3">
              Interactive Sarita HealthCare operational preview. Explore OPD queue, visual bed allocation matrix, and IPD billing tabs above.
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience & Problems Solved */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Target Audience */}
            <div className="space-y-4">
              <span className="section-tag">Target Audience</span>
              <h3 className="text-2xl font-bold text-slate-900">
                Engineered for High-Volume Healthcare Institutions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether managing a 50-bed surgical nursing home or a 300-bed multispeciality hospital network, Sarita HealthCare delivers dependable modular scalability.
              </p>
              <div className="space-y-2.5 pt-2">
                {product.targetAudience.map((aud, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{aud}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Problems Solved */}
            <div className="space-y-4">
              <span className="section-tag">Operational Challenges Solved</span>
              <h3 className="text-2xl font-bold text-slate-900">
                Eliminate Bottlenecks Across the Patient Lifecycle
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hospital administrators and clinical staff face daily delays caused by fragmented records and manual handoffs. Sarita HealthCare unifies these points of friction.
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
        </div>
      </section>

      {/* Core Key Features Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-tag">Core Modules</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Comprehensive Hospital Operations Under One Platform
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explore key functional modules engineered to ensure clinical precision, staff accountability, and revenue control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.keyFeatures.map((feat, idx) => (
              <div key={idx} className="enterprise-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED DIGITAL HEALTH INTEROPERABILITY SECTION (ABDM & NHCX) */}
      <section className="py-16 bg-white border-b border-slate-200" id="interoperability">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              National Health Digital Interoperability Architecture
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Ayushman Bharat Digital Mission (ABDM) & NHCX Claims Roadmap
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Preparing modern Indian hospitals for frictionless electronic health information exchange and digitized insurance claim adjudication.
            </p>
          </div>

          {/* Qualified Status Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ABDM Card */}
            <div className="enterprise-card p-6 sm:p-8 border-amber-200/90 bg-amber-50/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <span className="font-bold text-slate-900 text-lg">
                  Ayushman Bharat Digital Mission (ABDM)
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                  {CONTENT_CONFIG.healthcareInteroperability.abdm.statusLabel}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {CONTENT_CONFIG.healthcareInteroperability.abdm.notice}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Architectural Milestone Workflows:
                </div>
                {CONTENT_CONFIG.healthcareInteroperability.abdm.potentialWorkflows.map((flow, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{flow}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-100 italic">
                * Note: Live ABDM production connectivity requires hospital gateway provisioning and NHA sandbox milestone audits.
              </div>
            </div>

            {/* NHCX Card */}
            <div className="enterprise-card p-6 sm:p-8 border-blue-200/90 bg-blue-50/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                <span className="font-bold text-slate-900 text-lg">
                  National Health Claims Exchange (NHCX)
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300 font-mono">
                  {CONTENT_CONFIG.healthcareInteroperability.nhcx.statusLabel}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {CONTENT_CONFIG.healthcareInteroperability.nhcx.notice}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Insurance Claim Workflows:
                </div>
                {CONTENT_CONFIG.healthcareInteroperability.nhcx.intendedWorkflows.map((flow, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{flow}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-blue-100 italic">
                * Note: Production claim exchange will interface through authorized TPA clearinghouse protocols upon live network deployment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Hospital Workflow Sequence */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-tag">Typical Patient Workflow</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Coordinated Care from Admission to Discharge
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {product.workflow.map((step) => (
              <div key={step.stepNumber} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  0{step.stepNumber}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block mb-1">
                  {step.roleOrModule}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-tag">Measurable Impact</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Operational Benefits for Hospital Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-brand-600 font-mono mb-1">
                  {benefit.metric}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{benefit.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation & Integrations */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-2">Verified Laboratory & Medical Interfacing</h4>
            <p className="text-xs text-slate-600 mb-4">
              Sarita HealthCare connects directly with hospital hardware and diagnostic systems:
            </p>
            <div className="space-y-2">
              {product.integrationsVerified.map((intg, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{intg}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-2">Structured Rollout & Training</h4>
            <p className="text-xs text-slate-600 mb-4">
              {product.implementationTimeline} Our implementation specialists conduct on-site department training for nurses, receptionists, billing officers, and clinical consultants.
            </p>
            <button
              onClick={() => setBrochureOpen(true)}
              className="btn-secondary text-xs"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download Technical Deployment Specs
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions: Sarita HealthCare
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

      {/* Embedded Healthcare Request a Demo Form */}
      <section className="py-16 bg-slate-900 text-white" id="request-demo">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-300">
              Get Started
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Request a Healthcare Demonstration
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Speak with a healthcare software specialist and see Sarita HealthCare tailored to your hospital's bed count and departmental workflows.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl">
            {embeddedSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Hospital Demonstration Scheduled</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{embeddedName}</strong> ({embeddedOrg}). In production, our healthcare team contacts your administration office to coordinate a live or remote walkthrough.
                </p>
                <div className="text-[11px] text-amber-300/80 pt-2 font-mono">
                  [Simulated Action: Demo Record Created in Prototype Context]
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmbeddedSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Contact Name & Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={embeddedName}
                      onChange={(e) => setEmbeddedName(e.target.value)}
                      placeholder="e.g. Dr. A. K. Joshi (Medical Supt.)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Hospital / Clinic Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={embeddedOrg}
                      onChange={(e) => setEmbeddedOrg(e.target.value)}
                      placeholder="e.g. Care Multispeciality Hospital"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Official Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={embeddedEmail}
                      onChange={(e) => setEmbeddedEmail(e.target.value)}
                      placeholder="admin@hospital.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={embeddedPhone}
                      onChange={(e) => setEmbeddedPhone(e.target.value)}
                      placeholder="+91 98250 00000"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Bed Capacity
                    </label>
                    <select
                      value={embeddedBeds}
                      onChange={(e) => setEmbeddedBeds(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Under 30 beds">Under 30 beds</option>
                      <option value="30-75 beds">30-75 beds</option>
                      <option value="75-150 beds">75-150 beds</option>
                      <option value="150+ beds">150+ beds</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" className="btn-primary bg-emerald-600 hover:bg-emerald-500">
                    Submit Healthcare Demonstration Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Related Business Software Products:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {PRODUCTS.filter((p) => p.id !== 'healthcare').map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-400 transition-colors"
              >
                <div className="font-bold text-slate-900">{p.name}</div>
                <div className="text-slate-500 mt-1">{p.badge}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        product={product}
      />
      <DemoRequestModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        initialProductId="healthcare"
      />
    </div>
  );
};
