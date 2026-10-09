import React from 'react';
import { Route, SolutionValidation } from '../../types';
import { VehicleLoadBar } from './VehicleLoadBar';
import { Truck } from 'lucide-react';
import { formatDistance } from '../../utils/formatters';

interface RouteDetailsPanelProps {
  routes: Route[];
  selectedVehicleId: number | null;
  onSelectVehicle: (vehicleId: number | null) => void;
  totalDistance: number;
  validation?: SolutionValidation;
  capacity: number;
}

export const RouteDetailsPanel: React.FC<RouteDetailsPanelProps> = ({
  routes,
  selectedVehicleId,
  onSelectVehicle,
  totalDistance,
  validation,
  capacity,
}) => {
  const selectedRoute = routes.find((r) => r.vehicleId === selectedVehicleId) || routes[0] || null;

  return (
    <div className="flex flex-col gap-3">
      {/* Selected Route Spotlight Card */}
      {selectedRoute ? (
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: selectedRoute.color || '#3b82f6' }}
              />
              <h4 className="font-mono text-xs font-bold text-slate-100">
                Vehicle {selectedRoute.vehicleId.toString().padStart(2, '0')} Tour
              </h4>
            </div>
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold border ${
                selectedRoute.load <= selectedRoute.capacity
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                  : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
              }`}
            >
              {selectedRoute.load <= selectedRoute.capacity ? 'FEASIBLE' : 'OVERLOAD'}
            </span>
          </div>

          {/* Metric grid */}
          <div className="mt-2.5 grid grid-cols-3 gap-2 text-center font-mono">
            <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
              <div className="text-[9px] uppercase text-slate-400">Distance</div>
              <div className="mt-0.5 text-xs font-bold text-slate-100">{selectedRoute.distance.toFixed(1)} km</div>
            </div>
            <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
              <div className="text-[9px] uppercase text-slate-400">Payload</div>
              <div className="mt-0.5 text-xs font-bold text-slate-100">{selectedRoute.load} / {selectedRoute.capacity}</div>
            </div>
            <div className="rounded bg-[#0c0d11] p-2 border border-[#1e232f]">
              <div className="text-[9px] uppercase text-slate-400">Utilization</div>
              <div className="mt-0.5 text-xs font-bold text-emerald-400">
                {Math.round((selectedRoute.load / selectedRoute.capacity) * 100)}%
              </div>
            </div>
          </div>

          {/* Customer Visit Sequence */}
          <div className="mt-2.5">
            <div className="text-[10px] font-semibold uppercase text-slate-400 font-mono">
              Tour Sequence ({selectedRoute.customerIds.length} stops):
            </div>
            <div className="mt-1 max-h-20 overflow-y-auto rounded border border-[#1e232f] bg-[#0c0d11] p-2 font-mono text-[11px] text-slate-300 leading-relaxed">
              <span className="text-amber-500 font-semibold">Depot</span>
              {selectedRoute.customerIds.length > 0 ? (
                <>
                  {' → '}
                  {selectedRoute.customerIds.map((id, i) => (
                    <span key={i}>
                      <span className="text-slate-200 hover:text-white cursor-pointer font-medium">
                        C{id}
                      </span>
                      {i < selectedRoute.customerIds.length - 1 ? ' → ' : ''}
                    </span>
                  ))}
                  {' → '}
                  <span className="text-amber-500 font-semibold">Depot</span>
                </>
              ) : (
                <span className="italic text-slate-500"> (No customers assigned)</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-4 text-center text-xs text-slate-500 font-mono">
          No routes available. Run an algorithm to generate delivery tours.
        </div>
      )}

      {/* Fleet Utilization Overview */}
      <div className="rounded-lg border border-[#1e232f] bg-[#13161c] p-3.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#1e232f] pb-2.5">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-300">
            <Truck className="h-3.5 w-3.5 text-slate-400" />
            <span>FLEET ({routes.length} VEHICLES)</span>
          </div>
          {selectedVehicleId !== null && (
            <button
              onClick={() => onSelectVehicle(null)}
              className="text-[10px] text-blue-400 hover:underline font-mono cursor-pointer"
            >
              Show All
            </button>
          )}
        </div>

        <div className="mt-2.5 max-h-64 space-y-1.5 overflow-y-auto pr-0.5">
          {routes.map((r) => (
            <VehicleLoadBar
              key={r.vehicleId}
              route={r}
              isSelected={selectedVehicleId === r.vehicleId}
              onSelect={() =>
                onSelectVehicle(selectedVehicleId === r.vehicleId ? null : r.vehicleId)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

