import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  Building2,
  Mail,
  Phone,
  Layers,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerAccount, CustomerAccountStatus } from '../../types';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminCustomersPage: React.FC = () => {
  const { customerAccounts, updateCustomerAccountStatus, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | CustomerAccountStatus>('All');
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    customer: CustomerAccount | null;
    targetStatus: CustomerAccountStatus;
  }>({
    open: false,
    customer: null,
    targetStatus: 'Active'
  });

  const filteredAccounts = customerAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountReference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = customerAccounts.length;
  const activeCount = customerAccounts.filter((a) => a.status === 'Active').length;
  const pendingCount = customerAccounts.filter((a) => a.status === 'Pending Approval').length;
  const suspendedCount = customerAccounts.filter((a) => a.status === 'Suspended').length;

  const handleStatusChange = (customer: CustomerAccount, targetStatus: CustomerAccountStatus) => {
    setConfirmModal({
      open: true,
      customer,
      targetStatus
    });
  };

  const confirmStatusChange = () => {
    if (confirmModal.customer) {
      updateCustomerAccountStatus(confirmModal.customer.id, confirmModal.targetStatus);
      setConfirmModal({ open: false, customer: null, targetStatus: 'Active' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              Directory & Access Control
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Customer Accounts & Organizations</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage client organization identities, approve self-service registrations, and enforce support portal access.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Accounts</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{totalCount}</div>
          <span className="text-[11px] text-slate-500">Registered organizations</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Active Licensed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{activeCount}</div>
          <span className="text-[11px] text-slate-500">Authorized for support</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">Pending Approval</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-900">{pendingCount}</div>
          <span className="text-[11px] text-amber-700">Awaiting identity review</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-700">Suspended</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-800">{suspendedCount}</div>
          <span className="text-[11px] text-slate-500">AMC expired / Inactive</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search organization, contact name, email, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Active', 'Pending Approval', 'Suspended'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Accounts Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Account / Ref</th>
                <th className="py-3 px-4">Organization & Contact</th>
                <th className="py-3 px-4">Product Licensed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    No customer accounts match the current filter.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                      <Link
                        to={`/admin/customers/${account.id}`}
                        className="text-brand-700 hover:underline flex items-center gap-1.5"
                      >
                        {account.accountReference}
                      </Link>
                      <span className="text-[10px] text-slate-400 block font-mono">{account.id}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{account.organization}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{account.name}</span>
                        <span>•</span>
                        <span className="text-slate-400">{account.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        <Layers className="w-3 h-3 text-slate-500" />
                        {account.product}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          account.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : account.status === 'Pending Approval'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {account.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                        {account.status === 'Pending Approval' && <Clock className="w-3 h-3" />}
                        {account.status === 'Suspended' && <AlertTriangle className="w-3 h-3" />}
                        {account.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {account.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {account.status === 'Pending Approval' && (
                          <button
                            onClick={() => handleStatusChange(account, 'Active')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Approve Customer Access"
                          >
                            <UserCheck className="w-3 h-3" />
                            Approve
                          </button>
                        )}
                        {account.status === 'Active' && (
                          <button
                            onClick={() => handleStatusChange(account, 'Suspended')}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Suspend Customer Portal Access"
                          >
                            <UserX className="w-3 h-3" />
                            Suspend
                          </button>
                        )}
                        {account.status === 'Suspended' && (
                          <button
                            onClick={() => handleStatusChange(account, 'Active')}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                            title="Reactivate Customer Account"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Reactivate
                          </button>
                        )}
                        <Link
                          to={`/admin/customers/${account.id}`}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          Details &rarr;
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && confirmModal.customer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Confirm Account Status Change
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Are you sure you want to set the account for{' '}
              <strong className="text-slate-900">{confirmModal.customer.organization}</strong> (
              {confirmModal.customer.name}) to{' '}
              <strong
                className={
                  confirmModal.targetStatus === 'Active'
                    ? 'text-emerald-700'
                    : confirmModal.targetStatus === 'Suspended'
                    ? 'text-rose-700'
                    : 'text-amber-700'
                }
              >
                {confirmModal.targetStatus}
              </strong>
              ?
            </p>
            {confirmModal.targetStatus === 'Active' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                The customer will now be authorized to sign in, raise support tickets, and view organization history.
              </div>
            )}
            {confirmModal.targetStatus === 'Suspended' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
                The customer will be blocked from viewing tickets and raising new tickets until reactivated.
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, customer: null, targetStatus: 'Active' })}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmStatusChange}
                className={`px-4 py-2 rounded-lg text-xs font-semibold text-white ${
                  confirmModal.targetStatus === 'Active'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Confirm {confirmModal.targetStatus}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};
