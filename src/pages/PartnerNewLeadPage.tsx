import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldCheck, CheckCircle2, Building, Mail, Phone, MapPin } from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';

export const PartnerNewLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPartnerLead } = useApp();

  const [formData, setFormData] = useState({
    prospectName: '',
    organization: '',
    email: '',
    phone: '',
    productInterest: 'Sarita HealthCare',
    region: 'Surat, Gujarat',
    expectedTimeline: '1-3 months',
    notes: '',
    estimatedValue: '₹3,50,000'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.prospectName.trim()) errs.prospectName = 'Prospect contact name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }

    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.region.trim()) errs.region = 'Territory region is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addPartnerLead(formData);
    navigate('/partners/leads');
  };

  return (
    <PartnerLayout>
      <SEOHead
        title="Register Prospect Lead | Sarita Partner Portal"
        description="Register a new prospect organization to lock in territory protection and initiate co-selling."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/partners/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Registered Leads</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
              Deal Registration Form
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Register a New Client Lead</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Filing a lead secures 90-day territory deal protection for your partner account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-prospect-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Prospect Decision Maker Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-prospect-name"
                  type="text"
                  value={formData.prospectName}
                  onChange={(e) => setFormData({ ...formData, prospectName: e.target.value })}
                  placeholder="e.g. Dr. Hitesh Shah"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.prospectName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.prospectName && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.prospectName}</span>}
              </div>

              <div>
                <label htmlFor="lead-organization" className="block text-xs font-semibold text-slate-700 mb-1">
                  Prospect Organization / Company <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. City Life Hospital"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.organization ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.organization && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.organization}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Prospect Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hitesh@citylife.example.in"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.email && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>}
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-phone"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product of Interest <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Sarita HealthCare">Sarita HealthCare (HMIS)</option>
                  <option value="Sarita Nimble">Sarita Nimble (EXIM Trade)</option>
                  <option value="Sarita BankWare">Sarita BankWare (Co-Op Banking)</option>
                  <option value="Sarita Retail">Sarita Retail (POS & Stores)</option>
                  <option value="Custom Engineering">Custom Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Region / City Territory <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g. Surat, Gujarat"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Timeline
                </label>
                <select
                  value={formData.expectedTimeline}
                  onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="Exploring for Next FY">Exploring for Next FY</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Deal Size
              </label>
              <input
                type="text"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                placeholder="e.g. ₹3,50,000"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opportunity Notes & Current System Context
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Details about existing software, specific module needs, or co-selling requirements..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/partners/leads" className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </Link>
              <button
                id="lead-submit-btn"
                type="submit"
                className="btn-primary py-2.5 px-6 shadow-sm"
              >
                Register Opportunity
              </button>
            </div>
          </form>
        </div>
      </div>
    </PartnerLayout>
  );
};
