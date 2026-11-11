import React, { useState } from 'react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { Header } from './components/Header';
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

const AppContent: React.FC = () => {
  const { activeRole } = useTenant();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased">
      {/* Top Clean Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 pb-28">
        {/* Role 1: School Owner / Receptionist */}
        {activeRole === 'SCHOOL_OWNER' && (
          <>
            {activeTab === 'dashboard' && <DashboardView onNavigateTab={setActiveTab} />}
            {activeTab === 'students' && <StudentsView />}
            {activeTab === 'lessons' && <LessonsView />}
            {activeTab === 'payments' && <PaymentsView />}
          </>
        )}

        {/* Role 2: Driving Instructor */}
        {activeRole === 'INSTRUCTOR' && <InstructorView />}

        {/* Role 3: Student Portal */}
        {activeRole === 'STUDENT' && <StudentPortalView />}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Dialogs */}
      <AddStudentModal />
      <RecordPaymentModal />
      <ScheduleLessonModal />
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
