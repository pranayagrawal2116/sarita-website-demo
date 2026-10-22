import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { COMPANY_INFO } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    department: 'Sales & Product Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      showToast('Thank you! Your message has been received.', 'success');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Contact Us | Sarita Infotech Pvt. Ltd."
        description="Get in touch with Sarita Infotech Pvt. Ltd. at our Surat headquarters. Speak with our sales, support, or partnership team."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <Mail className="w-3.5 h-3.5" />
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Discuss How We Can Support Your Operations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our software specialists are ready to discuss product capabilities, architectural customizations, and implementation roadmaps.
          </p>
        </div>
      </section>

      {/* Content Grid: Form + Address Info */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us an Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the form below and our team will get back to you within 1 business day.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900">Message Received</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. In production, this inquiry routes directly to our Surat sales desk.
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-2">
                  [Simulated Prototype Action]
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Company / Organization <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Care Hospital or AeroTex Exports"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98250 00000"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Department of Interest
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="Sales & Product Inquiry">Sales & Product Inquiry</option>
                    <option value="Hospital HMIS (Sarita HealthCare)">Hospital HMIS (Sarita HealthCare)</option>
                    <option value="EXIM Software (Sarita Nimble)">EXIM Software (Sarita Nimble)</option>
                    <option value="Banking Software (Sarita BankWare)">Banking Software (Sarita BankWare)</option>
                    <option value="Retail Management (Sarita Retail)">Retail Management (Sarita Retail)</option>
                    <option value="Channel Partner Program">Channel Partner Program</option>
                    <option value="Support / Helpdesk">Customer Support Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message / Requirements <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your organization's requirements..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button type="submit" className="btn-primary py-2.5 px-6">
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Verified Company Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-400">
                  Registered Corporate Headquarters
                </span>
                <h4 className="text-xl font-bold text-white mt-1">
                  Sarita Infotech Pvt. Ltd.
                </h4>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-white block mb-0.5">Physical Office Address:</strong>
                    {COMPANY_INFO.headquarters.addressLine1},<br />
                    {COMPANY_INFO.headquarters.addressLine2},<br />
                    {COMPANY_INFO.headquarters.city} - {COMPANY_INFO.headquarters.postalCode} ({COMPANY_INFO.headquarters.state}), India
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Telephone / WhatsApp:</strong>
                    <a href={`tel:${COMPANY_INFO.supportPhone.replace(/\s+/g, '')}`} className="text-brand-300 hover:underline">
                      {COMPANY_INFO.supportPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Official Inquiries:</strong>
                    <a href={`mailto:${COMPANY_INFO.inquiryEmail}`} className="text-brand-300 hover:underline">
                      {COMPANY_INFO.inquiryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Business Hours:</strong>
                    Monday – Saturday: 9:30 AM – 6:30 PM IST
                  </div>
                </div>
              </div>

              {/* WhatsApp direct button */}
              <div className="pt-2">
                <a
                  href={COMPANY_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Support / Partner cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs space-y-3">
              <h5 className="font-bold text-slate-900 text-sm">Existing Customers & Partners</h5>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                <span>Looking for technical assistance?</span>
                <a href="/support" className="text-brand-600 font-semibold hover:underline">Support Desk →</a>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                <span>Authorized channel partners:</span>
                <a href="/partners/login" className="text-brand-600 font-semibold hover:underline">Partner Login →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
