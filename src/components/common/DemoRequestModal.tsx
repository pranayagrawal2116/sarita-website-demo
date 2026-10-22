import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductId } from '../../types';
import { PRODUCTS } from '../../data/productsData';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: ProductId | 'all';
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  initialProductId = 'all'
}) => {
  const { submitDemoRequest } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    businessEmail: '',
    phone: '',
    industry: 'Healthcare',
    productInterest: initialProductId,
    organizationSize: '20-50 users',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialProductId) {
      setFormData((prev) => ({ ...prev, productInterest: initialProductId }));
    }
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMessage(null);
      setErrors({});
    }
  }, [isOpen, initialProductId]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization name is required';
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required';
    } else if (!emailRegex.test(formData.businessEmail)) {
      errs.businessEmail = 'Please provide a valid business email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please provide a valid phone number (at least 8 digits)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitDemoRequest(formData);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred while processing your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-brand-300 font-semibold">
              Live Software Demonstration
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">Request a Product Demo</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Demonstration Request Recorded</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in <span className="font-semibold text-slate-900">{formData.organization}</span>. In a production environment, our senior solutions consultant would connect with you within 24 hours to schedule a tailored walkthrough.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 max-w-md mx-auto">
                <span className="font-semibold text-slate-800">Demonstration Prototype Notice:</span> This request was simulated and recorded locally in your browser session. No actual external email was dispatched.
              </div>
              <div className="pt-2">
                <button onClick={onClose} className="btn-primary">
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {errorMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Hospital / Firm <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Navjeevan Health Services"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ${
                      errors.organization ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.organization && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.organization}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ${
                      errors.businessEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.businessEmail && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.businessEmail}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98250 00000"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.phone}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product of Interest <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value as ProductId | 'all' })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="all">Enterprise Suite / Multiple Products</option>
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.badge.split('(')[0].trim()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization User Base / Scale
                  </label>
                  <select
                    value={formData.organizationSize}
                    onChange={(e) => setFormData({ ...formData, organizationSize: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="Single Location (1-10 users)">Single Location (1-10 users)</option>
                    <option value="Medium Facility (11-50 users)">Medium Facility (11-50 users)</option>
                    <option value="Hospital / Large Enterprise (50-200+ users)">Hospital / Large Enterprise (50-200+ users)</option>
                    <option value="Multi-Branch Network">Multi-Branch Network</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Requirements or Operational Focus Areas
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your current challenges, software transition plans, or desired timelines..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>We respect your privacy. In this prototype, data is stored locally for demonstration review.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    'Submit Demo Request'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
