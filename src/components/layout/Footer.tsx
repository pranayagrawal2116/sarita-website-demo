import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Headphones,
  KeyRound,
  MessageSquare
} from 'lucide-react';
import { LinkedInIcon, TwitterIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';
import { COMPANY_INFO } from '../../data/companyData';
import { CONTENT_CONFIG } from '../../data/contentConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow font-bold text-xl tracking-tighter">
                SI
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Sarita<span className="text-brand-400">Infotech</span>
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-slate-400">
                  Private Limited
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Practical business software and technology solutions designed to simplify operations, improve visibility, and support organizational growth across healthcare, global trade, banking, and retail.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_INFO.headquarters.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.inquiryEmail}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.inquiryEmail}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:border-emerald-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Software Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Software Products</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products/healthcare" className="text-slate-400 hover:text-white transition-colors block">
                  Sarita HealthCare (HMIS)
                </Link>
              </li>
              <li>
                <Link to="/products/nimble" className="text-slate-400 hover:text-white transition-colors block">
                  Sarita Nimble (EXIM Trade)
                </Link>
              </li>
              <li>
                <Link to="/products/bankware" className="text-slate-400 hover:text-white transition-colors block">
                  Sarita BankWare (Co-Op Banking)
                </Link>
              </li>
              <li>
                <Link to="/products/retail" className="text-slate-400 hover:text-white transition-colors block">
                  Sarita Retail (POS & Stores)
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-400 hover:underline pt-1 inline-block font-medium">
                  All Products Matrix →
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services & Domains</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/custom-software-development" className="text-slate-400 hover:text-white transition-colors block">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors block">
                  Implementation & Migration
                </Link>
              </li>
              <li>
                <Link to="/industries/healthcare" className="text-slate-400 hover:text-white transition-colors block">
                  Hospital Solutions
                </Link>
              </li>
              <li>
                <Link to="/industries/trade" className="text-slate-400 hover:text-white transition-colors block">
                  Export / Import Houses
                </Link>
              </li>
              <li>
                <Link to="/industries/cooperative-banking" className="text-slate-400 hover:text-white transition-colors block">
                  Credit Societies
                </Link>
              </li>
              <li>
                <Link to="/industries/retail" className="text-slate-400 hover:text-white transition-colors block">
                  Retail & Distribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Client & Partner Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/support" className="text-slate-400 hover:text-white transition-colors block">
                  Customer Support Center
                </Link>
              </li>
              <li>
                <Link to="/support/raise-ticket" className="text-slate-400 hover:text-white transition-colors block">
                  Submit a Support Ticket
                </Link>
              </li>
              <li>
                <Link to="/support/track-ticket" className="text-slate-400 hover:text-white transition-colors block">
                  Track My Ticket Status
                </Link>
              </li>
              <li>
                <Link to="/support/knowledge-base" className="text-slate-400 hover:text-white transition-colors block">
                  Knowledge Base & Docs
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-white transition-colors block">
                  Channel Partner Program
                </Link>
              </li>
              <li>
                <Link to="/partners/login" className="text-brand-400 hover:underline block font-medium">
                  Partner Portal Login →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Verification Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-4 rounded-xl my-8">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Demonstration Prototype Notice: </span>
              {CONTENT_CONFIG.prototypeDisclaimer.footerNote}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Sarita Infotech Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Surat HQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
