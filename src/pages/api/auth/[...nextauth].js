import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    error: "/auth/login", // Error code passed in query string as ?error=
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.githubProfile = token.githubProfile;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        token.githubProfile = profile;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
