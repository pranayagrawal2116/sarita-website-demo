import React from 'react';
import { UserCheck, Building, Mail, Phone, MapPin, Award, ShieldCheck, Calendar, DollarSign } from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';

export const PartnerProfilePage: React.FC = () => {
  const { partnerProfile } = useApp();

  return (
    <PartnerLayout>
      <SEOHead
        title="My Partner Account Profile | Sarita Partner Portal"
        description="Partner account details, certified engineer roster, assigned territory, and designated channel manager."
      />

      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Authorized Partner Organization Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Account standing, tier certifications, and designated Sarita Infotech alliance contacts
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                AI
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{partnerProfile.companyName}</h3>
                <span className="font-mono text-xs text-brand-700 font-semibold">{partnerProfile.partnerId}</span>
              </div>
            </div>

            <div className="self-start sm:self-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                {partnerProfile.partnerTier}
              </span>
            </div>
          </div>

          {/* Grid of Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Primary Account Lead</h4>
              <div>
                <span className="text-slate-400 block text-[11px]">Contact Person:</span>
                <strong className="text-slate-900">{partnerProfile.contactPerson}</strong> ({partnerProfile.designation})
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email:</span>
                <span className="text-slate-800">{partnerProfile.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Phone:</span>
                <span className="font-mono text-slate-800">{partnerProfile.phone}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Territory & Certifications</h4>
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Territory:</span>
                <strong className="text-slate-900">{partnerProfile.assignedTerritory}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Partner Since:</span>
                <span className="text-slate-800">{partnerProfile.partnerSince}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Certified Sarita Engineers:</span>
                <strong className="text-emerald-700">{partnerProfile.certifiedEngineers} Certified Specialists</strong>
              </div>
            </div>
          </div>

          {/* Assigned Channel Manager */}
          <div className="p-5 rounded-xl bg-brand-50/50 border border-brand-200/80 space-y-2 text-xs">
            <h4 className="font-bold text-brand-950 text-sm">Assigned Channel Alliance Manager</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[11px]">Manager Name:</span>
                <strong className="text-slate-900">{partnerProfile.channelManager}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Direct Email:</span>
                <span>{partnerProfile.managerEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Direct Hotline:</span>
                <span className="font-mono">{partnerProfile.managerPhone}</span>
              </div>
            </div>
          </div>

          {/* Production Notice */}
          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-500 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="leading-relaxed">
              <strong>Enterprise Notice:</strong> In production deployment, partner tier status is tied to signed annual reseller agreements, certified engineer testing records, and verified quarterly sales quotas.
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};
