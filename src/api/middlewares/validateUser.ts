import { NextApiRequest, NextApiResponse } from "next";
import { sendError } from "@/utils";
import { getApiSession } from "@/utils/getServerSession";

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get token from header

  const { authenticated, user } = await getApiSession(req, res);

  if (!authenticated) {
    res.status(401).json(sendError("Authorization denied"));
    return false;
  }

  // @ts-ignore
  req.user = user;
};

export default validateUser;
