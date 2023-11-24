"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

import { Button } from "@/app/components/ui/button";

import { lorelei } from "@/app/components/avatars";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/app/components/ui/menubar";

import { toast } from "@/app/components/ui/use-toast";

import { signOut } from "@/app/lib/actions";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is required.",
  }),
});
export default function Logout({ data }: { data: any }) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const randomIndex = Math.floor(Math.random() * lorelei.length);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signOut();
    console.log("you logged out");
  }

  return (
    // <MenubarMenu>
    //   <MenubarTrigger className="hidden md:block">
    //     <Avatar>
    //       <AvatarImage src={lorelei[randomIndex]} />
    //       <AvatarFallback>
    //         {data.session?.user.email?.slice(0, 2)}
    //       </AvatarFallback>
    //     </Avatar>
    //   </MenubarTrigger>
    //   <MenubarContent>
    //     <MenubarItem>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit" variant="ghost">
          Logout??? ☹️
        </Button>
      </form>
    </Form>
    //     </MenubarItem>
    //   </MenubarContent>
    // </MenubarMenu>
  );
}
