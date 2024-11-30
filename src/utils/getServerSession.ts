import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageContext } from "next";

interface ReturnType {
  authenticated: boolean;
  user: User | null;
}

const getSession = async (context: NextPageContext): Promise<ReturnType> => {
  //@ts-ignore
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    authenticated: session?.user?.email ? true : false,
    user: session?.user || null,
  };
};

export default getSession;
