import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PlusCircle, ArrowRight, Eye, Calendar, UserCheck } from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';

export const TrackTicketPage: React.FC = () => {
  const { tickets } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesProduct = productFilter === 'all' || t.product === productFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesProduct && matchesPriority;
  });

  return (
    <SupportLayout>
      <SEOHead
        title="Track Support Tickets | Sarita Infotech Helpdesk"
        description="Search and track your active or resolved technical support tickets by Ticket ID, product, or organization."
      />

      <div className="space-y-6">
        {/* Top Controls: Search & Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Ticket ID (e.g. SIT-2489), Subject, or Email..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <Link
              to="/support/raise-ticket"
              className="btn-primary text-xs py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 w-full sm:w-auto text-center"
            >
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Raise New Ticket
            </Link>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Status Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Statuses ({tickets.length})</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="waiting for customer">Waiting for Customer</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Product Filter:</label>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Products</option>
                <option value="Sarita HealthCare">Sarita HealthCare</option>
                <option value="Sarita Nimble">Sarita Nimble</option>
                <option value="Sarita BankWare">Sarita BankWare</option>
                <option value="Sarita Retail">Sarita Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Priority Filter:</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table / List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900">
              Showing {filteredTickets.length} of {tickets.length} Support Tickets
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Prototype Mock Ledger</span>
          </div>

          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <p className="text-sm">No tickets found matching your search and filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setProductFilter('all');
                  setPriorityFilter('all');
                }}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Subject & Customer</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Assigned Agent</th>
                    <th className="py-3 px-4">Updated</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-700 whitespace-nowrap">
                        {ticket.id}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          to={`/support/ticket/${ticket.id}`}
                          className="font-bold text-slate-900 hover:text-brand-600 line-clamp-1 block"
                        >
                          {ticket.subject}
                        </Link>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {ticket.customerName} • {ticket.organization}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-800">
                        {ticket.product}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={ticket.priority} type="priority" />
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} type="ticket" />
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-600 whitespace-nowrap">
                        {ticket.assignedAgent.split('(')[0].trim()}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                        {ticket.updatedAt}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/support/ticket/${ticket.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Thread</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SupportLayout>
  );
};
