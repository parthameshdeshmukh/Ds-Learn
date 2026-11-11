import React, { useState } from 'react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

// Views
import { DashboardView } from './components/views/DashboardView';
import { StudentsView } from './components/views/StudentsView';
import { LessonsView } from './components/views/LessonsView';
import { PaymentsView } from './components/views/PaymentsView';
import { InstructorView } from './components/views/InstructorView';
import { StudentPortalView } from './components/views/StudentPortalView';

// Modals
import { AddStudentModal } from './components/modals/AddStudentModal';
import { RecordPaymentModal } from './components/modals/RecordPaymentModal';
import { ScheduleLessonModal } from './components/modals/ScheduleLessonModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { TenantSwitcherModal } from './components/modals/TenantSwitcherModal';
import { RescheduleLessonModal } from './components/modals/RescheduleLessonModal';

const AppContent: React.FC = () => {
  const { activeRole } = useTenant();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const isOwner = activeRole === 'SCHOOL_OWNER';

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 antialiased">
      {/* Desktop Left Sidebar (Active on PC for School Owner & Receptionist) */}
      {isOwner && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header />

        {/* Content Area */}
        <main
          className={`flex-1 w-full px-4 sm:px-6 py-6 pb-28 ${
            isOwner ? 'max-w-6xl mx-auto' : 'max-w-lg mx-auto'
          }`}
        >
          {/* Role 1: School Owner & Receptionist (Desktop + Mobile) */}
          {activeRole === 'SCHOOL_OWNER' && (
            <>
              {activeTab === 'dashboard' && <DashboardView onNavigateTab={setActiveTab} />}
              {activeTab === 'students' && <StudentsView />}
              {activeTab === 'lessons' && <LessonsView />}
              {activeTab === 'payments' && <PaymentsView />}
            </>
          )}

          {/* Role 2: Driving Instructor (Mobile Phone View) */}
          {activeRole === 'INSTRUCTOR' && <InstructorView />}

          {/* Role 3: Student Portal (Mobile Phone View) */}
          {activeRole === 'STUDENT' && <StudentPortalView />}
        </main>

        {/* Bottom Navigation (Always on Phone, hidden on Desktop for Owner) */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Global Modals */}
      <AddStudentModal />
      <RecordPaymentModal />
      <ScheduleLessonModal />
      <RescheduleLessonModal />
      <ReceiptModal />
      <TenantSwitcherModal />

      {/* Feedback Toast */}
      <Toast />
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
