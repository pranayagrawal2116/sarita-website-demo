import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  PlusCircle,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';

export const CustomerTicketsPage: React.FC = () => {
  const { currentCustomer, getCustomerTickets } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const customerTickets = getCustomerTickets();

  const filteredTickets = customerTickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.siteReference.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <CustomerLayout>
      <SEOHead
        title="My Support Tickets | Sarita Customer Portal"
        description="View and track technical support tickets registered for your organization."
      />

      <div className="space-y-6">
        {/* Header with Title and New Ticket Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Support Tickets</h1>
            <p className="text-xs text-slate-500 mt-1">
              Active tickets for <strong className="text-slate-800">{currentCustomer?.organization}</strong> ({currentCustomer?.accountReference})
            </p>
          </div>

          <Link
            id="tickets-raise-btn"
            to="/customer/tickets/new"
            className="btn-primary text-xs py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Raise a Ticket</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket ID or subject..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <span className="text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Statuses ({customerTickets.length})</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="waiting for customer">Waiting for Customer</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <span className="text-slate-500">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
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

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Ticket className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-semibold text-slate-700">No matching tickets found</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No tickets match your search filters for {currentCustomer?.organization}. Try adjusting search terms or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Subject & Context</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Update</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-brand-700 whitespace-nowrap">
                        <Link to={`/customer/tickets/${ticket.id}`} className="hover:underline">
                          {ticket.id}
                        </Link>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <Link to={`/customer/tickets/${ticket.id}`} className="font-semibold text-slate-900 hover:text-brand-600 line-clamp-1">
                          {ticket.subject}
                        </Link>
                        <div className="text-[11px] text-slate-500 truncate">
                          {ticket.siteReference || 'General Facility'} • {ticket.category}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-800">
                        {ticket.product}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={ticket.priority} type="priority" />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} type="ticket" />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {ticket.updatedAt}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/customer/tickets/${ticket.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 p-1 rounded hover:bg-brand-50"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data Protection: Showing {filteredTickets.length} records isolated to {currentCustomer?.organization}</span>
            </span>
            <span className="font-mono text-[11px]">SLA Response: Tier-1 Platinum</span>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
