import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, Stethoscope, Ship, Landmark, ShoppingCart, ExternalLink } from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { KNOWLEDGE_ARTICLES } from '../data/supportData';

export const KnowledgeBasePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('all');

  const filtered = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(query.toLowerCase()) ||
      art.summary.toLowerCase().includes(query.toLowerCase()) ||
      art.content.toLowerCase().includes(query.toLowerCase());
    const matchesProd = selectedProduct === 'all' || art.product === selectedProduct;
    return matchesSearch && matchesProd;
  });

  return (
    <SupportLayout>
      <SEOHead
        title="Knowledge Base & Documentation | Sarita Infotech Helpdesk"
        description="Search troubleshooting guides, configuration steps, and operational procedures for all Sarita Infotech software products."
      />

      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Search Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Self-Service Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How Can We Help You Today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Find immediate answers, machine interfacing instructions, regulatory rate update walkthroughs, and hardware setup guides.
          </p>

          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords (e.g. Sysmex, Advance License, Pigmy, ESC/POS)..."
              className="w-full pl-12 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
            {['all', 'Sarita HealthCare', 'Sarita Nimble', 'Sarita BankWare', 'Sarita Retail'].map((prod) => (
              <button
                key={prod}
                onClick={() => setSelectedProduct(prod)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  selectedProduct === prod
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {prod === 'all' ? 'All Software Articles' : prod}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Showing {filtered.length} Knowledge Base Articles</span>
            <span>Technical Documentation Series 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((art) => (
              <Link
                key={art.id}
                to={`/support/knowledge-base/${art.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-400 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-brand-700">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-semibold">
                  <span>View Step-by-Step Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};
