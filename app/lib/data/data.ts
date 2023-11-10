import { createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Database } from "./supabase";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchAllCategories() {
  try {
    const { data: categories } = await supabase.from("Category").select("*");
    return categories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
}

export async function fetchAllItems() {
  try {
    const { data: items } = await supabase.from("Item").select("*");
    console.log(items);

    return items;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item data.");
  }
}

export async function storeItem() {}

export async function fetchImageByPath(imageName: string) {
  try {
    const { data } = supabase.storage
      .from("item_pictures")
      .getPublicUrl(imageName);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch image data.");
  }
}
