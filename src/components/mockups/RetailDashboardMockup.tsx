import React, { useState } from 'react';
import { ShoppingCart, Boxes, Clock, FileSpreadsheet, CheckCircle2, Search, ArrowRight } from 'lucide-react';

export const RetailDashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'gst'>('pos');

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
            Sarita Retail POS v5.0 • Express Supermarket (Station #02)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-[11px] font-mono">
            Scanner Ready • Printer Online (80mm)
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 flex gap-4 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('pos')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pos' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Fast Barcode Checkout Counter
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'inventory' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Stock Valuation & Batch Expiry
        </button>
        <button
          onClick={() => setActiveTab('gst')}
          className={`py-2.5 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'gst' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          GST Sales Tax Registers (GSTR-1)
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 bg-slate-900/95 min-h-[380px]">
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              {/* Scan Barcode input */}
              <div className="flex items-center gap-2 p-2.5 bg-slate-800 rounded-lg border border-slate-700">
                <Search className="w-4 h-4 text-brand-400" />
                <input
                  type="text"
                  readOnly
                  value="8901030829141 (Amul Pure Ghee 1L Tin)"
                  className="bg-transparent text-white w-full focus:outline-none text-xs font-mono"
                />
                <span className="px-2 py-0.5 rounded bg-brand-900 text-brand-300 text-[10px]">Auto Scanned</span>
              </div>

              {/* Items Table */}
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/80">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="py-2">Item Description</th>
                      <th className="py-2">Batch / Exp</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Rate</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    <tr>
                      <td className="py-2 font-medium text-white">Amul Pure Ghee 1L Tin</td>
                      <td className="py-2 text-[10px] text-slate-400">B: AM-892 (Exp: 11/27)</td>
                      <td className="py-2 text-center font-mono">1</td>
                      <td className="py-2 text-right">₹650.00</td>
                      <td className="py-2 text-right font-mono text-white">₹650.00</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-white">Tata Salt Vacuum Evaporated 1kg</td>
                      <td className="py-2 text-[10px] text-slate-400">B: TT-104 (Exp: 08/28)</td>
                      <td className="py-2 text-center font-mono">2</td>
                      <td className="py-2 text-right">₹28.00</td>
                      <td className="py-2 text-right font-mono text-white">₹56.00</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-white">Fortune Sunlite Refined Oil 1L</td>
                      <td className="py-2 text-[10px] text-slate-400">B: FO-441 (Exp: 06/27)</td>
                      <td className="py-2 text-center font-mono">1</td>
                      <td className="py-2 text-right">₹145.00</td>
                      <td className="py-2 text-right font-mono text-white">₹145.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bill Summary Desk */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-1">Customer: Suresh Shah (+91 98250 11992)</div>
                <div className="text-xs text-emerald-400 mb-3">Loyalty Points: 340 pts available</div>

                <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-700 pt-2 font-mono">
                  <div className="flex justify-between"><span>Subtotal:</span><span>₹851.00</span></div>
                  <div className="flex justify-between"><span>GST Included:</span><span>₹42.50</span></div>
                  <div className="flex justify-between text-emerald-400"><span>Scheme Discount:</span><span>- ₹21.00</span></div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-700">
                  <div className="text-slate-400 text-xs">Total Payable:</div>
                  <div className="text-2xl font-bold text-white font-mono">₹830.00</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Quick Cash [F1] / UPI QR [F2]
                </button>
                <button className="w-full py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs">
                  Hold Bill [F6]
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white">Batch & Expiry Monitoring Alerts</h4>
            <div className="p-3 bg-amber-950/20 border border-amber-800/60 rounded-xl text-amber-200">
              <div className="font-bold">2 SKUs Nearing Expiry Within 30 Days</div>
              <p className="text-[11px] mt-1 text-amber-300">
                Dairy products (Amul Paneer 200g - Batch DP-12) will reach expiry on 05-Nov-2026. Automated clearance discount suggested.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'gst' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white">GST Invoicing & Tax Ledger Summaries</h4>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <div className="grid grid-cols-3 gap-2 font-mono">
                <div><span className="text-slate-400 text-[10px] block">B2C Taxable Sales:</span>₹4,28,400</div>
                <div><span className="text-slate-400 text-[10px] block">CGST Collected:</span>₹21,420</div>
                <div><span className="text-slate-400 text-[10px] block">SGST Collected:</span>₹21,420</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
        <div>Sarita Retail Management System • Point-of-Sale Architecture</div>
        <div className="text-amber-400/90 font-mono">Illustrative Mockup for Demonstration</div>
      </div>
    </div>
  );
};
