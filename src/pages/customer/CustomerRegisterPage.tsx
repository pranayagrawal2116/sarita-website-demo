import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ShieldCheck, CheckCircle2, AlertCircle, Building, Mail, Phone, Lock, Hash } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';

export const CustomerRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerCustomer } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    organizationId: '',
    accountReference: '',
    product: 'Sarita HealthCare',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid work email address';
    }

    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orgId = `ORG-${formData.organization.substring(0, 4).toUpperCase().replace(/\s/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const accRef = formData.accountReference.trim() || `ACT-${Math.floor(1000 + Math.random() * 9000)}`;

    registerCustomer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      organizationId: orgId,
      accountReference: accRef,
      product: formData.product
    });

    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Register Customer Account | Sarita Infotech Support Desk"
        description="Register your hospital, export house, cooperative society, or retail enterprise for Sarita Infotech support services."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-xl w-full space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-10 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
                Client Registration Desk
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Register Customer Account</h2>
              <p className="text-xs text-slate-500 mt-1">
                For existing licensed clients of Sarita HealthCare, Nimble, BankWare, and Retail.
              </p>
            </div>

            {/* Approval Workflow Notice */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Account Verification Policy</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                To safeguard confidential patient data, EXIM manifests, and banking ledger configurations, new client registrations require company authorization and are created in <strong>Pending Approval</strong> state before ticket access is granted.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Hitesh Shah"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="reg-org" className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-org"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Surat Cardiac Institute"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.organization ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.organization && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.organization}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hitesh@cardiac.example.in"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98250 11223"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.phone}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-product" className="block text-xs font-semibold text-slate-700 mb-1">
                    Licensed Software Product <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="reg-product"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="Sarita HealthCare">Sarita HealthCare (HMIS)</option>
                    <option value="Sarita Nimble">Sarita Nimble (EXIM Trade)</option>
                    <option value="Sarita BankWare">Sarita BankWare (Co-Op Banking)</option>
                    <option value="Sarita Retail">Sarita Retail (POS & Stores)</option>
                    <option value="Custom Software Solution">Custom Software Solution</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reg-ref" className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer ID / Account Ref (Optional)
                  </label>
                  <input
                    id="reg-ref"
                    type="text"
                    value={formData.accountReference}
                    onChange={(e) => setFormData({ ...formData, accountReference: e.target.value })}
                    placeholder="e.g. ACT-SURAT-2026 or leave blank"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-pass" className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-pass"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.password ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.password && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.password}</span>}
                </div>

                <div>
                  <label htmlFor="reg-confirm" className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-confirm"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.confirmPassword ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.confirmPassword && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="reg-submit-btn"
                  type="submit"
                  className="w-full btn-primary py-3 text-sm shadow-sm bg-emerald-600 hover:bg-emerald-500"
                >
                  Submit Registration for Approval
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an approved customer account?{' '}
              <Link to="/customer/login" className="font-semibold text-brand-600 hover:underline">
                Sign In here
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
