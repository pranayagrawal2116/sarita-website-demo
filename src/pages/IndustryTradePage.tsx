import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ship, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { INDUSTRIES } from '../data/industriesData';

export const IndustryTradePage: React.FC = () => {
  const ind = INDUSTRIES.find((i) => i.id === 'trade')!;
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="International Trade & EXIM Software | Sarita Infotech"
        description="Automate export documentation, customs invoices, Advance License ledgers, duty drawback, and e-BRC tracking with Sarita Nimble."
      />
      <Header />

      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            <Ship className="w-3.5 h-3.5" />
            International Trade & EXIM
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Software for Export Houses & Merchant Traders
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {ind.tagline}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="enterprise-card p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Frictionless Global Trade Compliance & Documentation
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {ind.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Common EXIM Obstacles:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {ind.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Sarita Nimble Solutions:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {ind.solutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Dedicated Software Product:</span>
              <strong className="text-slate-900 text-base">Sarita Nimble (EXIM Suite)</strong>
            </div>
            <div className="flex gap-3">
              <Link to="/products/nimble" className="btn-primary text-xs py-2 px-4 bg-blue-600 hover:bg-blue-500">
                Explore Sarita Nimble →
              </Link>
              <button onClick={() => setDemoOpen(true)} className="btn-secondary text-xs py-2 px-4">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} initialProductId="nimble" />
    </div>
  );
};
