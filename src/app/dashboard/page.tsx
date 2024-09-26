import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="flex items-center gap-2 border p-4 rounded-lg bg-card transition-all cursor-pointer hover:shadow-xl  ">
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="user_avatar"
              className="rounded-full size-16"
              height={40}
              width={40}
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{user.name}</span>
            <span>{user.email}</span>
          </div>
        </div>
        <Link
          target="_blank"
          href={`https://billing.stripe.com/p/login/test_8wM17y7ej2tF5vG9AA?prefilled_email=${user.email}`}
        >
          <Button>Customer Portal</Button>
        </Link>
      </div>
    </>
  );
};

export default DashboardPage;
