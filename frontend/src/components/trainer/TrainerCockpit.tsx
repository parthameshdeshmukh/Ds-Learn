import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const TrainerCockpit: React.FC = () => {
  const { activeSchool } = useTenant();
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [activeSessionElapsed, setActiveSessionElapsed] = useState(38); // 38 mins elapsed

  return (
    <div className="flex flex-col w-full px-margin-sm space-y-space-md max-w-2xl mx-auto pb-space-xl">
      {/* Header Banner: Trainer Telemetry & Shift Status */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-sm border border-surface-container">
        <div className="flex items-center justify-between gap-space-sm mb-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container flex items-center justify-center font-headline-sm text-on-primary-container shadow-sm">
                DR
              </div>
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-surface ${isOnDuty ? 'bg-tertiary' : 'bg-outline'}`}></span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface truncate">Dave Ross</span>
                <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px]">
                  Senior
                </span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-label-md text-label-md text-on-surface">4.9</span>
                <span>(180 reviews) • {activeSchool.name}</span>
              </div>
            </div>
          </div>

          {/* Shift Switcher Button */}
          <button
            onClick={() => setIsOnDuty(!isOnDuty)}
            className="flex flex-col items-end px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm active:scale-95 transition-transform text-right border border-surface-container"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnDuty ? 'bg-tertiary animate-pulse' : 'bg-outline'}`}></span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
                {isOnDuty ? 'On Duty' : 'Off Duty'}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">08:00 - 16:30</span>
          </button>
        </div>

        {/* Assigned Dual-Control Vehicle Quick Tile */}
        <div className="mt-space-sm rounded-lg bg-surface-container-lowest p-space-sm shadow-sm space-y-space-xs border border-surface-container">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-surface">Sedan #04 • Corolla '23</div>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  <span>Plate: <strong className="text-on-surface font-label-md text-label-md">NY-DRV-882</strong></span>
                  <span>•</span>
                  <span>Manual Trans</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              Verified Safe
            </span>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="rounded-lg bg-surface-container-low py-1.5 px-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant block text-[11px]">Dual-Brake</span>
              <span className="font-label-md text-label-md text-tertiary flex items-center justify-center gap-1 text-[12px]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                07:45 AM
              </span>
            </div>
            <div className="rounded-lg bg-surface-container-low py-1.5 px-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant block text-[11px]">Odometer</span>
              <span className="font-label-md text-label-md text-on-surface text-[12px]">42,120 mi</span>
            </div>
            <div className="rounded-lg bg-surface-container-low py-1.5 px-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant block text-[11px]">Tank Level</span>
              <span className="font-label-md text-label-md text-on-surface flex items-center justify-center gap-1 text-[12px]">
                <span className="material-symbols-outlined text-[14px] text-tertiary">local_gas_station</span>
                78%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Active Training Session Card (Primary Focus) */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-md border border-surface-container space-y-space-md">
        {/* Header with Pulse Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Active Drive In-Progress
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
            Stage 2 Candidate
          </span>
        </div>

        {/* Student Profile & Focus */}
        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center font-headline-sm text-on-primary-fixed flex-shrink-0 shadow-sm">
            SM
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Sophia Martinez</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Ontario G2 Target • Lesson #7 Highway Merging
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-label-sm text-[11px] text-tertiary font-semibold">
                Session: {activeSessionElapsed} / 60 mins
              </span>
            </div>
          </div>
        </div>

        {/* Quick Instructor Scorecards */}
        <div className="space-y-1.5">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
            Competency Checklist
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button className="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-between border border-surface-container-high hover:bg-surface-container-high transition-colors">
              <span>Mirror Scanning</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
            </button>
            <button className="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-between border border-surface-container-high hover:bg-surface-container-high transition-colors">
              <span>Blind-Spot Check</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
            </button>
            <button className="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-between border border-surface-container-high hover:bg-surface-container-high transition-colors">
              <span>Smooth Braking</span>
              <span className="material-symbols-outlined text-[18px] text-outline">radio_button_unchecked</span>
            </button>
            <button className="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-between border border-surface-container-high hover:bg-surface-container-high transition-colors">
              <span>Roundabout Yield</span>
              <span className="material-symbols-outlined text-[18px] text-outline">radio_button_unchecked</span>
            </button>
          </div>
        </div>

        {/* Action Deck */}
        <div className="flex items-center gap-space-xs pt-space-xs">
          <button
            onClick={() => setActiveSessionElapsed((prev) => prev + 5)}
            className="flex-1 h-11 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-primary-hover shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            <span>Complete &amp; Log Lesson</span>
          </button>
          <button className="px-3 h-11 rounded-lg bg-error-container text-on-error-container font-label-md text-label-md flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
          </button>
        </div>
      </div>
    </div>
  );
};
