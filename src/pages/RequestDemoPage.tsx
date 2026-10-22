import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Calendar, Clock, Globe } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/productsData';
import { AVAILABLE_TIME_SLOTS } from '../data/demoData';
import { ProductId } from '../types';

export const RequestDemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') as ProductId | null;

  const { submitDemoRequest } = useApp();

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    businessEmail: '',
    phone: '',
    industry: 'Healthcare',
    productInterest: (productParam || 'all') as ProductId | 'all',
    organizationSize: '11-50 users',
    preferredDate: tomorrowString,
    preferredTimeSlot: AVAILABLE_TIME_SLOTS[1], // 11:30 AM - 12:30 PM IST
    timeZone: 'Asia/Kolkata (IST)',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({ ...prev, productInterest: productParam }));
    }
  }, [productParam]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization name is required';

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

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date for the demonstration';
    }

    if (!formData.preferredTimeSlot) {
      errs.preferredTimeSlot = 'Please select a preferred time slot';
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
        setSubmittedId(res.id);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred while processing your demo request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Request a Software Demonstration | Sarita Infotech Pvt. Ltd."
        description="Schedule a customized demonstration of Sarita HealthCare, Sarita Nimble, Sarita BankWare, or Sarita Retail with our software specialists."
      />
      <Header />

      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <Sparkles className="w-3.5 h-3.5" />
            Live Demonstration Scheduling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Schedule a Customized Product Walkthrough
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Select your preferred date, time window, and software requirements. Our domain consultant will prepare a tailored session.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-10">
          {submittedId ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
                  Status: Awaiting Admin Slot Confirmation
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Demonstration Slot Requested</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your demonstration request for <strong className="text-slate-900">{formData.organization}</strong> has been logged in the central sales queue.
                </p>
              </div>

              {/* Booking Reference Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-medium text-slate-500">Booking Reference</span>
                  <span className="font-mono text-sm font-bold text-brand-700">{submittedId}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Requested Date</span>
                  <span className="font-semibold text-slate-800">{formData.preferredDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Requested Slot</span>
                  <span className="font-semibold text-slate-800">{formData.preferredTimeSlot}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Time Zone</span>
                  <span className="font-semibold text-slate-800">{formData.timeZone}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Product Interest</span>
                  <span className="font-semibold text-slate-800">
                    {formData.productInterest === 'all' ? 'Enterprise Suite / Multiple' : PRODUCTS.find(p => p.id === formData.productInterest)?.name || formData.productInterest}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-900 max-w-md mx-auto">
                <span className="font-semibold text-brand-950">Next Step:</span> A Sarita product specialist will verify consultant availability, avoid calendar conflicts, and confirm your video conference link via the Administration Management System.
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link to="/" className="btn-primary text-xs py-2 px-5">
                  Back to Homepage
                </Link>
                <Link to="/products" className="btn-secondary text-xs py-2 px-5">
                  Explore Products
                </Link>
                <Link to="/admin/demos" className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  View Demo in Admin Queue &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left text-xs sm:text-sm">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Your Contact & Organization Details</h3>
                <p className="text-xs text-slate-500">All fields marked with an asterisk (*) are required.</p>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="demo-name"
                    name="name"
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
                  <label htmlFor="demo-organization" className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="demo-organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Apex Hospital or Star Export House"
                    className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all ${
                      errors.organization ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.organization && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.organization}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="demo-email"
                    name="businessEmail"
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
                  <label htmlFor="demo-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="demo-phone"
                    name="phone"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-product" className="block text-xs font-semibold text-slate-700 mb-1">
                    Product of Interest <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="demo-product"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value as ProductId | 'all' })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="all">Enterprise Suite / Multiple Modules</option>
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.badge.split('(')[0].trim()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization Size / User Count
                  </label>
                  <select
                    value={formData.organizationSize}
                    onChange={(e) => setFormData({ ...formData, organizationSize: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="1-10 users">1-10 users (Single Location)</option>
                    <option value="11-50 users">11-50 users (Medium Facility)</option>
                    <option value="50-200+ users">50-200+ users (Hospital / Enterprise)</option>
                    <option value="Multi-Branch Network">Multi-Branch Network</option>
                  </select>
                </div>
              </div>

              {/* Preferred Appointment Date & Time Window */}
              <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <h4>Preferred Appointment Date & Time Window</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="demo-date" className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="demo-date"
                      type="date"
                      min={tomorrowString}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    />
                    {errors.preferredDate && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.preferredDate}</span>}
                  </div>

                  <div>
                    <label htmlFor="demo-timeslot" className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Time Window <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="demo-timeslot"
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      {AVAILABLE_TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.preferredTimeSlot && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.preferredTimeSlot}</span>}
                  </div>

                  <div>
                    <label htmlFor="demo-timezone" className="block text-xs font-medium text-slate-700 mb-1">
                      Time Zone
                    </label>
                    <select
                      id="demo-timezone"
                      value={formData.timeZone}
                      onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST, UTC+5:30)</option>
                      <option value="Asia/Dubai (GST)">Asia/Dubai (GST, UTC+4:00)</option>
                      <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT, UTC+8:00)</option>
                      <option value="Europe/London (GMT)">Europe/London (GMT, UTC+0:00)</option>
                      <option value="America/New_York (EST)">America/New_York (EST, UTC-5:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Functional Requirements or Operational Focus Areas
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your current system, custom report formats, or target deployment date..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Simulated demonstration submission. Data is safely kept in your local browser sandbox and immediately visible in the Admin Demo Queue.</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  id="demo-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary py-3 px-8 text-base shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    'Request Product Demonstration'
                  )}
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
