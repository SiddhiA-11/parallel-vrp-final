import React from 'react';
import { Route } from '../../types';

interface VehicleLoadBarProps {
  route: Route;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const VehicleLoadBar: React.FC<VehicleLoadBarProps> = ({
  route,
  isSelected,
  onSelect,
}) => {
  const util = Math.min(100, Math.round((route.load / route.capacity) * 100));
  const isOverloaded = route.load > route.capacity;

  let barColor = 'bg-blue-500';
  if (util > 90) barColor = 'bg-emerald-500';
  if (util > 98) barColor = 'bg-amber-500';
  if (isOverloaded) barColor = 'bg-rose-500';

  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer rounded border p-2.5 transition-colors ${
        isSelected
          ? 'border-[#2b3344] bg-[#181b24]'
          : 'border-[#1e232f] bg-[#0c0d11]/80 hover:border-[#2b3344] hover:bg-[#181b24]/50'
      }`}
    >
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: route.color || '#3b82f6' }}
          />
          <span className="font-semibold text-slate-100">Vehicle {route.vehicleId.toString().padStart(2, '0')}</span>
          <span className="text-[11px] text-slate-400 font-sans">({route.customerIds.length} stops)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">{route.load}/{route.capacity}</span>
          <span className={`font-semibold ${isOverloaded ? 'text-rose-400' : 'text-slate-200'}`}>{util}%</span>
        </div>
      </div>

      {/* Progress track */}
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded bg-[#1e232f]">
        <div
          className={`h-full transition-all duration-200 ${barColor}`}
          style={{ width: `${Math.min(100, util)}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
        <span>{route.distance.toFixed(1)} km</span>
        <span>{isOverloaded ? 'OVERLOAD' : 'FEASIBLE'}</span>
      </div>
    </div>
  );
};

