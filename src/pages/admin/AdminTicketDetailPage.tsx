import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Lock,
  Paperclip,
  CheckCircle2,
  Clock,
  User,
  Building,
  ShieldCheck,
  AlertCircle,
  FileText,
  BookmarkPlus
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';
import { TicketPriority, TicketStatus } from '../../types';

export const AdminTicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getTicketById,
    addTicketReply,
    addTicketInternalNote,
    updateTicketStatus,
    updateTicketPriority,
    updateTicketAgent,
    recordResolutionNotes,
    adminUser
  } = useApp();

  const [customerReply, setCustomerReply] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [resolutionText, setResolutionText] = useState('');

  const ticket = id ? getTicketById(id) : undefined;

  const agentOptions = [
    'Vikram Joshi (Senior Support Engineer)',
    'Sunil Varma (EXIM Specialist)',
    'Pooja Mehta (Banking Solutions)',
    'Anand Verma (Lead Architect)'
  ];

  if (!ticket) {
    return (
      <AdminLayout>
        <div className="max-w-xl mx-auto text-center py-16 space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Ticket Not Found</h2>
          <p className="text-xs text-slate-500">
            No support ticket exists with reference <strong>{id}</strong>.
          </p>
          <Link to="/admin/tickets" className="btn-primary text-xs py-2 px-4 inline-block mt-2">
            Back to Ticket Queue
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const handleSendCustomerReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerReply.trim()) return;
    addTicketReply(ticket.id, customerReply.trim(), 'support_agent');
    setCustomerReply('');
  };

  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteText.trim()) return;
    addTicketInternalNote(ticket.id, internalNoteText.trim());
    setInternalNoteText('');
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionText.trim()) return;
    recordResolutionNotes(ticket.id, resolutionText.trim());
    setResolutionText('');
  };

  return (
    <AdminLayout>
      <SEOHead
        title={`Admin Triage: Ticket #${ticket.id} | Sarita Console`}
        description={`Manage agent assignment, confidential internal notes, and resolution for #${ticket.id}`}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        <Link
          to="/admin/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tickets Queue</span>
        </Link>

        {/* Master Ticket Control Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-brand-700">{ticket.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-600">{ticket.product}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {ticket.subject}
              </h1>
              <div className="text-xs text-slate-500 mt-1">
                Client: <strong className="text-slate-800">{ticket.organization}</strong> ({ticket.customerName}) • {ticket.email} • {ticket.phone}
              </div>
            </div>

            {/* Quick Status Changers */}
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Status</label>
                <select
                  id="admin-ticket-status-select"
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-semibold focus:outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting for Customer">Waiting for Customer</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Priority</label>
                <select
                  id="admin-ticket-priority-select"
                  value={ticket.priority}
                  onChange={(e) => updateTicketPriority(ticket.id, e.target.value as TicketPriority)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-semibold focus:outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Assigned Agent</label>
                <select
                  id="admin-ticket-agent-select"
                  value={ticket.assignedAgent}
                  onChange={(e) => updateTicketAgent(ticket.id, e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-semibold focus:outline-none max-w-[200px] truncate"
                >
                  <option value="Unassigned (Auto-Triage)">Unassigned</option>
                  {agentOptions.map((agent, i) => (
                    <option key={i} value={agent}>{agent.split('(')[0].trim()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description & Metadata */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Customer Problem Statement
            </div>
            <p className="whitespace-pre-line leading-relaxed">{ticket.description}</p>
            {ticket.attachments.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {ticket.attachments.map((att, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-mono">
                    <Paperclip className="w-3 h-3 text-slate-400" />
                    <span>{att}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Two-Column Working Area: Public Conversation vs Confidential Internal Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Facing Conversation Thread */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Customer Conversation Timeline</h3>
                  <p className="text-[11px] text-slate-500">Messages visible to client organization</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Client Visible
                </span>
              </div>

              <div className="space-y-3 py-3 max-h-96 overflow-y-auto">
                {ticket.timeline.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      msg.senderType === 'customer'
                        ? 'bg-brand-50/60 border border-brand-200/70 text-slate-800'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-[11px]">
                      <span className={msg.senderType === 'customer' ? 'text-brand-900 font-bold' : 'text-slate-900'}>
                        {msg.sender} {msg.senderType === 'customer' ? '(Client)' : '(Staff)'}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-slate-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendCustomerReply} className="pt-3 border-t border-slate-100 space-y-2">
              <label htmlFor="admin-reply-input" className="block text-xs font-semibold text-slate-700">
                Reply Directly to Customer
              </label>
              <textarea
                id="admin-reply-input"
                rows={2}
                value={customerReply}
                onChange={(e) => setCustomerReply(e.target.value)}
                placeholder="Compose reply for customer organization..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                id="admin-reply-submit-btn"
                type="submit"
                disabled={!customerReply.trim()}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 ml-auto disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Customer</span>
              </button>
            </form>
          </div>

          {/* Confidential Internal Notes (Hidden from Customers) */}
          <div className="bg-amber-50/30 rounded-2xl border border-amber-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="border-b border-amber-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Confidential Internal Notes</span>
                  </h3>
                  <p className="text-[11px] text-amber-800">Strictly isolated from customer view</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                  Internal Only
                </span>
              </div>

              <div className="space-y-3 py-3 max-h-96 overflow-y-auto">
                {ticket.internalNotes && ticket.internalNotes.length > 0 ? (
                  ticket.internalNotes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-white border border-amber-200 text-xs space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-950">{note.author}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-amber-800/80 italic">
                    No internal engineering notes recorded yet.
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleAddInternalNote} className="pt-3 border-t border-amber-200 space-y-2">
              <label htmlFor="admin-note-input" className="block text-xs font-semibold text-amber-950">
                Add Private Internal Note
              </label>
              <textarea
                id="admin-note-input"
                rows={2}
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                placeholder="Log internal diagnostics, SLA notes, or supervisor instructions..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button
                id="admin-note-submit-btn"
                type="submit"
                disabled={!internalNoteText.trim()}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 ml-auto bg-amber-700 hover:bg-amber-600 disabled:opacity-50"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save Internal Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Resolution Notes Recording */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Resolution Documentation & Close SLA</h3>
              <p className="text-[11px] text-slate-500">Record final technical findings for customer sign-off</p>
            </div>
            {ticket.status === 'Resolved' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Marked Resolved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveResolution} className="space-y-3">
            <textarea
              id="admin-resolution-input"
              rows={3}
              value={resolutionText}
              onChange={(e) => setResolutionText(e.target.value)}
              placeholder={ticket.resolutionNotes || 'Describe root cause analysis and corrective fix applied...'}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                id="admin-resolve-btn"
                type="submit"
                disabled={!resolutionText.trim()}
                className="btn-primary text-xs py-2 px-4 bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Document & Mark Ticket Resolved</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
