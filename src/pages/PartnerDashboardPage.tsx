import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  TrendingUp,
  FileDown,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';
import { INITIAL_OPPORTUNITIES, PARTNER_RESOURCES } from '../data/partnerData';

export const PartnerDashboardPage: React.FC = () => {
  const { partnerProfile, partnerLeads } = useApp();

  const newLeadsCount = partnerLeads.filter((l) => l.status === 'New' || l.status === 'Under Review').length;
  const qualifiedCount = partnerLeads.filter((l) => l.status === 'Qualified' || l.status === 'Proposal').length;
  const wonCount = partnerLeads.filter((l) => l.status === 'Won').length;

  return (
    <PartnerLayout>
      <SEOHead
        title="Partner Dashboard | Sarita Infotech Partner Portal"
        description="Partner executive overview: registered leads, active opportunities, and sales pipeline."
      />

      <div className="space-y-6">
        {/* Top Partner Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-2xl p-6 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-300">
              Authorized Partner Workspace
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Welcome back, {partnerProfile.contactPerson}
            </h2>
            <p className="text-xs text-slate-300">
              {partnerProfile.companyName} • Territory: {partnerProfile.assignedTerritory}
            </p>
          </div>

          <div className="flex gap-2.5">
            <Link
              to="/partners/leads/new"
              className="btn-primary text-xs py-2 px-3.5 bg-brand-500 hover:bg-brand-600 shadow-sm whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Register New Lead
            </Link>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Active Registered Leads</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{partnerLeads.length} Leads</div>
            <div className="text-[11px] text-blue-600 mt-0.5">{newLeadsCount} under active review</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Active Deals / Pipeline</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{partnerProfile.activePipelineValue}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{INITIAL_OPPORTUNITIES.length} qualified opportunities</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Closed Won Accounts</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{wonCount} Clients</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">100% implementation sign-off</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">YTD Partner Commission</div>
            <div className="text-2xl font-bold text-brand-600 mt-1">{partnerProfile.ytdCommissionEarned}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Tier: {partnerProfile.partnerTier}</div>
          </div>
        </div>

        {/* Grid: Recent Leads Table + Active Deals Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Registered Leads Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Registered Leads</h3>
                <p className="text-[11px] text-slate-500">Territory-protected prospect registrations</p>
              </div>
              <Link to="/partners/leads" className="text-xs font-semibold text-brand-600 hover:underline">
                View All Leads ({partnerLeads.length}) →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Lead ID</th>
                    <th className="py-2.5 px-4">Organization & Contact</th>
                    <th className="py-2.5 px-4">Product</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {partnerLeads.slice(0, 4).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-brand-700">
                        {lead.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{lead.organization}</div>
                        <div className="text-[11px] text-slate-500">{lead.prospectName}</div>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {lead.productInterest}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={lead.status} type="lead" />
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-500">
                        {lead.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">Need to register a new prospect?</span>
              <Link to="/partners/leads/new" className="font-semibold text-brand-600 hover:underline">
                + Add Lead Form
              </Link>
            </div>
          </div>

          {/* Right: Opportunities & Quick Resources */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Deals Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 text-sm">Active Opportunity Pipeline</h4>
                <Link to="/partners/opportunities" className="text-xs font-semibold text-brand-600 hover:underline">
                  All Deals →
                </Link>
              </div>

              <div className="space-y-2.5 text-xs">
                {INITIAL_OPPORTUNITIES.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span className="truncate pr-2">{opp.clientName}</span>
                      <span className="text-emerald-700 font-mono">{opp.dealSize}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{opp.product}</span>
                      <span className="font-medium text-brand-700">{opp.stage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Collateral Download Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 text-sm">Approved Sales Collateral</h4>
                <Link to="/partners/resources" className="text-xs font-semibold text-brand-600 hover:underline">
                  View All ({PARTNER_RESOURCES.length}) →
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                {PARTNER_RESOURCES.slice(0, 2).map((res) => (
                  <div key={res.id} className="p-2.5 rounded-lg border border-slate-100 flex items-center justify-between">
                    <div className="truncate pr-2">
                      <div className="font-semibold text-slate-900 truncate">{res.title}</div>
                      <span className="text-[10px] text-slate-400">{res.format} • {res.size}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloaded "${res.title}" simulated successfully.`)}
                      className="btn-secondary text-[11px] py-1 px-2.5"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};
