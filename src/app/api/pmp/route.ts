import { NextResponse } from 'next/server';
import { pmp } from '@/lib/mock-data';
import { kvStore } from '@/lib/kv-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const key = `pmp:${type || 'devices'}`;
  const dynamicData = await kvStore.get(key);
  
  if (dynamicData) {
    return NextResponse.json(dynamicData);
  }

  if (type === 'alarms') {
    return NextResponse.json(pmp.getAlarms());
  }

  return NextResponse.json(pmp.getDevices());
}
