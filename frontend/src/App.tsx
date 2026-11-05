import React, { useState } from 'react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OwnerDashboard } from './components/owner/OwnerDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TrainerCockpit } from './components/trainer/TrainerCockpit';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { WalkInStudentModal } from './components/modals/WalkInStudentModal';
import { TenantSwitcherModal } from './components/modals/TenantSwitcherModal';

const AppContent: React.FC = () => {
  const { activeRole } = useTenant();
  const [activeTab, setActiveTab] = useState<string>(
    activeRole === 'SCHOOL_OWNER' ? 'dashboard' : activeRole === 'STUDENT' ? 'home' : 'cockpit'
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-24 max-w-5xl mx-auto">
        {activeRole === 'SCHOOL_OWNER' && <OwnerDashboard />}
        {activeRole === 'STUDENT' && <StudentDashboard />}
        {activeRole === 'TRAINER' && <TrainerCockpit />}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Interactive Modals */}
      <ReceiptModal />
      <WalkInStudentModal />
      <TenantSwitcherModal />
    </div>
  );
};

export function App() {
  return (
    <TenantProvider>
      <AppContent />
    </TenantProvider>
  );
}

export default App;
