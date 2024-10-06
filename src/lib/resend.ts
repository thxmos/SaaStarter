import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY || "re_5rMZNxi6_5xHT8oYr6zgaj9sizXiRefSF",
);
