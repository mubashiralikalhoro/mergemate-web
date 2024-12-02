import User from "@/api/db/models/User";
import connectToDatabase from "@/api/middlewares/connectToDatabase";
import NextAuth, { NextAuthOptions } from "next-auth";
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

  events: {},
  callbacks: {
    async session({ session, token, user }) {
      session.user.githubProfile = token.githubProfile;
      return session;
    },

    async signIn({ account, user, credentials, email, profile }) {
      await connectToDatabase();
      console.log("user -> ", user);
      console.log("account -> ", account);
      console.log("profile -> ", profile);
      console.log("credentials -> ", credentials);
      console.log("email --> ", email);

      const githubProfile = {
        id: profile.id,
        login: profile.login,
        avatar_url: profile.avatar_url,
        url: profile.url,
        html_url: profile.html_url,
        repos_url: profile.repos_url,
        name: profile.name,
        location: profile.location,
        bio: profile.bio,
        company: profile.company,
        followers: profile.followers,
        following: profile.following,
      };

      try {
        const isNewUser = await User.exists({ email: user?.email });

        console.log("isNewUser => ", isNewUser);

        if (!isNewUser) {
          const dbUser = new User({
            name: user?.name,
            email: user?.email,
            image: user?.image,
            githubProfile: githubProfile,
          });

          await dbUser.save();
        }
      } catch (e) {
        console.log("Error -> ", e?.message);
      }

      return true;
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
