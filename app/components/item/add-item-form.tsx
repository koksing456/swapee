"use client";

import React from "react";
import {
  Box,
  Dumbbell,
  Flower2,
  Home,
  Plug,
  Shirt,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Textarea } from "@/app/components/ui/textarea";
import { createItem } from "@/app/lib/actions";

type Category = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    value: "fashions",
    label: "Fashions",
    icon: Shirt,
  },
  {
    value: "electronics",
    label: "Electronics",
    icon: Plug,
  },
  {
    value: "home décor",
    label: "Home décor",
    icon: Home,
  },
  {
    value: "beauty",
    label: "Beauty",
    icon: Flower2,
  },
  {
    value: "sports",
    label: "Sports",
    icon: Dumbbell,
  },
  {
    value: "other",
    label: "Other",
    icon: Box,
  },
];

const sellMethods = [
  {
    id: "swap",
    label: "Swap",
  },
  {
    id: "sell",
    label: "Sell",
  },
  {
    id: "giveaway",
    label: "Giveaway",
  },
];

export function AddItemForm() {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  return (
    <div className="mt-10 mx-96 px-96">
      <form action={createItem} className="ml-auto mr-4 rounded-lg">
        <h1 className="text-2xl font-semibold tracking-tight">Add Item</h1>
        <p>Fill in the detail of your item</p>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="item-picture">Picture</Label>
            <Input id="item-picture" name="item-picture" type="file" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="item-name">Name</Label>
            <Input id="item-name" placeholder="cat toy" name="item-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              placeholder="old toy"
              id="item-description"
              name="item-description"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center space-x-4">
              <Label htmlFor="item-category">Category</Label>
              <Input
                type="hidden"
                name="item-category"
                value={selectedCategory ? selectedCategory.value : ""}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="item-category"
                    variant="outline"
                    size="sm"
                    className="w-[150px] justify-start"
                  >
                    {selectedCategory ? (
                      <>
                        <selectedCategory.icon className="mr-2 h-4 w-4 shrink-0" />
                        {selectedCategory.label}
                      </>
                    ) : (
                      <>+ Set category</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                  <Command>
                    <CommandInput placeholder="Change category..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(value) => {
                              setSelectedCategory(
                                categories.find(
                                  (priority) => priority.value === value
                                ) || null
                              );
                              setOpen(false);
                            }}
                          >
                            <category.icon
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === selectedCategory?.value
                                  ? "opacity-100"
                                  : "opacity-40"
                              )}
                            />
                            <span>{category.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        {/* To be implement in the future */}
        {/* <div className="grid gap-2">
          <Label htmlFor="listing-options">Listing Options</Label>
          {sellMethods.map((sellMethod) => (
            <div key={sellMethod.id} className="flex items-center space-x-2">
              <Checkbox id={sellMethod.id} name="listing_options" />
              <Label
                className="text-sm text-muted-foreground"
                htmlFor={sellMethod.id}
              >
                {sellMethod.label}
              </Label>
            </div>
          ))}
        </div> */}
        <Button type="submit">Add Item</Button>
      </form>
    </div>
  );
}
