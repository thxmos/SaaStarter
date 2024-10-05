import { sendPasswordResetEmail } from "@/app/auth/forgot-password.actions";
import { createPasswordResetToken } from "@/data-access/password-reset-token";
import { getUserByEmail } from "@/data-access/user";
import { createVerificationToken } from "@/data-access/verification-token";
import { sendVerificationEmail } from "@/app/auth/send-verification.actions";

export const sendResetEmail = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    const { token } = await createPasswordResetToken(user.id);

    const res = await sendPasswordResetEmail(
      user.email,
      token,
      user.name ?? "",
    );

    if (res.status !== 200)
      return { error: "Couldn't send email", status: 500 };

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", status: 500 };
  }
};

export const sendVerifyEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  const { token } = await createVerificationToken(user.id);

  //todo: refactor email sending to a shared function
  const res = await sendVerificationEmail(user.email, token, user.name ?? "");

  if (res.status !== 200) return { error: "Couldn't send email", status: 500 };

  return res;
};
