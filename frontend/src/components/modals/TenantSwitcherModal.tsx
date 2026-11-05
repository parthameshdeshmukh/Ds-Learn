import React from 'react';
import { useTenant, SAMPLE_SCHOOLS } from '../../context/TenantContext';

export const TenantSwitcherModal: React.FC = () => {
  const { activeSchool, setActiveSchool, isTenantModalOpen, setIsTenantModalOpen } = useTenant();

  if (!isTenantModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest shadow-2xl border border-surface-container overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">domain</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Switch School Tenant</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Multi-Tenant White-Label Demonstration
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTenantModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tenant List */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-on-surface-variant">
            Select a tenant to test how the brand colors, logo, and business identity adapt dynamically in real-time:
          </p>

          <div className="space-y-2">
            {SAMPLE_SCHOOLS.map((school) => {
              const isSelected = activeSchool.id === school.id;
              return (
                <button
                  key={school.id}
                  onClick={() => {
                    setActiveSchool(school);
                    setIsTenantModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-primary bg-surface-container ring-2 ring-primary/20 shadow-sm'
                      : 'border-surface-container hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: school.primaryColor }}
                    >
                      <span className="material-symbols-outlined text-[20px]">{school.logoIcon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline-sm text-[15px] text-on-surface truncate">
                          {school.name}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded-full bg-primary text-on-primary font-label-sm text-[10px]">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                        {school.location} • #{school.licenseNumber}
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
        <div className="p-3 bg-surface-container-low border-t border-surface-container flex justify-end">
          <button
            onClick={() => setIsTenantModalOpen(false)}
            className="px-4 h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
