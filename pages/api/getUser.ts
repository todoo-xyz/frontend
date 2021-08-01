import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const user = await supabase.auth.user();
  return res.status(200).json({user})
}
