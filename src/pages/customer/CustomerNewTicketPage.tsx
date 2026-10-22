import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Paperclip, X, AlertCircle, ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { TicketCategory, TicketPriority } from '../../types';

export const CustomerNewTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, addTicket } = useApp();

  const [formData, setFormData] = useState({
    product: currentCustomer?.product || 'Sarita HealthCare',
    siteReference: '',
    category: 'Technical Issue' as TicketCategory,
    priority: 'Normal' as TicketPriority,
    subject: '',
    description: '',
    attachments: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachmentInput, setAttachmentInput] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.subject.trim()) errs.subject = 'Ticket subject is required';
    if (!formData.description.trim()) errs.description = 'Detailed description is required';
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
      customerId: currentCustomer?.id,
      customerName: currentCustomer?.name || 'Customer Lead',
      organization: currentCustomer?.organization || 'Organization',
      organizationId: currentCustomer?.organizationId || 'ORG-GEN',
      email: currentCustomer?.email || 'customer@example.com',
      phone: currentCustomer?.phone || '+91 98250 00000',
      product: formData.product,
      siteReference: formData.siteReference || 'SITE-GENERAL',
      category: formData.category,
      priority: formData.priority,
      status: 'Open',
      subject: formData.subject,
      description: formData.description,
      attachments: formData.attachments
    });

    navigate(`/customer/tickets/${newTicketId}`);
  };

  return (
    <CustomerLayout>
      <SEOHead
        title="Raise a Support Ticket | Sarita Customer Portal"
        description="Register a technical support ticket for your organization's installation of Sarita Infotech software."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/customer/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tickets</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
              Technical Service Request
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Raise a New Support Ticket</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Filing for <strong className="text-slate-800">{currentCustomer?.organization}</strong>. Your ticket is automatically routed to our on-duty product specialists.
            </p>
          </div>

          {/* Authenticated Identity Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" />
              <div>
                <span className="font-semibold text-slate-800">{currentCustomer?.organization}</span>
                <span className="text-slate-400 mx-1.5">•</span>
                <span className="text-slate-500">Contact: {currentCustomer?.name} ({currentCustomer?.email})</span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
              Account Ref: {currentCustomer?.accountReference}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-slate-700">
            {/* Product & Site Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticket-product" className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Software Suite <span className="text-rose-500">*</span>
                </label>
                <select
                  id="ticket-product"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Sarita HealthCare">Sarita HealthCare (HMIS)</option>
                  <option value="Sarita Nimble">Sarita Nimble (EXIM Trade)</option>
                  <option value="Sarita BankWare">Sarita BankWare (Co-Op Banking)</option>
                  <option value="Sarita Retail">Sarita Retail (POS & Multi-Store)</option>
                  <option value="Custom Software Solution">Custom Software Solution</option>
                </select>
              </div>

              <div>
                <label htmlFor="ticket-site" className="block text-xs font-semibold text-slate-700 mb-1">
                  Site / Machine / Branch Reference
                </label>
                <input
                  id="ticket-site"
                  type="text"
                  value={formData.siteReference}
                  onChange={(e) => setFormData({ ...formData, siteReference: e.target.value })}
                  placeholder="e.g. APEX-SURAT-SRV01 or Cashier-02"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticket-category" className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="ticket-category"
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
                <label htmlFor="ticket-priority" className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity / Urgency Priority <span className="text-rose-500">*</span>
                </label>
                <select
                  id="ticket-priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Low">Low (General guidance, non-urgent)</option>
                  <option value="Normal">Normal (Standard operational request)</option>
                  <option value="High">High (Impacting daily billing / operational flow)</option>
                  <option value="Critical">Critical (System halted / Emergency stoppage)</option>
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

            {/* Detailed Description */}
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
                  id="ticket-attach-input"
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
              <Link to="/customer/tickets" className="text-xs text-slate-500 hover:text-slate-700">
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
    </CustomerLayout>
  );
};
