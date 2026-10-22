import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Ship,
  Landmark,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  FileCheck,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { PRODUCTS } from '../data/productsData';
import { DemoRequestModal } from '../components/common/DemoRequestModal';
import { ProductId } from '../types';

export const ProductsPage: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductId | 'all'>('all');

  const openDemo = (id: ProductId | 'all') => {
    setSelectedProduct(id);
    setDemoOpen(true);
  };

  const productIcons: Record<string, React.ReactNode> = {
    healthcare: <Stethoscope className="w-8 h-8 text-emerald-600" />,
    nimble: <Ship className="w-8 h-8 text-blue-600" />,
    bankware: <Landmark className="w-8 h-8 text-amber-600" />,
    retail: <ShoppingCart className="w-8 h-8 text-purple-600" />
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Enterprise Software Products | Sarita Infotech Pvt. Ltd."
        description="Explore Sarita HealthCare HMIS, Sarita Nimble EXIM trade software, Sarita BankWare cooperative banking, and Sarita Retail business solutions."
      />
      <Header />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800 mb-3">
            <Layers className="w-3.5 h-3.5" />
            Product Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Specialized Software Built for High-Volume Operations
          </h1>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            Four specialized enterprise suites designed to eliminate operational friction across healthcare delivery, international trade, cooperative credit societies, and modern retail.
          </p>
        </div>
      </section>

      {/* Product List Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {PRODUCTS.map((product, idx) => (
          <div
            key={product.id}
            id={product.id}
            className="enterprise-card p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-start justify-between"
          >
            {/* Left Info */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                  {productIcons[product.id]}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    {product.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {product.name}
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {product.fullDescription}
              </p>

              {/* Target Audience */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Ideal For:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.targetAudience.map((aud, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.keyFeatures.slice(0, 6).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-72 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 flex-shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Deployment & Onboarding
              </div>
              <div className="text-xs text-slate-600 space-y-2">
                <div>
                  <span className="font-semibold text-slate-800 block">Rollout Timeline:</span>
                  <span>{product.implementationTimeline.split(':')[1]?.trim() || product.implementationTimeline}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">Support Model:</span>
                  <span>Dedicated AMC with remote & telephonic helpdesk</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2.5">
                <Link
                  to={`/products/${product.slug}`}
                  className="w-full btn-primary text-xs py-2.5 text-center flex items-center justify-center gap-1.5"
                >
                  <span>Explore Product Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => openDemo(product.id)}
                  className="w-full btn-secondary text-xs py-2 text-center"
                >
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Feature Comparison Matrix Summary */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-tag">Comparison Matrix</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Architecture & Interoperability Across Sarita Software
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Software Solution</th>
                  <th className="p-3.5">Target Industry</th>
                  <th className="p-3.5">Core Focus</th>
                  <th className="p-3.5">Interoperability / Gateways</th>
                  <th className="p-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PRODUCTS.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{prod.name}</td>
                    <td className="p-3.5 text-slate-600">{prod.badge.split('(')[0].trim()}</td>
                    <td className="p-3.5 text-slate-600">{prod.shortDescription}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">
                      {prod.integrationsVerified.slice(0, 2).join(' • ')}
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/products/${prod.slug}`}
                        className="text-brand-600 font-semibold hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />

      <DemoRequestModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        initialProductId={selectedProduct}
      />
    </div>
  );
};
