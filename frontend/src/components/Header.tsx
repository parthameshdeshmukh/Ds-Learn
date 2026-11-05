import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import type { UserRole } from '../types';

export const Header: React.FC = () => {
  const { activeSchool, activeRole, setActiveRole, setIsTenantModalOpen, notificationsCount } = useTenant();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleTitles: Record<UserRole, string> = {
    SCHOOL_OWNER: 'Owner Dashboard',
    STUDENT: 'Learning Hub',
    TRAINER: 'Instructor Cockpit',
    SUPER_ADMIN: 'Super Admin',
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-colors">
      <div className="h-16 px-gutter-sm max-w-5xl mx-auto flex items-center justify-between gap-space-sm">
        {/* School Identity & Dynamic Brand */}
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 shadow-sm transition-colors">
            <span className="material-symbols-outlined text-[22px]">{activeSchool.logoIcon}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold truncate">
                {activeSchool.name}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-[10px]">
                Multi-Tenant
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
              {roleTitles[activeRole]}
            </h1>
          </div>
        </div>

        {/* Action Controls: Role Switcher & Tenant Switcher */}
        <div className="flex items-center gap-space-xs flex-shrink-0">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors border border-outline-variant/30"
              title="Switch user perspective"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">
                {activeRole === 'SCHOOL_OWNER' ? 'admin_panel_settings' : activeRole === 'STUDENT' ? 'school' : 'sports_score'}
              </span>
              <span className="hidden sm:inline font-medium">
                {activeRole === 'SCHOOL_OWNER' ? 'Owner' : activeRole === 'STUDENT' ? 'Student' : 'Trainer'}
              </span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1 text-[11px] font-label-sm text-on-surface-variant uppercase tracking-wider border-b border-surface-container">
                  Simulate Role View
                </div>
                <button
                  onClick={() => { setActiveRole('SCHOOL_OWNER'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-surface-container transition-colors ${activeRole === 'SCHOOL_OWNER' ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  <span>School Owner Hub</span>
                </button>
                <button
                  onClick={() => { setActiveRole('STUDENT'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-surface-container transition-colors ${activeRole === 'STUDENT' ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  <span>Student / Learner</span>
                </button>
                <button
                  onClick={() => { setActiveRole('TRAINER'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-surface-container transition-colors ${activeRole === 'TRAINER' ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">sports_score</span>
                  <span>Trainer / Cockpit</span>
                </button>
              </div>
            )}
          </div>

          {/* Tenant Switcher Button */}
          <button
            onClick={() => setIsTenantModalOpen(true)}
            className="w-9 h-9 rounded-lg bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container transition-colors border border-outline-variant/30"
            title="Switch School Tenant"
          >
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            {notificationsCount > 0 && (
              <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
