import { logout } from "@/app/auth/auth.action";

export async function POST(request: Request) {
  try {
    logout();
    return new Response("Sign out successful", { status: 200 });
  } catch (error) {
    // Handle errors (e.g., JSON parsing failure or missing fields)
    return new Response("Invalid request data", { status: 400 });
  }
}
