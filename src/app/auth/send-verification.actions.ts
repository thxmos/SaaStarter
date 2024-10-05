import { APP_NAME } from "@/constants";
import WelcomeEmail from "@/emails/welcome";
import { resend } from "@/lib/resend";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;

    const fromEmail =
      process.env.NODE_ENV === "production"
        ? "onboarding@resend.dev"
        : `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`;

    const res = await resend.emails.send({
      to: email,
      from: fromEmail,
      subject: `Verify your account - ${APP_NAME}`,
      react: WelcomeEmail({ url: verificationUrl, name }),
    });

    if (res.error) return { ...res.error };
    return { message: "Verification email sent.", status: 200 };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { message: "Failed to send verification email.", status: 500 };
  }
};
