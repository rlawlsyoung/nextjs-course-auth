import { getSession } from "next-auth/client";

import { connectToDatabase } from "../../../lib/db";
import { verifyPassword, hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  // getSession을 하면 ...nextAuth api를 통해 유저 정보를 얻음
  // ...nextAuth에서 이메일 객체를 return하고 해당 데이터는 토큰이 되어 이 session 상수에 포함됨
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).message({ message: "Not authenticated." });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db("auth-demo").collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentHashedPassword = user.password;
  const isPasswordsEqual = await verifyPassword(
    oldPassword,
    currentHashedPassword
  );

  if (!isPasswordsEqual) {
    res.status(422).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated." });
}

export default handler;
