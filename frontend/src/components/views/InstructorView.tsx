import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import type { DrivingLesson } from '../../types';

export const InstructorView: React.FC = () => {
  const { activeSchool, lessons, students, updateLessonStatus, showToast } = useTenant();

  // Active Selected Day in the Calendar Strip
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Friday' | 'Saturday'>('Today');
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [vehicleCheckPassed, setVehicleCheckPassed] = useState(true);

  // Skill Evaluation Modal State
  const [evaluatingLesson, setEvaluatingLesson] = useState<DrivingLesson | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [lessonNote, setLessonNote] = useState('');

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
      `Hi ${lesson.studentName}, this is ${lesson.instructorName} from ${activeSchool.name}. I am en-route and will arrive at ${lesson.pickupLocation || 'your pickup spot'} in ~5-10 minutes. See you soon!`
    );
    window.open(`https://wa.me/${lesson.studentPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  // Open Google Maps to Pickup Location
  const openMapsNavigation = (location?: string) => {
    if (!location) return;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const handleOpenEvaluation = (lesson: DrivingLesson) => {
    setEvaluatingLesson(lesson);
    setSelectedSkills(lesson.skillsAssessed || ['Smooth Braking']);
    setLessonNote(lesson.notes || '');
  };

  const handleSaveEvaluation = () => {
    if (!evaluatingLesson) return;
    updateLessonStatus(evaluatingLesson.id, 'COMPLETED');
    showToast(`Lesson completed & skill assessment logged for ${evaluatingLesson.studentName}!`);
    setEvaluatingLesson(null);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const availableSkills = [
    'Mirror & Blindspot',
    'Clutch & Gears',
    'Smooth Braking',
    'Roundabout Rules',
    'Parallel Parking',
    'Speed Control',
    '3-Point Turn',
    'Highway Merging',
  ];

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* 1. Header: Instructor Profile & Shift Telemetry */}
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
                Senior Instructor
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Swift Dzire #04 (Manual) • {activeSchool.name}
            </p>
          </div>
        </div>

        {/* Shift Toggle Button */}
        <button
          onClick={() => {
            setIsOnDuty(!isOnDuty);
            showToast(isOnDuty ? 'Shift paused. You are now Off Duty.' : 'Shift active. Ready for driving lessons.');
          }}
          className={`flex flex-col items-end px-3 py-1.5 rounded-xl border text-right transition-all ${
            isOnDuty
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isOnDuty ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {isOnDuty ? 'On Duty' : 'Off Duty'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">08:00 - 17:00</span>
        </button>
      </div>

      {/* 2. Pre-Trip Vehicle Safety Indicator (Productivity & Safety) */}
      <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-[18px] ${vehicleCheckPassed ? 'text-emerald-600' : 'text-amber-500'}`}>
            {vehicleCheckPassed ? 'verified' : 'pending_actions'}
          </span>
          <span className="text-slate-700 font-medium">
            Daily Car Safety Check: <strong className={vehicleCheckPassed ? 'text-emerald-700' : 'text-amber-600'}>
              {vehicleCheckPassed ? 'Dual Brakes & Fuel OK' : 'Pending Review'}
            </strong>
          </span>
        </div>
        <button
          onClick={() => {
            setVehicleCheckPassed(!vehicleCheckPassed);
            showToast(vehicleCheckPassed ? 'Check reset' : 'Car safety verified for today!');
          }}
          className="text-blue-600 font-semibold hover:underline"
        >
          {vehicleCheckPassed ? 'Recheck' : 'Pass Check'}
        </button>
      </div>

      {/* 3. CALENDAR DAY STRIP (Calendar-like selector to see client schedule) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-blue-600">calendar_month</span>
            <span>Driving Calendar</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
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

      {/* 4. Hour-by-Hour Timeline Schedule */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-900 text-sm">
            Schedule for {selectedDay} ({dayLessons.length} Lessons)
          </h3>
          <span className="text-xs text-slate-400">Chronological Order</span>
        </div>

        {dayLessons.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="material-symbols-outlined text-[36px] text-slate-300">free_cancellation</span>
            <p className="text-sm font-bold text-slate-800">No driving sessions scheduled for {selectedDay}</p>
            <p className="text-xs text-slate-500">You have free availability on this day.</p>
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
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Time & Session Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                        {lesson.timeSlot}
                      </span>
                      {idx === 0 && !isCompleted && selectedDay === 'Today' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                          Next Up
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
                  </div>

                  {/* 1-Tap Phone Call */}
                  <a
                    href={`tel:${lesson.studentPhone}`}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors shadow-sm shrink-0"
                    title="Direct Phone Call"
                  >
                    <span className="material-symbols-outlined text-[22px]">call</span>
                  </a>
                </div>

                {/* Pickup Location & Maps GPS Navigation */}
                {lesson.pickupLocation && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-rose-500 shrink-0">location_on</span>
                      <span className="text-slate-700 truncate font-medium">{lesson.pickupLocation}</span>
                    </div>
                    <button
                      onClick={() => openMapsNavigation(lesson.pickupLocation)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-blue-600 font-semibold text-[11px] flex items-center gap-1 hover:bg-blue-50 shrink-0 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">near_me</span>
                      <span>Navigate</span>
                    </button>
                  </div>
                )}

                {/* Trainer Productivity Action Deck */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  {/* 1-Tap WhatsApp "Arriving in 5 mins" */}
                  <button
                    onClick={() => sendWhatsAppReminder(lesson)}
                    className="h-10 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title="Send instant WhatsApp arrival reminder"
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                    <span>Send Arrival WhatsApp</span>
                  </button>

                  {/* Lesson Completion / Evaluation */}
                  {isCompleted ? (
                    <div className="flex-1 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Lesson Completed</span>
                    </div>
                  ) : isCancelled ? (
                    <div className="flex-1 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                      <span>Cancelled</span>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEvaluation(lesson)}
                        className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-[0.99]"
                      >
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Complete &amp; Rate Skills</span>
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

      {/* 5. Assigned Students Quick Directory */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-sm">
            My Enrolled Students ({myStudents.length})
          </h4>
          <span className="text-xs text-slate-400">Assigned by Reception</span>
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
                title="Call student"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Emergency / Office Helpline Tile */}
      <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-slate-500">support_agent</span>
          <span>Need help or student no-show?</span>
        </div>
        <a
          href={`tel:${activeSchool.phone}`}
          className="font-bold text-slate-900 underline hover:text-blue-600"
        >
          Call Office ({activeSchool.phone})
        </a>
      </div>

      {/* 6. MODAL: Quick Skill Evaluation & Lesson Completion Drawer */}
      {evaluatingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Complete Driving Lesson</h3>
                <p className="text-xs text-slate-500">
                  {evaluatingLesson.studentName} • Lesson {evaluatingLesson.lessonNumber || 7} of 10
                </p>
              </div>
              <button
                onClick={() => setEvaluatingLesson(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  1-Tap Competency Checklist
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  Tap the skills the student demonstrated well today:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => {
                    const isChecked = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Instructor Note for Student
                </label>
                <textarea
                  rows={3}
                  value={lessonNote}
                  onChange={(e) => setLessonNote(e.target.value)}
                  placeholder="e.g. Great confidence on roundabouts. Needs practice with 3rd gear shifting."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleSaveEvaluation}
                  className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                  <span>Confirm &amp; Log Lesson</span>
                </button>
                <button
                  onClick={() => setEvaluatingLesson(null)}
                  className="px-4 h-12 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
