import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, DollarSign, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { INITIAL_OPPORTUNITIES } from '../data/partnerData';

export const PartnerOpportunitiesPage: React.FC = () => {
  const [stageFilter, setStageFilter] = useState('all');

  const filtered = INITIAL_OPPORTUNITIES.filter((opp) => {
    if (stageFilter === 'all') return true;
    return opp.stage.toLowerCase() === stageFilter.toLowerCase();
  });

  const totalValue = '₹14,25,000';

  return (
    <PartnerLayout>
      <SEOHead
        title="Opportunities Pipeline | Sarita Partner Portal"
        description="Track commercial deals, stage probabilities, and projected closing dates."
      />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Active Opportunities & Deal Stages
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Co-selling pipeline managed jointly with your Sarita Infotech channel manager
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Total Active Pipeline:</span>
            <span className="text-xl font-bold text-emerald-700 font-mono">{totalValue}</span>
          </div>
        </div>

        {/* Stage Filter */}
        <div className="flex gap-2 overflow-x-auto text-xs font-medium pb-1">
          {['all', 'Discovery', 'Demo Completed', 'Commercial Evaluation', 'Final Negotiation', 'Closed Won'].map((st) => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                stageFilter === st
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? 'All Deal Stages' : st}
            </button>
          ))}
        </div>

        {/* Opportunity Cards / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((opp) => (
            <div key={opp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-slate-400">{opp.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    opp.stage === 'Closed Won'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-brand-50 text-brand-700 border border-brand-200'
                  }`}>
                    {opp.stage}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{opp.title}</h3>
                <div className="text-xs text-slate-600 mt-1">Client: {opp.clientName}</div>
                <div className="text-xs text-slate-500">Solution: {opp.product}</div>

                {/* Progress bar based on probability */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Closing Probability:</span>
                    <span className="font-bold text-slate-800">{opp.probability}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${opp.probability === 100 ? 'bg-emerald-500' : 'bg-brand-600'}`}
                      style={{ width: `${opp.probability}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">Deal Value:</span>
                  <span className="font-bold font-mono text-emerald-700 text-sm">{opp.dealSize}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Est. Close:</span>
                  <span className="font-mono text-slate-700">{opp.expectedClose}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PartnerLayout>
  );
};
