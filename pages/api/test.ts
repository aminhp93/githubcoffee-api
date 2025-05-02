// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/@core/services/supabase";

type Data = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data } = await supabase.from("test").select("*");

  res.status(200).json({ name: "test", data });
}
