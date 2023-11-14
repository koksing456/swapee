"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/app/lib/data/supabase";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createItem(fromData: FormData) {

  try {
    const picture = await createPicture(event);
    const { data: item } = await supabase.from('item').insert([
      {
        name: 'iphone xr',
        description: 'brand new',
        category_id: 2,
        listing_option: "Swap",
        picture_id: picture.id,
        uploaded_by_user_id: 1,
        created_at: Date.now()
      },
    ])
      .select()
    return item;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Item.",
    };
  }
}

async function createPicture(event: any) {
  try {
    const pictureFromBucket = createPictureToBucket(event);
    const pictureName = event.target.files[0].name;
    const imageUrl =
      `https://frormngxxrmgiiabuktb.supabase.co/storage/v1/object/public/item_pictures/${pictureName}`;
    const { data: picture } = await supabase
      .from('picture')
      .insert([
        { url: imageUrl },
      ])
      .select()

    return picture;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Picture into Bucket.",
    };
  }
}

async function createPictureToBucket(event: any) {
  try {
    const avatarFile = event.target.files[0]
    const { data: picture } = await supabase
      .storage
      .from('item_pictures')
      .upload('folder/avatar1.png', avatarFile, {
        cacheControl: '3600',
        upsert: false
      })

    return picture;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Picture into Bucket.",
    };
  }
}


