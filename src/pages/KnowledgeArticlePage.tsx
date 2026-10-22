import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  HelpCircle,
  Share2,
  Printer,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';
import { SupportLayout } from '../components/layout/SupportLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { KNOWLEDGE_ARTICLES } from '../data/supportData';

export const KnowledgeArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <SupportLayout>
        <div className="max-w-xl mx-auto py-16 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-xs text-slate-600">
            The documentation article you are seeking does not exist or has been relocated.
          </p>
          <div className="pt-2">
            <Link to="/support/knowledge-base" className="btn-primary text-xs py-2 px-4">
              Return to Knowledge Base
            </Link>
          </div>
        </div>
      </SupportLayout>
    );
  }

  const related = KNOWLEDGE_ARTICLES.filter(
    (a) => a.id !== article.id && a.product === article.product
  ).slice(0, 3);

  return (
    <SupportLayout>
      <SEOHead
        title={`${article.title} | Sarita Knowledge Base`}
        description={article.summary}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/support" className="hover:text-brand-600">Support</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/support/knowledge-base" className="hover:text-brand-600">Knowledge Base</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-medium truncate max-w-xs">{article.category}</span>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                {article.product}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {article.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
              {article.summary}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <p>{article.content}</p>

            {article.steps && article.steps.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-slate-900">
                  Step-by-Step Configuration Procedure:
                </h3>
                <div className="space-y-3">
                  {article.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 leading-snug">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Need help footer box */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                Still have questions regarding this procedure?
              </span>
              <span className="text-xs text-slate-600">
                Our support desk engineers are available for remote walkthroughs.
              </span>
            </div>
            <Link to="/support/raise-ticket" className="btn-primary text-xs py-2 px-4 bg-emerald-600 hover:bg-emerald-500 whitespace-nowrap">
              Submit a Ticket
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-base">Related Technical Guides</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/support/knowledge-base/${rel.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-400 transition-colors block group"
                >
                  <span className="text-[10px] font-semibold text-brand-600 uppercase block mb-1">
                    {rel.category}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-brand-600 transition-colors">
                    {rel.title}
                  </h5>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </SupportLayout>
  );
};
