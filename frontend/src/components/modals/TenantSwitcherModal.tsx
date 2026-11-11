import React from 'react';
import { useTenant, DEFAULT_SCHOOLS } from '../../context/TenantContext';

export const TenantSwitcherModal: React.FC = () => {
  const { activeSchool, setActiveSchool, isTenantModalOpen, setIsTenantModalOpen, showToast } = useTenant();

  if (!isTenantModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-blue-600">domain</span>
            <h3 className="font-bold text-slate-900 text-base">Select Driving School</h3>
          </div>
          <button
            onClick={() => setIsTenantModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* School List */}
        <div className="p-4 space-y-2.5">
          <p className="text-xs text-slate-500 mb-2">
            This platform serves multiple independent driving schools. Switch between them to see custom branding in action:
          </p>

          <div className="space-y-2">
            {DEFAULT_SCHOOLS.map((school) => {
              const isSelected = activeSchool.id === school.id;
              return (
                <button
                  key={school.id}
                  onClick={() => {
                    setActiveSchool(school);
                    setIsTenantModalOpen(false);
                    showToast(`Switched to "${school.name}"`);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: school.primaryColor }}
                    >
                      <span className="material-symbols-outlined text-[22px]">{school.logoIcon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-slate-900 truncate">
                          {school.name}
                        </strong>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-600 text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {school.address} • Lic: {school.licenseNumber}
                      </p>
                    </div>
                  </div>

                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: school.primaryColor }}
                  >
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: school.primaryColor }}
                      ></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsTenantModalOpen(false)}
            className="px-4 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
