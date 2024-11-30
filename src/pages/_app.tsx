import UserContext from "@/context/UserContext";
import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <SessionProvider>
      <DataWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataWrapper>
    </SessionProvider>
  );
}

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      const user = session.data.user;
      // @ts-ignore

      setUser(user);
    }
    console.log("session", session);
  }, [session.status]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {session.status === "loading" ? "Loading..." : children}
    </UserContext.Provider>
  );
};
