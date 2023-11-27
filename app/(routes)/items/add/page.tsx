import { AddItemForm } from "@/app/components/item/add-item-form";
import { readUserSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { data, error } = await readUserSession();

  if (data.session === null) {
    return redirect("/login");
  }
  return <AddItemForm />;
}
