import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  UserX,
  RefreshCw,
  Ticket,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerAccountStatus } from '../../types';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminCustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customerAccounts, tickets, demoAppointments, updateCustomerAccountStatus, showToast } = useApp();

  const customer = customerAccounts.find((c) => c.id === id || c.accountReference === id);

  if (!customer) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Customer Account Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          The requested customer record does not exist or may have been removed.
        </p>
        <Link to="/admin/customers" className="btn-primary text-xs py-2 px-4 inline-block">
          &larr; Return to Customer Accounts
        </Link>
      </div>
    );
  }

  // Get tickets associated with this customer's organization
  const orgTickets = tickets.filter(
    (t) => t.organizationId === customer.organizationId || t.email === customer.email
  );

  // Get demo requests associated with this customer
  const orgDemos = demoAppointments.filter(
    (d) =>
      d.businessEmail.toLowerCase() === customer.email.toLowerCase() ||
      d.organization.toLowerCase() === customer.organization.toLowerCase()
  );

  const handleStatusUpdate = (newStatus: CustomerAccountStatus) => {
    updateCustomerAccountStatus(customer.id, newStatus);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/customers"
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                {customer.accountReference}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  customer.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : customer.status === 'Pending Approval'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {customer.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                {customer.status === 'Pending Approval' && <Clock className="w-3 h-3" />}
                {customer.status === 'Suspended' && <AlertTriangle className="w-3 h-3" />}
                {customer.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{customer.organization}</h1>
          </div>
        </div>

        {/* Status Actions */}
        <div className="flex items-center gap-2">
          {customer.status === 'Pending Approval' && (
            <button
              onClick={() => handleStatusUpdate('Active')}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              Approve Customer Account
            </button>
          )}
          {customer.status === 'Active' && (
            <button
              onClick={() => handleStatusUpdate('Suspended')}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <UserX className="w-4 h-4" />
              Suspend Portal Access
            </button>
          )}
          {customer.status === 'Suspended' && (
            <button
              onClick={() => handleStatusUpdate('Active')}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reactivate Account
            </button>
          )}
        </div>
      </div>

      {/* Two Column Layout: Organization Profile & Support History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Account & Organization Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" />
              Organization Identity
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Organization Name</span>
                <span className="text-sm font-semibold text-slate-900">{customer.organization}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Organization ID</span>
                <span className="font-mono text-slate-800 font-medium">{customer.organizationId}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Primary Authorized Contact</span>
                <span className="text-slate-800 font-semibold">{customer.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Contact Email</span>
                <a href={`mailto:${customer.email}`} className="text-brand-600 hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {customer.email}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Contact Phone</span>
                <a href={`tel:${customer.phone}`} className="text-slate-700 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {customer.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Registered Date</span>
                <span className="text-slate-700">{customer.createdAt}</span>
              </div>

              {customer.lastLogin && (
                <div>
                  <span className="text-slate-400 block font-medium">Last Login</span>
                  <span className="text-slate-700">{customer.lastLogin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Software License & AMC Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              Software License & Support Tier
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Core Product</span>
                <span className="font-semibold text-slate-900">{customer.product}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Support Agreement</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-semibold">
                  Gold Annual Maintenance
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Target Response SLA</span>
                <span className="font-medium text-slate-800">&lt; 4 Hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Deployment</span>
                <span className="font-medium text-slate-800">On-Premise Server + Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Tickets & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Organization Support Tickets */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Organization Support Tickets ({orgTickets.length})
                </h3>
              </div>
              <span className="text-xs text-slate-400">Strictly isolated to this organization</span>
            </div>

            {orgTickets.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No support tickets have been registered for this organization yet.
              </div>
            ) : (
              <div className="space-y-3">
                {orgTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-700">{t.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            t.status === 'Resolved' || t.status === 'Closed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : t.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {t.status}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                          {t.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900">{t.subject}</h4>
                      <p className="text-slate-500 line-clamp-1">{t.description}</p>
                    </div>

                    <div className="flex items-center gap-3 sm:flex-col sm:items-end flex-shrink-0">
                      <span className="text-[11px] text-slate-400">{t.updatedAt}</span>
                      <Link
                        to={`/admin/tickets/${t.id}`}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium transition-colors"
                      >
                        Manage &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demonstration Inquiries */}
          {orgDemos.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Demonstration Inquiries & History ({orgDemos.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {orgDemos.map((demo) => (
                  <div
                    key={demo.id}
                    className="p-3 rounded-lg border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-700">{demo.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {demo.status}
                        </span>
                      </div>
                      <div className="text-slate-700 mt-1">
                        Scheduled for: <strong>{demo.preferredDate}</strong> ({demo.preferredTimeSlot})
                      </div>
                    </div>
                    <Link
                      to={`/admin/demos/${demo.id}`}
                      className="px-2.5 py-1 text-xs border border-slate-200 rounded hover:bg-slate-50 text-slate-700"
                    >
                      View Demo &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};
