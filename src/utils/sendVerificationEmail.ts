import { APP_NAME } from "@/constants";
import WelcomeEmail from "@/emails/welcome";
import { resend } from "@/lib/resend";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;

  const res = await resend.emails.send({
    // from: `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`,
    from: "onboarding@resend.dev",
    to: email,
    subject: `Verify your account - ${APP_NAME}`,
    react: WelcomeEmail({ url: verificationUrl, name }),
  });
  if (res.error) return { ...res.error };
  return { message: "Verification email sent.", status: 200 };
};
