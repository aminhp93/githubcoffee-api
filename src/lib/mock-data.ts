/**
 * Mock data generators for the GitHub Coffee API ecosystem.
 */

// --- ESM (Energy Storage Management) ---
export const esm = {
  getStations: (count = 5) => Array.from({ length: count }, (_, i) => ({
    id: `esm-station-${i + 1}`,
    name: `ESM Station ${i + 1}`,
    status: Math.random() > 0.2 ? 'online' : 'offline',
    capacity: 1000 + Math.random() * 5000,
    power: Math.random() * 500,
    soc: 20 + Math.random() * 80,
  })),
  getMetrics: (stationId: string) => ({
    stationId,
    timestamp: new Date().toISOString(),
    charge: Math.random() * 100,
    discharge: Math.random() * 80,
    efficiency: 85 + Math.random() * 10,
  })
};

// --- PMP (Piscada Management Platform) ---
export const pmp = {
  getDevices: (count = 8) => Array.from({ length: count }, (_, i) => ({
    id: `pmp-device-${i + 1}`,
    name: `SCADA Controller ${i + 1}`,
    type: i % 2 === 0 ? 'PLC' : 'RTU',
    lastSync: new Date().toISOString(),
    points: Array.from({ length: 5 }, (_, j) => ({
      id: `pt-${j + 1}`,
      name: `Sensor ${j + 1}`,
      value: (Math.random() * 100).toFixed(2),
      unit: '°C'
    }))
  })),
  getAlarms: () => [
    { id: 'alm-1', severity: 'critical', message: 'Communication Timeout', timestamp: new Date().toISOString() },
    { id: 'alm-2', severity: 'warning', message: 'Battery Voltage Low', timestamp: new Date().toISOString() },
  ]
};

// --- Foresight (Facilities Management) ---
export const foresight = {
  getPortfolio: () => ({
    id: 'foresight-portfolio-1',
    name: 'Grieg Global Logistics',
    sites: [
      {
        id: 'site-alpha',
        name: 'Bergsnes Terminal',
        buildings: [
          { id: 'bld-1', name: 'Main Office', co2: 450 + Math.random() * 100, temperature: 21.5 },
          { id: 'bld-2', name: 'Warehouse A', co2: 500 + Math.random() * 200, temperature: 18.0 }
        ]
      },
      {
        id: 'site-beta',
        name: 'Davatluft Hub',
        buildings: [
          { id: 'bld-3', name: 'Hangar 1', co2: 400 + Math.random() * 50, temperature: 15.5 }
        ]
      }
    ]
  })
};
