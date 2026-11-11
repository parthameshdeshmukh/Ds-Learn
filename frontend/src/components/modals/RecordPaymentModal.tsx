import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const RecordPaymentModal: React.FC = () => {
  const { activeSchool, students, isRecordPaymentModalOpen, setIsRecordPaymentModalOpen, recordPayment } = useTenant();

  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [amount, setAmount] = useState<number>(150);
  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'CARD'>('CASH');
  const [notes, setNotes] = useState('');

  if (!isRecordPaymentModalOpen) return null;

  const selectedStudent = students.find((s) => s.id === studentId) || students[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !amount || amount <= 0) return;

    recordPayment(studentId, Number(amount), paymentMode, notes);
    setAmount(100);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">
              payments
            </span>
            <h3 className="font-bold text-slate-900 text-base">Record Fee Payment</h3>
          </div>
          <button
            onClick={() => setIsRecordPaymentModalOpen(false)}
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
              onChange={(e) => {
                setStudentId(e.target.value);
                const s = students.find((st) => st.id === e.target.value);
                if (s && s.balance > 0) setAmount(s.balance);
              }}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.course}) — Due: ${s.balance}
                </option>
              ))}
            </select>
          </div>

          {/* Student Balance Card */}
          {selectedStudent && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-500 block">Total Fee</span>
                <strong className="text-sm text-slate-900">${selectedStudent.totalFee}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Already Paid</span>
                <strong className="text-sm text-emerald-600">${selectedStudent.paidAmount}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Current Balance</span>
                <strong className={`text-sm ${selectedStudent.balance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                  ${selectedStudent.balance}
                </strong>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Payment Amount ($) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              max={selectedStudent ? selectedStudent.balance || 1000 : 1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-12 px-3 rounded-lg border border-slate-300 text-lg font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {selectedStudent && selectedStudent.balance === 0 && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>This student has already paid their full course fees.</span>
              </div>
            )}
            {selectedStudent && selectedStudent.balance > 0 && (
              <div className="flex items-center gap-1.5 pt-1.5">
                <span className="text-[11px] text-slate-500 font-medium">Quick Fill:</span>
                <button
                  type="button"
                  onClick={() => setAmount(selectedStudent.balance)}
                  className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                >
                  Full Due (${selectedStudent.balance})
                </button>
                {selectedStudent.balance > 100 && (
                  <button
                    type="button"
                    onClick={() => setAmount(100)}
                    className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    $100
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Payment Method</label>
            <div className="flex gap-2">
              {(['CASH', 'UPI', 'CARD'] as const).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    paymentMode === mode
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 2nd installment for highway lesson"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Record Payment &amp; Issue Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => setIsRecordPaymentModalOpen(false)}
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

