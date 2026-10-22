import React from 'react';
import { Link } from 'react-router-dom';
import {
  LifeBuoy,
  PlusCircle,
  Search,
  BookOpen,
  Headphones,
  ShieldCheck,
  ArrowRight,
  FileText,
  Clock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { useApp } from '../context/AppContext';
import { KNOWLEDGE_ARTICLES } from '../data/supportData';
import { COMPANY_INFO } from '../data/companyData';

export const SupportLandingPage: React.FC = () => {
  const { tickets } = useApp();

  return (
    <SupportLayout>
      <SEOHead
        title="Customer Support & Helpdesk Center | Sarita Infotech"
        description="Raise support tickets, track ticket status, and browse knowledge base articles for Sarita HealthCare, Sarita Nimble, Sarita BankWare, and Sarita Retail."
      />

      <div className="space-y-12">
        {/* Support Gateway Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Raise Ticket */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Submit a Support Ticket
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Encountering an issue with laboratory analyzer communication, receipt printer alignment, or software configuration? Submit a detailed service ticket to our technical desk.
              </p>
            </div>
            <Link
              to="/support/raise-ticket"
              className="btn-primary w-full text-center bg-emerald-600 hover:bg-emerald-500 text-xs py-2.5"
            >
              Raise a Support Ticket
            </Link>
          </div>

          {/* Card 2: Track Tickets */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Track Existing Tickets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Check live progress, engineer notes, and conversation updates on your open tickets. You currently have <strong className="text-slate-900 font-bold">{tickets.length} tickets</strong> recorded in this prototype session.
              </p>
            </div>
            <Link
              to="/support/track-ticket"
              className="btn-secondary w-full text-center text-xs py-2.5 border-slate-300"
            >
              Track Ticket Status ({tickets.length})
            </Link>
          </div>

          {/* Card 3: Knowledge Base */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Knowledge Base & Docs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Browse step-by-step guides for machine interfacing, advance license tracking, daily collection reconciliations, and thermal receipt printer setup.
              </p>
            </div>
            <Link
              to="/support/knowledge-base"
              className="btn-secondary w-full text-center text-xs py-2.5 border-slate-300"
            >
              Browse Articles ({KNOWLEDGE_ARTICLES.length})
            </Link>
          </div>
        </div>

        {/* Support Helpdesk Phone & Immediate Channels */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Emergency & On-Call Assistance
            </span>
            <h3 className="text-xl font-bold text-white">
              Need Immediate Remote Desktop Support?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              For critical hospital IPD billing or month-end banking cutovers, reach our on-duty support engineers directly via phone or WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.supportPhone.replace(/\s+/g, '')}`}
              className="btn-primary bg-emerald-600 hover:bg-emerald-500 text-xs py-2.5 px-4"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: {COMPANY_INFO.supportPhone}
            </a>
            <Link
              to="/support/agent-dashboard"
              className="btn-secondary text-xs py-2.5 px-4 bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
            >
              Support Agent Desk →
            </Link>
          </div>
        </div>

        {/* Featured Knowledge Base Guides */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Featured Knowledge Base Articles</h3>
            <Link to="/support/knowledge-base" className="text-xs font-semibold text-brand-600 hover:underline">
              View All Documentation →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KNOWLEDGE_ARTICLES.slice(0, 3).map((art) => (
              <Link
                key={art.id}
                to={`/support/knowledge-base/${art.slug}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="font-semibold text-brand-700">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors mb-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-brand-600 flex items-center justify-between">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};
