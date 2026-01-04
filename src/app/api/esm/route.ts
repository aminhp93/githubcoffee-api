import { NextResponse } from 'next/server';
import { esm } from '@/lib/mock-data';
import { kvStore } from '@/lib/kv-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const stationId = searchParams.get('stationId');

  const key = `esm:${type || 'stations'}${stationId ? `:${stationId}` : ''}`;
  const dynamicData = await kvStore.get(key);
  console.log('dynamicData', key, dynamicData);
  
  if (dynamicData) {
    return NextResponse.json(dynamicData);
  }

  if (type === 'metrics' && stationId) {
    return NextResponse.json(esm.getMetrics(stationId));
  }

  return NextResponse.json(esm.getStations());
}
