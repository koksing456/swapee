"use server";

import AuthenticationPage from "@/app/components/auth/login";
import { readUserSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data, error } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }

  return <AuthenticationPage />;
}
