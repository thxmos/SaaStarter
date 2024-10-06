import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY || "re_XE3dAWUZ_3wiQd27qP3q6dqxxHGSYQXtX",
);
