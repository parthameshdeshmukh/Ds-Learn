import React from 'react';
import { useTenant } from '../../context/TenantContext';

interface StudentPortalViewProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({ activeTab, onNavigateTab }) => {
  const { activeSchool, students, lessons, payments, setSelectedReceipt } = useTenant();

  // Sophia Martinez context
  const currentStudent = students[0];
  const myLessons = lessons.filter((l) => l.studentId === currentStudent.id);
  const nextLesson = myLessons.find((l) => l.status === 'SCHEDULED');
  const myReceipt = payments.find((p) => p.studentId === currentStudent.id) || payments[0];

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Student Welcome Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Student Portal • {activeSchool.name}
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-0.5">Welcome, {currentStudent.name}! 👋</h2>
        <p className="text-xs text-slate-500 mt-1">
          {currentStudent.course} • Enrolled on {currentStudent.registrationDate}
        </p>
      </div>

      {/* Quick Navigation Pills for Mobile */}
      <div className="grid grid-cols-3 gap-1 bg-slate-200/60 p-1 rounded-xl text-xs font-bold">
        <button
          onClick={() => onNavigateTab('course')}
          className={`py-2 px-2 rounded-lg transition-all ${
            activeTab === 'course' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Course
        </button>
        <button
          onClick={() => onNavigateTab('lessons')}
          className={`py-2 px-2 rounded-lg transition-all ${
            activeTab === 'lessons' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Lessons ({myLessons.length})
        </button>
        <button
          onClick={() => onNavigateTab('payments')}
          className={`py-2 px-2 rounded-lg transition-all ${
            activeTab === 'payments' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Payments
        </button>
      </div>

      {/* TAB 1: MY COURSE */}
      {activeTab === 'course' && (
        <div className="space-y-4">
          {/* Training Course Progress */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-900">Training Progress</span>
              <span className="text-xs font-bold text-slate-700">
                {currentStudent.completedLessons} of {currentStudent.totalLessons} Lessons Finished
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  backgroundColor: activeSchool.primaryColor,
                  width: `${(currentStudent.completedLessons / currentStudent.totalLessons) * 100}%`,
                }}
              ></div>
            </div>

            <p className="text-xs text-slate-500">
              Complete all 10 driving lessons to receive your course completion certificate and book your official RTO/DMV driving test.
            </p>
          </div>

          {/* Instructor Contact Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Assigned Driving Instructor
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                  style={{ backgroundColor: activeSchool.primaryColor }}
                >
                  DR
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{currentStudent.instructorName}</h4>
                  <p className="text-xs text-slate-500">Swift Dzire #04 (Manual Dual-Control)</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href="tel:+15552345678"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 shadow-sm"
                  title="Call Instructor"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY LESSONS */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {/* Next Scheduled Driving Lesson */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Next Upcoming Drive
              </span>
              <span className="text-xs text-slate-500 font-medium">Ready</span>
            </div>

            {nextLesson ? (
              <div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {nextLesson.date} @ {nextLesson.timeSlot.split('-')[0].trim()}
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  Topic: <strong className="text-slate-800">{nextLesson.topic}</strong>
                </p>
                {nextLesson.pickupLocation && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span>Pickup: {nextLesson.pickupLocation}</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                No upcoming lessons booked. Contact your instructor or school reception.
              </div>
            )}
          </div>

          {/* Past Completed Lessons */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Completed Driving Sessions</h4>
            <div className="divide-y divide-slate-100 text-xs">
              {myLessons.map((l) => (
                <div key={l.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 block text-sm">{l.topic}</strong>
                    <span className="text-slate-500">{l.date} • {l.timeSlot}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      l.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MY PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Course Fees &amp; Receipts</h3>

            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-500 block">Total Fee</span>
                <strong className="text-base text-slate-900">${currentStudent.totalFee}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Paid Amount</span>
                <strong className="text-base text-emerald-600">${currentStudent.paidAmount}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Remaining</span>
                <strong className={`text-base ${currentStudent.balance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                  ${currentStudent.balance}
                </strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(myReceipt)}
              className="w-full h-12 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>View &amp; Print Payment Receipt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
