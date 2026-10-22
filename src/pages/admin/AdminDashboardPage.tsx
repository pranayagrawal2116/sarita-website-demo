import React from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  CalendarCheck,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  Building2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { tickets, demoAppointments, customerAccounts } = useApp();

  // Support Ticket Metrics
  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'Assigned' || t.status === 'In Progress').length;
  const unassignedTickets = tickets.filter((t) => t.assignedAgent.toLowerCase().includes('unassigned')).length;
  const criticalHighTickets = tickets.filter((t) => t.priority === 'Critical' || t.priority === 'High').length;
  const waitingCustomerTickets = tickets.filter((t) => t.status === 'Waiting for Customer').length;
  const resolvedTickets = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  // Demo Appointment Metrics
  const upcomingDemos = demoAppointments.filter((d) => d.status === 'Confirmed').length;
  const awaitingDemos = demoAppointments.filter((d) => d.status === 'Awaiting Confirmation' || d.status === 'New Request').length;
  const completedDemos = demoAppointments.filter((d) => d.status === 'Completed').length;

  // Customer Approval Metrics
  const pendingCustomers = customerAccounts.filter((c) => c.status === 'Pending Approval').length;

  // Work queues
  const recentActionTickets = [...tickets]
    .filter((t) => t.status !== 'Closed')
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  const pendingDemosList = [...demoAppointments]
    .filter((d) => d.status === 'Awaiting Confirmation' || d.status === 'New Request' || d.status === 'Confirmed')
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate))
    .slice(0, 5);

  return (
    <AdminLayout>
      <SEOHead
        title="Operations Dashboard | Sarita Central Admin Console"
        description="Consolidated administration workspace for Sarita Infotech support engineering triage and software demo appointments."
      />

      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Central Operations & Dispatch Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unified Administrative Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Consolidating technical ticket triage, sales walkthrough reservations, and customer organization credentials.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              id="admin-review-demos-btn"
              to="/admin/demos"
              className="btn-primary text-xs py-2.5 px-4 bg-amber-600 hover:bg-amber-500 shadow-sm flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Review Demos ({awaitingDemos})</span>
            </Link>
            <Link
              id="admin-triage-tickets-btn"
              to="/admin/tickets"
              className="btn-primary text-xs py-2.5 px-4 bg-brand-600 hover:bg-brand-500 shadow-sm flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              <span>Triage Tickets ({openTickets})</span>
            </Link>
            {pendingCustomers > 0 && (
              <Link
                to="/admin/customers"
                className="btn-primary text-xs py-2.5 px-4 bg-rose-600 hover:bg-rose-500 shadow-sm flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Approvals ({pendingCustomers})</span>
              </Link>
            )}
          </div>
        </div>

        {/* 8 Primary Operational KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Open Tickets</div>
            <div className="text-2xl font-bold text-slate-900 font-mono">{openTickets}</div>
            <div className="text-[11px] text-slate-500">Active engineering queue</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Unassigned Tickets</div>
            <div className="text-2xl font-bold text-rose-600 font-mono">{unassignedTickets}</div>
            <div className="text-[11px] text-rose-600 font-medium">Require agent allocation</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Critical / High Priority</div>
            <div className="text-2xl font-bold text-amber-600 font-mono">{criticalHighTickets}</div>
            <div className="text-[11px] text-amber-600 font-medium">Hospital & banking cutoffs</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Waiting for Client</div>
            <div className="text-2xl font-bold text-blue-600 font-mono">{waitingCustomerTickets}</div>
            <div className="text-[11px] text-slate-500">Pending customer response</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Demos Awaiting Confirmation</div>
            <div className="text-2xl font-bold text-amber-600 font-mono">{awaitingDemos}</div>
            <div className="text-[11px] text-amber-700 font-medium">Slot confirmation required</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Upcoming Demos</div>
            <div className="text-2xl font-bold text-emerald-600 font-mono">{upcomingDemos}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Confirmed appointments</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Demos Completed</div>
            <div className="text-2xl font-bold text-slate-700 font-mono">{completedDemos}</div>
            <div className="text-[11px] text-slate-500">Walkthroughs delivered</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Resolved Tickets</div>
            <div className="text-2xl font-bold text-emerald-600 font-mono">{resolvedTickets}</div>
            <div className="text-[11px] text-emerald-600 font-medium">Closed SLAs</div>
          </div>
        </div>

        {/* Dual Operational Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Support Work Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Support Work Queue</h3>
                  <p className="text-xs text-slate-500">Tickets needing assignment or client follow-up</p>
                </div>
                <Link to="/admin/tickets" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  <span>View All ({tickets.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {recentActionTickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    to={`/admin/tickets/${ticket.id}`}
                    className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 block"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-700">{ticket.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-semibold text-slate-700 truncate">{ticket.organization}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {ticket.subject}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>Agent: {ticket.assignedAgent.split('(')[0].trim()}</span>
                        <span>•</span>
                        <span>Updated: {ticket.updatedAt}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <StatusBadge status={ticket.priority} type="priority" />
                      <StatusBadge status={ticket.status} type="ticket" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
              <Link to="/admin/tickets" className="text-xs font-semibold text-brand-600 hover:underline">
                Manage Support Queue →
              </Link>
            </div>
          </div>

          {/* Demo Appointments Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Software Demos Queue</h3>
                  <p className="text-xs text-slate-500">Upcoming & awaiting slot confirmations</p>
                </div>
                <Link to="/admin/demos" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  <span>View All ({demoAppointments.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {pendingDemosList.map((demo) => (
                  <Link
                    key={demo.id}
                    to={`/admin/demos/${demo.id}`}
                    className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 block"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-700">{demo.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-semibold text-slate-700 truncate">{demo.organization}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {demo.productInterest}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{demo.preferredDate} ({demo.preferredTimeSlot})</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          demo.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : demo.status === 'Awaiting Confirmation'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {demo.status}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {demo.assignedSalesRep.split('(')[0].trim()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
              <Link to="/admin/demos" className="text-xs font-semibold text-brand-600 hover:underline">
                Open Agenda & Confirmed Demos →
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Accounts Pending Verification Banner */}
        {pendingCustomers > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <strong className="font-semibold">{pendingCustomers} Customer Registration(s) Awaiting Review:</strong>
                <span className="text-amber-800 ml-1.5">
                  New organizations have requested support access. Review credentials to authorize ticket access.
                </span>
              </div>
            </div>
            <Link
              to="/admin/customers"
              className="btn-primary text-xs py-1.5 px-3 bg-amber-600 hover:bg-amber-700 whitespace-nowrap"
            >
              Review Customer Registrations →
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
