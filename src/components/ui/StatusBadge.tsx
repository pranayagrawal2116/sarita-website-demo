import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'ticket' | 'lead' | 'interop' | 'priority' | 'neutral';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'neutral', className = '' }) => {
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  // Normalize status
  const normalized = status.toLowerCase();

  if (type === 'ticket') {
    if (normalized.includes('open')) colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
    else if (normalized.includes('in progress')) colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    else if (normalized.includes('waiting')) colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
    else if (normalized.includes('resolved') || normalized.includes('closed')) colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (type === 'lead') {
    if (normalized === 'new') colorClasses = 'bg-sky-50 text-sky-700 border-sky-200';
    else if (normalized === 'under review') colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    else if (normalized === 'qualified') colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
    else if (normalized === 'proposal') colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    else if (normalized === 'won') colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    else if (normalized === 'lost') colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (type === 'priority') {
    if (normalized === 'critical') colorClasses = 'bg-red-50 text-red-700 border-red-300 font-semibold';
    else if (normalized === 'high') colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
    else if (normalized === 'medium') colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    else if (normalized === 'low') colorClasses = 'bg-slate-50 text-slate-600 border-slate-200';
  } else if (type === 'interop') {
    if (normalized.includes('confirmed') || normalized.includes('roadmap')) {
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300 font-medium';
    } else if (normalized.includes('pilot')) {
      colorClasses = 'bg-blue-50 text-blue-800 border-blue-300';
    } else if (normalized.includes('ready')) {
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
      {status}
    </span>
  );
};
