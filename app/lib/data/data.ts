import { createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Database } from "./supabase";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchAllCategories() {
  const { data: categories, error } = await supabase
    .from("category")
    .select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    return;
  }
  console.log("categories is fetch: ", categories);
  return categories;
}

export async function fetchAllItems() {
  const { data: items, error } = await supabase.from("item").select("*");
  if (error) {
    console.error("Error fetching items:", error);
    return;
  }
  console.log("items is fetch: ", items);
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
  console.log("items is fetch: ", items);
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
  console.log("url is fetch: ", picture);
  return picture[0].url;
}
