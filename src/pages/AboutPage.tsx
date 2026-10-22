import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/layout/SEOHead';
import { ReviewNotice } from '../components/ui/ReviewNotice';
import { COMPANY_INFO } from '../data/companyData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEOHead
        title="About Us | Sarita Infotech Pvt. Ltd."
        description="Over 23 years of enterprise software engineering experience across healthcare, international trade, cooperative banking, and retail in Surat, Gujarat, India."
      />
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
            <Building2 className="w-3.5 h-3.5" />
            Company Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Over Two Decades of Dedicated Business Software Craftsmanship
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Headquartered in Surat, Gujarat, Sarita Infotech Pvt. Ltd. has partnered with over 200+ healthcare institutions, export houses, and financial cooperatives.
          </p>
        </div>
      </section>

      {/* Overview & Mission */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="section-tag">Our Enterprise Purpose</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Software Solutions Built Directly Around Real Business Workflows
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We, at Sarita Infotech, have been mastering the art of customized business app solutions for well over 23 years. With more than 200+ national and international clients in our portfolio, we have created our niche in the areas of healthcare, export/import documentation, cooperative banking, retail, production, and supply chain management.
            </p>

            <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200/80 text-brand-900 text-xs sm:text-sm italic leading-relaxed">
              "{COMPANY_INFO.mission}"
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-brand-600 font-mono">23+ Years</div>
                <div className="text-xs text-slate-600 mt-1">Established Industry Practice</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600 font-mono">200+</div>
                <div className="text-xs text-slate-600 mt-1">Enterprise Implementations</div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Operating Values</h3>
            <div className="space-y-4">
              {COMPANY_INFO.coreValues.map((val, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-brand-600 font-bold text-xs flex-shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{val.title}</h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chronological Milestones */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-tag">Company Evolution</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Two Decades of Software Innovation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {COMPANY_INFO.milestones.map((milestone, idx) => (
              <div key={idx} className="enterprise-card p-5 space-y-2">
                <span className="text-lg font-bold text-brand-600 font-mono block">
                  {milestone.year}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{milestone.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Placeholders (labeled for verification) */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="section-tag">Executive Leadership</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Steering Engineering & Customer Success
            </h3>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <ReviewNotice
              label="Leadership Directory Notice"
              message="Leadership profiles and executive biographies will be confirmed with company directors prior to production release."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { role: 'Managing Director & Founder', focus: 'Product Engineering & Strategic Vision' },
              { role: 'Head of Technical Implementation', focus: 'Enterprise Deployments & LIS Interfacing' },
              { role: 'VP Customer Success & Alliances', focus: 'Support SLAs & Channel Partner Ecosystem' }
            ].map((lead, idx) => (
              <div key={idx} className="enterprise-card p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center text-slate-400">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">[Executive Profile {idx + 1}]</h4>
                  <div className="text-xs text-brand-700 font-medium">{lead.role}</div>
                  <div className="text-xs text-slate-500 mt-1">{lead.focus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
