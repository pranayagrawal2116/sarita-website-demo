import React, { useState } from 'react';
import { Landmark, Users, PiggyBank, Calculator, FileCheck, CheckCircle2 } from 'lucide-react';

export const BankWareDashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pigmy' | 'loans'>('overview');

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
            Sarita BankWare Core System v8.1 • Kabilpore Co-Operative Credit Society Ltd.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-[11px] font-mono">
            Core Ledger Balanced • Day-End Open
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 flex gap-4 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Society Financial Position
        </button>
        <button
          onClick={() => setActiveTab('pigmy')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pigmy' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Daily Pigmy Agent Tally
        </button>
        <button
          onClick={() => setActiveTab('loans')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'loans' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Loan Portfolio & NPA Audit
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 bg-slate-900/95 min-h-[380px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Total Active Members</span>
                  <Users className="w-4 h-4 text-brand-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">4,820</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Share Capital: ₹1.42 Cr</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Total Deposits (FD/RD/Daily)</span>
                  <PiggyBank className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">₹18.64 Cr</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">↑ 8.4% YoY Growth</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Loan Advances Out</span>
                  <Landmark className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">₹14.10 Cr</div>
                <div className="text-[11px] text-slate-300 mt-0.5">CD Ratio: 75.6%</div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>Gross NPA Ratio</span>
                  <FileCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-1 text-white">1.24%</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">Standard Asset Provisioned</div>
              </div>
            </div>

            {/* Member Register Sample */}
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-semibold text-slate-200">Recent Member Share & Deposit Transactions</span>
                <span className="text-xs text-brand-400 font-mono">Day Book: 22-Oct-2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="py-2">Member No.</th>
                      <th className="py-2">Name & Account</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2 text-right">Passbook Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-2 font-mono text-amber-400">#M-1094</td>
                      <td className="py-2">
                        <div className="text-white font-medium">Jayeshbhai M. Chaudhari</div>
                        <div className="text-[10px] text-slate-400">FD A/c: 2026-FD-892</div>
                      </td>
                      <td className="py-2">12-Mo Re-investment FD</td>
                      <td className="py-2 font-mono text-emerald-400">₹2,00,000</td>
                      <td className="py-2 text-right">
                        <span className="text-slate-300">Printed (Guj/Eng)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-amber-400">#M-0872</td>
                      <td className="py-2">
                        <div className="text-white font-medium">Bhavnaben K. Solanki</div>
                        <div className="text-[10px] text-slate-400">RD A/c: 2025-RD-411</div>
                      </td>
                      <td className="py-2">Monthly Recurring Installment</td>
                      <td className="py-2 font-mono text-emerald-400">₹5,000</td>
                      <td className="py-2 text-right">
                        <span className="text-emerald-400">Posted</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pigmy' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Daily Pigmy Deposit Agent Cash Handover</h4>
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <span className="font-bold text-white">Agent #AG-04: Nilesh R. Prajapati (Zone: Rander Road)</span>
                <span className="text-emerald-400 font-semibold">Tally Status: Matched 100%</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-slate-300">
                <div><span className="text-[10px] text-slate-400 block">Total Passbook Receipts:</span>84 Accounts</div>
                <div><span className="text-[10px] text-slate-400 block">Cash Collected:</span>₹72,400</div>
                <div><span className="text-[10px] text-slate-400 block">Agent Commission (2.5%):</span>₹1,810</div>
                <div><span className="text-[10px] text-emerald-400 block">Net Society Credit:</span>₹70,590</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white">Guarantor Risk Validation & Overdue Management</h4>
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-white">Personal Loan #PL-492 (Member: Rajesh D. Rana)</span>
                <span className="text-emerald-400">Guarantor Verification: PASSED</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Guarantor #1 (M-0412) has 1 active guarantee (Max allowed: 2). Net disposable income verified against salary slip.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
        <div>Sarita BankWare • Cooperative Credit Society Architecture</div>
        <div className="text-amber-400/90 font-mono">Illustrative Mockup for Demonstration</div>
      </div>
    </div>
  );
};
