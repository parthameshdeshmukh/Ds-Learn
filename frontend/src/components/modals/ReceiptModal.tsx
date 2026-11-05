import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const ReceiptModal: React.FC = () => {
  const { activeSchool, selectedReceipt, setSelectedReceipt } = useTenant();

  if (!selectedReceipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Payment Receipt</span>
          </div>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* The Printable Branded Receipt Paper */}
        <div id="printable-receipt" className="p-6 overflow-y-auto space-y-5 bg-white text-[#0f172a]">
          {/* Driving School Header */}
          <div className="text-center space-y-1 border-b border-dashed border-slate-300 pb-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-white mx-auto flex items-center justify-center mb-2 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">{activeSchool.logoIcon}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">{activeSchool.name}</h2>
            <p className="text-xs text-slate-500">{activeSchool.address}</p>
            <p className="text-xs text-slate-500">
              Tel: {activeSchool.phone} • Lic: {activeSchool.licenseNumber}
            </p>
          </div>

          {/* Receipt Meta */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Receipt No:</span>
              <strong className="text-slate-900 font-mono">{selectedReceipt.receiptNumber}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Date &amp; Time:</span>
              <span className="text-slate-900">{selectedReceipt.date}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-slate-900 text-sm">{selectedReceipt.studentName}</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Payment Mode:</span>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                {selectedReceipt.paymentMode}
              </span>
            </div>
          </div>

          {/* Line Item */}
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="flex justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium pt-1">
              <span>{selectedReceipt.courseName}</span>
              <span className="font-bold">${selectedReceipt.amount}.00</span>
            </div>
            {selectedReceipt.notes && (
              <p className="text-xs text-slate-500 italic mt-1">{selectedReceipt.notes}</p>
            )}
          </div>

          {/* Financial Totals */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Course Fee:</span>
              <span>${selectedReceipt.totalFee}.00</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold text-base">
              <span>Amount Received:</span>
              <span>${selectedReceipt.amount}.00</span>
            </div>
            <div className="flex justify-between text-slate-700 font-medium pt-1 border-t border-slate-200">
              <span>Balance Due:</span>
              <span className={selectedReceipt.remainingBalance > 0 ? 'text-amber-600 font-bold' : 'text-slate-500'}>
                ${selectedReceipt.remainingBalance}.00
              </span>
            </div>
          </div>

          {/* Official Stamp & Verification */}
          <div className="pt-4 border-t border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-semibold">Digitally Verified</span>
            </div>
            <div className="text-right">
              <span className="block font-semibold">Authorized Signature</span>
              <span className="text-[10px] text-slate-400">DriveFlow Multi-Tenant Cloud</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm hover:bg-primary-hover"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="px-4 h-11 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
