import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building,
  User,
  Plus
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { DemoBookingStatus } from '../../types';

export const AdminDemosPage: React.FC = () => {
  const { demoAppointments, checkDemoConflict } = useApp();

  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'table' | 'agenda'>('table');

  const filteredDemos = demoAppointments.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.organization.toLowerCase().includes(search.toLowerCase());

    const matchesProduct = productFilter === 'all' || d.productInterest.includes(productFilter);
    const matchesStatus = statusFilter === 'all' || d.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesProduct && matchesStatus;
  });

  // Sort upcoming demos chronologically
  const sortedUpcoming = [...demoAppointments]
    .filter((d) => d.status === 'Confirmed' || d.status === 'Rescheduled')
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate));

  return (
    <AdminLayout>
      <SEOHead
        title="Demo Appointment Scheduling Management | Sarita Central Admin"
        description="Review, confirm, and reschedule corporate software walkthroughs and sales demonstrations."
      />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Software Demo Appointments</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sales pipeline walkthroughs for Sarita HealthCare, Nimble, BankWare, and Retail.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Tabular View
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'agenda' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Agenda Calendar View
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="admin-demo-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by demo ID, lead name, or company..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <span className="text-slate-500">Product:</span>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Products</option>
                <option value="HealthCare">Sarita HealthCare</option>
                <option value="Nimble">Sarita Nimble</option>
                <option value="BankWare">Sarita BankWare</option>
                <option value="Retail">Sarita Retail</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <span className="text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
              >
                <option value="all">All Statuses ({demoAppointments.length})</option>
                <option value="awaiting confirmation">Awaiting Confirmation</option>
                <option value="confirmed">Confirmed</option>
                <option value="new request">New Request</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab 1: Tabular View */}
        {activeTab === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Demo Ref</th>
                    <th className="py-3 px-4">Organization & Contact</th>
                    <th className="py-3 px-4">Product Suite</th>
                    <th className="py-3 px-4">Requested Slot</th>
                    <th className="py-3 px-4">Booking Status</th>
                    <th className="py-3 px-4">Assigned Consultant</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredDemos.map((demo) => {
                    const hasConflict = checkDemoConflict(demo.preferredDate, demo.preferredTimeSlot, demo.id);
                    return (
                      <tr key={demo.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                          <Link to={`/admin/demos/${demo.id}`} className="hover:underline">
                            {demo.id}
                          </Link>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <Link to={`/admin/demos/${demo.id}`} className="font-semibold text-slate-900 hover:text-brand-600 line-clamp-1">
                            {demo.organization}
                          </Link>
                          <div className="text-[11px] text-slate-500 truncate">
                            {demo.name} • {demo.phone}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-800">
                          {demo.productInterest}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">{demo.preferredDate}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{demo.preferredTimeSlot}</div>
                          {hasConflict && demo.status !== 'Confirmed' && (
                            <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-3 h-3" /> Slot Conflict!
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              demo.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : demo.status === 'Awaiting Confirmation'
                                ? 'bg-amber-100 text-amber-900 font-medium'
                                : demo.status === 'Completed'
                                ? 'bg-slate-100 text-slate-700'
                                : demo.status === 'Rescheduled'
                                ? 'bg-blue-100 text-blue-900'
                                : demo.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-purple-100 text-purple-900'
                            }`}
                          >
                            {demo.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-700">
                          {demo.assignedSalesRep.split('(')[0].trim()}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <Link
                            to={`/admin/demos/${demo.id}`}
                            className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 p-1 rounded hover:bg-brand-50"
                          >
                            <span>Manage</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredDemos.length} demo appointment records</span>
              <span className="font-mono text-[11px]">Conflict Engine Enforced</span>
            </div>
          </div>
        )}

        {/* Tab 2: Agenda Calendar View */}
        {activeTab === 'agenda' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Confirmed Demonstrations Agenda</h3>
                <p className="text-xs text-slate-500">Upcoming reserved slots organized chronologically</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {sortedUpcoming.length} Confirmed Slots
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {sortedUpcoming.map((demo) => (
                <div key={demo.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-700">{demo.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      {demo.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{demo.organization}</h4>
                    <p className="text-xs text-slate-500">{demo.name} ({demo.phone})</p>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span>{demo.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{demo.preferredTimeSlot}</span>
                    </div>
                    <div className="text-[11px] text-brand-700 font-medium">
                      Product: {demo.productInterest}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Rep: {demo.assignedSalesRep.split('(')[0].trim()}</span>
                    <Link to={`/admin/demos/${demo.id}`} className="font-semibold text-brand-600 hover:underline">
                      Review Slot →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
