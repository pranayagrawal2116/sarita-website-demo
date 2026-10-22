import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Clock, ShieldAlert, LogOut, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const CustomerProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentCustomer, logoutCustomer } = useApp();
  const location = useLocation();

  if (!currentCustomer) {
    return <Navigate to={`/customer/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (currentCustomer.status === 'Pending Approval') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              Account Status: Pending Approval
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-3">Organization Verification in Progress</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your customer account for <strong className="text-slate-900">{currentCustomer.organization}</strong> (Ref: {currentCustomer.accountReference}) has been registered and is pending review by Sarita Infotech client administration.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-left space-y-1.5">
            <div className="font-semibold text-slate-800">Security Rule Enforced:</div>
            <p className="text-[11px] leading-normal text-slate-500">
              Under corporate data protection guidelines, support tickets, proprietary software patches, and site installation records cannot be accessed until account credentials and domain ownership are verified.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <Phone className="w-3 h-3 text-brand-600" />
              <span>Need immediate assistance? Call {COMPANY_INFO.supportPhone}</span>
            </div>
            <button
              onClick={logoutCustomer}
              className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-1.5 mt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out & Return to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentCustomer.status === 'Suspended') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 shadow-card p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-900 border border-rose-300">
              Account Status: Suspended
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-3">Account Temporarily Suspended</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Access for <strong className="text-slate-900">{currentCustomer.organization}</strong> has been suspended. Please contact your dedicated account manager or Sarita Infotech support desk to resolve billing or licensing verification.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={logoutCustomer}
              className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
