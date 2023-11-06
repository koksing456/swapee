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
import { PlusCircledIcon } from "@radix-ui/react-icons";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Textarea } from "@/app/components/ui/textarea";

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
    value: "home decor ",
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

export function AddItemButton() {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  return (
    <div className="ml-auto mr-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Fill in the detail of your item
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="item-name" placeholder="cat toy" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea placeholder="old toy" id="item-description" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center space-x-4">
                <Label htmlFor="item-category">Category</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
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
          <div className="grid gap-2">
            <Label htmlFor="listing-options">Listing Options</Label>
            {sellMethods.map((sellMethod) => (
              <div className="flex items-center space-x-2">
                <Checkbox id={sellMethod.id} />
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor={sellMethod.id}
                >
                  {sellMethod.label}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
