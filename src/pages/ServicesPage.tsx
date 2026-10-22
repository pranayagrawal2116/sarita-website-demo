import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  DatabaseZap,
  Network,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { SERVICES } from '../data/servicesData';
import { DemoRequestModal } from '../components/common/DemoRequestModal';

export const ServicesPage: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  const serviceIcons: Record<string, React.ReactNode> = {
    'custom-software-development': <Code2 className="w-8 h-8 text-brand-600" />,
    'implementation-migration': <DatabaseZap className="w-8 h-8 text-emerald-600" />,
    'system-integration': <Network className="w-8 h-8 text-blue-600" />,
    'support-maintenance': <Headphones className="w-8 h-8 text-purple-600" />
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Enterprise Software Services & Engineering | Sarita Infotech Pvt. Ltd."
        description="Comprehensive custom software development, legacy data migration, laboratory instrument interfacing, and Annual Maintenance Support (AMC)."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800 mb-3">
            <Layers className="w-3.5 h-3.5" />
            Services & Engineering Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Practical Software Engineering Built for Business Realities
          </h1>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            From bespoke enterprise application development to high-stakes legacy database migration, our engineering team brings 23+ years of technical rigor and domain experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            id={srv.id}
            className="enterprise-card p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-start justify-between"
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                  {serviceIcons[srv.id]}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    Enterprise Capability
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {srv.title}
                  </h2>
                </div>
              </div>

              <div className="text-sm font-semibold text-brand-800">
                {srv.subtitle}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {srv.description}
              </p>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Deliverables & Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {srv.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Engagement Box */}
            <div className="w-full lg:w-72 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 flex-shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Engagement Models
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                {srv.engagementModels.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-200 space-y-2">
                {srv.id === 'custom-software-development' ? (
                  <Link
                    to="/services/custom-software-development"
                    className="w-full btn-primary text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Dedicated Custom Dev Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="w-full btn-primary text-xs py-2 text-center"
                  >
                    Inquire About Service
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Engineering Process */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-tag">Methodology</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Our 5-Stage Delivery Methodology
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {SERVICES[0].processSteps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-brand-600 block mb-1">Phase {idx + 1}</span>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title.split('. ')[1] || step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <DemoRequestModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        initialProductId="all"
      />
    </div>
  );
};
