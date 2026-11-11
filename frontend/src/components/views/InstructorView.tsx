import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const InstructorView: React.FC = () => {
  const { activeSchool, lessons, students, updateLessonStatus } = useTenant();
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'STUDENTS'>('SCHEDULE');

  // Instructor Dave Ross's assigned items
  const myLessons = lessons.filter((l) => l.instructorName === 'Dave Ross');
  const myStudents = students.filter((s) => s.instructorName === 'Dave Ross');

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Instructor Shift Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm"
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            DR
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">Dave Ross</h2>
            <p className="text-xs text-slate-500">Instructor • Swift Dzire #04</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          On Duty
        </span>
      </div>

      {/* 2 Clean Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('SCHEDULE')}
          className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'SCHEDULE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Today's Schedule ({myLessons.filter((l) => l.date === 'Today').length})
        </button>
        <button
          onClick={() => setActiveTab('STUDENTS')}
          className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'STUDENTS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Students ({myStudents.length})
        </button>
      </div>

      {/* Tab 1: Today's Schedule */}
      {activeTab === 'SCHEDULE' && (
        <div className="space-y-3">
          {myLessons.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-400">
              No lessons assigned for today. Enjoy your break!
            </div>
          ) : (
            myLessons.map((lesson) => {
              const isCompleted = lesson.status === 'COMPLETED';
              const isCancelled = lesson.status === 'CANCELLED';

              return (
                <div
                  key={lesson.id}
                  className={`bg-white rounded-xl border p-4 shadow-sm space-y-3 transition-colors ${
                    isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                        {lesson.date} • {lesson.timeSlot}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{lesson.studentName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Lesson Focus: <strong className="text-slate-700">{lesson.topic}</strong>
                      </p>
                    </div>

                    <a
                      href={`tel:${lesson.studentPhone}`}
                      className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors flex-shrink-0"
                      title="Call Student"
                    >
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </a>
                  </div>

                  {/* 1-Tap Status Buttons */}
                  <div className="pt-1">
                    {isCompleted ? (
                      <div className="w-full h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Completed</span>
                      </div>
                    ) : isCancelled ? (
                      <div className="w-full h-11 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        <span>Cancelled</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateLessonStatus(lesson.id, 'COMPLETED')}
                          className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-[0.99]"
                        >
                          <span className="material-symbols-outlined text-[20px]">check</span>
                          <span>Mark Lesson Completed</span>
                        </button>
                        <button
                          onClick={() => updateLessonStatus(lesson.id, 'CANCELLED')}
                          className="h-12 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Assigned Students */}
      {activeTab === 'STUDENTS' && (
        <div className="space-y-3">
          {myStudents.map((student) => (
            <div key={student.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{student.name}</h3>
                  <p className="text-xs text-slate-500">{student.course}</p>
                </div>
                <a
                  href={`tel:${student.phone}`}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </a>
              </div>

              <div className="pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Lesson Progress</span>
                  <span className="font-semibold text-slate-800">
                    {student.completedLessons} / {student.totalLessons} Completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: activeSchool.primaryColor,
                      width: `${(student.completedLessons / student.totalLessons) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
