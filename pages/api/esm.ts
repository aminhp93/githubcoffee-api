import type { NextApiRequest, NextApiResponse } from 'next';

// Simple types based on ESM platform
type Station = {
  id: string;
  name: string;
  status: 'online' | 'offline';
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  if (type === 'stations') {
    const stations: Station[] = Array.from({ length: 5 }, (_, i) => ({
      id: `station-${i + 1}`,
      name: `Power Station ${i + 1}`,
      status: Math.random() > 0.2 ? 'online' : 'offline',
    }));
    return res.status(200).json(stations);
  }

  res.status(200).json({ message: 'ESM Mock API Active', availableTypes: ['stations'] });
}
