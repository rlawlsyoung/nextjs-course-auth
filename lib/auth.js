import { hash } from "bcryptjs";

export async function hashPassword(pw) {
  const hashedPw = await hash(pw, 12);
  return hashedPw;
}
