import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const PaymentsView: React.FC = () => {
  const { activeSchool, students, payments, setIsRecordPaymentModalOpen, setSelectedReceipt } = useTenant();
  const [search, setSearch] = useState('');

  // 3 Clear Financial Numbers
  const totalFeesBilled = students.reduce((sum, s) => sum + s.totalFee, 0);
  const totalFeesCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBalanceDue = students.reduce((sum, s) => sum + s.balance, 0);

  const filteredPayments = payments.filter((p) =>
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Prominent Record Payment Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Payments &amp; Fees</h2>
          <p className="text-sm text-slate-500">
            Track student fee collections, installments, and payment receipts
          </p>
        </div>

        {/* Big visible 'Record Payment' button */}
        <button
          onClick={() => setIsRecordPaymentModalOpen(true)}
          className="h-11 px-5 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
          style={{ backgroundColor: activeSchool.primaryColor }}
        >
          <span className="material-symbols-outlined text-[20px]">add_card</span>
          <span>+ Record Payment</span>
        </button>
      </div>

      {/* 3 Clear, Understandable Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Billed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Fees Billed
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">${totalFeesBilled}</div>
          <span className="text-xs text-slate-400 mt-1 block">For all enrolled courses</span>
        </div>

        {/* Total Collected */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">
            Total Collected
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">${totalFeesCollected}</div>
          <span className="text-xs text-emerald-600/80 mt-1 block">Received &amp; verified</span>
        </div>

        {/* Balance Due */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
            Remaining Balance Due
          </span>
          <div className="text-3xl font-extrabold text-rose-600 mt-1">${totalBalanceDue}</div>
          <span className="text-xs text-rose-500/80 mt-1 block">Pending collection from students</span>
        </div>
      </div>

      {/* Payment Transaction History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Payment History</h3>
            <p className="text-xs text-slate-500">Every payment is logged as an immutable receipt record</p>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3 top-2.5">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student or receipt..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredPayments.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No payments found matching your query
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-base font-bold text-slate-900">${payment.amount}</strong>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {payment.paymentMode}
                    </span>
                    <span className="text-xs font-mono text-slate-500">#{payment.receiptNumber}</span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Received from <strong className="text-slate-900 font-semibold">{payment.studentName}</strong> for {payment.courseName}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{payment.date}</span>
                    <span>•</span>
                    <span className={payment.balanceAfterPayment > 0 ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                      {payment.balanceAfterPayment > 0 ? `Remaining Balance: $${payment.balanceAfterPayment}` : 'Course Fully Paid'}
                    </span>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <button
                    onClick={() => setSelectedReceipt(payment)}
                    className="h-9 px-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-blue-600">receipt_long</span>
                    <span>View / Print Receipt</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

