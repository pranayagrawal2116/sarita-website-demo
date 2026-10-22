import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Stethoscope,
  Ship,
  Landmark,
  ShoppingCart,
  Headphones,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ArrowRight,
  Code2,
  DatabaseZap,
  Phone,
  Mail
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { PRODUCTS } from '../../data/productsData';
import { DemoRequestModal } from '../common/DemoRequestModal';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { partnerAuthenticated, customerAuthenticated, currentCustomer, adminAuthenticated, adminUser } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const productIcons: Record<string, React.ReactNode> = {
    healthcare: <Stethoscope className="w-5 h-5 text-emerald-600" />,
    nimble: <Ship className="w-5 h-5 text-blue-600" />,
    bankware: <Landmark className="w-5 h-5 text-amber-600" />,
    retail: <ShoppingCart className="w-5 h-5 text-purple-600" />
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-white border-b border-slate-200/80'
        }`}
      >
        {/* Top Utility Bar */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-4 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <a href={`tel:${COMPANY_INFO.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.supportPhone}
                </a>
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <a href={`mailto:${COMPANY_INFO.inquiryEmail}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.inquiryEmail}
                </a>
              </span>
              <span className="hidden lg:inline text-slate-400 font-mono text-[11px]">
                Surat, Gujarat, India • 23+ Years in Business Software
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium ml-auto">
              {/* Customer Portal Link */}
              <Link
                to={customerAuthenticated ? '/customer/dashboard' : '/customer/login'}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                title="Customer Support Ticketing & Account Portal"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">
                  {customerAuthenticated ? `${currentCustomer?.name.split(' ')[0]} (Customer Portal)` : 'Customer Portal'}
                </span>
                <span className="sm:hidden">Customer</span>
              </Link>
              
              <span className="text-slate-700">|</span>

              {/* Partner Portal Link */}
              <Link
                to={partnerAuthenticated ? '/partners/dashboard' : '/partners/login'}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                title="Authorized B2B Channel Partner Portal"
              >
                <KeyRound className="w-3.5 h-3.5 text-brand-400" />
                <span className="hidden sm:inline">
                  {partnerAuthenticated ? 'Partner Portal (Active)' : 'Partner Portal'}
                </span>
                <span className="sm:hidden">Partner</span>
              </Link>

              <span className="text-slate-700">|</span>

              {/* Admin Portal Link */}
              <Link
                to={adminAuthenticated ? '/admin/dashboard' : '/admin/login'}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                title="Central Administration Management System"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-accent-500 flex items-center justify-center text-white shadow-md font-bold text-xl tracking-tighter">
                SI
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                  Sarita<span className="text-brand-600">Infotech</span>
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-slate-500 -mt-1">
                  Enterprise Business Software
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              {/* Products Dropdown / Mega-Menu */}
              <div className="relative" ref={productsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setProductsOpen(!productsOpen);
                    setServicesOpen(false);
                    setIndustriesOpen(false);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/products') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={productsOpen}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>

                {productsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[580px] bg-white rounded-2xl shadow-elevated border border-slate-200/90 p-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Our Flagship Software Products
                      </span>
                      <Link
                        to="/products"
                        onClick={() => setProductsOpen(false)}
                        className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                      >
                        All Products Overview <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTS.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/products/${prod.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all mt-0.5">
                            {productIcons[prod.id]}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
                              {prod.name}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                              {prod.shortDescription}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/60 -mx-4 -mb-4 p-4 rounded-b-2xl flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Looking for customized business workflows?</span>
                      <Link
                        to="/services/custom-software-development"
                        onClick={() => setProductsOpen(false)}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        Explore Custom Engineering →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setProductsOpen(false);
                    setIndustriesOpen(false);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/services') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-elevated border border-slate-200 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/services/custom-software-development"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 transition-colors"
                    >
                      <Code2 className="w-4 h-4 text-brand-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">Custom Software Development</div>
                        <div className="text-xs text-slate-500">Bespoke desktop & cloud engineering</div>
                      </div>
                    </Link>
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 transition-colors"
                    >
                      <DatabaseZap className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">Implementation & Migration</div>
                        <div className="text-xs text-slate-500">Zero-downtime historical cutovers</div>
                      </div>
                    </Link>
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 transition-colors"
                    >
                      <Headphones className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">Annual Maintenance & Support</div>
                        <div className="text-xs text-slate-500">Dedicated desk & statutory updates</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div className="relative" ref={industriesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIndustriesOpen(!industriesOpen);
                    setProductsOpen(false);
                    setServicesOpen(false);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/industries') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={industriesOpen}
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {industriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-elevated border border-slate-200 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/industries/healthcare"
                      onClick={() => setIndustriesOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 text-sm font-medium"
                    >
                      Healthcare & Hospitals
                    </Link>
                    <Link
                      to="/industries/trade"
                      onClick={() => setIndustriesOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 text-sm font-medium"
                    >
                      International Trade & EXIM
                    </Link>
                    <Link
                      to="/industries/cooperative-banking"
                      onClick={() => setIndustriesOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 text-sm font-medium"
                    >
                      Cooperative Credit Societies
                    </Link>
                    <Link
                      to="/industries/retail"
                      onClick={() => setIndustriesOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-brand-700 text-sm font-medium"
                    >
                      Retail & Multi-Store Chains
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link
                        to="/industries"
                        onClick={() => setIndustriesOpen(false)}
                        className="block p-2 rounded-lg text-xs font-semibold text-brand-600 hover:bg-brand-50"
                      >
                        All Industries Overview →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/case-studies"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/case-studies') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Case Studies
              </Link>

              <Link
                to="/resources"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/resources') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Resources
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/about') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/contact') ? 'text-brand-600 bg-brand-50/70 font-semibold' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-primary shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2 text-brand-200" />
                Request a Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="btn-primary text-xs py-1.5 px-3"
              >
                Demo
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto space-y-3">
            <Link to="/" className="block py-2 text-base font-semibold text-slate-900 border-b border-slate-100">
              Home
            </Link>

            <div className="py-2 border-b border-slate-100">
              <div className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-2">Products</div>
              <div className="space-y-1.5 pl-2">
                <Link to="/products/healthcare" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Sarita HealthCare (HMIS)
                </Link>
                <Link to="/products/nimble" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Sarita Nimble (EXIM Trade)
                </Link>
                <Link to="/products/bankware" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Sarita BankWare (Co-Op Banking)
                </Link>
                <Link to="/products/retail" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Sarita Retail (POS & Stores)
                </Link>
                <Link to="/products" className="block text-xs font-semibold text-brand-600 pt-1">
                  View All Products →
                </Link>
              </div>
            </div>

            <div className="py-2 border-b border-slate-100">
              <div className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-2">Services & Industries</div>
              <div className="space-y-1.5 pl-2">
                <Link to="/services/custom-software-development" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Custom Software Development
                </Link>
                <Link to="/services" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Services Overview
                </Link>
                <Link to="/industries" className="block text-sm font-medium text-slate-800 hover:text-brand-600">
                  Industries We Serve
                </Link>
              </div>
            </div>

            <div className="space-y-2 py-2">
              <Link to="/case-studies" className="block text-sm font-medium text-slate-800">
                Case Studies
              </Link>
              <Link to="/resources" className="block text-sm font-medium text-slate-800">
                Resources & FAQ
              </Link>
              <Link to="/about" className="block text-sm font-medium text-slate-800">
                About Sarita Infotech
              </Link>
              <Link to="/contact" className="block text-sm font-medium text-slate-800">
                Contact Us
              </Link>
              <div className="border-t border-slate-200 pt-2 space-y-1">
                <Link to={customerAuthenticated ? '/customer/dashboard' : '/customer/login'} className="block text-sm font-medium text-emerald-700 font-semibold">
                  Customer Portal {customerAuthenticated ? '(Active Session)' : '(Login / Register)'}
                </Link>
                <Link to={partnerAuthenticated ? '/partners/dashboard' : '/partners/login'} className="block text-sm font-medium text-brand-700 font-semibold">
                  Channel Partner Portal {partnerAuthenticated ? '(Active)' : '(Login)'}
                </Link>
                <Link to={adminAuthenticated ? '/admin/dashboard' : '/admin/login'} className="block text-sm font-medium text-amber-700 font-semibold">
                  Admin Console {adminAuthenticated ? '(Management Console)' : '(Login)'}
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                }}
                className="w-full btn-primary py-3 text-base"
              >
                Request a Product Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Demo Request Modal */}
      <DemoRequestModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialProductId="all"
      />
    </>
  );
};
