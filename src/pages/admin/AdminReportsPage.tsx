import React from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminReportsPage: React.FC = () => {
  const { tickets, demoAppointments, customerAccounts } = useApp();

  // Aggregate Tickets by Product
  const productTickets = tickets.reduce((acc, t) => {
    acc[t.product] = (acc[t.product] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Aggregate Tickets by Status
  const statusCounts = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Aggregate Tickets by Priority
  const priorityCounts = tickets.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Aggregate Demo Appointments by Status
  const demoStatusCounts = demoAppointments.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const resolvedCount = (statusCounts['Resolved'] || 0) + (statusCounts['Closed'] || 0);
  const resolutionRate = tickets.length > 0 ? Math.round((resolvedCount / tickets.length) * 100) : 100;

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
            Operations & Quality Intelligence
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Operational Analytics & Reports</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Executive metrics on ticket resolution efficiency, product support distribution, and demo pipeline velocity.
        </p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Support Volume</span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{tickets.length}</div>
          <span className="text-[11px] text-slate-400">Tickets logged across all clients</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-700">Resolution Rate</span>
          <div className="mt-2 text-3xl font-extrabold text-emerald-700">{resolutionRate}%</div>
          <span className="text-[11px] text-slate-400">{resolvedCount} of {tickets.length} closed or resolved</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-brand-600">Active Pipeline Demos</span>
          <div className="mt-2 text-3xl font-extrabold text-brand-700">{demoAppointments.length}</div>
          <span className="text-[11px] text-slate-400">Scheduled walkthroughs</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Avg. First Response SLA</span>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">1.8 hrs</div>
          <span className="text-[11px] text-emerald-600 font-medium">96.4% within contract SLA</span>
        </div>
      </div>

      {/* Two Column Grid for Breakdown Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Tickets by Product */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              Tickets by Product
            </h3>
            <span className="text-xs text-slate-400">Volume share</span>
          </div>

          <div className="space-y-3">
            {Object.entries(productTickets).map(([product, count]) => {
              const percent = Math.round((count / tickets.length) * 100);
              return (
                <div key={product} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>{product}</span>
                    <span className="text-slate-500">
                      {count} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tickets by Priority */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Ticket Severity Distribution
            </h3>
            <span className="text-xs text-slate-400">Priority triage</span>
          </div>

          <div className="space-y-3">
            {(['Critical', 'High', 'Normal', 'Low'] as const).map((priority) => {
              const count = priorityCounts[priority] || 0;
              const percent = tickets.length > 0 ? Math.round((count / tickets.length) * 100) : 0;
              const barColor =
                priority === 'Critical'
                  ? 'bg-rose-500'
                  : priority === 'High'
                  ? 'bg-amber-500'
                  : priority === 'Normal'
                  ? 'bg-blue-500'
                  : 'bg-slate-400';

              return (
                <div key={priority} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${barColor}`} />
                      {priority}
                    </span>
                    <span className="text-slate-500">
                      {count} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Appointment Status Breakdown */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-600" />
            Demonstration Scheduling Pipeline Status
          </h3>
          <span className="text-xs text-slate-400">Total: {demoAppointments.length} bookings</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {Object.entries(demoStatusCounts).map(([status, count]) => (
            <div key={status} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
              <span className="text-[11px] font-medium text-slate-500 block truncate">{status}</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">{count}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};
