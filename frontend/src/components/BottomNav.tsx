import React from 'react';
import { useTenant } from '../context/TenantContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { activeRole } = useTenant();

  const ownerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'fleet', label: 'Fleet', icon: 'local_shipping' },
    { id: 'students', label: 'Students', icon: 'groups' },
    { id: 'finance', label: 'Finance', icon: 'account_balance_wallet' },
    { id: 'more', label: 'More', icon: 'more_horiz' },
  ];

  const studentTabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'lessons', label: 'Lessons', icon: 'calendar_today' },
    { id: 'progress', label: 'Progress', icon: 'trending_up' },
    { id: 'payments', label: 'Payments', icon: 'receipt_long' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  const trainerTabs = [
    { id: 'cockpit', label: 'Cockpit', icon: 'speed' },
    { id: 'schedule', label: 'Schedule', icon: 'directions_car' },
    { id: 'trainees', label: 'Learners', icon: 'school' },
    { id: 'inspect', label: 'Safety', icon: 'verified_user' },
    { id: 'more', label: 'Profile', icon: 'person' },
  ];

  const currentTabs =
    activeRole === 'SCHOOL_OWNER'
      ? ownerTabs
      : activeRole === 'STUDENT'
      ? studentTabs
      : trainerTabs;

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_12px_rgba(0,0,0,0.05)] transition-colors">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-space-xs">
        {currentTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all gap-0.5 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="font-label-sm text-[11px] leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
