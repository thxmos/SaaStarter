import ProtectedLayout from "@/components/protected-layout";
import BeanMachineTab from "./home/bean-machine-tab";
import { redirect } from "next/navigation";

export default function Dashboard({}) {
  redirect("/dashboard/home");
  return <></>;
}
