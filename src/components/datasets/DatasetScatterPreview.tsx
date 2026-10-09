import React, { useMemo } from 'react';
import { Customer, Point } from '../../types';

interface DatasetScatterPreviewProps {
  depot: Point;
  customers: Customer[];
  height?: number;
}

export const DatasetScatterPreview: React.FC<DatasetScatterPreviewProps> = ({
  depot,
  customers,
  height = 260,
}) => {
  const { minX, maxX, minY, maxY } = useMemo(() => {
    let minX = depot.x;
    let maxX = depot.x;
    let minY = depot.y;
    let maxY = depot.y;

    customers.forEach((c) => {
      minX = Math.min(minX, c.coord.x);
      maxX = Math.max(maxX, c.coord.x);
      minY = Math.min(minY, c.coord.y);
      maxY = Math.max(maxY, c.coord.y);
    });

    const padX = Math.max(20, (maxX - minX) * 0.1);
    const padY = Math.max(20, (maxY - minY) * 0.1);

    return {
      minX: minX - padX,
      maxX: maxX + padX,
      minY: minY - padY,
      maxY: maxY + padY,
    };
  }, [depot, customers]);

  const viewBoxWidth = Math.max(100, maxX - minX);
  const viewBoxHeight = Math.max(100, maxY - minY);

  return (
    <div
      className="relative w-full rounded-lg border border-[#1e232f] bg-[#0c0d11] overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div className="absolute top-2 left-2 z-10 rounded border border-[#1e232f] bg-[#181b24] px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
        Spatial Distribution ({customers.length} Nodes)
      </div>

      <svg
        className="h-full w-full"
        viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
      >
        {/* Customer Nodes */}
        {customers.map((c) => (
          <circle
            key={c.id}
            cx={c.coord.x}
            cy={c.coord.y}
            r={viewBoxWidth * 0.007}
            fill="#3b82f6"
            fillOpacity={0.7}
          />
        ))}

        {/* Central Depot */}
        <g>
          <rect
            x={depot.x - viewBoxWidth * 0.012}
            y={depot.y - viewBoxWidth * 0.012}
            width={viewBoxWidth * 0.024}
            height={viewBoxWidth * 0.024}
            transform={`rotate(45 ${depot.x} ${depot.y})`}
            fill="#f59e0b"
          />
        </g>
      </svg>
    </div>
  );
};
