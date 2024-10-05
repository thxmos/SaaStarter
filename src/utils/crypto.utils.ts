import crypto from "crypto";
import { Argon2id } from "oslo/password";

export async function hash(password: string) {
  const hashedPassword = await new Argon2id().hash(password);
  return hashedPassword;
}

export async function verify(password: string, hashedPassword: string) {
  const isPasswordValid = await new Argon2id().verify(password, hashedPassword);
  return isPasswordValid;
}

export function generateTokenWithExpiration(hours: number = 1) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * hours); // hours from now
  return { token, expiresAt };
}
