import Image from "next/image";
import { fetchItemDetails, fetchPictureByPictureId } from "@/app/lib/data/data";

export default async function Page({ params }: { params: { id: number } }) {
  const item = await fetchItemDetails(params.id);
  const pictureUrl = await fetchPictureByPictureId(item![0].picture_id);

  return (
    <div>
      <Image
        src={pictureUrl}
        alt={item.name}
        width={250}
        height={330}
        className={
          "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
        }
      />
      {item[0].name}
      {item[0].description}
      {item[0].uploaded_by_user_id}
    </div>
  );
}
