import React, { useState } from 'react';
import { Ship, FileText, CheckCircle2, DollarSign, Clock, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export const NimbleDashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipments' | 'drawback' | 'license'>('shipments');

  return (
    <div className="w-full bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 font-sans text-xs sm:text-sm">
      {/* Titlebar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-slate-400 font-medium text-xs ml-2 hidden sm:inline">
            Sarita Nimble EXIM Suite v7.2 • AeroTex Global Exports
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/80 text-[11px] font-mono">
            DGFT & Customs Gateway Connected
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 flex gap-4 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('shipments')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'shipments' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Active Consignments & Invoices
        </button>
        <button
          onClick={() => setActiveTab('drawback')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'drawback' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Duty Drawback & RoDTEP Realization
        </button>
        <button
          onClick={() => setActiveTab('license')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'license' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Advance License (AA) Ledgers
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 bg-slate-900/95 min-h-[380px]">
        {activeTab === 'shipments' && (
          <div className="space-y-4">
            {/* Top Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Open Export Orders</span>
                  <FileText className="w-4 h-4 text-brand-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">48 Orders</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Value: $1,420,000 USD</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Containers In Transit</span>
                  <Ship className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">18 TEUs</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Rotterdam, Jebel Ali, NYC</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Pending e-BRC / EDPMS</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">6 Bills</div>
                <div className="text-[11px] text-amber-400 mt-0.5">All within 180-day RBI limit</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Duty Drawback Accrued</span>
                  <DollarSign className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">₹18,45,200</div>
                <div className="text-[11px] text-slate-300 mt-0.5">₹14.2L Disbursed to Bank</div>
              </div>
            </div>

            {/* Table */}
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-slate-200">Recent Shipping Bills & Single-Entry Documentation</span>
                <span className="text-xs text-brand-400">Total 124 Shipments FY 2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="py-2">SB Number / Date</th>
                      <th className="py-2">Buyer & Destination</th>
                      <th className="py-2">Invoice Amount</th>
                      <th className="py-2">Incentive Status</th>
                      <th className="py-2 text-right">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-2">
                        <div className="font-medium text-white font-mono">SB-9481023 / Nhava Sheva</div>
                        <div className="text-[10px] text-slate-400">Dated: 18-Oct-2026</div>
                      </td>
                      <td className="py-2">
                        <div className="text-white">Al-Hassan Textiles LLC</div>
                        <div className="text-[10px] text-slate-400">Dubai, UAE • CIF Jebel Ali</div>
                      </td>
                      <td className="py-2 font-mono text-emerald-400">$64,200 USD</td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                          RoDTEP Calculated (₹1.84L)
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <button className="text-brand-400 hover:text-brand-300 text-xs">Download Set (PDF)</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        <div className="font-medium text-white font-mono">SB-9479811 / Mundra Port</div>
                        <div className="text-[10px] text-slate-400">Dated: 14-Oct-2026</div>
                      </td>
                      <td className="py-2">
                        <div className="text-white">Nordic Fashions GmbH</div>
                        <div className="text-[10px] text-slate-400">Hamburg, Germany • FOB Mundra</div>
                      </td>
                      <td className="py-2 font-mono text-emerald-400">€88,400 EUR</td>
                      <td className="py-2">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                          e-BRC Realized
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <button className="text-brand-400 hover:text-brand-300 text-xs">Download Set (PDF)</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drawback' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Government Export Promotion Scheme Ledgers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="font-bold text-amber-400 mb-1">Duty Drawback (DBK) Ledger</div>
                <p className="text-slate-300 text-xs mb-3">Automatic calculation based on customs tariff schedule schedule.</p>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-200">
                  <div className="flex justify-between"><span>Total Claimed (FY):</span><span>₹28,50,000</span></div>
                  <div className="flex justify-between text-emerald-400"><span>Bank Credited:</span><span>₹24,10,000</span></div>
                  <div className="flex justify-between text-amber-400"><span>Pending Customs Scroll:</span><span>₹4,40,000</span></div>
                </div>
              </div>
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="font-bold text-blue-400 mb-1">RoDTEP / RoSCTL Scrip Registry</div>
                <p className="text-slate-300 text-xs mb-3">Scrip creation, DGFT ledger debit & customs duty offset tracking.</p>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-200">
                  <div className="flex justify-between"><span>Scrips Generated:</span><span>14 Scrips</span></div>
                  <div className="flex justify-between text-emerald-400"><span>Available Credit Value:</span><span>₹7,82,400</span></div>
                  <div className="flex justify-between text-slate-400"><span>Used for Import Duty:</span><span>₹12,30,000</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'license' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white">Advance Authorization (AA) Obligation Monitoring</h4>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">License #0310892401 (DGFT RA Ahmedabad)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">Active</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                <div><span className="text-[10px] text-slate-400 block">Duty-Free Import Allowed:</span>$250,000 USD</div>
                <div><span className="text-[10px] text-slate-400 block">Import Value Utilized:</span>$210,000 USD</div>
                <div><span className="text-[10px] text-slate-400 block">Export Obligation (FOB):</span>$375,000 USD</div>
                <div><span className="text-[10px] text-emerald-400 block">Export Fulfilled:</span>$340,000 USD (90.6%)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
        <div>Sarita Nimble EXIM Software • Single-Entry Compliance Engine</div>
        <div className="text-amber-400/90 font-mono">Illustrative Mockup for Demonstration</div>
      </div>
    </div>
  );
};
