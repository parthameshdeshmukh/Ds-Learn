import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const ScheduleLessonModal: React.FC = () => {
  const { activeSchool, students, isScheduleLessonModalOpen, setIsScheduleLessonModalOpen, scheduleLesson } = useTenant();

  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [instructor, setInstructor] = useState('Dave Ross');
  const [date, setDate] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('02:00 PM - 03:00 PM');
  const [vehicle, setVehicle] = useState('Swift Dzire #04 (Manual)');
  const [topic, setTopic] = useState('Steering & Gear Shifting Controls');

  if (!isScheduleLessonModalOpen) return null;

  const selectedStudent = students.find((s) => s.id === studentId) || students[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;

    scheduleLesson({
      studentId,
      studentName: selectedStudent.name,
      studentPhone: selectedStudent.phone,
      instructorName: instructor,
      date,
      timeSlot,
      vehicle,
      topic,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]" style={{ color: activeSchool.primaryColor }}>
              calendar_add_on
            </span>
            <h3 className="font-bold text-slate-900 text-base">Schedule Driving Lesson</h3>
          </div>
          <button
            onClick={() => setIsScheduleLessonModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Select Student <span className="text-rose-500">*</span>
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.course})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Lesson Day</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Instructor</label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="Dave Ross">Dave Ross</option>
                <option value="Sarah Sterling">Sarah Sterling</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Vehicle</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="Swift Dzire #04 (Manual)">Swift Dzire (Manual)</option>
                <option value="Hyundai i10 #02 (Auto)">Hyundai i10 (Automatic)</option>
                <option value="Hero Honda #01 (Bike)">Hero Honda (Motorcycle)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Lesson Topic / Focus</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Reverse parking, Highway merging"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Confirm &amp; Schedule</span>
            </button>
            <button
              type="button"
              onClick={() => setIsScheduleLessonModalOpen(false)}
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

