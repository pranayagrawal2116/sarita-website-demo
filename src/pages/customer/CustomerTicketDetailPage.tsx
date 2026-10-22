import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  Building,
  User,
  ShieldCheck,
  AlertCircle,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { CustomerLayout } from '../../components/layout/CustomerLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';

export const CustomerTicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTicketById, addTicketReply, currentCustomer } = useApp();

  const [replyMessage, setReplyMessage] = useState('');
  const [attachment, setAttachment] = useState('');

  const ticket = id ? getTicketById(id) : undefined;

  // Authorization Check: Data Isolation by Organization
  const isAuthorized = ticket && currentCustomer && ticket.organizationId === currentCustomer.organizationId;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !ticket) return;

    addTicketReply(ticket.id, replyMessage.trim(), 'customer');
    setReplyMessage('');
    setAttachment('');
  };

  if (!ticket) {
    return (
      <CustomerLayout>
        <div className="max-w-xl mx-auto text-center py-16 space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Support Ticket Not Found</h2>
          <p className="text-xs text-slate-500">
            No ticket exists with reference <strong>{id}</strong>.
          </p>
          <Link to="/customer/tickets" className="btn-primary text-xs py-2 px-4 inline-block mt-2">
            Back to Ticket List
          </Link>
        </div>
      </CustomerLayout>
    );
  }

  if (!isAuthorized) {
    return (
      <CustomerLayout>
        <div className="max-w-xl mx-auto text-center py-16 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Confidential Ticket Access Denied</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Ticket #{ticket.id} belongs to another licensed client organization. Under Sarita Infotech enterprise isolation policies, client data cannot be viewed across organizations.
          </p>
          <div className="pt-2">
            <Link to="/customer/tickets" className="btn-secondary text-xs py-2 px-4 inline-block">
              Return to Your Organization Tickets
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <SEOHead
        title={`Ticket #${ticket.id} - ${ticket.subject} | Sarita Customer Portal`}
        description={`Customer ticket tracking and conversation timeline for #${ticket.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/customer/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tickets</span>
        </Link>

        {/* Ticket Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-brand-700">{ticket.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-600">{ticket.product}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {ticket.subject}
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <StatusBadge status={ticket.priority} type="priority" />
              <StatusBadge status={ticket.status} type="ticket" />
            </div>
          </div>

          {/* Context Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Organization:</span>
              <span className="font-semibold text-slate-800">{ticket.organization}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Site / Terminal:</span>
              <span className="font-semibold text-slate-800 font-mono">{ticket.siteReference || 'General Site'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Issue Category:</span>
              <span className="font-semibold text-slate-800">{ticket.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Assigned Engineer:</span>
              <span className="font-semibold text-brand-700">{ticket.assignedAgent.split('(')[0].trim()}</span>
            </div>
          </div>

          {/* Initial Problem Statement */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
            <div className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
              Initial Issue Description Filed
            </div>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
            {ticket.attachments.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {ticket.attachments.map((att, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-700"
                  >
                    <Paperclip className="w-3 h-3 text-slate-400" />
                    <span>{att}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Resolution Notes Banner if Resolved */}
          {ticket.resolutionNotes && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Formal Resolution Summary</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {ticket.resolutionNotes}
              </p>
            </div>
          )}
        </div>

        {/* Conversation Thread */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Conversation & Engineering Updates</h3>
            <span className="text-xs text-slate-400 font-mono">{ticket.timeline.length} updates recorded</span>
          </div>

          <div className="space-y-4">
            {ticket.timeline.map((msg) => {
              const isCustomer = msg.senderType === 'customer';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isCustomer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs space-y-1.5 shadow-sm ${
                      isCustomer
                        ? 'bg-brand-600 text-white rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[11px]">
                      <span className={`font-bold ${isCustomer ? 'text-white' : 'text-slate-900'}`}>
                        {msg.sender} {isCustomer ? '(You)' : '• Sarita Support'}
                      </span>
                      <span className={`font-mono text-[10px] ${isCustomer ? 'text-brand-100' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line">{msg.message}</p>
                    {msg.attachmentName && (
                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono ${
                          isCustomer ? 'bg-brand-700 text-brand-100' : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                        <Paperclip className="w-3 h-3" />
                        <span>{msg.attachmentName}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form */}
          {ticket.status !== 'Closed' ? (
            <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
              <label htmlFor="customer-reply-text" className="block text-xs font-semibold text-slate-700">
                Add Reply / Provide Information
              </label>
              <textarea
                id="customer-reply-text"
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your response to the support engineering team..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <div className="relative flex-1 sm:max-w-xs">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={attachment}
                    onChange={(e) => setAttachment(e.target.value)}
                    placeholder="Attach file simulation (e.g. log.txt)..."
                    className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none"
                  />
                </div>

                <button
                  id="customer-reply-btn"
                  type="submit"
                  disabled={!replyMessage.trim()}
                  className="btn-primary text-xs py-2 px-4 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
              This ticket is Closed. To request additional work, please raise a new support ticket.
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};
