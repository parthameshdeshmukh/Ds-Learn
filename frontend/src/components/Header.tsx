import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import type { UserRole } from '../types';

export const Header: React.FC = () => {
  const { activeSchool, activeRole, setActiveRole, setIsTenantModalOpen } = useTenant();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleNames: Record<UserRole, string> = {
    SCHOOL_OWNER: 'Owner / Receptionist',
    INSTRUCTOR: 'Driving Instructor',
    STUDENT: 'Student Portal',
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Driving School Branding (Hidden on desktop if sidebar is active for Owner) */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm ${activeRole === 'SCHOOL_OWNER' ? 'md:hidden' : ''}`}
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            <span className="material-symbols-outlined text-[24px]">{activeSchool.logoIcon}</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-slate-900 text-base sm:text-lg truncate leading-tight">
              {activeSchool.name}
            </h1>
            <p className="text-xs text-slate-500 truncate">
              Lic: {activeSchool.licenseNumber}
            </p>
          </div>
        </div>

        {/* Right Side: Role Selector & School Switcher */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Role Switcher (Simulates User Perspective) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ color: activeSchool.primaryColor }}>
                {activeRole === 'SCHOOL_OWNER' ? 'admin_panel_settings' : activeRole === 'INSTRUCTOR' ? 'sports_score' : 'school'}
              </span>
              <span className="hidden sm:inline">{roleNames[activeRole]}</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch User View
                </div>
                <button
                  onClick={() => { setActiveRole('SCHOOL_OWNER'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-slate-50 ${activeRole === 'SCHOOL_OWNER' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                  <span>Owner / Receptionist</span>
                </button>
                <button
                  onClick={() => { setActiveRole('INSTRUCTOR'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-slate-50 ${activeRole === 'INSTRUCTOR' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">sports_score</span>
                  <span>Driving Instructor</span>
                </button>
                <button
                  onClick={() => { setActiveRole('STUDENT'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-slate-50 ${activeRole === 'STUDENT' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">school</span>
                  <span>Student View</span>
                </button>
              </div>
            )}
          </div>

          {/* School Switcher (Multi-Tenant Demo) */}
          <button
            onClick={() => setIsTenantModalOpen(true)}
            title="Switch Driving School"
            className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
            <span className="hidden md:inline">School</span>
          </button>
        </div>
      </div>
    </header>
  );
};
