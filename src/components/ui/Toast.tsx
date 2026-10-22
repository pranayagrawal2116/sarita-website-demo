import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-elevated bg-white ${
          toast.type === 'success'
            ? 'border-emerald-200 text-slate-800'
            : toast.type === 'error'
            ? 'border-rose-200 text-slate-800'
            : 'border-blue-200 text-slate-800'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
        </div>
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
