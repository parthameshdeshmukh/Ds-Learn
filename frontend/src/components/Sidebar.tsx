import React from 'react';
import { useTenant } from '../context/TenantContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { activeSchool, setIsAddStudentModalOpen, setIsRecordPaymentModalOpen, setIsTenantModalOpen } = useTenant();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', description: 'Overview & metrics' },
    { id: 'students', label: 'Students', icon: 'group', description: 'Manage admissions' },
    { id: 'lessons', label: 'Lessons', icon: 'event', description: 'Schedule & tracking' },
    { id: 'payments', label: 'Payments', icon: 'payments', description: 'Fees & receipts' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen sticky top-0">
      {/* School Brand Header */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            <span className="material-symbols-outlined text-[24px]">{activeSchool.logoIcon}</span>
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-900 text-sm truncate">{activeSchool.name}</h2>
            <span className="text-[11px] text-slate-400 font-mono block">
              Lic: {activeSchool.licenseNumber}
            </span>
          </div>
        </div>

        {/* Change School Button */}
        <button
          onClick={() => setIsTenantModalOpen(true)}
          className="mt-3 w-full py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          <span>Switch School Tenant</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              style={isActive ? { backgroundColor: activeSchool.primaryColor } : {}}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Desktop Quick Shortcuts */}
        <div className="pt-6 px-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Quick Actions
          </span>
          <div className="space-y-1.5">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-600">person_add</span>
              <span>+ Add Student</span>
            </button>
            <button
              onClick={() => setIsRecordPaymentModalOpen(true)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-600">payments</span>
              <span>Record Payment</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Office User Card */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
          MV
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 truncate">Marcus Vance</p>
          <span className="text-[11px] text-slate-400 block truncate">Receptionist / Owner</span>
        </div>
      </div>
    </aside>
  );
};
