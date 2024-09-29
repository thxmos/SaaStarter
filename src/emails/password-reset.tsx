import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { APP_NAME } from "@/constants";

interface PasswordResetEmailProps {
  name: string;
  url: string;
}

export default function PasswordResetEmail({
  name,
  url,
}: PasswordResetEmailProps) {
  return (
    <Html lang="en">
      <head>
        <title>Password Reset Request</title>
      </head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.5,
          color: "#333",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <table
          cellPadding="0"
          cellSpacing="0"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <tr>
            <td>
              <h1 style={{ color: "#333", textAlign: "center" }}>
                Password Reset Request
              </h1>
              <p>Hello {name},</p>
              <p>
                We received a request to reset your password for your {APP_NAME}{" "}
                account. If you didn't make this request, please ignore this
                email.
              </p>
              <p>To reset your password, please click the button below:</p>
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{ margin: "30px auto" }}
              >
                <tr>
                  <td align="center">
                    <Button
                      href={url}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#ffffff",
                        padding: "12px 20px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      Reset Password
                    </Button>
                  </td>
                </tr>
              </table>
              <p>
                If the button above doesn't work, you can also copy and paste
                the following link into your browser:
              </p>
              <p style={{ wordBreak: "break-all", color: "#007bff" }}>{url}</p>
              <p>
                This password reset link will expire in 24 hours for security
                reasons.
              </p>
              <p>
                If you didn't request a password reset, please ignore this email
                or contact our support team if you have any concerns.
              </p>
              <p>
                Best regards,
                <br />
                The {APP_NAME} Team
              </p>
            </td>
          </tr>
        </table>
      </body>
    </Html>
  );
}
