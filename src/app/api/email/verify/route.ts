import { COMPANY_NAME } from "@/constants";
import WelcomeEmail from "@/emails/welcome";
import { getUser } from "@/lib/lucia";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const { user } = await getUser();

  if (user?.email && user?.firstName) {
    const response = await resend.emails.send({
      // from: COMPANY_EMAIL,
      from: "onboarding@resend.dev",
      to: user.email,
      subject: `Verify your account - ${COMPANY_NAME}`,
      react: WelcomeEmail({ url: "https://example.com", name: user.firstName }),
    });
    if (response.data === null) {
      Response.json(response.error);
    } else {
      return Response.json(response.data);
    }
  }
  return Response.json({ message: "Something went wrong" }, { status: 500 });
}
