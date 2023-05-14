import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        async authorize(credentials) {
          const client = await connectToDatabase();

          const usersCollection = client.db().connection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found!");
          }

          client.close();
        },
      },
    }),
  ],
});
