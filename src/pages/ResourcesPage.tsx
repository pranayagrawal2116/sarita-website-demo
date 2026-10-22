import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FileDown,
  FileText,
  ShieldCheck,
  Stethoscope,
  Ship,
  Landmark,
  ShoppingCart,
  Download,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { KNOWLEDGE_ARTICLES } from '../data/supportData';
import { PARTNER_RESOURCES } from '../data/partnerData';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'docs' | 'downloads' | 'interop'>('all');

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Knowledge Resources & Documentation | Sarita Infotech"
        description="Comprehensive user guides, technical documentation, product brochures, and digital health interoperability specifications."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <BookOpen className="w-3.5 h-3.5" />
            Knowledge & Downloads
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Documentation, Guides & Technical Specifications
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Search our knowledge base, download product overview decks, and review technical interoperability roadmaps.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, LIS interfacing, RoDTEP, pigmy collection..."
              className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 space-y-12">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs font-medium">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === 'all' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Resources ({filteredArticles.length + PARTNER_RESOURCES.length})
          </button>
          <button
            onClick={() => setActiveCategory('docs')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === 'docs' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            User Guides & Knowledge Base ({filteredArticles.length})
          </button>
          <button
            onClick={() => setActiveCategory('downloads')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === 'downloads' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Product Brochures & Decks ({PARTNER_RESOURCES.length})
          </button>
          <button
            onClick={() => setActiveCategory('interop')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === 'interop' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Digital Health Interoperability (ABDM / NHCX)
          </button>
        </div>

        {/* Guides Section */}
        {(activeCategory === 'all' || activeCategory === 'docs') && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Technical Articles & Guides</h3>
              <Link to="/support/knowledge-base" className="text-xs font-semibold text-brand-600 hover:underline">
                View Full Knowledge Base →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/support/knowledge-base/${art.slug}`}
                  className="enterprise-card p-6 block hover:border-brand-300 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-brand-700">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors mb-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-brand-600 flex items-center gap-1">
                    <span>Read Step-by-Step Instructions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Downloads Section */}
        {(activeCategory === 'all' || activeCategory === 'downloads') && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Brochures & Architecture Overviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PARTNER_RESOURCES.map((res) => (
                <div key={res.id} className="enterprise-card p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">{res.format}</span>
                      <span>{res.size}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mb-2">{res.title}</h5>
                    <div className="text-xs text-slate-500">Product: {res.product}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => alert(`Demonstration Download: "${res.title}" simulated successfully.`)}
                      className="w-full btn-secondary text-xs py-1.5 flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digital Health Interoperability Spec Brief */}
        {(activeCategory === 'all' || activeCategory === 'interop') && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">Healthcare Interoperability Roadmap</h3>
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-base">ABDM & NHCX Technical Framework</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sarita HealthCare is designed with modular FHIR / HL7 messaging architectures to support Ayushman Bharat Health Account (ABHA) registration, patient health records (PHR) linking, and the National Health Claims Exchange (NHCX).
              </p>
              <div className="text-xs text-amber-300 font-mono">
                Current Public Roadmap Status: {CONTENT_CONFIG.healthcareInteroperability.abdm.statusLabel}
              </div>
              <div className="pt-2">
                <Link to="/products/healthcare#interoperability" className="btn-primary bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                  Review Healthcare Interoperability Spec →
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
