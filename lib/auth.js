import { hash } from "bcryptjs";

export const hashPassword = async (pw) => {
  const hashedPw = await hash(pw, 12);
  return hashedPw;
};
