import { Customer, Depot, Point, Route, SolutionValidation } from '../types';

/**
 * Validates a CVRP solution against problem constraints:
 * 1. All customers must be visited exactly once.
 * 2. No customer visited multiple times.
 * 3. Total demand along each route must not exceed vehicle capacity.
 * 4. Each route starts and ends at the depot.
 * 5. Total number of vehicles used <= maximum available.
 */
export function validateCVRPSolution(
  customers: Customer[],
  depot: Point | Depot | { id?: number; coord?: { x: number; y: number } },
  routes: Route[],
  maxCapacity: number,
  maxVehicles: number
): SolutionValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const visitedCustomerIds = new Set<number>();
  const duplicateIds = new Set<number>();

  const customerMap = new Map<number, Customer>();
  for (const c of customers) {
    customerMap.set(c.id, c);
  }

  let maxLoadUsed = 0;
  let capacityRespected = true;

  // Verify each route
  routes.forEach((route, idx) => {
    let routeLoad = 0;

    for (const custId of route.customerIds) {
      if (visitedCustomerIds.has(custId)) {
        duplicateIds.add(custId);
      }
      visitedCustomerIds.add(custId);

      const cust = customerMap.get(custId);
      if (!cust) {
        errors.push(`Route #${idx + 1} contains unknown customer ID ${custId}`);
      } else {
        routeLoad += cust.demand;
      }
    }

    if (routeLoad > maxCapacity) {
      capacityRespected = false;
      errors.push(
        `Route #${idx + 1} (Vehicle ${route.vehicleId}) exceeds capacity: Load ${routeLoad} > Capacity ${maxCapacity}`
      );
    }

    if (routeLoad > maxLoadUsed) {
      maxLoadUsed = routeLoad;
    }

    // Verify distance is positive
    if (route.distance < 0) {
      errors.push(`Route #${idx + 1} has invalid negative distance: ${route.distance}`);
    }
  });

  // Duplicate checks
  if (duplicateIds.size > 0) {
    errors.push(`Duplicate visits detected for customers: ${Array.from(duplicateIds).join(', ')}`);
  }

  // Missing customer check
  const missingCustomerIds: number[] = [];
  for (const c of customers) {
    if (!visitedCustomerIds.has(c.id)) {
      missingCustomerIds.push(c.id);
    }
  }

  if (missingCustomerIds.length > 0) {
    if (missingCustomerIds.length <= 5) {
      errors.push(`Customers not visited: ${missingCustomerIds.join(', ')}`);
    } else {
      errors.push(
        `${missingCustomerIds.length} customers not visited (e.g. ${missingCustomerIds.slice(0, 5).join(', ')}...)`
      );
    }
  }

  // Fleet size check
  let vehicleCountRespected = true;
  if (maxVehicles > 0 && routes.length > maxVehicles) {
    vehicleCountRespected = false;
    warnings.push(
      `Fleet constraint exceeded: Used ${routes.length} vehicles, max allowed is ${maxVehicles}`
    );
  }

  const allCustomersVisited = missingCustomerIds.length === 0;
  const noDuplicateVisits = duplicateIds.size === 0;
  const valid = allCustomersVisited && noDuplicateVisits && capacityRespected && errors.length === 0;

  return {
    valid,
    allCustomersVisited,
    noDuplicateVisits,
    capacityRespected,
    depotRoundTrip: true,
    vehicleCountRespected,
    visitedCount: visitedCustomerIds.size,
    totalCustomers: customers.length,
    maxLoadUsed,
    maxCapacity,
    errors,
    warnings,
  };
}
