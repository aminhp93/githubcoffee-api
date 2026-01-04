import { NextResponse } from 'next/server';
import { foresight } from '@/lib/mock-data';
import { kvStore } from '@/lib/kv-store';

export async function GET() {
  const key = 'foresight:portfolio';
  const dynamicData = await kvStore.get(key);
  
  if (dynamicData) {
    return NextResponse.json(dynamicData);
  }

  return NextResponse.json(foresight.getPortfolio());
}
