import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import type { DrivingLesson } from '../../types';

interface InstructorViewProps {
  activeTab: string;
  onNavigateTab?: (tab: string) => void;
}

export const InstructorView: React.FC<InstructorViewProps> = ({ activeTab }) => {
  const {
    activeSchool,
    lessons,
    students,
    updateLessonStatus,
    setReschedulingLesson,
    setIsScheduleLessonModalOpen,
    showToast,
  } = useTenant();

  // Active Selected Day in the Calendar Strip (for schedule view)
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Friday' | 'Saturday'>('Today');
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Student Search in "My Students" tab
  const [studentSearch, setStudentSearch] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  // Instructor Dave Ross's assigned items
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

  const filteredMyStudents = myStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.phone.includes(studentSearch)
  );

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* 1. Header: Instructor Profile & Shift Toggle */}
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

      {/* TAB 1: SCHEDULE VIEW */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {/* Calendar Day Strip */}
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

          {/* Client Driving Lessons Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-slate-900 text-sm">
                Clients for {selectedDay} ({dayLessons.length})
              </h3>
              <span className="text-xs text-slate-400">Chronological</span>
            </div>

            {dayLessons.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                <span className="material-symbols-outlined text-[36px] text-slate-300">event_available</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">No lessons scheduled for {selectedDay}</p>
                  <p className="text-xs text-slate-500">Free time or schedule a new driving slot.</p>
                </div>
                <button
                  onClick={() => setIsScheduleLessonModalOpen(true)}
                  className="h-10 px-4 rounded-xl text-white text-xs font-bold shadow-sm"
                  style={{ backgroundColor: activeSchool.primaryColor }}
                >
                  + Schedule a Lesson
                </button>
              </div>
            ) : (
              dayLessons.map((lesson, idx) => {
                const isCompleted = lesson.status === 'COMPLETED';
                const isCancelled = lesson.status === 'CANCELLED';

                return (
                  <div
                    key={lesson.id}
                    className={`bg-white rounded-2xl border p-4 shadow-sm space-y-3 transition-all ${
                      isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
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

                    {/* Ergonomic Mobile Actions */}
                    <div className="pt-1">
                      {isCompleted ? (
                        <div className="w-full h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span>Lesson Completed</span>
                        </div>
                      ) : isCancelled ? (
                        <div className="w-full h-11 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                          <span>Lesson Cancelled</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => updateLessonStatus(lesson.id, 'COMPLETED')}
                            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99]"
                          >
                            <span className="material-symbols-outlined text-[20px]">check</span>
                            <span>Mark Lesson Done</span>
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => sendWhatsAppReminder(lesson)}
                              className="h-10 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                              title="Send arrival WhatsApp message"
                            >
                              <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                              <span>WhatsApp</span>
                            </button>

                            <button
                              onClick={() => setReschedulingLesson(lesson)}
                              className="h-10 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                              title="Reschedule to another day or time"
                            >
                              <span className="material-symbols-outlined text-[18px] text-blue-600">event_repeat</span>
                              <span>Reschedule</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY STUDENTS VIEW (Fully functional student management for Instructor) */}
      {activeTab === 'my-students' && (
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <span className="material-symbols-outlined text-[20px] text-slate-400 absolute left-3 top-2.5">
              search
            </span>
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Search assigned student by name or phone..."
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Students List */}
          <div className="space-y-3">
            {filteredMyStudents.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-sm text-slate-400">
                No students found matching your search.
              </div>
            ) : (
              filteredMyStudents.map((student) => {
                const isExpanded = expandedStudentId === student.id;
                const studentLessons = lessons.filter((l) => l.studentId === student.id);
                const nextUpcoming = studentLessons.find((l) => l.status === 'SCHEDULED');

                return (
                  <div
                    key={student.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 transition-colors"
                  >
                    {/* Top Row: Name, Course, Call Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{student.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {student.completedLessons >= student.totalLessons ? 'Ready for Test' : 'In Training'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{student.course}</p>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">Tel: {student.phone}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`tel:${student.phone}`}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors shadow-sm"
                          title="Call student"
                        >
                          <span className="material-symbols-outlined text-[20px]">call</span>
                        </a>
                        <a
                          href={`https://wa.me/${student.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors shadow-sm"
                          title="Open WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                        </a>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Course Completion</span>
                        <strong className="text-slate-900 font-bold">
                          {student.completedLessons} of {student.totalLessons} Lessons Done ({Math.round((student.completedLessons / student.totalLessons) * 100)}%)
                        </strong>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            backgroundColor: activeSchool.primaryColor,
                            width: `${(student.completedLessons / student.totalLessons) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Next Lesson Status */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Next Scheduled Lesson</span>
                        <strong className="text-slate-900">
                          {nextUpcoming ? `${nextUpcoming.date} • ${nextUpcoming.timeSlot}` : 'No upcoming lesson booked'}
                        </strong>
                      </div>

                      <button
                        onClick={() => setIsScheduleLessonModalOpen(true)}
                        className="h-8 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-blue-600 hover:bg-blue-50 shadow-xs"
                      >
                        + Book Lesson
                      </button>
                    </div>

                    {/* Expand Lesson History Button */}
                    <div className="pt-1">
                      <button
                        onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
                        className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Lesson History' : 'View Lesson History'}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs animate-in fade-in duration-150">
                          <span className="font-bold text-slate-700 uppercase tracking-wider block text-[11px]">
                            Lesson Records ({studentLessons.length})
                          </span>
                          {studentLessons.length === 0 ? (
                            <p className="text-slate-400">No lessons logged yet.</p>
                          ) : (
                            <div className="space-y-1.5 divide-y divide-slate-200/60">
                              {studentLessons.map((l) => (
                                <div key={l.id} className="pt-1 flex items-center justify-between">
                                  <div>
                                    <strong className="text-slate-900 block">{l.topic}</strong>
                                    <span className="text-slate-500">{l.date} • {l.timeSlot}</span>
                                  </div>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      l.status === 'COMPLETED'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {l.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
