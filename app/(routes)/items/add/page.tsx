import { AddItemForm } from "@/app/components/add-item-form";

export default async function Page({ params }: { params: { id: string } }) {
  return <AddItemForm />;
}
