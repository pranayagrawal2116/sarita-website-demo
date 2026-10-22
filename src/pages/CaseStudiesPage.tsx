import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { ReviewNotice } from '../components/ui/ReviewNotice';
import { CASE_STUDIES } from '../data/caseStudiesData';

export const CaseStudiesPage: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const filteredStudies = selectedIndustry === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Customer Case Studies | Sarita Infotech Pvt. Ltd."
        description="Explore how multispeciality hospitals, textile exporters, and cooperative credit societies transformed operations with Sarita Infotech business software."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <FileText className="w-3.5 h-3.5" />
            Implementation Case Studies
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Demonstrated Impact in Real Business Environments
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Review detailed operational challenges, architectural solutions, and quantified results achieved across healthcare, global trade, banking, and retail.
          </p>
        </div>
      </section>

      {/* Verification Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ReviewNotice
          label="Demonstration Content Notice"
          message="Case studies presented here illustrate representative customer deployment scenarios and workflows based on real implementation patterns. Operational metrics and timelines are presented for prototype evaluation."
        />

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto py-4 text-xs font-medium">
          {['all', 'Healthcare', 'Trade', 'Banking', 'Retail'].map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                selectedIndustry === ind
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {ind === 'all' ? 'All Industry Deployments' : ind}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies List */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div key={study.id} className="enterprise-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-brand-700">{study.industry}</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {study.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  {study.title}
                </h3>

                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Client Profile: <span className="font-normal text-slate-600">{study.clientType}</span>
                </div>

                <div className="space-y-3 text-xs text-slate-600 leading-relaxed mb-6">
                  <div>
                    <strong className="text-slate-800 block mb-0.5">The Challenge:</strong>
                    {study.challenge}
                  </div>
                  <div>
                    <strong className="text-slate-800 block mb-0.5">Solution & Rollout:</strong>
                    {study.solution}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-2">
                  <span className="font-bold text-xs text-slate-900 block">Quantified Outcomes:</span>
                  {study.outcomes.map((out, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-700">Software: {study.productUsed}</span>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  Request Similar Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <DemoRequestModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} initialProductId="all" />
    </div>
  );
};
