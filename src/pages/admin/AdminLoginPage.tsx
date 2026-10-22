import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { DEFAULT_ADMIN } from '../../data/customerData';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/admin/dashboard';

  const handleFillDemo = () => {
    setEmail(DEFAULT_ADMIN.email);
    setPassword('SaritaAdmin2026!');
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide administrative credentials.');
      return;
    }

    const success = loginAdmin(email, password);
    if (success) {
      navigate(redirectPath);
    } else {
      setError('Invalid administrative credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-100">
      <SEOHead
        title="Administrative Console Login | Sarita Infotech"
        description="Secure central administration console for Sarita Infotech support triage, demo scheduling, and customer account management."
      />

      <div className="max-w-md w-full space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-xl mx-auto shadow-lg shadow-brand-500/20">
            SI
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Sarita Infotech Central Console
          </h1>
          <p className="text-xs text-slate-400">
            Unified operations management for support engineering and sales demos
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur">
          {/* Quick Demo Fill Box */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Demonstration Quick Login</span>
              <span className="px-2 py-0.5 rounded bg-brand-900 text-brand-300 font-mono text-[10px]">Staff Console</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Click below to auto-fill verified administrative credentials for <strong>{DEFAULT_ADMIN.name}</strong> ({DEFAULT_ADMIN.role}).
            </p>
            <button
              id="admin-autofill-btn"
              type="button"
              onClick={handleFillDemo}
              className="w-full py-1.5 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Auto-Fill Administrator Credentials
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label htmlFor="admin-email" className="block font-semibold text-slate-300 mb-1">
                Administrator Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@saritainfotech.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full btn-primary py-2.5 text-sm shadow-md bg-brand-600 hover:bg-brand-500"
            >
              Authorize & Enter Admin Workspace
            </button>
          </form>

          <div className="pt-3 border-t border-slate-700/60 text-center text-xs text-slate-400">
            <Link to="/" className="text-brand-400 hover:underline">
              ← Return to Sarita Infotech Public Website
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500">
          Sarita Infotech Pvt. Ltd. • Restricted Internal Systems • Surat HQ
        </div>
      </div>
    </div>
  );
};
