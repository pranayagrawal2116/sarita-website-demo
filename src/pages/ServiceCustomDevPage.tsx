import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal,
  FileCode,
  Workflow
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { SERVICES } from '../data/servicesData';

export const ServiceCustomDevPage: React.FC = () => {
  const service = SERVICES.find((s) => s.id === 'custom-software-development')!;
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Custom Software Development Services | Sarita Infotech Pvt. Ltd."
        description="Bespoke enterprise software engineering, database architecture, desktop-to-cloud modernization, and proprietary business workflow digitization."
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200/80">
              <Code2 className="w-3.5 h-3.5 text-brand-600" />
              <span>Bespoke Engineering Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Custom Software Development Built Around Your Business Logic
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              When standard off-the-shelf software cannot capture the unique operational workflows of your enterprise, Sarita Infotech delivers tailored desktop, web, and client-server software solutions engineered to your exact specifications.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setDemoOpen(true)}
                className="btn-primary text-base px-6 py-3 shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Discuss Your Software Project
              </button>
              <Link
                to="/case-studies"
                className="btn-secondary text-base px-6 py-3"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Our Engineering Apart */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-tag">Engineering Strengths</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Why Companies Trust Sarita Infotech for Bespoke Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Domain-First Business Analysis</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We spend time analyzing your warehouse floors, clinical desks, or export files before writing a single line of code, ensuring that the software reflects your operational reality.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">High-Performance Transactional Data</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineered for continuous multi-user concurrent operations, rapid query indexing, strict referential integrity, and automated local/cloud backup scripts.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Long-Term Codebase Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear documentation, modular class architectures, granular role-based security permissions, and guaranteed warranty support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Methodology */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="section-tag">Standard Deliverables</span>
              <h3 className="text-2xl font-bold text-slate-900">
                What You Receive with Every Custom Engagement
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We maintain complete transparency through every project sprint, delivering clean binaries, verified test logs, and comprehensive admin documentation.
              </p>
              <div className="space-y-2.5 pt-2">
                {service.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Technology Stacks Supported
              </span>
              <h4 className="text-xl font-bold text-white">
                Reliable Enterprise Architecture
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">Backend & Database</div>
                  <div>Microsoft SQL Server, PostgreSQL, MySQL, SQLite, RESTful API Services</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">Desktop & Client-Server Applications</div>
                  <div>C# .NET, Windows Forms, WPF, Electron, Legacy Migration (FoxPro/Access)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">Web Portals & Mobile Extensions</div>
                  <div>React, TypeScript, Node.js, Web Services, Android field collection utilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Have a Custom Software Project in Mind?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Schedule a confidential discovery session with our software architect to review your technical requirements.
          </p>
          <div className="pt-2">
            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Book Architecture Discovery Call
            </button>
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
