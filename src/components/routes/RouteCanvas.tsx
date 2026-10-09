import React, { useState, useRef, useMemo } from 'react';
import { Customer, Depot, Route } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Hash, MapPin } from 'lucide-react';

interface RouteCanvasProps {
  depot: Depot | { x: number; y: number; id?: number };
  customers: Customer[];
  routes: Route[];
  selectedVehicleId: number | null;
  onSelectVehicle: (vehicleId: number | null) => void;
}

export const RouteCanvas: React.FC<RouteCanvasProps> = ({
  depot,
  customers,
  routes,
  selectedVehicleId,
  onSelectVehicle,
}) => {
  const [showDemands, setShowDemands] = useState(true);
  const [showIds, setShowIds] = useState(true);
  const [showRouteLines, setShowRouteLines] = useState(true);
  const [hoveredCustomer, setHoveredCustomer] = useState<{
    customer: Customer;
    vehicleId?: number;
    screenX: number;
    screenY: number;
  } | null>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement>(null);

  // Determine bounding box
  const { minX, maxX, minY, maxY } = useMemo(() => {
    let minX = 'x' in depot ? depot.x : (depot as any).coord?.x ?? 0;
    let maxX = minX;
    let minY = 'y' in depot ? depot.y : (depot as any).coord?.y ?? 0;
    let maxY = minY;

    customers.forEach((c) => {
      minX = Math.min(minX, c.coord.x);
      maxX = Math.max(maxX, c.coord.x);
      minY = Math.min(minY, c.coord.y);
      maxY = Math.max(maxY, c.coord.y);
    });

    const padX = Math.max(20, (maxX - minX) * 0.08);
    const padY = Math.max(20, (maxY - minY) * 0.08);

    return {
      minX: minX - padX,
      maxX: maxX + padX,
      minY: minY - padY,
      maxY: maxY + padY,
    };
  }, [depot, customers]);

  const viewBoxWidth = Math.max(100, maxX - minX);
  const viewBoxHeight = Math.max(100, maxY - minY);

  // Map customer ID -> vehicle ID
  const customerToVehicle = useMemo(() => {
    const map = new Map<number, number>();
    routes.forEach((r) => {
      r.customerIds.forEach((id) => map.set(id, r.vehicleId));
    });
    return map;
  }, [routes]);

  // Customer map for rapid lookup
  const custMap = useMemo(() => {
    const map = new Map<number, Customer>();
    customers.forEach((c) => map.set(c.id, c));
    return map;
  }, [customers]);

  const depotCoord = useMemo(() => {
    if ('x' in depot && typeof depot.x === 'number') {
      return { x: depot.x, y: depot.y };
    }
    return (depot as any).coord || { x: 500, y: 500 };
  }, [depot]);

  const handleZoomIn = () => setZoom((z) => Math.min(4, Number((z * 1.25).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, Number((z / 1.25).toFixed(2))));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onSelectVehicle(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative flex h-[520px] w-full flex-col overflow-hidden rounded-lg border border-[#1e232f] bg-[#0c0d11] select-none">
      {/* Visual Canvas Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1 rounded-md border border-[#1e232f] bg-[#13161c]/95 p-1 shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="rounded p-1 text-slate-400 hover:bg-[#181b24] hover:text-slate-100 cursor-pointer"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="rounded p-1 text-slate-400 hover:bg-[#181b24] hover:text-slate-100 cursor-pointer"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={handleReset}
          title="Reset View"
          className="rounded p-1 text-slate-400 hover:bg-[#181b24] hover:text-slate-100 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        <div className="h-3.5 w-[1px] bg-[#1e232f] mx-0.5" />

        <button
          onClick={() => setShowRouteLines(!showRouteLines)}
          className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono transition-colors cursor-pointer ${
            showRouteLines ? 'bg-[#181b24] text-slate-100 border border-[#2b3344] font-medium' : 'text-slate-400 hover:bg-[#181b24]'
          }`}
          title="Toggle Vehicle Route Paths"
        >
          <Eye className="h-3 w-3" />
          <span>Routes</span>
        </button>

        <button
          onClick={() => setShowDemands(!showDemands)}
          className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono transition-colors cursor-pointer ${
            showDemands ? 'bg-[#181b24] text-slate-100 border border-[#2b3344] font-medium' : 'text-slate-400 hover:bg-[#181b24]'
          }`}
          title="Toggle Demand Labels"
        >
          <span>Demands</span>
        </button>

        <button
          onClick={() => setShowIds(!showIds)}
          className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono transition-colors cursor-pointer ${
            showIds ? 'bg-[#181b24] text-slate-100 border border-[#2b3344] font-medium' : 'text-slate-400 hover:bg-[#181b24]'
          }`}
          title="Toggle Customer IDs"
        >
          <Hash className="h-3 w-3" />
          <span>IDs</span>
        </button>
      </div>

      {/* Coordinate & Zoom Info Overlay */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded border border-[#1e232f] bg-[#13161c]/90 px-2 py-0.5 font-mono text-[10px] text-slate-400">
        <span>Nodes: {customers.length}</span>
        <span>•</span>
        <span>Routes: {routes.length}</span>
        <span>•</span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>

      {/* 2D Coordinate Interactive Map */}
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          className="h-full w-full"
          viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          <defs>
            {/* Clean subtle coordinate grid */}
            <pattern
              id="grid-pattern"
              width={viewBoxWidth / 12}
              height={viewBoxHeight / 12}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${viewBoxWidth / 12} 0 L 0 0 0 ${viewBoxHeight / 12}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect
            x={minX}
            y={minY}
            width={viewBoxWidth}
            height={viewBoxHeight}
            fill="url(#grid-pattern)"
          />

          {/* Vehicle Routes Paths */}
          {showRouteLines &&
            routes.map((route) => {
              const isSelected = selectedVehicleId === null || selectedVehicleId === route.vehicleId;
              const opacity = isSelected ? 0.85 : 0.12;
              const strokeWidth = isSelected
                ? selectedVehicleId === route.vehicleId
                  ? viewBoxWidth * 0.005
                  : viewBoxWidth * 0.003
                : viewBoxWidth * 0.0018;

              if (route.customerIds.length === 0) return null;

              let pathStr = `M ${depotCoord.x} ${depotCoord.y}`;
              route.customerIds.forEach((cId) => {
                const c = custMap.get(cId);
                if (c) {
                  pathStr += ` L ${c.coord.x} ${c.coord.y}`;
                }
              });
              pathStr += ` Z`;

              return (
                <g key={`route-${route.vehicleId}`}>
                  {selectedVehicleId === route.vehicleId && (
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={route.color || '#3b82f6'}
                      strokeWidth={strokeWidth * 2.2}
                      strokeOpacity={0.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke={route.color || '#3b82f6'}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer transition-all hover:stroke-opacity-100"
                    onClick={() =>
                      onSelectVehicle(selectedVehicleId === route.vehicleId ? null : route.vehicleId)
                    }
                  />
                </g>
              );
            })}

          {/* Customer Nodes */}
          {customers.map((c) => {
            const vId = customerToVehicle.get(c.id);
            const isAssignedToSelected = selectedVehicleId === null || selectedVehicleId === vId;
            const nodeRadius = viewBoxWidth * 0.0065;

            return (
              <g
                key={`cust-${c.id}`}
                className="cursor-pointer"
                onClick={() => {
                  if (vId) onSelectVehicle(selectedVehicleId === vId ? null : vId);
                }}
                onMouseEnter={(e) => {
                  setHoveredCustomer({
                    customer: c,
                    vehicleId: vId,
                    screenX: e.clientX,
                    screenY: e.clientY,
                  });
                }}
                onMouseLeave={() => setHoveredCustomer(null)}
              >
                {/* Node circle */}
                <circle
                  cx={c.coord.x}
                  cy={c.coord.y}
                  r={nodeRadius}
                  fill={isAssignedToSelected ? '#3b82f6' : '#475569'}
                  stroke="#0c0d11"
                  strokeWidth={nodeRadius * 0.25}
                />

                {/* Optional Customer ID */}
                {showIds && (
                  <text
                    x={c.coord.x}
                    y={c.coord.y - nodeRadius * 1.4}
                    textAnchor="middle"
                    fill={isAssignedToSelected ? '#e2e8f0' : '#64748b'}
                    fontSize={viewBoxWidth * 0.013}
                    fontFamily="monospace"
                    fontWeight="500"
                  >
                    {c.id}
                  </text>
                )}

                {/* Optional Demand */}
                {showDemands && (
                  <text
                    x={c.coord.x}
                    y={c.coord.y + nodeRadius * 2.1}
                    textAnchor="middle"
                    fill={isAssignedToSelected ? '#10b981' : '#64748b'}
                    fontSize={viewBoxWidth * 0.011}
                    fontFamily="monospace"
                  >
                    d:{c.demand}
                  </text>
                )}
              </g>
            );
          })}

          {/* Central Depot Node */}
          <g className="cursor-pointer">
            <rect
              x={depotCoord.x - viewBoxWidth * 0.012}
              y={depotCoord.y - viewBoxWidth * 0.012}
              width={viewBoxWidth * 0.024}
              height={viewBoxWidth * 0.024}
              transform={`rotate(45 ${depotCoord.x} ${depotCoord.y})`}
              fill="#f59e0b"
              stroke="#0c0d11"
              strokeWidth={viewBoxWidth * 0.003}
            />
            <circle cx={depotCoord.x} cy={depotCoord.y} r={viewBoxWidth * 0.0035} fill="#ffffff" />
            <text
              x={depotCoord.x}
              y={depotCoord.y - viewBoxWidth * 0.018}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize={viewBoxWidth * 0.016}
              fontFamily="monospace"
              fontWeight="bold"
            >
              DEPOT
            </text>
          </g>
        </svg>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredCustomer && (
        <div
          className="pointer-events-none fixed z-50 rounded border border-[#2b3344] bg-[#181b24]/95 p-2.5 text-xs font-mono shadow-xl"
          style={{
            left: `${hoveredCustomer.screenX + 12}px`,
            top: `${hoveredCustomer.screenY + 12}px`,
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-[#1e232f] pb-1 font-bold text-slate-100">
            <MapPin className="h-3 w-3 text-blue-400" />
            <span>Customer #{hoveredCustomer.customer.id}</span>
          </div>
          <div className="mt-1.5 space-y-0.5 text-slate-300 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Position:</span>
              <span className="text-slate-200">({hoveredCustomer.customer.coord.x}, {hoveredCustomer.customer.coord.y})</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Demand:</span>
              <span className="text-emerald-400 font-semibold">{hoveredCustomer.customer.demand} units</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Assignment:</span>
              <span className="text-blue-400 font-semibold">
                {hoveredCustomer.vehicleId ? `Vehicle ${hoveredCustomer.vehicleId}` : 'Unassigned'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

