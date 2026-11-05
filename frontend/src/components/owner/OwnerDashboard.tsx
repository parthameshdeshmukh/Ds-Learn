import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import type { TriadSession } from '../../types';

export const OwnerDashboard: React.FC = () => {
  const {
    activeSchool,
    setIsTenantModalOpen,
    setIsWalkInModalOpen,
    pendingApprovals,
    approveStudent,
    recentPayments,
    setSelectedReceipt,
  } = useTenant();

  const [approvedState, setApprovedState] = useState<Record<string, boolean>>({});

  const triads: TriadSession[] = [
    {
      id: 'triad-1',
      vehicleName: 'Sedan #04',
      vehicleType: 'Corolla Manual',
      vehiclePlate: 'NY-DRV-882',
      learnerName: 'Sophia Martinez',
      learnerInitials: 'SM',
      learnerHours: 'Hour 14 / 20',
      trainerName: 'Dave Ross',
      trainerRole: 'Snr. Instructor',
      trainerInitials: 'DR',
      statusTag: 'Highway Concurrency',
      remainingMinutes: 45,
    },
    {
      id: 'triad-2',
      vehicleName: 'EV #07',
      vehicleType: 'Ioniq 5 Automatic',
      vehiclePlate: 'NY-EV-104',
      learnerName: 'Liam Chen',
      learnerInitials: 'LC',
      learnerHours: 'Hour 4 / 20',
      trainerName: 'Sarah Sterling',
      trainerRole: 'Lead Evaluator',
      trainerInitials: 'SS',
      statusTag: 'Parallel & Hill Staging',
      remainingMinutes: 70,
    },
  ];

  const handleApprove = (id: string) => {
    setApprovedState((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      approveStudent(id);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-margin-sm space-y-space-lg max-w-2xl mx-auto">
      {/* Top Role Banner & Tenant Switcher */}
      <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container">
        <div className="flex items-start justify-between gap-space-sm mb-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm shadow-sm">
                MV
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-tertiary-container rounded-full ring-2 ring-surface-container-lowest flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-on-tertiary-container rounded-full"></span>
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Marcus Vance</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm">
                  Owner
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Lic: #{activeSchool.licenseNumber} • Master Hub
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTenantModalOpen(true)}
            aria-label="Tenant switcher settings"
            className="w-9 h-9 rounded-lg bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
          </button>
        </div>

        {/* Tenant Context Chip & Active Branch */}
        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container/60">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-tertiary">domain</span>
            <span className="font-label-sm text-label-sm text-tertiary truncate">
              {activeSchool.location}
            </span>
          </div>
          <button
            onClick={() => setIsTenantModalOpen(true)}
            className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline"
          >
            <span className="truncate max-w-[140px]">{activeSchool.name}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
      </section>

      {/* Core Operations & Triad Pulse Summary */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between px-space-xs">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Operations Pulse</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time driving school telemetry</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Live Feed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          {/* Active On-Road Card */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Active On-Road</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">commute</span>
              </div>
            </div>
            <div>
              <span className="font-numeric-metric text-numeric-metric text-on-surface">12</span>
              <p className="font-body-sm text-body-sm text-tertiary font-label-md">Triads Live Now</p>
            </div>
          </div>

          {/* Assigned Trainers */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Trainers</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">sports_score</span>
              </div>
            </div>
            <div>
              <span className="font-numeric-metric text-numeric-metric text-on-surface">8</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">On Shift (2 off-duty)</p>
            </div>
          </div>

          {/* Students in Queue */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Queue</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
              </div>
            </div>
            <div>
              <span className="font-numeric-metric text-numeric-metric text-on-surface">
                {pendingApprovals.length}
              </span>
              <p className="font-body-sm text-body-sm text-error font-label-md">
                {pendingApprovals.length} Unassigned Learners
              </p>
            </div>
          </div>

          {/* Monthly Invoiced */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Invoiced</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div>
              <span className="font-numeric-metric text-numeric-metric text-on-surface leading-tight">$28.4k</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1.5 w-14 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '84%' }}></div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">84%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Management Action Deck */}
      <section className="space-y-space-sm">
        <h2 className="font-headline-sm text-headline-sm text-on-surface px-space-xs">Quick Command</h2>
        <div className="flex flex-col gap-space-xs">
          <button
            onClick={() => setIsWalkInModalOpen(true)}
            className="w-full h-12 px-space-md rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform"
          >
            <span className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px]">add_link</span>
              <span>Assign Car &amp; Trainer</span>
            </span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
          <div className="grid grid-cols-2 gap-space-xs">
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="h-11 px-space-sm rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm border border-surface-container hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">person_add</span>
              <span>Walk-in Student</span>
            </button>
            <button
              className="h-11 px-space-sm rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm border border-surface-container hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">garage</span>
              <span>Fleet Yard (18)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Triad Overseer */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between px-space-xs">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Live Triad Overseer</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Student • Trainer • Vehicle Sync</p>
          </div>
          <button className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
            <span>View All 12</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {triads.map((triad) => (
          <div
            key={triad.id}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container space-y-space-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                <span className="font-headline-sm text-headline-sm text-on-surface">{triad.vehicleName}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{triad.vehicleType}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                {triad.statusTag}
              </span>
            </div>

            {/* The Triad Chain Flow */}
            <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between gap-space-xs">
              {/* Learner */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 text-on-primary-fixed font-headline-sm text-headline-sm">
                  {triad.learnerInitials}
                </div>
                <div className="min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface truncate block">
                    {triad.learnerName}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                    {triad.learnerHours}
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined text-secondary text-[16px]">sync_alt</span>

              {/* Trainer */}
              <div className="flex items-center gap-2 min-w-0 flex-1 justify-end text-right">
                <div className="min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface truncate block">
                    {triad.trainerName}
                  </span>
                  <span className="font-body-sm text-body-sm text-tertiary text-[11px] block">
                    {triad.trainerRole}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-on-secondary-fixed font-headline-sm text-headline-sm">
                  {triad.trainerInitials}
                </div>
              </div>
            </div>

            {/* Telemetry sub-bar & Actions */}
            <div className="flex items-center justify-between text-on-surface-variant text-body-sm font-body-sm pt-space-xs">
              <div className="flex items-center gap-1 text-tertiary font-label-sm">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>{triad.remainingMinutes}m remaining</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <button className="px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                  <span>Reassign</span>
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Emergency Contact"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Urgent Approvals & Financial Receipts */}
      <section className="space-y-space-sm pb-space-lg">
        <div className="flex items-center justify-between px-space-xs">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Queue &amp; Transactions</h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {pendingApprovals.length} Pending Action
          </span>
        </div>

        {/* Dynamic Student Approval Cards */}
        {pendingApprovals.map((student) => (
          <div
            key={student.id}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container space-y-space-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{student.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {student.permitType} • Docs Ready
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
                Requires Sign-Off
              </span>
            </div>

            {/* Document preview snippet */}
            <div className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
              <span className="font-body-sm text-body-sm flex-1 truncate">
                {student.name.replace(' ', '_')}_Permit_Scan.pdf (Verified DMV)
              </span>
              <button className="font-label-sm text-label-sm text-primary hover:underline">View</button>
            </div>

            <div className="pt-space-xs flex items-center gap-space-xs">
              <button
                disabled={approvedState[student.id]}
                onClick={() => handleApprove(student.id)}
                className={`flex-1 h-10 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
                  approvedState[student.id]
                    ? 'bg-tertiary-container text-on-tertiary-container'
                    : 'bg-primary-container text-on-primary-container active:opacity-90 shadow-sm'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {approvedState[student.id] ? 'done_all' : 'check_circle'}
                </span>
                <span>{approvedState[student.id] ? 'Approved!' : 'Approve & Assign'}</span>
              </button>
              <button
                onClick={() => approveStudent(student.id)}
                className="px-3 h-10 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Defer
              </button>
            </div>
          </div>
        ))}

        {pendingApprovals.length === 0 && (
          <div className="p-4 rounded-xl bg-surface-container-low text-center text-on-surface-variant text-sm">
            🎉 All student membership requests are up to date!
          </div>
        )}

        {/* Recent Financial Receipts */}
        {recentPayments.map((receipt) => (
          <div
            key={receipt.receiptNumber}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container flex items-center justify-between"
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface">${receipt.amount}.00</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-[10px]">
                    {receipt.paymentMode} Received
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {receipt.studentName} • {receipt.courseName}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedReceipt(receipt)}
              className="w-9 h-9 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center hover:bg-surface-container transition-colors flex-shrink-0"
              title="View &amp; Print Branded Receipt"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};
