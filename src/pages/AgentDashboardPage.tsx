import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Search,
  Filter,
  Eye,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';
import { SupportTicket } from '../types';

export const AgentDashboardPage: React.FC = () => {
  const { tickets, updateTicketStatus, updateTicketAgent } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Metrics
  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const waitingCount = tickets.filter((t) => t.status === 'Waiting for Customer').length;
  const highPriorityCount = tickets.filter((t) => t.priority === 'High' || t.priority === 'Critical').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  const agentOptions = [
    'Vikram Joshi (Senior Support Engineer)',
    'Sunil Varma (EXIM Specialist)',
    'Pooja Mehta (Banking Solutions)',
    'Anand Verma (Lead Architect)'
  ];

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.organization.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <SupportLayout>
      <SEOHead
        title="Support Agent Operations Desk | Sarita Infotech Helpdesk"
        description="Internal support engineer dashboard for triaging, re-assigning, and updating support ticket resolution states."
      />

      <div className="space-y-6">
        {/* Banner with Prototype Note */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Support Operations Desk (Internal Agent View)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Engineering Ticket Queue & Triage Console
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstration desk for assigning engineers, updating ticket lifecycle states, and monitoring SLAs.
            </p>
          </div>

          <div className="text-xs bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 text-slate-300 font-mono">
            Active On-Duty Agent: Vikram Joshi
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Total Open Tickets</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{openCount}</div>
            <div className="text-[11px] text-blue-600 mt-0.5 font-medium">Awaiting first response</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">In Active Progress</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{inProgressCount}</div>
            <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Remote desk sessions ongoing</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">High / Critical Priority</div>
            <div className="text-2xl font-bold text-rose-600 mt-1">{highPriorityCount}</div>
            <div className="text-[11px] text-rose-600 mt-0.5 font-medium">Immediate SLA attention</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Resolved / Closed</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{resolvedCount}</div>
            <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">99.2% satisfaction rate</div>
          </div>
        </div>

        {/* Action Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Search & Filter Header */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by customer, ID or subject..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <span className="text-slate-500">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All ({tickets.length})</option>
                <option value="open">Open ({openCount})</option>
                <option value="in progress">In Progress ({inProgressCount})</option>
                <option value="waiting for customer">Waiting ({waitingCount})</option>
                <option value="resolved">Resolved ({resolvedCount})</option>
              </select>
            </div>
          </div>

          {/* Interactive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Subject & Customer</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status Changer</th>
                  <th className="py-3 px-4">Assign Engineer</th>
                  <th className="py-3 px-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-700 whitespace-nowrap">
                      {t.id}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <Link to={`/support/ticket/${t.id}`} className="font-semibold text-slate-900 hover:text-brand-600 line-clamp-1">
                        {t.subject}
                      </Link>
                      <div className="text-[11px] text-slate-500 truncate">
                        {t.customerName} ({t.organization})
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-800 whitespace-nowrap">
                      {t.product}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={t.priority} type="priority" />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={t.status}
                        onChange={(e) => updateTicketStatus(t.id, e.target.value as SupportTicket['status'])}
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white font-medium focus:outline-none"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Waiting for Customer">Waiting for Customer</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={t.assignedAgent}
                        onChange={(e) => updateTicketAgent(t.id, e.target.value)}
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white font-medium focus:outline-none max-w-[180px] truncate"
                      >
                        {agentOptions.map((ag) => (
                          <option key={ag} value={ag}>
                            {ag.split('(')[0].trim()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/support/ticket/${t.id}`}
                        className="btn-subtle text-xs py-1 px-2.5 inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Thread</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};
