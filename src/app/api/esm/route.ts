import { NextResponse } from 'next/server';
import { esm } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const stationId = searchParams.get('stationId');

  if (type === 'metrics' && stationId) {
    return NextResponse.json(esm.getMetrics(stationId));
  }

  return NextResponse.json(esm.getStations());
}
