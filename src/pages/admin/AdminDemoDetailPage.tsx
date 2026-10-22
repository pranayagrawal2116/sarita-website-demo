import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  AlertTriangle,
  XCircle,
  BookmarkPlus,
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SEOHead } from '../../components/layout/SEOHead';
import { useApp } from '../../context/AppContext';
import { AVAILABLE_TIME_SLOTS } from '../../data/demoData';

export const AdminDemoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    demoAppointments,
    confirmDemoAppointment,
    rescheduleDemoAppointment,
    cancelDemoAppointment,
    completeDemoAppointment,
    addDemoInternalNote,
    assignDemoSalesRep,
    checkDemoConflict
  } = useApp();

  const demo = id ? demoAppointments.find((d) => d.id === id) : undefined;

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState(demo?.preferredDate || '');
  const [newSlot, setNewSlot] = useState(demo?.preferredTimeSlot || AVAILABLE_TIME_SLOTS[0]);
  const [internalNoteText, setInternalNoteText] = useState('');
  const [outcomeNotes, setOutcomeNotes] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelOpen, setCancelOpen] = useState(false);

  const salesRepOptions = [
    'Anand Verma (Lead Healthcare Consultant)',
    'Sunil Varma (EXIM Solutions)',
    'Pooja Mehta (Banking Solutions Specialist)',
    'Kavita Joshi (Enterprise Retail Consultant)'
  ];

  if (!demo) {
    return (
      <AdminLayout>
        <div className="max-w-xl mx-auto text-center py-16 space-y-4">
          <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Demo Request Not Found</h2>
          <p className="text-xs text-slate-500">
            No demonstration request exists with reference <strong>{id}</strong>.
          </p>
          <Link to="/admin/demos" className="btn-primary text-xs py-2 px-4 inline-block mt-2">
            Back to Demos Queue
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const hasConflict = checkDemoConflict(demo.preferredDate, demo.preferredTimeSlot, demo.id);

  const handleConfirm = () => {
    confirmDemoAppointment(demo.id);
  };

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newSlot) return;
    const res = rescheduleDemoAppointment(demo.id, newDate, newSlot);
    if (res.success) {
      setRescheduleOpen(false);
    }
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    cancelDemoAppointment(demo.id, cancelReason);
    setCancelOpen(false);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeNotes.trim()) return;
    completeDemoAppointment(demo.id, outcomeNotes.trim());
    setOutcomeNotes('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteText.trim()) return;
    addDemoInternalNote(demo.id, internalNoteText.trim());
    setInternalNoteText('');
  };

  return (
    <AdminLayout>
      <SEOHead
        title={`Admin: Demo Walkthrough #${demo.id} | Sarita Console`}
        description={`Manage demonstration confirmation, rescheduling, and consultant assignment for #${demo.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/admin/demos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Demos Queue</span>
        </Link>

        {/* Demo Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-amber-700">{demo.id}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-brand-700">{demo.productInterest}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {demo.organization}
              </h1>
              <div className="text-xs text-slate-500">
                Lead: <strong className="text-slate-800">{demo.name}</strong> • {demo.businessEmail} • {demo.phone}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  demo.status === 'Confirmed'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : demo.status === 'Awaiting Confirmation'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-medium'
                    : demo.status === 'Completed'
                    ? 'bg-slate-100 text-slate-800 border border-slate-300'
                    : demo.status === 'Rescheduled'
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                Status: {demo.status}
              </span>
            </div>
          </div>

          {/* Time Slot & Conflict Alert */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Requested Date</span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                <span>{demo.preferredDate}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Requested Time Slot</span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                <span>{demo.preferredTimeSlot}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Time Zone</span>
              <div className="font-semibold text-slate-800 mt-0.5">{demo.timeZone}</div>
            </div>
          </div>

          {hasConflict && demo.status !== 'Confirmed' && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="font-semibold">Scheduling Conflict Detected:</strong>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  Another demonstration appointment is already confirmed for {demo.preferredDate} at {demo.preferredTimeSlot}. Please propose an alternate slot before confirming.
                </p>
              </div>
            </div>
          )}

          {/* Meeting Link if Confirmed */}
          {demo.meetingLink && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <strong className="font-semibold">Live Conference Link Generated:</strong>
                  <span className="font-mono text-emerald-800 ml-1.5">{demo.meetingLink}</span>
                </div>
              </div>
              <a
                href={demo.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 text-[11px]"
              >
                <span>Open Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Assigned Consultant & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Assigned Consultant:</span>
              <select
                id="admin-demo-rep-select"
                value={demo.assignedSalesRep}
                onChange={(e) => assignDemoSalesRep(demo.id, e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 text-xs focus:outline-none"
              >
                <option value="Unassigned (Sales Queue)">Unassigned (Queue)</option>
                {salesRepOptions.map((rep, i) => (
                  <option key={i} value={rep}>{rep.split('(')[0].trim()}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {demo.status !== 'Confirmed' && demo.status !== 'Completed' && (
                <button
                  id="admin-confirm-demo-btn"
                  onClick={handleConfirm}
                  disabled={hasConflict}
                  className="btn-primary text-xs py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Slot</span>
                </button>
              )}

              <button
                id="admin-reschedule-toggle-btn"
                onClick={() => setRescheduleOpen(!rescheduleOpen)}
                className="btn-secondary text-xs py-2 px-3.5"
              >
                <span>Propose / Reschedule Slot</span>
              </button>

              {demo.status !== 'Cancelled' && (
                <button
                  id="admin-cancel-toggle-btn"
                  onClick={() => setCancelOpen(!cancelOpen)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Reschedule Drawer Form */}
          {rescheduleOpen && (
            <form onSubmit={handleReschedule} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-slate-800">Select Alternate Demonstration Time Slot</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Date</label>
                  <input
                    id="reschedule-date-input"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Time Slot</label>
                  <select
                    id="reschedule-slot-select"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none"
                  >
                    {AVAILABLE_TIME_SLOTS.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRescheduleOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  id="admin-save-reschedule-btn"
                  type="submit"
                  className="btn-primary text-xs py-1.5 px-3.5 bg-blue-600 hover:bg-blue-500"
                >
                  Save Rescheduled Slot
                </button>
              </div>
            </form>
          )}

          {/* Cancellation Form */}
          {cancelOpen && (
            <form onSubmit={handleCancel} className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-rose-900">Cancel Demonstration Request</div>
              <input
                id="cancel-reason-input"
                type="text"
                required
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation (e.g. Lead postponed budget, invalid contact)..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-rose-300 bg-white focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCancelOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200"
                >
                  Dismiss
                </button>
                <button
                  id="admin-confirm-cancel-btn"
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Two Columns: Internal Notes & Walkthrough Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Internal Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm">Consultant & Sales Notes</h3>
                <p className="text-[11px] text-slate-500">Track client requirements, legacy systems & pricing scope</p>
              </div>

              <div className="space-y-3 py-3 max-h-64 overflow-y-auto">
                {demo.internalNotes && demo.internalNotes.length > 0 ? (
                  demo.internalNotes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{note.author}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 italic">
                    No consultant notes saved yet.
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 space-y-2">
              <textarea
                id="demo-note-input"
                rows={2}
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                placeholder="Log prospect discussion notes..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                id="demo-note-submit-btn"
                type="submit"
                disabled={!internalNoteText.trim()}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 ml-auto disabled:opacity-50"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </form>
          </div>

          {/* Walkthrough Outcome Documentation */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Post-Demo Outcome Documentation</h3>
                  <p className="text-[11px] text-slate-500">Record commercial qualification and proposal status</p>
                </div>
                {demo.status === 'Completed' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                )}
              </div>

              {demo.outcomeNotes ? (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1.5 my-3">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recorded Demonstration Outcome:</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed whitespace-pre-line">{demo.outcomeNotes}</p>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  Walkthrough outcome has not been finalized yet.
                </div>
              )}
            </div>

            <form onSubmit={handleComplete} className="pt-3 border-t border-slate-100 space-y-2">
              <label htmlFor="demo-outcome-input" className="block text-xs font-semibold text-slate-700">
                Record Final Outcome & Mark Completed
              </label>
              <textarea
                id="demo-outcome-input"
                rows={2}
                value={outcomeNotes}
                onChange={(e) => setOutcomeNotes(e.target.value)}
                placeholder="Client feedback, requested custom quote, or next steps..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                id="demo-complete-btn"
                type="submit"
                disabled={!outcomeNotes.trim()}
                className="btn-primary text-xs py-2 px-4 bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 ml-auto disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Demo Completed</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
