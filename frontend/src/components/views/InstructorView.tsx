import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import type { DrivingLesson } from '../../types';

export const InstructorView: React.FC = () => {
  const { activeSchool, lessons, students, updateLessonStatus, showToast } = useTenant();

  // Active Selected Day in the Calendar Strip
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Friday' | 'Saturday'>('Today');
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Instructor Dave Ross's lessons
  const myAllLessons = lessons.filter((l) => l.instructorName === 'Dave Ross');
  const dayLessons = myAllLessons.filter((l) => l.date === selectedDay);
  const myStudents = students.filter((s) => s.instructorName === 'Dave Ross');

  // Days list for the Calendar Strip
  const calendarDays = [
    { key: 'Today' as const, label: 'Today', dateStr: '11 Nov', count: myAllLessons.filter((l) => l.date === 'Today').length },
    { key: 'Tomorrow' as const, label: 'Tomorrow', dateStr: '12 Nov', count: myAllLessons.filter((l) => l.date === 'Tomorrow').length },
    { key: 'Friday' as const, label: 'Friday', dateStr: '13 Nov', count: myAllLessons.filter((l) => l.date === 'Friday').length },
    { key: 'Saturday' as const, label: 'Saturday', dateStr: '14 Nov', count: myAllLessons.filter((l) => l.date === 'Saturday').length },
  ];

  // Quick WhatsApp reminder message sender
  const sendWhatsAppReminder = (lesson: DrivingLesson) => {
    const text = encodeURIComponent(
      `Hi ${lesson.studentName}, this is ${lesson.instructorName} from ${activeSchool.name}. I am on my way and will reach your pickup spot in ~5 minutes. Please be ready!`
    );
    window.open(`https://wa.me/${lesson.studentPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* 1. Instructor Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            DR
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-slate-900 text-base">Dave Ross</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Instructor
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Swift Dzire #04 • {activeSchool.name}
            </p>
          </div>
        </div>

        {/* Shift Toggle Button */}
        <button
          onClick={() => {
            setIsOnDuty(!isOnDuty);
            showToast(isOnDuty ? 'Shift paused (Off Duty)' : 'Shift active (On Duty)');
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
            isOnDuty
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnDuty ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>{isOnDuty ? 'On Duty' : 'Off Duty'}</span>
        </button>
      </div>

      {/* 2. CALENDAR DAY STRIP (Calendar to easily see today's clients) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-blue-600">calendar_month</span>
            <span>Select Day</span>
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            {dayLessons.length} Client{dayLessons.length !== 1 ? 's' : ''} on {selectedDay}
          </span>
        </div>

        {/* Horizontal Calendar Day Pills */}
        <div className="grid grid-cols-4 gap-2">
          {calendarDays.map((d) => {
            const isSelected = selectedDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                style={isSelected ? { backgroundColor: activeSchool.primaryColor } : {}}
              >
                <span className="text-[11px] font-medium opacity-90">{d.label}</span>
                <span className="text-sm font-bold mt-0.5">{d.dateStr}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full mt-1 ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {d.count} drive{d.count !== 1 ? 's' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Client Driving Lessons Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-900 text-sm">
            Clients for {selectedDay} ({dayLessons.length})
          </h3>
          <span className="text-xs text-slate-400">Order by Time</span>
        </div>

        {dayLessons.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="material-symbols-outlined text-[36px] text-slate-300">event_available</span>
            <p className="text-sm font-bold text-slate-800">No lessons scheduled for {selectedDay}</p>
            <p className="text-xs text-slate-500">Free time / no clients assigned.</p>
          </div>
        ) : (
          dayLessons.map((lesson, idx) => {
            const isCompleted = lesson.status === 'COMPLETED';
            const isCancelled = lesson.status === 'CANCELLED';

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm space-y-3 transition-all ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200'
                }`}
              >
                {/* Time & Client Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {lesson.timeSlot}
                      </span>
                      {idx === 0 && !isCompleted && selectedDay === 'Today' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Next Client
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <h4 className="text-base font-bold text-slate-900">{lesson.studentName}</h4>
                      <span className="text-xs font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        Lesson {lesson.lessonNumber || idx + 1} of {lesson.totalLessons || 10}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Topic: <strong className="text-slate-800">{lesson.topic}</strong>
                    </p>
                    {lesson.pickupLocation && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 pt-0.5">
                        <span className="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                        <span>{lesson.pickupLocation}</span>
                      </p>
                    )}
                  </div>

                  {/* 1-Tap Phone Call */}
                  <a
                    href={`tel:${lesson.studentPhone}`}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors shadow-sm shrink-0"
                    title="Call Client"
                  >
                    <span className="material-symbols-outlined text-[22px]">call</span>
                  </a>
                </div>

                {/* Direct Actions: WhatsApp Reminder + Direct 1-Tap Done */}
                <div className="pt-1 flex items-center gap-2">
                  {/* 1-Tap WhatsApp "Arriving in 5 mins" */}
                  <button
                    onClick={() => sendWhatsAppReminder(lesson)}
                    className="h-10 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title="Send instant WhatsApp message: Arriving in 5 mins"
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                    <span>WhatsApp</span>
                  </button>

                  {/* 1-Tap Lesson Completion (Instant, no extra forms) */}
                  {isCompleted ? (
                    <div className="flex-1 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Completed</span>
                    </div>
                  ) : isCancelled ? (
                    <div className="flex-1 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                      <span>Cancelled</span>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <button
                        onClick={() => updateLessonStatus(lesson.id, 'COMPLETED')}
                        className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-[0.99]"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Mark Done</span>
                      </button>
                      <button
                        onClick={() => updateLessonStatus(lesson.id, 'CANCELLED')}
                        className="h-10 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-500"
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

      {/* 4. Assigned Students Directory */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-sm">
            My Enrolled Clients ({myStudents.length})
          </h4>
          <span className="text-xs text-slate-400">Total assigned</span>
        </div>

        <div className="divide-y divide-slate-100">
          {myStudents.map((student) => (
            <div key={student.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{student.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{student.course}</span>
                  <span>•</span>
                  <span className="font-medium text-emerald-700">
                    {student.completedLessons}/{student.totalLessons} lessons done
                  </span>
                </div>
              </div>
              <a
                href={`tel:${student.phone}`}
                className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shrink-0"
                title="Call client"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
