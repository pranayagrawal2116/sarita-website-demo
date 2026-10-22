import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { COMPANY_INFO } from '../data/companyData';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Terms of Service | Sarita Infotech Pvt. Ltd."
        description="Terms and conditions governing the use of Sarita Infotech software demonstration prototypes and portals."
      />
      <Header />

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-brand-300">Legal Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs text-slate-400">Sarita Infotech Private Limited • Surat, Gujarat, India</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900">1. Website Prototype & Evaluation Nature</h3>
          <p>
            This website is a redesign prototype developed for Sarita Infotech Pvt. Ltd. Interactive forms, support ticketing, and partner portal modules simulate realistic behavior using frontend mock data. It is intended for stakeholder evaluation and architectural review prior to production commissioning.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">2. Software Licensing & Intellectual Property</h3>
          <p>
            All software product names, including Sarita HealthCare, Sarita Nimble, Sarita BankWare, and Sarita Retail, together with their underlying database schemas, user interfaces, documentation, and source code, are proprietary intellectual property of Sarita Infotech Private Limited.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">3. Interoperability & Integration Statements</h3>
          <p>
            References to Ayushman Bharat Digital Mission (ABDM), ABHA accounts, National Health Claims Exchange (NHCX), and customs gateways represent technical architectural roadmap readiness. Production deployment requires formal sandbox onboarding and government agency compliance certification.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">4. Jurisdiction</h3>
          <p>
            Any legal dispute arising in connection with software licensing, implementation contracts, or website usage is subject to the exclusive jurisdiction of the courts of Surat, Gujarat, India.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
