import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const StudentPortalView: React.FC = () => {
  const { activeSchool, students, lessons, payments, setSelectedReceipt } = useTenant();

  // Sophia Martinez context
  const currentStudent = students[0];
  const nextLesson = lessons.find((l) => l.studentId === currentStudent.id && l.status === 'SCHEDULED');
  const myReceipt = payments.find((p) => p.studentId === currentStudent.id) || payments[0];

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Student Welcome Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Student Portal • {activeSchool.name}
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-0.5">Welcome, {currentStudent.name}! 👋</h2>
        <p className="text-xs text-slate-500 mt-1">
          {currentStudent.course} • Enrolled on {currentStudent.registrationDate}
        </p>
      </div>

      {/* Next Scheduled Driving Lesson */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            Next Driving Lesson
          </span>
          <span className="text-xs text-slate-500 font-medium">Ready</span>
        </div>

        {nextLesson ? (
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              {nextLesson.date} @ {nextLesson.timeSlot.split('-')[0].trim()}
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Focus: <strong className="text-slate-800">{nextLesson.topic}</strong>
            </p>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Your Instructor</span>
                <strong className="text-sm text-slate-900">{nextLesson.instructorName}</strong>
                <span className="text-xs text-slate-400 block">{nextLesson.vehicle}</span>
              </div>
              <a
                href={`tel:${nextLesson.studentPhone}`}
                className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1 hover:bg-slate-50 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px] text-blue-600">call</span>
                <span>Call</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            No upcoming lessons scheduled right now. Contact your driving school receptionist.
          </div>
        )}
      </div>

      {/* Training Course Progress */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">Course Progress</span>
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
          Complete all 10 practical sessions to qualify for your official government road driving test.
        </p>
      </div>

      {/* Fee & Payment Ledger */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Fees &amp; Receipts</h3>

        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-xs text-slate-500 block">Total Fee</span>
            <strong className="text-sm text-slate-900">${currentStudent.totalFee}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Paid Amount</span>
            <strong className="text-sm text-emerald-600">${currentStudent.paidAmount}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Remaining</span>
            <strong className={`text-sm ${currentStudent.balance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
              ${currentStudent.balance}
            </strong>
          </div>
        </div>

        <button
          onClick={() => setSelectedReceipt(myReceipt)}
          className="w-full h-11 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-blue-600">receipt_long</span>
          <span>View / Download Payment Receipt</span>
        </button>
      </div>
    </div>
  );
};
