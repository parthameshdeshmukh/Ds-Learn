import React from 'react';
import { useTenant } from '../context/TenantContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { activeRole, activeSchool } = useTenant();

  const ownerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'students', label: 'Students', icon: 'group' },
    { id: 'lessons', label: 'Lessons', icon: 'event' },
    { id: 'payments', label: 'Payments', icon: 'payments' },
  ];

  const instructorTabs = [
    { id: 'schedule', label: "Today's Schedule", icon: 'calendar_today' },
    { id: 'my-students', label: 'My Students', icon: 'school' },
  ];

  const studentTabs = [
    { id: 'course', label: 'My Course', icon: 'directions_car' },
    { id: 'lessons', label: 'My Lessons', icon: 'event' },
    { id: 'payments', label: 'My Payments', icon: 'receipt_long' },
  ];

  const currentTabs =
    activeRole === 'SCHOOL_OWNER'
      ? ownerTabs
      : activeRole === 'INSTRUCTOR'
      ? instructorTabs
      : studentTabs;

  // On desktop (md and above), hide bottom nav for School Owner since they have the Left Sidebar!
  const containerClass =
    activeRole === 'SCHOOL_OWNER'
      ? 'md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200'
      : 'fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200';

  return (
    <nav className={containerClass}>
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {currentTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
              style={{ color: isActive ? activeSchool.primaryColor : undefined }}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="text-[12px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
