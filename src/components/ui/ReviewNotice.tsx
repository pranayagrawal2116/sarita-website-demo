import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface ReviewNoticeProps {
  label?: string;
  message?: string;
  compact?: boolean;
}

export const ReviewNotice: React.FC<ReviewNoticeProps> = ({
  label = 'Content for Client Verification',
  message = 'Demonstration content. Subject to formal review and verification with Sarita Infotech product leads before production deployment.',
  compact = false
}) => {
  if (compact) {
    return (
      <span
        title={message}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 cursor-help"
      >
        <HelpCircle className="w-3 h-3 text-amber-600" />
        {label}
      </span>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/90 rounded-lg p-3 my-3 text-xs text-amber-900 flex items-start gap-2.5">
      <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
      <div className="leading-relaxed">
        <span className="font-semibold text-amber-950 block sm:inline mr-1">{label}:</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
