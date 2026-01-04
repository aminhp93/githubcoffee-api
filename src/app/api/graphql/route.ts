import { createSchema, createYoga } from 'graphql-yoga';
import { esm, pmp, foresight } from '@/lib/mock-data';

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        esm: ESMQuery
        pmp: PMPQuery
        foresight: ForesightQuery
      }

      type ESMQuery {
        stations: [ESMStation]
        metrics(stationId: ID!): ESMMetrics
      }

      type ESMStation {
        id: ID!
        name: String
        status: String
        capacity: Float
        power: Float
        soc: Float
      }

      type ESMMetrics {
        stationId: ID!
        timestamp: String
        charge: Float
        discharge: Float
        efficiency: Float
      }

      type PMPQuery {
        devices: [PMPDevice]
        alarms: [PMPAlarm]
      }

      type PMPDevice {
        id: ID!
        name: String
        type: String
        lastSync: String
        points: [PMPPoint]
      }

      type PMPPoint {
        id: ID!
        name: String
        value: String
        unit: String
      }

      type PMPAlarm {
        id: ID!
        severity: String
        message: String
        timestamp: String
      }

      type ForesightQuery {
        portfolio: Portfolio
      }

      type Portfolio {
        id: ID!
        name: String
        sites: [Site]
      }

      type Site {
        id: ID!
        name: String
        buildings: [Building]
      }

      type Building {
        id: ID!
        name: String
        co2: Float
        temperature: Float
      }
    `,
    resolvers: {
      Query: {
        esm: () => ({}),
        pmp: () => ({}),
        foresight: () => ({}),
      },
      ESMQuery: {
        stations: () => esm.getStations(),
        metrics: (_: any, { stationId }: { stationId: string }) => esm.getMetrics(stationId),
      },
      PMPQuery: {
        devices: () => pmp.getDevices(),
        alarms: () => pmp.getAlarms(),
      },
      ForesightQuery: {
        portfolio: () => foresight.getPortfolio(),
      }
    },
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
