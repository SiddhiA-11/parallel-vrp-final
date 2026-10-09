import { CVRPInstance, Customer } from '../types/vrp';

export const BENCHMARK_INSTANCES: Record<string, CVRPInstance> = {
  'A-n32-k5': {
    name: 'A-n32-k5',
    comment: 'Augerat et al. (1995) Set A - 32 nodes, 5 trucks',
    dimension: 32,
    capacity: 100,
    vehicleCount: 5,
    bks: 784,
    depot: { x: 82, y: 76 },
    customers: [
      { id: 1, coord: { x: 96, y: 44 }, demand: 19 },
      { id: 2, coord: { x: 50, y: 5 }, demand: 21 },
      { id: 3, coord: { x: 49, y: 8 }, demand: 6 },
      { id: 4, coord: { x: 13, y: 7 }, demand: 19 },
      { id: 5, coord: { x: 29, y: 89 }, demand: 7 },
      { id: 6, coord: { x: 58, y: 30 }, demand: 12 },
      { id: 7, coord: { x: 84, y: 39 }, demand: 16 },
      { id: 8, coord: { x: 14, y: 24 }, demand: 6 },
      { id: 9, coord: { x: 2, y: 39 }, demand: 16 },
      { id: 10, coord: { x: 3, y: 82 }, demand: 8 },
      { id: 11, coord: { x: 5, y: 10 }, demand: 14 },
      { id: 12, coord: { x: 98, y: 52 }, demand: 21 },
      { id: 13, coord: { x: 84, y: 25 }, demand: 16 },
      { id: 14, coord: { x: 61, y: 59 }, demand: 3 },
      { id: 15, coord: { x: 1, y: 65 }, demand: 22 },
      { id: 16, coord: { x: 88, y: 51 }, demand: 18 },
      { id: 17, coord: { x: 91, y: 2 }, demand: 19 },
      { id: 18, coord: { x: 19, y: 32 }, demand: 1 },
      { id: 19, coord: { x: 93, y: 3 }, demand: 24 },
      { id: 20, coord: { x: 11, y: 94 }, demand: 8 },
      { id: 21, coord: { x: 5, y: 79 }, demand: 12 },
      { id: 22, coord: { x: 48, y: 21 }, demand: 4 },
      { id: 23, coord: { x: 62, y: 84 }, demand: 8 },
      { id: 24, coord: { x: 66, y: 14 }, demand: 24 },
      { id: 25, coord: { x: 18, y: 100 }, demand: 24 },
      { id: 26, coord: { x: 34, y: 84 }, demand: 2 },
      { id: 27, coord: { x: 32, y: 30 }, demand: 10 },
      { id: 28, coord: { x: 5, y: 16 }, demand: 15 },
      { id: 29, coord: { x: 4, y: 73 }, demand: 2 },
      { id: 30, coord: { x: 38, y: 67 }, demand: 18 },
      { id: 31, coord: { x: 40, y: 26 }, demand: 11 }
    ]
  },
  'A-n33-k5': {
    name: 'A-n33-k5',
    comment: 'Augerat et al. (1995) Set A - 33 nodes, 5 trucks',
    dimension: 33,
    capacity: 100,
    vehicleCount: 5,
    bks: 661,
    depot: { x: 48, y: 38 },
    customers: [
      { id: 1, coord: { x: 32, y: 58 }, demand: 12 },
      { id: 2, coord: { x: 50, y: 78 }, demand: 18 },
      { id: 3, coord: { x: 76, y: 68 }, demand: 14 },
      { id: 4, coord: { x: 70, y: 42 }, demand: 15 },
      { id: 5, coord: { x: 54, y: 28 }, demand: 17 },
      { id: 6, coord: { x: 32, y: 18 }, demand: 19 },
      { id: 7, coord: { x: 18, y: 36 }, demand: 10 },
      { id: 8, coord: { x: 24, y: 50 }, demand: 11 },
      { id: 9, coord: { x: 38, y: 72 }, demand: 16 },
      { id: 10, coord: { x: 62, y: 82 }, demand: 13 },
      { id: 11, coord: { x: 80, y: 54 }, demand: 18 },
      { id: 12, coord: { x: 74, y: 24 }, demand: 14 },
      { id: 13, coord: { x: 58, y: 10 }, demand: 12 },
      { id: 14, coord: { x: 38, y: 6 }, demand: 15 },
      { id: 15, coord: { x: 20, y: 20 }, demand: 11 },
      { id: 16, coord: { x: 12, y: 56 }, demand: 19 },
      { id: 17, coord: { x: 26, y: 84 }, demand: 16 },
      { id: 18, coord: { x: 50, y: 92 }, demand: 14 },
      { id: 19, coord: { x: 86, y: 78 }, demand: 18 },
      { id: 20, coord: { x: 92, y: 46 }, demand: 15 },
      { id: 21, coord: { x: 84, y: 14 }, demand: 12 },
      { id: 22, coord: { x: 64, y: 2 }, demand: 16 },
      { id: 23, coord: { x: 40, y: 2 }, demand: 10 },
      { id: 24, coord: { x: 18, y: 12 }, demand: 14 },
      { id: 25, coord: { x: 4, y: 40 }, demand: 18 },
      { id: 26, coord: { x: 8, y: 74 }, demand: 12 },
      { id: 27, coord: { x: 24, y: 94 }, demand: 15 },
      { id: 28, coord: { x: 46, y: 98 }, demand: 11 },
      { id: 29, coord: { x: 78, y: 94 }, demand: 17 },
      { id: 30, coord: { x: 96, y: 66 }, demand: 13 },
      { id: 31, coord: { x: 94, y: 30 }, demand: 16 },
      { id: 32, coord: { x: 78, y: 4 }, demand: 14 }
    ]
  },
  'A-n44-k6': {
    name: 'A-n44-k6',
    comment: 'Augerat et al. (1995) Set A - 44 nodes, 6 trucks',
    dimension: 44,
    capacity: 100,
    vehicleCount: 6,
    bks: 937,
    depot: { x: 55, y: 85 },
    customers: [
      { id: 1, coord: { x: 64, y: 75 }, demand: 18 },
      { id: 2, coord: { x: 54, y: 62 }, demand: 12 },
      { id: 3, coord: { x: 42, y: 65 }, demand: 15 },
      { id: 4, coord: { x: 38, y: 72 }, demand: 14 },
      { id: 5, coord: { x: 32, y: 64 }, demand: 16 },
      { id: 6, coord: { x: 25, y: 52 }, demand: 19 },
      { id: 7, coord: { x: 18, y: 40 }, demand: 11 },
      { id: 8, coord: { x: 22, y: 28 }, demand: 10 },
      { id: 9, coord: { x: 32, y: 20 }, demand: 14 },
      { id: 10, coord: { x: 45, y: 22 }, demand: 15 },
      { id: 11, coord: { x: 55, y: 35 }, demand: 18 },
      { id: 12, coord: { x: 62, y: 48 }, demand: 13 },
      { id: 13, coord: { x: 70, y: 58 }, demand: 17 },
      { id: 14, coord: { x: 78, y: 62 }, demand: 12 },
      { id: 15, coord: { x: 85, y: 70 }, demand: 16 },
      { id: 16, coord: { x: 80, y: 82 }, demand: 14 },
      { id: 17, coord: { x: 68, y: 90 }, demand: 11 },
      { id: 18, coord: { x: 45, y: 92 }, demand: 15 },
      { id: 19, coord: { x: 28, y: 85 }, demand: 18 },
      { id: 20, coord: { x: 15, y: 72 }, demand: 12 },
      { id: 21, coord: { x: 8, y: 55 }, demand: 16 },
      { id: 22, coord: { x: 10, y: 35 }, demand: 14 },
      { id: 23, coord: { x: 16, y: 18 }, demand: 19 },
      { id: 24, coord: { x: 28, y: 8 }, demand: 13 },
      { id: 25, coord: { x: 44, y: 6 }, demand: 17 },
      { id: 26, coord: { x: 60, y: 10 }, demand: 11 },
      { id: 27, coord: { x: 72, y: 20 }, demand: 15 },
      { id: 28, coord: { x: 82, y: 35 }, demand: 18 },
      { id: 29, coord: { x: 90, y: 50 }, demand: 12 },
      { id: 30, coord: { x: 92, y: 68 }, demand: 16 },
      { id: 31, coord: { x: 88, y: 84 }, demand: 14 },
      { id: 32, coord: { x: 74, y: 95 }, demand: 10 },
      { id: 33, coord: { x: 58, y: 98 }, demand: 19 },
      { id: 34, coord: { x: 38, y: 98 }, demand: 15 },
      { id: 35, coord: { x: 20, y: 92 }, demand: 12 },
      { id: 36, coord: { x: 6, y: 78 }, demand: 18 },
      { id: 37, coord: { x: 2, y: 50 }, demand: 14 },
      { id: 38, coord: { x: 4, y: 25 }, demand: 16 },
      { id: 39, coord: { x: 12, y: 10 }, demand: 11 },
      { id: 40, coord: { x: 32, y: 2 }, demand: 15 },
      { id: 41, coord: { x: 52, y: 2 }, demand: 17 },
      { id: 42, coord: { x: 72, y: 4 }, demand: 13 },
      { id: 43, coord: { x: 88, y: 12 }, demand: 14 }
    ]
  },
  'A-n53-k7': {
    name: 'A-n53-k7',
    comment: 'Augerat et al. (1995) Set A - 53 nodes, 7 trucks',
    dimension: 53,
    capacity: 100,
    vehicleCount: 7,
    bks: 1010,
    depot: { x: 50, y: 50 },
    customers: [
      { id: 1, coord: { x: 84, y: 56 }, demand: 15 },
      { id: 2, coord: { x: 72, y: 40 }, demand: 18 },
      { id: 3, coord: { x: 60, y: 30 }, demand: 12 },
      { id: 4, coord: { x: 45, y: 22 }, demand: 14 },
      { id: 5, coord: { x: 30, y: 18 }, demand: 16 },
      { id: 6, coord: { x: 20, y: 30 }, demand: 11 },
      { id: 7, coord: { x: 16, y: 45 }, demand: 19 },
      { id: 8, coord: { x: 22, y: 62 }, demand: 13 },
      { id: 9, coord: { x: 35, y: 75 }, demand: 17 },
      { id: 10, coord: { x: 52, y: 82 }, demand: 10 },
      { id: 11, coord: { x: 68, y: 78 }, demand: 15 },
      { id: 12, coord: { x: 80, y: 68 }, demand: 18 },
      { id: 13, coord: { x: 90, y: 52 }, demand: 12 },
      { id: 14, coord: { x: 88, y: 35 }, demand: 16 },
      { id: 15, coord: { x: 75, y: 22 }, demand: 14 },
      { id: 16, coord: { x: 60, y: 12 }, demand: 19 },
      { id: 17, coord: { x: 42, y: 8 }, demand: 11 },
      { id: 18, coord: { x: 25, y: 10 }, demand: 13 },
      { id: 19, coord: { x: 12, y: 22 }, demand: 17 },
      { id: 20, coord: { x: 6, y: 40 }, demand: 15 },
      { id: 21, coord: { x: 10, y: 58 }, demand: 18 },
      { id: 22, coord: { x: 20, y: 74 }, demand: 12 },
      { id: 23, coord: { x: 38, y: 88 }, demand: 14 },
      { id: 24, coord: { x: 58, y: 92 }, demand: 16 },
      { id: 25, coord: { x: 76, y: 88 }, demand: 10 },
      { id: 26, coord: { x: 88, y: 78 }, demand: 19 },
      { id: 27, coord: { x: 95, y: 62 }, demand: 13 },
      { id: 28, coord: { x: 94, y: 42 }, demand: 17 },
      { id: 29, coord: { x: 84, y: 22 }, demand: 15 },
      { id: 30, coord: { x: 68, y: 8 }, demand: 11 },
      { id: 31, coord: { x: 50, y: 4 }, demand: 18 },
      { id: 32, coord: { x: 32, y: 4 }, demand: 12 },
      { id: 33, coord: { x: 15, y: 8 }, demand: 14 },
      { id: 34, coord: { x: 4, y: 25 }, demand: 16 },
      { id: 35, coord: { x: 2, y: 48 }, demand: 19 },
      { id: 36, coord: { x: 5, y: 70 }, demand: 13 },
      { id: 37, coord: { x: 18, y: 86 }, demand: 17 },
      { id: 38, coord: { x: 36, y: 96 }, demand: 10 },
      { id: 39, coord: { x: 55, y: 98 }, demand: 15 },
      { id: 40, coord: { x: 74, y: 96 }, demand: 18 },
      { id: 41, coord: { x: 90, y: 88 }, demand: 12 },
      { id: 42, coord: { x: 98, y: 72 }, demand: 16 },
      { id: 43, coord: { x: 98, y: 50 }, demand: 14 },
      { id: 44, coord: { x: 92, y: 30 }, demand: 19 },
      { id: 45, coord: { x: 80, y: 14 }, demand: 11 },
      { id: 46, coord: { x: 62, y: 2 }, demand: 13 },
      { id: 47, coord: { x: 42, y: 2 }, demand: 17 },
      { id: 48, coord: { x: 22, y: 4 }, demand: 15 },
      { id: 49, coord: { x: 8, y: 16 }, demand: 18 },
      { id: 50, coord: { x: 0, y: 35 }, demand: 12 },
      { id: 51, coord: { x: 0, y: 62 }, demand: 14 },
      { id: 52, coord: { x: 10, y: 82 }, demand: 16 }
    ]
  },
  'A-n60-k9': {
    name: 'A-n60-k9',
    comment: 'Augerat et al. (1995) Set A - 60 nodes, 9 trucks',
    dimension: 60,
    capacity: 100,
    vehicleCount: 9,
    bks: 1354,
    depot: { x: 50, y: 50 },
    customers: Array.from({ length: 59 }, (_, idx) => {
      const i = idx + 2;
      const angle = (i * 137.5 * Math.PI) / 180;
      const radius = 10 + (i % 5) * 7 + i * 0.45;
      return {
        id: idx + 1,
        coord: {
          x: Math.round(50 + radius * Math.cos(angle)),
          y: Math.round(50 + radius * Math.sin(angle))
        },
        demand: 8 + (i * 7) % 17
      };
    })
  },
  'Sample-n16-k3': {
    name: 'Sample-n16-k3',
    comment: 'Educational CVRP sample instance - 16 nodes, 3 trucks',
    dimension: 16,
    capacity: 50,
    vehicleCount: 3,
    bks: 278,
    depot: { x: 50, y: 50 },
    customers: [
      { id: 1, coord: { x: 25, y: 70 }, demand: 9 },
      { id: 2, coord: { x: 30, y: 85 }, demand: 14 },
      { id: 3, coord: { x: 55, y: 80 }, demand: 11 },
      { id: 4, coord: { x: 70, y: 75 }, demand: 8 },
      { id: 5, coord: { x: 80, y: 60 }, demand: 12 },
      { id: 6, coord: { x: 75, y: 40 }, demand: 15 },
      { id: 7, coord: { x: 85, y: 20 }, demand: 7 },
      { id: 8, coord: { x: 60, y: 25 }, demand: 10 },
      { id: 9, coord: { x: 40, y: 20 }, demand: 13 },
      { id: 10, coord: { x: 20, y: 30 }, demand: 8 },
      { id: 11, coord: { x: 15, y: 50 }, demand: 11 },
      { id: 12, coord: { x: 35, y: 60 }, demand: 6 },
      { id: 13, coord: { x: 60, y: 60 }, demand: 9 },
      { id: 14, coord: { x: 65, y: 45 }, demand: 8 },
      { id: 15, coord: { x: 40, y: 40 }, demand: 5 }
    ]
  }
};

export const ROUTE_COLORS = [
  '#38bdf8', // sky/cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // teal
  '#f97316', // orange
  '#a855f7', // purple
  '#14b8a6', // teal-accent
  '#e11d48', // rose
  '#84cc16', // lime
  '#6366f1'  // indigo
];

export function generateCustomInstance(
  name: string,
  nodeCount: number,
  capacity: number = 100,
  distribution: 'uniform' | 'clustered' | 'radial' = 'clustered'
): CVRPInstance {
  const depot = { x: 50, y: 50 };
  const customers: Customer[] = [];

  if (distribution === 'uniform') {
    for (let i = 1; i <= nodeCount; i++) {
      customers.push({
        id: i,
        coord: {
          x: Math.round(5 + Math.random() * 90),
          y: Math.round(5 + Math.random() * 90)
        },
        demand: Math.floor(Math.random() * 20) + 5
      });
    }
  } else if (distribution === 'radial') {
    for (let i = 1; i <= nodeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 40;
      customers.push({
        id: i,
        coord: {
          x: Math.round(50 + radius * Math.cos(angle)),
          y: Math.round(50 + radius * Math.sin(angle))
        },
        demand: Math.floor(Math.random() * 18) + 6
      });
    }
  } else {
    // Clustered
    const numClusters = Math.max(2, Math.floor(nodeCount / 10));
    const clusterCenters = Array.from({ length: numClusters }, () => ({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70
    }));

    for (let i = 1; i <= nodeCount; i++) {
      const center = clusterCenters[i % numClusters];
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 14;
      customers.push({
        id: i,
        coord: {
          x: Math.min(98, Math.max(2, Math.round(center.x + radius * Math.cos(angle)))),
          y: Math.min(98, Math.max(2, Math.round(center.y + radius * Math.sin(angle))))
        },
        demand: Math.floor(Math.random() * 18) + 5
      });
    }
  }

  const totalDemand = customers.reduce((sum, c) => sum + c.demand, 0);
  const minVehicles = Math.ceil(totalDemand / capacity);

  return {
    name,
    comment: `Synthetic ${distribution} CVRP instance with ${nodeCount} customers`,
    dimension: nodeCount + 1,
    capacity,
    vehicleCount: Math.max(minVehicles + 1, 4),
    depot,
    customers
  };
}

export function parseVRPLIBString(raw: string): CVRPInstance {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  let name = 'Custom-Instance';
  let dimension = 0;
  let capacity = 100;
  let vehicleCount = 0;
  const coords: { id: number; x: number; y: number }[] = [];
  const demands: { id: number; demand: number }[] = [];
  let section: 'NONE' | 'COORD' | 'DEMAND' | 'DEPOT' = 'NONE';

  for (const line of lines) {
    if (line.startsWith('NAME')) {
      const parts = line.split(':');
      if (parts[1]) name = parts[1].trim();
      const kMatch = name.match(/-k(\d+)/i);
      if (kMatch) vehicleCount = parseInt(kMatch[1], 10);
    } else if (line.startsWith('DIMENSION')) {
      const parts = line.split(':');
      if (parts[1]) dimension = parseInt(parts[1].trim(), 10);
    } else if (line.startsWith('CAPACITY')) {
      const parts = line.split(':');
      if (parts[1]) capacity = parseInt(parts[1].trim(), 10);
    } else if (line.startsWith('NODE_COORD_SECTION')) {
      section = 'COORD';
      continue;
    } else if (line.startsWith('DEMAND_SECTION')) {
      section = 'DEMAND';
      continue;
    } else if (line.startsWith('DEPOT_SECTION')) {
      section = 'DEPOT';
      continue;
    } else if (line.startsWith('EOF')) {
      break;
    }

    const tokens = line.split(/\s+/);
    if (section === 'COORD' && tokens.length >= 3) {
      coords.push({
        id: parseInt(tokens[0], 10),
        x: parseFloat(tokens[1]),
        y: parseFloat(tokens[2])
      });
    } else if (section === 'DEMAND' && tokens.length >= 2) {
      demands.push({
        id: parseInt(tokens[0], 10),
        demand: parseInt(tokens[1], 10)
      });
    }
  }

  if (coords.length === 0) {
    throw new Error('Invalid VRPLIB content: No node coordinates found');
  }

  const depot = { x: coords[0].x, y: coords[0].y };
  const customers: Customer[] = [];

  for (let i = 1; i < coords.length; i++) {
    const dem = demands.find(d => d.id === coords[i].id)?.demand || 10;
    customers.push({
      id: i,
      coord: { x: coords[i].x, y: coords[i].y },
      demand: dem
    });
  }

  if (vehicleCount === 0) {
    const totalDem = customers.reduce((sum, c) => sum + c.demand, 0);
    vehicleCount = Math.ceil(totalDem / capacity) + 1;
  }

  return {
    name,
    dimension: coords.length,
    capacity,
    vehicleCount,
    depot,
    customers
  };
}
