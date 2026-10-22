import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, ShieldAlert, CheckCircle2, AlertCircle, ArrowRight, Lock, Mail } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';

export const PartnerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginPartner, partnerProfile } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemoCredentials = () => {
    setEmail(partnerProfile.email);
    setPassword('PartnerDemo2025!');
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your partner email and password.');
      return;
    }

    const success = loginPartner(email, password);
    if (success) {
      navigate('/partners/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Channel Partner Portal Login | Sarita Infotech"
        description="Authorized channel partner login for lead registration, deal pipeline tracking, and sales collateral access."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full space-y-6">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Channel Partner Portal
              </h2>
              <p className="text-xs text-slate-500">
                Log in to register prospect leads and manage your deal pipeline
              </p>
            </div>

            {/* One-Click Demo Credentials Box */}
            <div className="p-3.5 bg-brand-50/80 border border-brand-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-900">Demonstration Quick Access</span>
                <span className="px-2 py-0.5 rounded bg-brand-200 text-brand-900 font-mono text-[10px]">Demo Mode</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-tight">
                Click below to auto-fill verified mock credentials for <strong>{partnerProfile.companyName}</strong> ({partnerProfile.partnerTier}).
              </p>
              <button
                type="button"
                onClick={handleFillDemoCredentials}
                className="w-full py-1.5 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs shadow-sm transition-all"
              >
                Auto-Fill Demo Partner Credentials
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Partner Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@company.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo Mode: Use password "PartnerDemo2025!"')}
                    className="text-[11px] text-brand-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                  />
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
                type="submit"
                className="w-full btn-primary py-2.5 text-sm shadow-sm"
              >
                Sign In to Partner Portal
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Not yet an authorized channel partner?{' '}
              <Link to="/partners/request-access" className="text-brand-600 font-semibold hover:underline">
                Request Partner Access →
              </Link>
            </div>
          </div>

          {/* Security Disclaimer Note */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="leading-relaxed">
              <strong>Production Security Standard:</strong> Live deployment requires server-side authentication, JWT session verification, role-based access control, tenant isolation, and audit logging.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
