import { NextResponse } from 'next/server';
import { pmp } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'alarms') {
    return NextResponse.json(pmp.getAlarms());
  }

  return NextResponse.json(pmp.getDevices());
}
