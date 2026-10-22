import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, LifeBuoy, FileQuestion } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead title="Page Not Found (404) | Sarita Infotech Pvt. Ltd." />
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-brand-600 shadow-sm">
            <FileQuestion className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-widest block mb-1">
              Error 404
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              The page you are looking for may have been moved, renamed, or is currently undergoing content updates.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn-primary text-xs py-2.5 px-4">
              <Home className="w-4 h-4 mr-1.5" />
              Return to Homepage
            </Link>
            <Link to="/products" className="btn-secondary text-xs py-2.5 px-4">
              Explore Products
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
            Need urgent assistance? Visit our{' '}
            <Link to="/support" className="text-brand-600 font-semibold hover:underline">
              Customer Support Center
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
