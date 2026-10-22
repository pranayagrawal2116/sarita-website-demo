import React, { useState } from 'react';
import { FileDown, Download, CheckCircle2, Search, Filter, ShieldCheck } from 'lucide-react';
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { PARTNER_RESOURCES } from '../data/partnerData';

export const PartnerResourcesPage: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const filtered = PARTNER_RESOURCES.filter((r) => {
    if (filterType === 'all') return true;
    return r.type.toLowerCase() === filterType.toLowerCase();
  });

  const handleDownload = (res: typeof PARTNER_RESOURCES[0]) => {
    setDownloadedId(res.id);
    const content = `SARITA INFOTECH CHANNEL PARTNER ASSET: ${res.title}\nProduct: ${res.product}\nType: ${res.type}\nLast Updated: ${res.lastUpdated}\n\n[Demonstration Partner Resource File Generated Successfully]`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.id}-${res.product.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PartnerLayout>
      <SEOHead
        title="Sales Collateral & Partner Resources | Sarita Partner Portal"
        description="Download unbranded and co-branded enterprise software brochures, sales presentations, and technical specifications."
      />

      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Partner Marketing & Sales Assets
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Approved sales decks, product specification brochures, and channel training manuals
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto text-xs font-medium pb-1">
          {['all', 'Brochure', 'Sales Deck', 'Technical Specs', 'Training Manual'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                filterType === t
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t === 'all' ? 'All Asset Types' : t}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-medium">
                  <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-mono text-[10px]">
                    {res.format}
                  </span>
                  <span>{res.size}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                  {res.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-500">
                  <div>Product Focus: <strong className="text-slate-800">{res.product}</strong></div>
                  <div>Category: {res.type}</div>
                  <div>Updated: {res.lastUpdated}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleDownload(res)}
                  className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-1.5"
                >
                  {downloadedId === res.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>Download {res.format} Asset</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PartnerLayout>
  );
};
