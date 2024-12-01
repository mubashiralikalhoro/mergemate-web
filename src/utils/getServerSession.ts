import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageContext } from "next";

interface ReturnType {
  authenticated: boolean;
  user: User | null;
}

export const getApiSession = async (req: any, res: any): Promise<ReturnType> => {
  const session = await getServerSession(req, res, authOptions);

  return {
    authenticated: session?.user?.email ? true : false,
    user: session?.user || null,
  };
};

const getSession = async (context: NextPageContext): Promise<ReturnType> => {
  return await getApiSession(context.req, context.res);
};

export default getSession;
