import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { Product } from '../../types';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, product }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate an illustrative brochure text file for the user
    const content = `=====================================================
${product.name.toUpperCase()} - PRODUCT OVERVIEW BROCHURE
Sarita Infotech Pvt. Ltd. (Surat, Gujarat, India)
Web: https://www.saritainfotech.com | Phone: +91 79900 29373
=====================================================

Category: ${product.badge}
Headline: ${product.heroHeadline}

1. EXECUTIVE SUMMARY
${product.fullDescription}

2. TARGET AUDIENCE
${product.targetAudience.map((a) => `• ${a}`).join('\n')}

3. KEY FUNCTIONAL CAPABILITIES
${product.keyFeatures.map((f, i) => `${i + 1}. ${f.title}\n   ${f.description}`).join('\n\n')}

4. IMPLEMENTATION & SUPPORT
${product.implementationTimeline}
Support SLA: Comprehensive AMC with telephonic and remote desk assistance.

=====================================================
NOTE: This document is generated for demonstration and evaluation purposes.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.slug}-brochure-demo.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-white text-base">Product Brochure & Architecture Spec</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="text-xs uppercase tracking-wide font-semibold text-brand-600 mb-1">
              {product.badge}
            </div>
            <h4 className="text-lg font-bold text-slate-900">{product.name} Solution Guide</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Complete feature catalog, architectural diagrams, deployment requirements, and workflow illustrations.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div><span className="font-semibold text-slate-800">Format:</span> Demonstration Document</div>
              <div><span className="font-semibold text-slate-800">Version:</span> 2026.2 (Latest)</div>
              <div><span className="font-semibold text-slate-800">Publisher:</span> Sarita Infotech</div>
              <div><span className="font-semibold text-slate-800">Language:</span> English</div>
            </div>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed bg-amber-50/60 border border-amber-200/80 p-3 rounded-lg">
            <span className="font-semibold text-amber-900">Prototype Note:</span> Clicking Download generates the demonstration architectural brief. Formal multi-page marketing collateral is shared during commercial engagements.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Downloaded Successfully
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Specification
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
