import { connectToDatabase } from "../../lib/db";

const handler = async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input = password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db("auth-demo");

  db.collection("users").insertIne({
    email,
    password,
  });
};

export default handler;
