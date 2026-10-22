import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, ShieldAlert, CheckCircle2, AlertCircle, ArrowRight, Lock, Mail, Eye, EyeOff, UserCheck } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { INITIAL_CUSTOMERS } from '../../data/customerData';

export const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginCustomer, currentCustomer } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check redirect query param
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/customer/dashboard';

  const handleFillDemo = (type: 'active_hospital' | 'active_exim' | 'pending' | 'suspended') => {
    setError(null);
    if (type === 'active_hospital') {
      setEmail('rpatel@apexmed.example.in');
      setPassword('ApexHospital2026!');
    } else if (type === 'active_exim') {
      setEmail('mshah@aerotexglobal.example.com');
      setPassword('AeroTexTrade2026!');
    } else if (type === 'pending') {
      setEmail('suresh@citylife.example.in');
      setPassword('CityLifeRetail2026!');
    } else if (type === 'suspended') {
      setEmail('kgandhi@suspended.example.in');
      setPassword('SuspendedAccount2026!');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your business email and password.');
      return;
    }

    const res = loginCustomer(email, password);
    if (res.success) {
      navigate(redirectPath);
    } else if (res.status === 'Pending Approval') {
      navigate('/customer/dashboard'); // Protected route will render the pending approval view
    } else if (res.status === 'Suspended') {
      navigate('/customer/dashboard'); // Protected route will render the suspended view
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Customer Support Portal Login | Sarita Infotech"
        description="Authorized customer login for technical support ticket registration, live status tracking, and account management."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Customer Support Portal
              </h2>
              <p className="text-xs text-slate-500">
                Log in to register and track technical support tickets for your organization
              </p>
            </div>

            {/* Quick Demo Credentials Selection Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Demonstration One-Click Credentials</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-semibold">Demo Mode</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Select an authentic mock profile to experience active access, approval review, or suspension controls:
              </p>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  id="autofill-active-hospital"
                  type="button"
                  onClick={() => handleFillDemo('active_hospital')}
                  className="p-1.5 text-left rounded border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-[11px] transition-all"
                >
                  <div className="font-bold text-slate-800">Apex Hospital</div>
                  <div className="text-[10px] text-emerald-600 font-medium">Active (Sarita HealthCare)</div>
                </button>
                <button
                  id="autofill-active-exim"
                  type="button"
                  onClick={() => handleFillDemo('active_exim')}
                  className="p-1.5 text-left rounded border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/40 text-[11px] transition-all"
                >
                  <div className="font-bold text-slate-800">AeroTex Global</div>
                  <div className="text-[10px] text-blue-600 font-medium">Active (Sarita Nimble)</div>
                </button>
                <button
                  id="autofill-pending"
                  type="button"
                  onClick={() => handleFillDemo('pending')}
                  className="p-1.5 text-left rounded border border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/40 text-[11px] transition-all"
                >
                  <div className="font-bold text-slate-800">CityLife Retail</div>
                  <div className="text-[10px] text-amber-600 font-medium">Pending Approval Test</div>
                </button>
                <button
                  id="autofill-suspended"
                  type="button"
                  onClick={() => handleFillDemo('suspended')}
                  className="p-1.5 text-left rounded border border-slate-200 bg-white hover:border-rose-500 hover:bg-rose-50/40 text-[11px] transition-all"
                >
                  <div className="font-bold text-slate-800">Surat Traders</div>
                  <div className="text-[10px] text-rose-600 font-medium">Suspended Account Test</div>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label htmlFor="customer-email" className="block font-semibold text-slate-700 mb-1">
                  Customer Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="customer-password" className="font-semibold text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/customer/forgot-password"
                    className="text-[11px] text-brand-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="customer-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                id="customer-login-btn"
                type="submit"
                className="w-full btn-primary py-2.5 text-sm shadow-sm bg-emerald-600 hover:bg-emerald-500"
              >
                Sign In to Customer Desk
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
              <div>
                Need a customer account for your organization?{' '}
                <Link to="/customer/register" className="font-semibold text-brand-600 hover:underline">
                  Register Organization
                </Link>
              </div>
              <div>
                Not a customer yet?{' '}
                <Link to="/request-demo" className="font-semibold text-slate-700 hover:underline">
                  Schedule Software Walkthrough →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
