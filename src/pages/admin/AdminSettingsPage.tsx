import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Clock,
  Bell,
  Database,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useApp();
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    companyName: 'Sarita Infotech Pvt. Ltd.',
    supportEmail: 'support@saritainfotech.com',
    emergencyHotline: '+91 98251 12345',
    criticalSlaHours: 2,
    highSlaHours: 8,
    normalSlaHours: 24,
    businessHoursStart: '09:30 AM',
    businessHoursEnd: '06:30 PM',
    autoAssignHealthcare: 'Anand Verma (Lead Healthcare Consultant)',
    autoAssignExim: 'Sunil Varma (EXIM Solutions)',
    requireApprovalForRegistration: true,
    enableConflictPrevention: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Administration settings and SLA rules saved successfully.', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (tickets, customers, appointments) to original seed state?')) {
      localStorage.removeItem('sit_demo_tickets_v2');
      localStorage.removeItem('sit_demo_customer_accounts');
      localStorage.removeItem('sit_demo_customer_session');
      localStorage.removeItem('sit_demo_appointments_v2');
      localStorage.removeItem('sit_demo_partner_leads');
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
            System Preferences
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Administration & Operational Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure response SLAs, business hours, automated triage assignments, and simulation environment data.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Support SLA Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            Support SLA Response Targets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Critical Severity Target (Hours)
              </label>
              <input
                type="number"
                value={settings.criticalSlaHours}
                onChange={(e) => setSettings({ ...settings, criticalSlaHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <span className="text-[11px] text-slate-400">Emergency hospital / trade stop</span>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                High Priority Target (Hours)
              </label>
              <input
                type="number"
                value={settings.highSlaHours}
                onChange={(e) => setSettings({ ...settings, highSlaHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <span className="text-[11px] text-slate-400">Major workflow hindrance</span>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Normal Severity Target (Hours)
              </label>
              <input
                type="number"
                value={settings.normalSlaHours}
                onChange={(e) => setSettings({ ...settings, normalSlaHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <span className="text-[11px] text-slate-400">Routine inquiry / feature ask</span>
            </div>
          </div>
        </div>

        {/* Access & Verification Controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Account Security & Verification Policies
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireApprovalForRegistration}
                onChange={(e) => setSettings({ ...settings, requireApprovalForRegistration: e.target.checked })}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
              />
              <div>
                <span className="font-semibold text-slate-900 block">Require Administrator Approval for New Customer Registrations</span>
                <span className="text-slate-500">
                  When enabled, self-service customer signups are held in &quot;Pending Approval&quot; state until verified by support operations.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableConflictPrevention}
                onChange={(e) => setSettings({ ...settings, enableConflictPrevention: e.target.checked })}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
              />
              <div>
                <span className="font-semibold text-slate-900 block">Enforce Double-Booking Calendar Conflict Checks</span>
                <span className="text-slate-500">
                  Blocks confirming two simultaneous demonstrations in the same date and time slot.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Data Reset & Sandbox Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Database className="w-4 h-4 text-slate-600" />
              <h4>Simulation State Management</h4>
            </div>
            <button
              type="button"
              onClick={handleResetData}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demonstration Seed Data
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Clears local browser storage and reinstates default demonstration records (Apex Hospital, AeroTex, Lifeline Surgical demo, etc.).
          </p>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Settings saved!
            </span>
          )}
          <button type="submit" className="btn-primary text-xs py-2.5 px-6 flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            Save Operational Settings
          </button>
        </div>
      </form>
      </div>
    </AdminLayout>
  );
};
