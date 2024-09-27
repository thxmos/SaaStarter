import TabSwitcher from "@/components/tab-switcher";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-start">
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};

export default AuthPage;
