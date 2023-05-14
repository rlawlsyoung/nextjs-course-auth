import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
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
            client.close();
            throw new Error("No user found!");
          }

          await verifyPassword(credentials.password, user.password);

          if (!isValid) {
            client.close();
            throw new Error("Could not log you in.");
            return;
          }

          client.close();

          return { email: user.email };
        },
      },
    }),
  ],
});
