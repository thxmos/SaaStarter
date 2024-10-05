import { Argon2id } from "oslo/password";

export async function hash(password: string) {
  const hashedPassword = await new Argon2id().hash(password);
  return hashedPassword;
}

export async function verify(password: string, hashedPassword: string) {
  const isPasswordValid = await new Argon2id().verify(password, hashedPassword);
  return isPasswordValid;
}
