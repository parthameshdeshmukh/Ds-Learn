import React from 'react';
import { useTenant } from '../context/TenantContext';

export const Toast: React.FC = () => {
  const { toast } = useTenant();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg border text-sm font-medium bg-slate-900 text-white border-slate-800">
        <span className="material-symbols-outlined text-[18px] text-emerald-400">
          {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

