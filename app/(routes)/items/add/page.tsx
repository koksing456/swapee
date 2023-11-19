import { AddItemForm } from "@/app/components/item/add-item-form";

export default async function Page({ params }: { params: { id: string } }) {
  return <AddItemForm />;
}
