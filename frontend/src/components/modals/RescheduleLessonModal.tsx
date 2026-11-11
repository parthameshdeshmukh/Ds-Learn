import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';

export const RescheduleLessonModal: React.FC = () => {
  const { activeSchool, reschedulingLesson, setReschedulingLesson, rescheduleLesson } = useTenant();

  const [newDate, setNewDate] = useState('Tomorrow');
  const [newTimeSlot, setNewTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [newInstructor, setNewInstructor] = useState('');

  useEffect(() => {
    if (reschedulingLesson) {
      setNewDate(reschedulingLesson.date === 'Today' ? 'Tomorrow' : 'Today');
      setNewTimeSlot(reschedulingLesson.timeSlot);
      setNewInstructor(reschedulingLesson.instructorName);
    }
  }, [reschedulingLesson]);

  if (!reschedulingLesson) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rescheduleLesson(reschedulingLesson.id, newDate, newTimeSlot, newInstructor);
  };

  const dayOptions = [
    { label: 'Today (Wed 11)', value: 'Today' },
    { label: 'Tomorrow (Thu 12)', value: 'Tomorrow' },
    { label: 'Friday (13 Nov)', value: 'Friday' },
    { label: 'Saturday (14 Nov)', value: 'Saturday' },
  ];

  const timeOptions = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '04:30 PM - 05:30 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-blue-600">
              schedule
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Reschedule Lesson</h3>
              <p className="text-xs text-slate-500">Pick a new date and time slot</p>
            </div>
          </div>
          <button
            onClick={() => setReschedulingLesson(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Current Lesson Badge */}
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
            <span className="font-semibold block text-[11px] uppercase tracking-wider text-blue-600">
              Currently Scheduled
            </span>
            <strong className="text-sm block text-slate-900 mt-0.5">
              {reschedulingLesson.studentName}
            </strong>
            <span>
              {reschedulingLesson.date} • {reschedulingLesson.timeSlot} ({reschedulingLesson.instructorName})
            </span>
          </div>

          {/* New Day Selection */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Select New Day
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dayOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setNewDate(opt.value)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    newDate === opt.value
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* New Time Slot Selection */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Select New Time Slot
            </label>
            <select
              value={newTimeSlot}
              onChange={(e) => setNewTimeSlot(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Instructor Selection */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Assigned Instructor
            </label>
            <select
              value={newInstructor}
              onChange={(e) => setNewInstructor(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dave Ross">Dave Ross</option>
              <option value="Sarah Sterling">Sarah Sterling</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[20px]">event_repeat</span>
              <span>Confirm Reschedule</span>
            </button>
            <button
              type="button"
              onClick={() => setReschedulingLesson(null)}
              className="px-4 h-12 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
