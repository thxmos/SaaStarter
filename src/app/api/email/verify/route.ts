import { COMPANY_EMAIL, COMPANY_NAME } from "@/constants";
import WelcomeEmail from "@/emails/welcome";
import { getUser } from "@/lib/lucia";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const { user } = await getUser();

  if (user?.email && user?.name) {
    const data = await resend.emails.send({
      from: COMPANY_EMAIL,
      to: user.email,
      subject: `Verify your account - ${COMPANY_NAME}`,
      react: WelcomeEmail({ url: "https://example.com", username: user.name }),
    });
    return Response.json({
      name: user.name,
      to: user.email,
      from: COMPANY_EMAIL,
    });
  }
  return Response.json({ ...user });
}
