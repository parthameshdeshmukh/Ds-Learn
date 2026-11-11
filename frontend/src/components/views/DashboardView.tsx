import React from 'react';
import { useTenant } from '../../context/TenantContext';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const {
    activeSchool,
    students,
    lessons,
    setIsAddStudentModalOpen,
    setIsRecordPaymentModalOpen,
    setIsScheduleLessonModalOpen,
    updateLessonStatus,
    setReschedulingLesson,
  } = useTenant();

  // Metrics calculation
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'ACTIVE').length;
  const todayLessons = lessons.filter((l) => l.date === 'Today');
  const upcomingLessons = lessons.filter((l) => l.date !== 'Today');
  const pendingPaymentsTotal = students.reduce((sum, s) => sum + s.balance, 0);
  const recentStudents = [...students].slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Overview of today's driving school operations
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddStudentModalOpen(true)}
            className="flex-1 sm:flex-none h-11 px-4 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>+ Add Student</span>
          </button>

          <button
            onClick={() => setIsScheduleLessonModalOpen(true)}
            className="flex-1 sm:flex-none h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">calendar_add_on</span>
            <span>Schedule Lesson</span>
          </button>

          <button
            onClick={() => setIsRecordPaymentModalOpen(true)}
            className="flex-1 sm:flex-none h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-600">payments</span>
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* The 4 Core Essential Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Today's Lessons */}
        <div
          onClick={() => onNavigateTab('lessons')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Today's Lessons</span>
            <span className="material-symbols-outlined text-[20px] text-blue-600">event</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{todayLessons.length}</div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Scheduled for today</span>
        </div>

        {/* Active Students */}
        <div
          onClick={() => onNavigateTab('students')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Active Students</span>
            <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activeStudents}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">{activeStudents} of {totalStudents} enrolled</span>
        </div>

        {/* Pending Payments */}
        <div
          onClick={() => onNavigateTab('payments')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Pending Fees</span>
            <span className="material-symbols-outlined text-[20px] text-rose-600">pending_actions</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">${pendingPaymentsTotal}</div>
          <span className="text-[11px] text-rose-500 font-semibold mt-1 block">Fee balance to collect</span>
        </div>

        {/* Upcoming Lessons */}
        <div
          onClick={() => onNavigateTab('lessons')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Upcoming Lessons</span>
            <span className="material-symbols-outlined text-[20px] text-indigo-600">upcoming</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{upcomingLessons.length}</div>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">Next days scheduled</span>
        </div>
      </div>

      {/* Today's Driving Lessons Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Today's Driving Lessons</h3>
            <p className="text-xs text-slate-500">Scheduled lessons with 1-tap status update</p>
          </div>
          <button
            onClick={() => onNavigateTab('lessons')}
            className="text-xs font-semibold hover:underline"
            style={{ color: activeSchool.primaryColor }}
          >
            View All ({lessons.length}) →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {todayLessons.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-400">
              No driving lessons scheduled for today.
            </div>
          ) : (
            todayLessons.map((lesson) => {
              const isCompleted = lesson.status === 'COMPLETED';
              const isCancelled = lesson.status === 'CANCELLED';

              return (
                <div key={lesson.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {lesson.timeSlot}
                      </span>
                      <strong className="text-sm text-slate-900 font-semibold">{lesson.studentName}</strong>
                      <span className="text-xs text-slate-400">({lesson.studentPhone})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                      <span>Instructor: <strong className="text-slate-700">{lesson.instructorName}</strong></span>
                      <span>•</span>
                      <span>Vehicle: {lesson.vehicle}</span>
                      <span>•</span>
                      <span>Topic: {lesson.topic}</span>
                    </div>
                  </div>

                  {/* Lesson Status & 1-tap Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="material-symbols-outlined text-[14px]">check</span> Completed
                      </span>
                    ) : isCancelled ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="material-symbols-outlined text-[14px]">close</span> Cancelled
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => updateLessonStatus(lesson.id, 'COMPLETED')}
                          className="h-9 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 transition-colors shadow-sm"
                          title="Mark lesson completed"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>Mark Done</span>
                        </button>
                        <button
                          onClick={() => setReschedulingLesson(lesson)}
                          className="h-9 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Reschedule to another day or time"
                        >
                          <span className="material-symbols-outlined text-[15px] text-blue-600">schedule</span>
                          <span className="hidden sm:inline">Reschedule</span>
                        </button>
                        <button
                          onClick={() => updateLessonStatus(lesson.id, 'CANCELLED')}
                          className="h-9 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
                          title="Cancel lesson"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recently Registered Students */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recently Registered Students</h3>
            <p className="text-xs text-slate-500">Latest student admissions and fee balances</p>
          </div>
          <button
            onClick={() => onNavigateTab('students')}
            className="text-xs font-semibold hover:underline"
            style={{ color: activeSchool.primaryColor }}
          >
            Manage Students →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentStudents.map((student) => (
            <div key={student.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">{student.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    student.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {student.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {student.course} • Tel: {student.phone}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-slate-900">
                  Paid: ${student.paidAmount} / ${student.totalFee}
                </div>
                <div className={`text-xs font-medium ${student.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {student.balance > 0 ? `Balance: $${student.balance}` : 'Fully Paid'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
