import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { COMPANY_INFO } from '../data/companyData';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="Privacy Policy | Sarita Infotech Pvt. Ltd."
        description="Privacy policy and data governance practices of Sarita Infotech Pvt. Ltd."
      />
      <Header />

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-brand-300">Legal & Governance</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026 • Sarita Infotech Private Limited</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 flex items-start gap-3 text-xs text-brand-900">
            <ShieldCheck className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Enterprise Data Sovereignty:</strong>
              Sarita Infotech develops business software deployed on client infrastructure or private cloud instances. Client operational, medical, and financial records remain the exclusive property of the client organization.
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 pt-2">1. Information Collection</h3>
          <p>
            When visiting this website or requesting a software demonstration, we collect corporate contact information such as your name, business email, telephone number, organization name, and relevant functional interests.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">2. Use of Information</h3>
          <p>
            Information collected through our demonstration request and support ticket portals is used strictly to coordinate sales demonstrations, provide authorized customer support, fulfill software licensing agreements, and communicate critical regulatory updates.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">3. Health & Banking Data Confidentiality</h3>
          <p>
            In deployments of Sarita HealthCare and Sarita BankWare, patient health records and member financial transactions reside strictly within the client’s designated database boundary. Sarita Infotech personnel access client production environments solely under authorized remote support supervision and mutual non-disclosure agreements (NDAs).
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">4. Contact & Inquiries</h3>
          <p>
            For inquiries regarding our data handling policies, you may contact our compliance desk at{' '}
            <a href={`mailto:${COMPANY_INFO.inquiryEmail}`} className="text-brand-600 font-semibold hover:underline">
              {COMPANY_INFO.inquiryEmail}
            </a>{' '}
            or write to our registered office: {COMPANY_INFO.headquarters.fullAddress}.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
