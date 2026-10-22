import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';

export const AdminTicketsPage: React.FC = () => {
  const { tickets, updateTicketStatus, updateTicketAgent } = useApp();

  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');

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

    const matchesProduct = productFilter === 'all' || t.product === productFilter;
    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesAgent = agentFilter === 'all' || t.assignedAgent.includes(agentFilter);

    return matchesSearch && matchesProduct && matchesStatus && matchesPriority && matchesAgent;
  });

  return (
    <AdminLayout>
      <SEOHead
        title="Support Ticket Management | Sarita Central Admin Console"
        description="Admin triage desk for assigning agents, updating statuses, and monitoring support SLA compliance across all client accounts."
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Ticket Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Global ticket queue across Sarita HealthCare, Nimble, BankWare, and Retail installations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="admin-ticket-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ticket ID, subject, or organization..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Products</option>
                <option value="Sarita HealthCare">Sarita HealthCare</option>
                <option value="Sarita Nimble">Sarita Nimble</option>
                <option value="Sarita BankWare">Sarita BankWare</option>
                <option value="Sarita Retail">Sarita Retail</option>
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Statuses ({tickets.length})</option>
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in progress">In Progress</option>
                <option value="waiting for customer">Waiting for Customer</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Subject & Organization</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status & Quick Update</th>
                  <th className="py-3 px-4">Assigned Agent</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-700 whitespace-nowrap">
                      <Link to={`/admin/tickets/${t.id}`} className="hover:underline">
                        {t.id}
                      </Link>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <Link to={`/admin/tickets/${t.id}`} className="font-semibold text-slate-900 hover:text-brand-600 line-clamp-1">
                        {t.subject}
                      </Link>
                      <div className="text-[11px] text-slate-500 truncate">
                        {t.organization} ({t.customerName})
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-800">
                      {t.product}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={t.priority} type="priority" />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={t.status}
                        onChange={(e) => updateTicketStatus(t.id, e.target.value as any)}
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white font-medium focus:outline-none"
                      >
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
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
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white font-medium focus:outline-none max-w-[170px] truncate"
                      >
                        <option value="Unassigned (Auto-Triage)">Unassigned</option>
                        {agentOptions.map((agent, i) => (
                          <option key={i} value={agent}>{agent.split('(')[0].trim()}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/tickets/${t.id}`}
                        className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 p-1 rounded hover:bg-brand-50"
                      >
                        <span>Manage</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredTickets.length} of {tickets.length} total tickets</span>
            <span className="font-mono text-[11px]">Audit Engine Active</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
