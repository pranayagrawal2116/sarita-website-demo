import React, { useState } from 'react';
import { Activity, BedDouble, Users, Receipt, ShieldCheck, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { CONTENT_CONFIG } from '../../data/contentConfig';

export const HealthcareDashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ipd' | 'billing' | 'abdm'>('overview');

  return (
    <div className="w-full bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 font-sans text-xs sm:text-sm">
      {/* Window Titlebar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-slate-400 font-medium text-xs ml-2 hidden sm:inline">
            Sarita HealthCare v6.4 • Apex Multispeciality Hospital (Surat)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-[11px] font-mono">
            System Online • Station #OPD-04
          </span>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 flex gap-4 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Daily Hospital Overview
        </button>
        <button
          onClick={() => setActiveTab('ipd')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'ipd' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Bed & Ward Matrix
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'billing' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          IPD Billing & Discharge Queue
        </button>
        <button
          onClick={() => setActiveTab('abdm')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'abdm' ? 'border-amber-500 text-amber-300' : 'border-transparent text-slate-400 hover:text-amber-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          ABDM / NHCX Interoperability Desk
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 bg-slate-900/95 min-h-[380px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Today's OPD Count</span>
                  <Users className="w-4 h-4 text-brand-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">284</div>
                <div className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span>↑ 12% vs last week</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>IPD Occupancy</span>
                  <BedDouble className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">118 / 140</div>
                <div className="text-[11px] text-slate-300 mt-0.5">84.2% Occupied • 22 Vacant</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Surgeries Scheduled</span>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">14 OT Cases</div>
                <div className="text-[11px] text-amber-300 mt-0.5">8 Completed • 6 In-Progress</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Day Revenue (Cash/TPA)</span>
                  <Receipt className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">₹6,42,850</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Reconciliation 100%</div>
              </div>
            </div>

            {/* Patient Consultation & Department Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-slate-200">Active Patient Queue (OPD Consultation Desks)</span>
                  <span className="text-[11px] text-brand-400">Auto-refresh: 15s</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-700">
                        <th className="py-2">Token</th>
                        <th className="py-2">UHID / Patient</th>
                        <th className="py-2">Speciality / Doctor</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2 font-mono font-medium text-amber-400">#042</td>
                        <td className="py-2">
                          <div className="font-medium text-white">Suresh B. Joshi (54/M)</div>
                          <div className="text-[10px] text-slate-400">UHID: APX-2026-9041</div>
                        </td>
                        <td className="py-2">Cardiology • Dr. K. Mehta</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                            In Chamber
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          <button className="text-brand-400 hover:text-brand-300 text-xs">E-Prescription</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-medium text-slate-300">#043</td>
                        <td className="py-2">
                          <div className="font-medium text-white">Pooja Sharma (29/F)</div>
                          <div className="text-[10px] text-slate-400">UHID: APX-2026-9042</div>
                        </td>
                        <td className="py-2">Orthopedics • Dr. R. Patel</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                            Vitals Checked
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          <button className="text-brand-400 hover:text-brand-300 text-xs">Call Patient</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-medium text-slate-300">#044</td>
                        <td className="py-2">
                          <div className="font-medium text-white">Manish Trivedi (41/M)</div>
                          <div className="text-[10px] text-slate-400">UHID: APX-2026-9043</div>
                        </td>
                        <td className="py-2">Neurology • Dr. A. Shah</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                            Waiting (12m)
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          <button className="text-brand-400 hover:text-brand-300 text-xs">View History</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Clinical Status */}
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-3">
                <span className="font-semibold text-slate-200 block">Critical Lab & OT Alerts</span>
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Critical Troponin-I: Bed 204 (ICU)
                  </div>
                  <div className="mt-1 text-[11px] text-rose-300/90">
                    Result: 4.8 ng/mL (LIS auto-sync from Abbott Architect). On-duty physician notified.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    OT-2 Laparoscopic Cholecystectomy
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-300/90">
                    Case completed successfully. Patient shifted to PACU bed #03.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ipd' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-semibold text-white">Visual Bed Allocation Matrix (Floor 2 - Surgical & ICU)</h4>
                <p className="text-xs text-slate-400">Real-time occupancy, housekeeping status & nursing assignments</p>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Occupied (38)
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-slate-700"></span> Vacant (6)
                </span>
                <span className="inline-flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Housekeeping (2)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {[
                { bed: 'ICU-01', patient: 'Kanti P.', doc: 'Dr. Shah', status: 'occupied', tariff: 'ICU' },
                { bed: 'ICU-02', patient: 'Meena D.', doc: 'Dr. Mehta', status: 'occupied', tariff: 'ICU' },
                { bed: 'ICU-03', patient: 'Vacant', doc: 'Cleaned', status: 'vacant', tariff: 'ICU' },
                { bed: 'PVT-201', patient: 'Harsh R.', doc: 'Dr. Joshi', status: 'occupied', tariff: 'Deluxe' },
                { bed: 'PVT-202', patient: 'Sneha K.', doc: 'Dr. Patel', status: 'occupied', tariff: 'Deluxe' },
                { bed: 'PVT-203', patient: 'Cleaning', doc: 'Pending', status: 'cleaning', tariff: 'Deluxe' },
                { bed: 'GEN-211', patient: 'Vikram S.', doc: 'Dr. Nair', status: 'occupied', tariff: 'General' },
                { bed: 'GEN-212', patient: 'Ashok B.', doc: 'Dr. Nair', status: 'occupied', tariff: 'General' },
                { bed: 'GEN-213', patient: 'Vacant', doc: 'Available', status: 'vacant', tariff: 'General' },
                { bed: 'GEN-214', patient: 'Dilip M.', doc: 'Dr. Mehta', status: 'occupied', tariff: 'General' },
                { bed: 'GEN-215', patient: 'Pravin T.', doc: 'Dr. Patel', status: 'occupied', tariff: 'General' },
                { bed: 'GEN-216', patient: 'Vacant', doc: 'Available', status: 'vacant', tariff: 'General' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs ${
                    item.status === 'occupied'
                      ? 'bg-slate-800/90 border-slate-700'
                      : item.status === 'vacant'
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold text-white">
                    <span>{item.bed}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-slate-700 text-slate-300">{item.tariff}</span>
                  </div>
                  <div className="mt-1 font-medium truncate text-slate-200">{item.patient}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.doc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white">IPD Discharge Billing & Clearance Desk</h4>
                <p className="text-xs text-slate-400">Reconcile pharmacy, bed charges, doctor rounds & TPA pre-auth</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-brand-950 text-brand-300 border border-brand-800 text-xs">
                Active Discharge Queue: 4 Patients
              </span>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
              <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-slate-700 text-xs">
                <div>
                  <span className="font-bold text-white">Patient: Vinodrai Sanghavi (62/M)</span>
                  <span className="text-slate-400 ml-2">UHID: APX-2026-8812 • Bed: PVT-204</span>
                </div>
                <div className="text-emerald-400 font-mono font-medium">Insurance: Star Health (TPA Approved: ₹85,000)</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-1">
                <div>
                  <span className="text-slate-400 block text-[10px]">Bed & Nursing (4 Days)</span>
                  <span className="font-semibold text-white">₹16,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Doctor Rounds & Consultation</span>
                  <span className="font-semibold text-white">₹9,500</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">OT & Surgeon Charges</span>
                  <span className="font-semibold text-white">₹48,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Pharmacy & Consumables</span>
                  <span className="font-semibold text-white">₹21,340</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs">
                  <span className="text-slate-400">Total Bill: </span>
                  <span className="font-bold text-white mr-3">₹94,840</span>
                  <span className="text-slate-400">Advance Paid: </span>
                  <span className="font-bold text-white mr-3">₹15,000</span>
                  <span className="text-emerald-400 font-semibold">TPA Settlement Pending: ₹79,840</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs">Print Itemized Bill</button>
                  <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium">Issue Discharge Clearance</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'abdm' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-amber-300 text-sm">
                    {CONTENT_CONFIG.healthcareInteroperability.abdm.statusLabel}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-900/60 text-amber-300 border border-amber-700">
                  Architectural Preview Mode
                </span>
              </div>
              <p className="text-xs text-amber-200/90 mt-2 leading-relaxed">
                {CONTENT_CONFIG.healthcareInteroperability.abdm.notice}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  ABHA Milestone Interoperability Framework
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>M1: Patient ABHA Registration via Aadhaar OTP & mobile token generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>M2: Linking Hospital UHID to ABHA address for cross-system record discovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 flex-shrink-0 mt-0.5">3</span>
                    <span className="text-slate-400">M3: Health Information Provider (HIP) consent bundle encryption</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  National Health Claims Exchange (NHCX) Roadmap
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {CONTENT_CONFIG.healthcareInteroperability.nhcx.statusLabel}
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
                  <div>• Pre-Auth FHIR Bundle Generator: Configured</div>
                  <div>• Claim Adjudication Webhook Listener: In Testbed</div>
                  <div>• Payer Settlement Message Parser: Planned</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex flex-wrap justify-between items-center text-[11px] text-slate-400">
        <div>Sarita HealthCare • Database: SQL Server Cluster • Role: Chief Medical Administrator</div>
        <div className="text-amber-400/90 font-mono">Simulated Operational Mockup for Prototype Review</div>
      </div>
    </div>
  );
};
