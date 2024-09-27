import { COMPANY_NAME } from "@/constants";
import { Button, Html } from "@react-email/components";
import * as React from "react";

type Props = { url: string; username: string };

export function WelcomeEmail(props: Props) {
  const { url, username } = props;

  return (
    <Html>
      <p>
        Hi {username}, Thank you for signing up with
        {COMPANY_NAME}! To complete your registration and verify your email
        address, please click the link below:
      </p>
      <Button
        href={url}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Verify Login
      </Button>
      <p>
        If you did not create an account with us, please ignore this email.
        Thank you! Best regards, {COMPANY_NAME} Team
      </p>
    </Html>
  );
}

export default WelcomeEmail;
