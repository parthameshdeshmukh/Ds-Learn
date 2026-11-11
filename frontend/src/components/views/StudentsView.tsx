import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const StudentsView: React.FC = () => {
  const { activeSchool, students, setIsAddStudentModalOpen, setIsRecordPaymentModalOpen } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING' | 'COMPLETED'>('ALL');

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Top Header & Prominent Add Student Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Management</h2>
          <p className="text-sm text-slate-500">
            View, search, and manage all enrolled students
          </p>
        </div>

        {/* Big visible 'Add Student' button */}
        <button
          onClick={() => setIsAddStudentModalOpen(true)}
          className="h-11 px-5 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
          style={{ backgroundColor: activeSchool.primaryColor }}
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>+ Add Student</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Search Bar */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined text-[20px] text-slate-400 absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student by name or phone..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'ACTIVE', 'PENDING'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'ALL' ? 'All Students' : status === 'ACTIVE' ? 'Active' : 'Pending'}
            </button>
          ))}
        </div>
      </div>

      {/* Student List Cards */}
      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
            <span className="material-symbols-outlined text-[36px] text-slate-300">person_search</span>
            <p className="text-sm font-medium text-slate-700">No students found matching your search</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search term</p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Student Information */}
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">{student.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      student.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <span className="material-symbols-outlined text-[15px] text-slate-400">call</span>
                    {student.phone}
                  </span>
                  <span>•</span>
                  <span>Course: <strong className="text-slate-800">{student.course}</strong></span>
                  <span>•</span>
                  <span>Instructor: {student.instructorName}</span>
                </div>

                {/* Lesson Progress Indicator */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-28 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        backgroundColor: activeSchool.primaryColor,
                        width: `${(student.completedLessons / student.totalLessons) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {student.completedLessons} of {student.totalLessons} lessons done
                  </span>
                </div>
              </div>

              {/* Fee Status & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <div className="text-xs text-slate-500">
                    Paid: <strong className="text-slate-900">${student.paidAmount}</strong> / ${student.totalFee}
                  </div>
                  <div className={`text-xs font-semibold ${student.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {student.balance > 0 ? `Pending: $${student.balance}` : 'Fully Paid'}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsRecordPaymentModalOpen(true)}
                    className="h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">payments</span>
                    <span>Pay</span>
                  </button>
                  <a
                    href={`tel:${student.phone}`}
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                    title="Call student"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
