import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake,
  Search,
  Building2,
  TrendingUp,
  Award,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CURRENT_PARTNER_PROFILE } from '../../data/partnerData';
import { LeadStatus } from '../../types';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminPartnersPage: React.FC = () => {
  const { partnerLeads, updateLeadStatus, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = partnerLeads.filter((lead) => {
    const matchesSearch =
      lead.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.prospectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalDeals = partnerLeads.length;
  const wonDeals = partnerLeads.filter((l) => l.status === 'Won').length;

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              Channel Ecosystem
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Channel Partners & Deal Registration</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor authorized regional distribution partners, review territory deal locks, and manage partner pipeline progression.
          </p>
        </div>

        <Link
          to="/partners/dashboard"
          className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Preview Partner Portal View
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Authorized Partners</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">4 Active</div>
          <span className="text-[11px] text-slate-500">Tier 1 & Regional Distributors</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-600">Registered Leads</span>
            <TrendingUp className="w-4 h-4 text-brand-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-brand-700">{totalDeals}</div>
          <span className="text-[11px] text-slate-500">Territory protected</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Deals Won</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{wonDeals}</div>
          <span className="text-[11px] text-slate-500">Commission qualified</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{CURRENT_PARTNER_PROFILE.activePipelineValue}</div>
          <span className="text-[11px] text-slate-500">Active deal volume</span>
        </div>
      </div>

      {/* Authorized Channel Partner Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Primary Partner Profile (Simulated Session)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div>
            <span className="text-slate-400 block font-medium">Partner Organization</span>
            <span className="font-semibold text-slate-900">{CURRENT_PARTNER_PROFILE.companyName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Assigned Territory</span>
            <span className="text-slate-800 font-medium">{CURRENT_PARTNER_PROFILE.assignedTerritory}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Partner Tier</span>
            <span className="font-semibold text-brand-700">{CURRENT_PARTNER_PROFILE.partnerTier}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">YTD Commission Earned</span>
            <span className="text-emerald-700 font-bold">{CURRENT_PARTNER_PROFILE.ytdCommissionEarned}</span>
          </div>
        </div>
      </div>

      {/* Filter and Deals Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lead or prospect..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {(['All', 'New', 'Under Review', 'Qualified', 'Proposal', 'Won', 'Lost'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === s
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">Lead ID</th>
                <th className="py-3 px-4">Prospect Organization</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Deal Status</th>
                <th className="py-3 px-5 text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                    No partner leads found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-mono font-medium text-slate-900">
                      {lead.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{lead.organization}</div>
                      <div className="text-xs text-slate-400">
                        {lead.prospectName} • {lead.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {lead.productInterest}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{lead.region}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      {lead.estimatedValue || 'TBD'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          lead.status === 'Won'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : lead.status === 'Lost'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : lead.status === 'Proposal'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};
