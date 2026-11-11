import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const AddStudentModal: React.FC = () => {
  const { activeSchool, isAddStudentModalOpen, setIsAddStudentModalOpen, addStudent } = useTenant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Four Wheeler (Car) Basic + License');
  const [instructor, setInstructor] = useState('Dave Ross');
  const [totalFee, setTotalFee] = useState(650);
  const [initialPayment, setInitialPayment] = useState(250);
  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'CARD'>('CASH');

  if (!isAddStudentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addStudent(
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        course,
        instructorName: instructor,
        totalFee: Number(totalFee),
        paidAmount: Number(initialPayment),
        status: 'ACTIVE',
      },
      Number(initialPayment),
      paymentMode
    );

    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setInitialPayment(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]" style={{ color: activeSchool.primaryColor }}>
              person_add
            </span>
            <h3 className="font-bold text-slate-900 text-base">Add New Student</h3>
          </div>
          <button
            onClick={() => setIsAddStudentModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kulkarni"
                className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Course Enrolled <span className="text-rose-500">*</span>
              </label>
              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  if (e.target.value.includes('Two Wheeler')) setTotalFee(300);
                  else if (e.target.value.includes('Refresher')) setTotalFee(400);
                  else setTotalFee(650);
                }}
                className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Four Wheeler (Car) Basic + License">Four Wheeler Basic + License ($650)</option>
                <option value="Four Wheeler Comprehensive">Four Wheeler Comprehensive ($500)</option>
                <option value="Automatic Car Refresher">Automatic Car Refresher ($400)</option>
                <option value="Two Wheeler (Motorcycle) Course">Two Wheeler Course ($300)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Assign Instructor
              </label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Dave Ross">Dave Ross (Senior)</option>
                <option value="Sarah Sterling">Sarah Sterling</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Fee &amp; Initial Payment
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Total Fee ($)</label>
                <input
                  type="number"
                  required
                  value={totalFee}
                  onChange={(e) => setTotalFee(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Deposit Paid ($)</label>
                <input
                  type="number"
                  value={initialPayment}
                  onChange={(e) => setInitialPayment(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-bold text-emerald-600"
                />
              </div>
            </div>

            {initialPayment > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Payment Method</label>
                <div className="flex gap-2">
                  {(['CASH', 'UPI', 'CARD'] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setPaymentMode(mode)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
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
            )}
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              <span>Save &amp; Enroll Student</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAddStudentModalOpen(false)}
              className="px-5 h-12 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

