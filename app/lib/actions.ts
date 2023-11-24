"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { v4 as uuidv4 } from "uuid";

import { Database } from "@/app/lib/data/supabase";
import createSupabaseServerClient from "@/app/lib/supabase/supabase";

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

  if (error) {
    console.error("Error creating item to table: ", error);
    return;
  }
}

async function createPicture(picture: any) {
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
}

async function retrieveCategoryIdByName(name: any) {
  const { data, error } = await supabase
    .from("category")
    .select("id")
    .eq("lowercase_name", name.trim());

  if (error) {
    console.error("Error retrieving category id by name:", error);
    return;
  }

  return data[0].id;
}

export async function signUpWithEmail(formData: FormData) {
  const rawFormData = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  const supabase = await createSupabaseServerClient();
  const { email, password } = rawFormData;

  const { data, error } = await supabase.auth.signUp({
    email: email!,
    password: password!,
  });

  if (data) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email!,
      password: password!,
    });

    console.log(" login: ", data);
  }

  revalidatePath("/");
  redirect("/");
}

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}

// export async function signOut() {
//   console.log("sign out");

//   const supabase = await createSupabaseServerClient();

//   const { error } = await supabase.auth.signOut();

//   console.log(error);

//   revalidatePath("/");
//   redirect("/");
// }
