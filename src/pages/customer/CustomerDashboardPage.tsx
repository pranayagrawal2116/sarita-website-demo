import React from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Headphones,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';
import { KNOWLEDGE_ARTICLES } from '../../data/supportData';

export const CustomerDashboardPage: React.FC = () => {
  const { currentCustomer, getCustomerTickets } = useApp();

  const customerTickets = getCustomerTickets();
  const totalTickets = customerTickets.length;
  const openTickets = customerTickets.filter((t) => t.status === 'Open' || t.status === 'Assigned' || t.status === 'In Progress').length;
  const waitingCustomerTickets = customerTickets.filter((t) => t.status === 'Waiting for Customer').length;
  const resolvedTickets = customerTickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  const recentTickets = [...customerTickets].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);

  return (
    <CustomerLayout>
      <SEOHead
        title="Customer Support Dashboard | Sarita Infotech"
        description="Customer organization support dashboard for tracking active tickets, reviewing engineer updates, and accessing technical documentation."
      />

      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-900/80 text-brand-200 border border-brand-700/60">
              <Building2 className="w-3.5 h-3.5 text-brand-300" />
              <span>{currentCustomer?.organization} • {currentCustomer?.product}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {currentCustomer?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track resolution milestones for your licensed installation, submit diagnostic logs, and access version release notes.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2.5 w-full sm:w-auto">
            <Link
              id="dash-raise-ticket-btn"
              to="/customer/tickets/new"
              className="btn-primary text-xs py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 shadow-sm flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Raise a New Ticket</span>
            </Link>
            <Link
              to="/customer/tickets"
              className="btn-secondary text-xs py-2.5 px-4 text-center text-slate-800 bg-white hover:bg-slate-50"
            >
              <span>View All Tickets ({totalTickets})</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Tickets</span>
              <Ticket className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 font-mono">{totalTickets}</div>
            <div className="text-[11px] text-slate-500">Recorded for your organization</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
              <span>In Active Progress</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-amber-600 font-mono">{openTickets}</div>
            <div className="text-[11px] text-amber-700 font-medium">Assigned to engineering team</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
              <span>Awaiting Your Input</span>
              <AlertTriangle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600 font-mono">{waitingCustomerTickets}</div>
            <div className="text-[11px] text-blue-700 font-medium">Pending client confirmation</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
              <span>Resolved Cases</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-emerald-600 font-mono">{resolvedTickets}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Completed & closed SLAs</div>
          </div>
        </div>

        {/* Two-Column Grid: Recent Tickets & Knowledge Base */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tickets Table (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Recently Updated Tickets</h3>
                  <p className="text-xs text-slate-500">Live lifecycle progress for {currentCustomer?.organization}</p>
                </div>
                <Link to="/customer/tickets" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  <span>See all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentTickets.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Ticket className="w-10 h-10 text-slate-300 mx-auto" />
                  <div className="text-sm font-semibold text-slate-700">No support tickets filed yet</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    If you require assistance with your software installation or custom reporting, raise a new ticket.
                  </p>
                  <Link to="/customer/tickets/new" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1 mt-2">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Raise First Ticket</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentTickets.map((ticket) => (
                    <Link
                      key={ticket.id}
                      to={`/customer/tickets/${ticket.id}`}
                      className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 block"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-700">{ticket.id}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] text-slate-500 truncate">{ticket.siteReference || ticket.product}</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {ticket.subject}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>Updated {ticket.updatedAt}</span>
                          <span>•</span>
                          <span>Assigned: {ticket.assignedAgent.split('(')[0].trim()}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                        <StatusBadge status={ticket.priority} type="priority" />
                        <StatusBadge status={ticket.status} type="ticket" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Organization Isolation: Strict privacy applied to your records</span>
              </span>
              <Link to="/customer/tickets/new" className="font-semibold text-brand-600 hover:underline">
                + New Ticket
              </Link>
            </div>
          </div>

          {/* Quick Support & Knowledge Base Links (1 col) */}
          <div className="space-y-6">
            {/* Knowledge Base Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>Knowledge Base Guides</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step-by-step documentation for machine interfacing, advance license ledgers, and thermal printers.
              </p>
              <div className="space-y-2.5 pt-1">
                {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    to={`/support/knowledge-base/${article.slug}`}
                    className="block p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                      {article.product}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5 line-clamp-1">
                      {article.title}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/support/knowledge-base"
                className="block text-center text-xs font-semibold text-brand-600 hover:underline pt-1"
              >
                Browse All Guides ({KNOWLEDGE_ARTICLES.length}) →
              </Link>
            </div>

            {/* Emergency Support Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Headphones className="w-4 h-4" />
                <span>24/7 Dedicated Remote Support</span>
              </div>
              <h4 className="text-sm font-bold text-white">Need Live Engineer Assistance?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                For critical hospital billing stops or month-end cutoffs, contact our remote support engineers directly.
              </p>
              <div className="pt-1">
                <a
                  href="tel:+917990029373"
                  className="block w-full py-2 px-3 text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white shadow-sm transition-colors"
                >
                  Call +91 79900 29373
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
