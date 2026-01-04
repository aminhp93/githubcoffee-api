import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simplified portfolio data based on foresight data.json
  const portfolio = {
    id: "brick:Portfolio:0196ce1f-1731-7591-8a8c-cb2a5fef6df0",
    name: "Grieg",
    sites: [
      { id: "site-1", name: "Bergsnes" },
      { id: "site-2", name: "Davatluft" },
      { id: "site-3", name: "Måsanjarga" }
    ]
  };

  res.status(200).json(portfolio);
}
