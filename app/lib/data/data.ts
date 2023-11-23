"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./supabase";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const cookieStore = cookies();

const supabase = createServerClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  }
);

export async function fetchAllCategories() {
  const { data: categories, error } = await supabase
    .from("category")
    .select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    return;
  }
  return categories;
}

export async function fetchAllItems() {
  const { data: items, error } = await supabase.from("item").select("*");
  if (error) {
    console.error("Error fetching items:", error);
    return;
  }
  return items;
}

export async function fetchItemDetails(id: number) {
  const { data: items, error } = await supabase
    .from("item")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error("Error fetching items:", error);
    return;
  }
  return items;
}

export async function fetchPictureByPictureId(pictureId: number) {
  const { data: picture, error } = await supabase
    .from("picture")
    .select("url")
    .eq("id", pictureId);
  if (error) {
    console.error("Error fetching picture:", error);
    return;
  }
  return picture[0].url;
}
