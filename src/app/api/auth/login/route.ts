import { signIn } from "@/app/auth/auth.action";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    signIn({ email, password });
    return new Response("Sign in successful", { status: 200 });
  } catch (error) {
    // Handle errors (e.g., JSON parsing failure or missing fields)
    return new Response("Invalid request data", { status: 400 });
  }
}
