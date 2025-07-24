import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect("/users");
  } else {
    redirect("admin/login");
  }
}
