import React from 'react';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { Building2, User, Mail, Phone, ShieldCheck, Hash, Calendar, Award } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { currentCustomer } = useApp();

  return (
    <CustomerLayout>
      <SEOHead
        title="Organization Profile | Sarita Customer Portal"
        description="Customer account details and organization licensing credentials."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified enterprise licensing and contact records with Sarita Infotech Pvt. Ltd.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500 text-white font-bold flex items-center justify-center text-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{currentCustomer?.organization}</h2>
                <div className="text-xs text-brand-300 font-mono">ID: {currentCustomer?.organizationId}</div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Status: {currentCustomer?.status}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Primary Contact Person</span>
                <span className="font-semibold text-slate-900 text-sm">{currentCustomer?.name}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Authorized Work Email</span>
                <span className="font-semibold text-slate-900 text-sm font-mono">{currentCustomer?.email}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Direct Telephone / Mobile</span>
                <span className="font-semibold text-slate-900 text-sm">{currentCustomer?.phone}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Contract Account Reference</span>
                <span className="font-semibold text-brand-700 text-sm font-mono">{currentCustomer?.accountReference}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Active Software Suite</span>
                <span className="font-semibold text-slate-900 text-sm">{currentCustomer?.product}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Customer Onboarding Date</span>
                <span className="font-semibold text-slate-900 text-sm">{currentCustomer?.createdAt}</span>
              </div>
            </div>

            {/* SLA Badge Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-bold text-slate-900">Annual Maintenance Contract (AMC) Platinum</div>
                  <div className="text-slate-500 text-[11px]">2-Hour Priority SLA • Direct Telephonic & Remote Access</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                Active Tier-1
              </span>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
