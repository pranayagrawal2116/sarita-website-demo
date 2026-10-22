import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Eye,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';
import { LeadStatus } from '../types';

export const PartnerLeadsPage: React.FC = () => {
  const { partnerLeads, updateLeadStatus } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = partnerLeads.filter((l) => {
    const matchesSearch =
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.organization.toLowerCase().includes(search.toLowerCase()) ||
      l.prospectName.toLowerCase().includes(search.toLowerCase()) ||
      l.region.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || l.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <PartnerLayout>
      <SEOHead
        title="Registered Leads Management | Sarita Partner Portal"
        description="View and manage prospective client lead registrations and track proposal stages."
      />

      <div className="space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Registered Leads Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Territory-protected opportunity registrations filed by your organization
            </p>
          </div>

          <Link
            to="/partners/leads/new"
            className="btn-primary text-xs py-2 px-3.5 bg-brand-600 hover:bg-brand-500 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Register New Lead
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by organization or contact..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-slate-500">Filter Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none"
            >
              <option value="all">All Statuses ({partnerLeads.length})</option>
              <option value="new">New</option>
              <option value="under review">Under Review</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Organization & Prospect</th>
                  <th className="py-3 px-4">Product Interest</th>
                  <th className="py-3 px-4">Region</th>
                  <th className="py-3 px-4">Est. Value</th>
                  <th className="py-3 px-4">Stage / Status</th>
                  <th className="py-3 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-700 whitespace-nowrap">
                      {lead.id}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900">{lead.organization}</div>
                      <div className="text-[11px] text-slate-500">{lead.prospectName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.email} • {lead.phone}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                      {lead.productInterest}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      {lead.region}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-emerald-700 font-semibold">
                      {lead.estimatedValue || 'Evaluating'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} type="lead" />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white font-medium focus:outline-none"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};
