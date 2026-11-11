import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const LessonsView: React.FC = () => {
  const { activeSchool, lessons, setIsScheduleLessonModalOpen, updateLessonStatus } = useTenant();
  const [filter, setFilter] = useState<'ALL' | 'TODAY' | 'UPCOMING'>('TODAY');

  const filteredLessons = lessons.filter((l) => {
    if (filter === 'TODAY') return l.date === 'Today';
    if (filter === 'UPCOMING') return l.date !== 'Today';
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Top Header & Prominent Schedule Lesson Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Driving Lessons</h2>
          <p className="text-sm text-slate-500">
            Schedule lessons and track student driving training sessions
          </p>
        </div>

        {/* Big visible 'Schedule Lesson' button */}
        <button
          onClick={() => setIsScheduleLessonModalOpen(true)}
          className="h-11 px-5 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
          style={{ backgroundColor: activeSchool.primaryColor }}
        >
          <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
          <span>+ Schedule Lesson</span>
        </button>
      </div>

      {/* Date Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilter('TODAY')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === 'TODAY'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Today's Lessons ({lessons.filter((l) => l.date === 'Today').length})
        </button>
        <button
          onClick={() => setFilter('UPCOMING')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === 'UPCOMING'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Upcoming Lessons ({lessons.filter((l) => l.date !== 'Today').length})
        </button>
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All ({lessons.length})
        </button>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {filteredLessons.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
            <span className="material-symbols-outlined text-[36px] text-slate-300">event_busy</span>
            <p className="text-sm font-medium text-slate-700">No driving lessons scheduled</p>
            <p className="text-xs text-slate-400">Click "+ Schedule Lesson" above to add one</p>
          </div>
        ) : (
          filteredLessons.map((lesson) => {
            const isCompleted = lesson.status === 'COMPLETED';
            const isCancelled = lesson.status === 'CANCELLED';

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Lesson Info */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {lesson.date} • {lesson.timeSlot}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 truncate">{lesson.studentName}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-600">
                    <span>Instructor: <strong className="text-slate-800">{lesson.instructorName}</strong></span>
                    <span>•</span>
                    <span>Vehicle: {lesson.vehicle}</span>
                    <span>•</span>
                    <span>Lesson Focus: <em>{lesson.topic}</em></span>
                  </div>
                </div>

                {/* Status & 1-tap Actions */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Completed
                    </span>
                  ) : isCancelled ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                      Cancelled
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateLessonStatus(lesson.id, 'COMPLETED')}
                        className="h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        title="Mark Completed"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Mark Done</span>
                      </button>
                      <button
                        onClick={() => updateLessonStatus(lesson.id, 'CANCELLED')}
                        className="h-10 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
                        title="Cancel this lesson"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <a
                    href={`tel:${lesson.studentPhone}`}
                    className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                    title="Call student"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

