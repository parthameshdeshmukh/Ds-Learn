import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const StudentDashboard: React.FC = () => {
  const { activeSchool, setSelectedReceipt, recentPayments } = useTenant();

  const handleOpenReceipt = () => {
    // Open the latest receipt for this student
    const studentReceipt = recentPayments[1] || recentPayments[0];
    setSelectedReceipt(studentReceipt);
  };

  return (
    <div className="flex flex-col w-full px-margin-sm space-y-space-md max-w-2xl mx-auto pb-space-xl">
      {/* Section 1: Welcome & Target Exam Milestone */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-space-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Ontario G2 Preparation
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Cohort #24-B</span>
        </div>

        <div className="flex items-start justify-between gap-space-sm mb-space-xs">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, Sophia! 👋</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {activeSchool.name} • {activeSchool.location}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-primary-fixed flex items-center justify-center font-headline-sm text-on-primary-fixed shadow-sm">
            SM
          </div>
        </div>

        {/* Countdown Badge Metric */}
        <div className="mt-space-md rounded-lg bg-surface-container-low p-space-sm flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">flag</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Target License Goal
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface truncate">Ontario G2 Road Test</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 pl-2">
            <div className="font-label-md text-label-md text-primary font-semibold">In 14 days</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Nov 19, 2026</div>
          </div>
        </div>
      </div>

      {/* Section 2: Next Road Lesson & Live Pickup Tracker */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container relative">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">Next In-Car Session</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
            Ready for Pickup
          </span>
        </div>

        <div className="mb-space-md">
          <div className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Today @ 10:00 AM</div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Lesson #7: Advanced Highway Merging &amp; Roundabouts
          </p>
        </div>

        {/* Route Visualizer Card */}
        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-space-sm bg-gradient-to-br from-surface-container to-secondary-container flex flex-col justify-between p-3 border border-outline-variant/30">
          <div className="flex items-center justify-between text-on-surface font-label-sm">
            <span className="flex items-center gap-1 font-semibold text-primary">
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              <span>Live Navigation Sync</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-[10px]">Dual GPS</span>
          </div>
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-lg p-2 shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary animate-bounce">location_on</span>
            <div className="min-w-0 flex-1">
              <span className="font-label-sm text-label-sm block truncate font-semibold text-on-surface">
                Pickup: 142 Metro Ave
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                Home Front Entry
              </span>
            </div>
          </div>
        </div>

        {/* Instructor En Route Telemetry Bar */}
        <div className="rounded-lg bg-surface-container-low p-space-sm flex items-center justify-between">
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="material-symbols-outlined text-tertiary text-[20px]">near_me</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">Instructor En Route</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Arriving in ~8 mins (2.4 km away)
              </span>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-1">
            <span>Track</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Section 3: Training Team & Vehicle */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-space-sm">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            Your Training Team
          </h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px]">verified</span> Verified Duo
          </span>
        </div>

        {/* Instructor Bio Split Card */}
        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low mb-space-sm">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center font-headline-sm text-on-secondary-fixed flex-shrink-0 shadow-sm">
            DR
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface">Dave Ross</span>
              <span className="px-1.5 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-semibold">
                Senior
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[14px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-label-md text-label-md text-on-surface">4.9</span>
              <span>• 180 Pass Certifications</span>
            </div>
          </div>
          <button className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">call</span>
          </button>
        </div>

        {/* Vehicle Card */}
        <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface font-semibold block">
                Sedan #04 • Corolla '23
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                Dual Brake • Manual Transmission
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold">NY-DRV-882</span>
        </div>
      </div>

      {/* Section 4: Fees & Payment Status */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-space-sm">
          <h3 className="font-label-md text-label-md text-on-surface font-semibold">Fee &amp; Payment Ledger</h3>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
            Official Receipt Ready
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-surface-container/60 mb-space-sm">
          <div>
            <span className="font-body-sm text-body-sm text-on-surface-variant block">Total Fee</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">$650.00</span>
          </div>
          <div>
            <span className="font-body-sm text-body-sm text-on-surface-variant block">Paid</span>
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">$500.00</span>
          </div>
          <div>
            <span className="font-body-sm text-body-sm text-on-surface-variant block">Due</span>
            <span className="font-headline-sm text-headline-sm text-error font-bold">$150.00</span>
          </div>
        </div>

        <button
          onClick={handleOpenReceipt}
          className="w-full h-10 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          <span>View / Download Payment Receipt</span>
        </button>
      </div>
    </div>
  );
};
