import { hash } from "bcryptjs";

const hashPassword = async (pw) => {
  const hashedPw = await hash(pw, 12);
  return hashedPw;
};
