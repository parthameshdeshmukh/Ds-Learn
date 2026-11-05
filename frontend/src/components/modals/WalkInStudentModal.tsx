import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const WalkInStudentModal: React.FC = () => {
  const { activeSchool, isWalkInModalOpen, setIsWalkInModalOpen, addPayment } = useTenant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Full Licensing Program (20h)');
  const [totalFee, setTotalFee] = useState(650);
  const [initialPayment, setInitialPayment] = useState(250);
  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'BANK_TRANSFER' | 'CARD'>('CASH');

  if (!isWalkInModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Create payment transaction
    const newReceipt = {
      receiptNumber: `RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      studentName: name,
      courseName: course,
      amount: Number(initialPayment),
      paymentMode,
      referenceNo: paymentMode === 'CASH' ? 'CSH-WALKIN' : 'UPI-QR-DIRECT',
      totalFee: Number(totalFee),
      remainingBalance: Math.max(0, Number(totalFee) - Number(initialPayment)),
      notes: 'Walk-in student initial enrollment deposit.',
    };

    addPayment(newReceipt);
    setIsWalkInModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Walk-in Student Registration</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                {activeSchool.name} • Direct Enrollment
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWalkInModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Patil"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Select Driving Course
            </label>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                if (e.target.value.includes('Highway')) setTotalFee(450);
                else if (e.target.value.includes('Basic')) setTotalFee(500);
                else setTotalFee(650);
              }}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Full Licensing Program (20h)">Full Licensing Program (20h) — $650</option>
              <option value="Four-Wheeler Basic + Reverse">Four-Wheeler Basic + Reverse (15h) — $500</option>
              <option value="10-Hr Highway Package">10-Hr Highway Package — $450</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Agreed Course Fee ($)
              </label>
              <input
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                Initial Deposit Paid ($)
              </label>
              <input
                type="number"
                value={initialPayment}
                onChange={(e) => setInitialPayment(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary font-bold text-tertiary"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['CASH', 'UPI', 'BANK_TRANSFER'] as const).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className={`h-9 rounded-lg font-label-sm text-label-sm flex items-center justify-center border transition-colors ${
                    paymentMode === mode
                      ? 'bg-primary-container text-on-primary-container border-primary font-semibold'
                      : 'bg-surface-container-low text-on-surface border-surface-container'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm hover:bg-primary-hover"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Enroll &amp; Issue Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => setIsWalkInModalOpen(false)}
              className="px-4 h-11 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
