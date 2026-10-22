import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Ship,
  Landmark,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { INDUSTRIES } from '../data/industriesData';

export const IndustriesPage: React.FC = () => {
  const industryIcons: Record<string, React.ReactNode> = {
    healthcare: <Stethoscope className="w-8 h-8 text-emerald-600" />,
    trade: <Ship className="w-8 h-8 text-blue-600" />,
    'cooperative-banking': <Landmark className="w-8 h-8 text-amber-600" />,
    retail: <ShoppingBag className="w-8 h-8 text-purple-600" />
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Industries We Serve | Sarita Infotech Pvt. Ltd."
        description="Software solutions engineered specifically for healthcare & hospitals, export-import trade, cooperative banking, and retail distribution."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Industry Domain Depth
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Tailored Software for Industry-Specific Realities
          </h1>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            Generic software forces companies to compromise their operational workflows. We build solutions around the precise statutory and operational nuances of your domain.
          </p>
        </div>
      </section>

      {/* Grid of 4 Industries */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => (
            <div key={ind.id} className="enterprise-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    {industryIcons[ind.id]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{ind.title}</h3>
                    <span className="text-xs text-brand-600 font-medium">{ind.tagline}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {ind.description}
                </p>

                {/* Challenges & Solutions */}
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Domain Challenges:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                      {ind.challenges.slice(0, 3).map((ch, i) => (
                        <li key={i}>{ch}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Sarita Solution Highlights:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {ind.solutions.slice(0, 2).map((sol, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/industries/${ind.slug}`}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <span>Explore Industry Page</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>

                {ind.relevantProducts[0] && (
                  <Link
                    to={ind.relevantProducts[0].url}
                    className="text-xs font-semibold text-slate-600 hover:text-brand-600"
                  >
                    View {ind.relevantProducts[0].name} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
