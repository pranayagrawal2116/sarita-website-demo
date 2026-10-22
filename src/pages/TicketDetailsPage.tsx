import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  Phone,
  Mail,
  Server
} from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';

export const TicketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTicketById, addTicketReply, updateTicketStatus } = useApp();

  const ticket = id ? getTicketById(id) : undefined;

  const [replyText, setReplyText] = useState('');
  const [replySenderType, setReplySenderType] = useState<'customer' | 'support_agent'>('customer');

  if (!ticket) {
    return (
      <SupportLayout>
        <div className="max-w-xl mx-auto py-16 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Ticket Not Found</h2>
          <p className="text-xs text-slate-600">
            No support ticket was found matching ID "{id}". It may not have been created in this prototype session.
          </p>
          <div className="pt-2">
            <Link to="/support/track-ticket" className="btn-primary text-xs py-2 px-4">
              Return to Ticket List
            </Link>
          </div>
        </div>
      </SupportLayout>
    );
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    addTicketReply(ticket.id, replyText.trim(), replySenderType);
    setReplyText('');
  };

  return (
    <SupportLayout>
      <SEOHead
        title={`Ticket #${ticket.id}: ${ticket.subject} | Sarita Helpdesk`}
        description={`Support ticket thread for ${ticket.customerName} on ${ticket.product}.`}
      />

      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/support/track-ticket"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tickets</span>
          </Link>

          <div className="flex items-center gap-2">
            {ticket.status !== 'Resolved' && ticket.status !== 'Closed' ? (
              <button
                onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                className="btn-secondary text-xs py-1.5 px-3 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Mark as Resolved
              </button>
            ) : (
              <button
                onClick={() => updateTicketStatus(ticket.id, 'In Progress')}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Reopen Ticket
              </button>
            )}
          </div>
        </div>

        {/* Header Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-brand-700">{ticket.id}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-700">{ticket.product}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {ticket.subject}
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <StatusBadge status={ticket.priority} type="priority" />
              <StatusBadge status={ticket.status} type="ticket" />
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 pt-1">
            <div>
              <span className="text-slate-400 block text-[11px]">Customer & Organization:</span>
              <strong className="text-slate-900">{ticket.customerName}</strong>
              <div className="text-[11px] text-slate-500">{ticket.organization}</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Contact Info:</span>
              <div className="text-slate-800">{ticket.email}</div>
              <div className="text-slate-800 font-mono">{ticket.phone}</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Category & Site:</span>
              <div className="text-slate-800">{ticket.category}</div>
              <div className="font-mono text-[11px] text-slate-500">{ticket.siteReference}</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Assigned Support Lead:</span>
              <strong className="text-slate-900">{ticket.assignedAgent}</strong>
              <div className="text-[11px] text-slate-400">Created: {ticket.createdAt}</div>
            </div>
          </div>

          {/* Attachments list if any */}
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                Attached Files:
              </span>
              <div className="flex flex-wrap gap-2">
                {ticket.attachments.map((att, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <Paperclip className="w-3 h-3 text-slate-500" />
                    <span>{att}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conversation Timeline */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>Conversation Thread & Audit History ({ticket.timeline.length} Messages)</span>
            <span className="text-xs font-normal text-slate-400">Chronological activity</span>
          </h3>

          <div className="space-y-4">
            {ticket.timeline.map((msg) => {
              const isSupport = msg.senderType === 'support_agent';
              return (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSupport
                      ? 'bg-brand-50/40 border-brand-200 ml-0 sm:ml-8'
                      : 'bg-white border-slate-200 mr-0 sm:mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          isSupport
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSupport ? 'S' : 'C'}
                      </div>
                      <span className="font-bold text-slate-900">{msg.sender}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isSupport
                            ? 'bg-brand-100 text-brand-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isSupport ? 'Sarita Support Desk' : 'Customer'}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px] font-mono">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </p>

                  {msg.attachmentName && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-700 font-mono">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{msg.attachmentName}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Reply Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-900">Post a Response to this Ticket</span>
            {/* Toggle demo sender mode */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Reply as:</span>
              <button
                type="button"
                onClick={() => setReplySenderType('customer')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  replySenderType === 'customer'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Customer ({ticket.customerName.split(' ')[0]})
              </button>
              <button
                type="button"
                onClick={() => setReplySenderType('support_agent')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  replySenderType === 'support_agent'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Support Engineer
              </button>
            </div>
          </div>

          <form onSubmit={handleSendReply} className="space-y-3">
            <textarea
              rows={4}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Type your reply as ${
                replySenderType === 'customer' ? ticket.customerName : 'Sarita Support Desk'
              }...`}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">
                Replies automatically update ticket conversation history in browser state.
              </span>
              <button
                type="submit"
                className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Response</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </SupportLayout>
  );
};
