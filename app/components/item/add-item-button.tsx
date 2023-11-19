import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/app/components/ui/button";

export default function AddItemButton() {
  return (
    <Link href="/items/add">
      <Button>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </Link>
  );
}
