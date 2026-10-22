import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Paperclip, X, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';
import { TicketCategory, TicketPriority } from '../types';

export const RaiseTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTicket } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    organization: '',
    email: '',
    phone: '',
    product: 'Sarita HealthCare',
    siteReference: '',
    category: 'Technical Issue' as TicketCategory,
    priority: 'Medium' as TicketPriority,
    subject: '',
    description: '',
    attachments: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachmentInput, setAttachmentInput] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) errs.customerName = 'Customer name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }

    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.subject.trim()) errs.subject = 'Ticket subject is required';
    if (!formData.description.trim()) errs.description = 'Issue description is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddAttachment = () => {
    if (attachmentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, attachmentInput.trim()]
      }));
      setAttachmentInput('');
    }
  };

  const handleRemoveAttachment = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newTicketId = addTicket({
      customerName: formData.customerName,
      organization: formData.organization,
      organizationId: `ORG-${formData.organization.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10) || 'GEN'}`,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      siteReference: formData.siteReference || 'SITE-GENERAL',
      category: formData.category,
      priority: formData.priority,
      status: 'Open',
      subject: formData.subject,
      description: formData.description,
      attachments: formData.attachments
    });

    // Navigate to ticket detail
    navigate(`/support/ticket/${newTicketId}`);
  };

  return (
    <SupportLayout>
      <SEOHead
        title="Raise a Support Ticket | Sarita Infotech Helpdesk"
        description="Submit a technical issue or configuration request to the Sarita Infotech support engineering team."
      />

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
              Technical Helpdesk Desk
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Submit a Support Ticket</h2>
            <p className="text-xs text-slate-500 mt-1">
              Please provide complete error descriptions, screenshots, or logs to accelerate triage and resolution.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm text-slate-700">
            {/* Customer & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticket-customer-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Contact Person <span className="text-rose-500">*</span>
                </label>
                <input
                  id="ticket-customer-name"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Patel"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.customerName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.customerName && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.customerName}</span>}
              </div>

              <div>
                <label htmlFor="ticket-organization" className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital / Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="ticket-organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Apex Hospital (Surat)"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.organization ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.organization && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.organization}</span>}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticket-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address for Status Updates <span className="text-rose-500">*</span>
                </label>
                <input
                  id="ticket-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rpatel@hospital.com"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.email && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>}
              </div>

              <div>
                <label htmlFor="ticket-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Phone / Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="ticket-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98250 00000"
                  className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.phone}</span>}
              </div>
            </div>

            {/* Product, Site Reference, Category, Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Software Product <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Sarita HealthCare">Sarita HealthCare (HMIS)</option>
                  <option value="Sarita Nimble">Sarita Nimble (EXIM Trade)</option>
                  <option value="Sarita BankWare">Sarita BankWare (Co-Op Banking)</option>
                  <option value="Sarita Retail">Sarita Retail (POS & Stores)</option>
                  <option value="Custom Software Development">Custom Software Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site / Machine / Server Reference
                </label>
                <input
                  type="text"
                  value={formData.siteReference}
                  onChange={(e) => setFormData({ ...formData, siteReference: e.target.value })}
                  placeholder="e.g. APEX-SURAT-SRV01 or Cashier-02"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as TicketCategory })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Product Usage">Product Usage / How-to</option>
                  <option value="Installation">Installation / Setup</option>
                  <option value="Configuration">Configuration / Masters</option>
                  <option value="Data or Reporting">Data or Reporting Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity / Urgency Priority <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Low">Low (General guidance, non-urgent)</option>
                  <option value="Medium">Medium (Normal operational request)</option>
                  <option value="High">High (Impacting daily billing/processing)</option>
                  <option value="Critical">Critical (System halt / Emergency outage)</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="ticket-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                Ticket Subject <span className="text-rose-500">*</span>
              </label>
              <input
                id="ticket-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary of the issue (e.g. Sysmex analyzer COM timeout)"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.subject ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.subject && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.subject}</span>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="ticket-description" className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Issue Description & Steps to Reproduce <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="ticket-description"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what occurred, any error message dialogs displayed, and recent changes..."
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.description && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.description}</span>}
            </div>

            {/* Attachment interface simulation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attachments (Logs, Screenshots, Documents)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={attachmentInput}
                  onChange={(e) => setAttachmentInput(e.target.value)}
                  placeholder="e.g. error_screenshot_oct22.png or error_log.txt"
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={handleAddAttachment}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  Attach File
                </button>
              </div>

              {formData.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.attachments.map((att, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      <Paperclip className="w-3 h-3 text-slate-500" />
                      <span>{att}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(idx)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link to="/support" className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </Link>
              <button
                id="ticket-submit-btn"
                type="submit"
                className="btn-primary py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 shadow-sm"
              >
                Submit Ticket to Support Desk
              </button>
            </div>
          </form>
        </div>
      </div>
    </SupportLayout>
  );
};
