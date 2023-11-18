"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/app/lib/data/supabase";
import { v4 as uuidv4 } from "uuid";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ItemSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  name: z.string(),
  description: z.string(),
  category_id: z.enum(["1", "2", "3", "4", "5", "6"], {
    invalid_type_error: "Please select a category.",
  }),
  // listing_option: z.enum(["Swap", "Sell", "Giveaway"], {
  //   invalid_type_error: "Please select a listing option.",
  // }),
});

const CreateItem = ItemSchema.omit({ id: true, created_at: true });

export async function createItem(formData: FormData) {
  const rawFormData = {
    picture: formData.get("item-picture"),
    name: formData.get("item-name"),
    description: formData.get("item-description"),
    category: formData.get("item-category"),
    // listing_option: formData.get("listing_options")
  };

  const { picture, name, description, category } = rawFormData;

  console.log(rawFormData);

  const createdPicture = await createPicture(picture);
  const cagegoryId = await retrieveCategoryIdByName(category);

  if (createdPicture !== undefined) {
    await storeItem(
      createdPicture,
      name,
      description,
      cagegoryId
      // listing_option
    );
  }

  revalidatePath("/");
  redirect("/");
}

async function storeItem(
  createdPicture: any,
  name: any,
  description: any,
  cagegoryId: any
  // listing_option: any
) {
  console.log("----------------");

  console.log(createdPicture);
  const { data, error } = await supabase
    .from("item")
    .insert([
      {
        picture_id: createdPicture[0].id,
        name: name,
        description: description,
        category_id: cagegoryId,
        // listing_option: listing_option,
        uploaded_by_user_id: 1,
      },
    ])
    .select();

  console.log("inserting...");

  if (error) {
    console.error("Error creating item to table: ", error);
    return;
  }

  console.log("item is created: ", data);
}

async function createPicture(picture: any) {
  console.log("picture123: ", picture);

  if (picture.size !== 0) {
    const sanitizePictureName = `${picture.name}-${uuidv4()}`;
    createPictureToBucket(picture, sanitizePictureName);
    const imageUrl = `https://frormngxxrmgiiabuktb.supabase.co/storage/v1/object/public/item_pictures/${sanitizePictureName}`;
    const { data, error } = await supabase
      .from("picture")
      .insert([{ url: imageUrl }])
      .select();

    if (error) {
      console.error("Error creating picture to table: ", error);
      return;
    }

    console.log("picture is created: ", data);
    return data;
  }
}

async function createPictureToBucket(
  picture: any,
  sanitizePictureName: string
) {
  const { data, error } = await supabase.storage
    .from("item_pictures")
    .upload(sanitizePictureName, picture, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error creating picture to bucket:", error);
    return;
  }

  console.log("picture is created to bucket: ", data);
}

async function retrieveCategoryIdByName(name: any) {
  console.log("catgeory name: ", name.trim());

  const { data, error } = await supabase
    .from("category")
    .select("id")
    .eq("lowercase_name", name.trim());

  if (error) {
    console.error("Error retrieving category id by name:", error);
    return;
  }

  console.log("category: ", data);
  return data[0].id;
}
