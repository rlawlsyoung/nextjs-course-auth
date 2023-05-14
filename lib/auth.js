import { compare, hash } from "bcryptjs";

export async function hashPassword(pw) {
  const hashedPw = await hash(pw, 12);
  return hashedPw;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
