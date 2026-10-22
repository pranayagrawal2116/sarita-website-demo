import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, CheckCircle2, ShieldCheck, ArrowRight, Building, Phone, Mail } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';

export const PartnerRequestAccessPage: React.FC = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    state: 'Gujarat',
    primaryFocus: 'Healthcare & Hospitals',
    currentTeamSize: '5-15 employees',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName && formData.email && formData.phone) {
      setSubmitted(true);
      showToast('Partner application recorded successfully!', 'success');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Apply for Partner Program | Sarita Infotech"
        description="Join our authorized reseller network to distribute Sarita HealthCare, Sarita Nimble, and Sarita BankWare."
      />
      <Header />

      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <Handshake className="w-3.5 h-3.5" />
            Partner Network Onboarding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apply to Become an Authorized Partner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Expand your solutions portfolio with high-retention enterprise business software.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Partner Application Recorded</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactPerson}</strong>. Your partner profile for <strong>{formData.companyName}</strong> has been logged in our demonstration sandbox.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-md mx-auto">
                <span className="font-semibold text-slate-800">Demonstration Prototype Notice:</span> In production, our Channel Alliances Director contacts your management to conduct territorial verification and execute mutual NDA/reseller agreements.
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <Link to="/partners/login" className="btn-primary text-xs py-2 px-4">
                  Log in with Demo Partner
                </Link>
                <Link to="/" className="btn-secondary text-xs py-2 px-4">
                  Back to Public Website
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h3 className="text-lg font-bold text-slate-900">Channel Partner Application</h3>
                <p className="text-xs text-slate-500">Submit your organization profile to begin evaluation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    IT Firm / Consultancy Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Infotech Solutions"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Managing Partner / Contact Person <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Devendra Parekh"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="devendra@company.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98255 00000"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary City & Territory <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ahmedabad / Surat / Mumbai"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Domain Focus
                  </label>
                  <select
                    value={formData.primaryFocus}
                    onChange={(e) => setFormData({ ...formData, primaryFocus: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="Healthcare & Hospitals">Healthcare & Hospitals</option>
                    <option value="Export / Import & EXIM Trade">Export / Import & EXIM Trade</option>
                    <option value="Cooperative Banking & Credit">Cooperative Banking & Credit</option>
                    <option value="Retail & Multi-Store">Retail & Multi-Store</option>
                    <option value="Multiple Verticals">Multiple Verticals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Overview of Your Current Client Base or Geographic Reach
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your existing clients, hardware integrations, or reseller experience..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-primary py-2.5 px-6">
                  Submit Partner Application
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
