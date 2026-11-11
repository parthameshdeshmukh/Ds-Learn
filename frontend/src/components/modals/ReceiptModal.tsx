import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const ReceiptModal: React.FC = () => {
  const { activeSchool, selectedReceipt, setSelectedReceipt } = useTenant();

  if (!selectedReceipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-blue-600">receipt_long</span>
            <span className="font-bold text-slate-900 text-base">Payment Receipt</span>
          </div>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Printable Branded Receipt Body */}
        <div id="printable-receipt" className="p-6 overflow-y-auto space-y-4 bg-white text-slate-900">
          {/* School Header */}
          <div className="text-center space-y-1 border-b border-dashed border-slate-200 pb-4">
            <div
              className="w-12 h-12 rounded-xl text-white mx-auto flex items-center justify-center mb-2 shadow-sm"
              style={{ backgroundColor: activeSchool.primaryColor }}
            >
              <span className="material-symbols-outlined text-[26px]">{activeSchool.logoIcon}</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">{activeSchool.name}</h2>
            <p className="text-xs text-slate-500">{activeSchool.address}</p>
            <p className="text-xs text-slate-500">
              Tel: {activeSchool.phone} • Lic: {activeSchool.licenseNumber}
            </p>
          </div>

          {/* Receipt Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Receipt No:</span>
              <strong className="text-slate-900 font-mono text-sm">{selectedReceipt.receiptNumber}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Date &amp; Time:</span>
              <span className="text-slate-900 font-medium">{selectedReceipt.date}</span>
            </div>
            <div className="mt-1">
              <span className="text-slate-500 block">Student:</span>
              <strong className="text-slate-900 text-sm">{selectedReceipt.studentName}</strong>
            </div>
            <div className="text-right mt-1">
              <span className="text-slate-500 block">Mode:</span>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                {selectedReceipt.paymentMode}
              </span>
            </div>
          </div>

          {/* Itemized Line */}
          <div className="space-y-1.5 border-b border-slate-200 pb-3">
            <div className="flex justify-between text-xs text-slate-400 font-semibold uppercase">
              <span>Course Description</span>
              <span>Paid</span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold pt-1">
              <span>{selectedReceipt.courseName}</span>
              <span className="font-extrabold text-emerald-700">${selectedReceipt.amount}</span>
            </div>
            {selectedReceipt.notes && (
              <p className="text-xs text-slate-500 italic">{selectedReceipt.notes}</p>
            )}
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Course Fee:</span>
              <span className="font-medium">${selectedReceipt.totalFee}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold text-base">
              <span>Amount Received:</span>
              <span>${selectedReceipt.amount}</span>
            </div>
            <div className="flex justify-between text-slate-700 font-semibold pt-1 border-t border-slate-200">
              <span>Remaining Balance:</span>
              <span className={selectedReceipt.balanceAfterPayment > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                ${selectedReceipt.balanceAfterPayment}
              </span>
            </div>
          </div>

          {/* Stamp & Footer */}
          <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Authorized Receipt</span>
            </div>
            <div className="text-right">
              <span className="block font-medium text-slate-600">Driving School Seal</span>
              <span className="text-[10px]">Thank you for your business!</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 h-11 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95"
            style={{ backgroundColor: activeSchool.primaryColor }}
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="px-5 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
