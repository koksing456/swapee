import Image from "next/image";
import { fetchItemDetails, fetchPictureByPictureId } from "@/app/lib/data/data";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { GridTileImage } from "@/app/components/grid/tile";
// import Footer from "components/layout/footer";
import { Gallery } from "@/app/components/item/gallery";
import { ItemDescription } from "@/app/components/item/item-description";
// import { HIDDEN_PRODUCT_TAG } from "lib/constants";
// import { getProduct, getProductRecommendations } from "lib/shopify";
import Link from "next/link";

export const runtime = "edge";

// export async function generateMetadata({
//   params,
// }: {
//   params: { handle: string };
// }): Promise<Metadata> {
//   const product = await getProduct(params.handle);

//   if (!product) return notFound();

//   const { url, width, height, altText: alt } = product.featuredImage || {};
//   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

//   return {
//     title: product.seo.title || product.title,
//     description: product.seo.description || product.description,
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable,
//       },
//     },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               width,
//               height,
//               alt,
//             },
//           ],
//         }
//       : null,
//   };
// }

// async function RelatedProducts({ id }: { id: string }) {
//   const relatedProducts = await getProductRecommendations(id);

//   if (!relatedProducts.length) return null;

//   return (
//     <div className="py-8">
//       <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
//       <ul className="flex w-full gap-4 overflow-x-auto pt-1">
//         {relatedProducts.map((product) => (
//           <li
//             key={product.handle}
//             className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
//           >
//             <Link
//               className="relative h-full w-full"
//               href={`/product/${product.handle}`}
//             >
//               <GridTileImage
//                 alt={product.title}
//                 label={{
//                   title: product.title,
//                   amount: product.priceRange.maxVariantPrice.amount,
//                   currencyCode: product.priceRange.maxVariantPrice.currencyCode,
//                 }}
//                 src={product.featuredImage?.url}
//                 fill
//                 sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default async function Page({ params }: { params: { id: number } }) {
  const item = await fetchItemDetails(params.id);
  const pictureUrl = await fetchPictureByPictureId(item![0].picture_id);
  const pictureUrlArr = [pictureUrl];

  if (!item) return notFound();

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={pictureUrlArr?.map((image) => ({
                src: image!,
                altText: image!,
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ItemDescription item={item} />
          </div>
        </div>
        {/* <Suspense>
          <RelatedProducts id={item.id} />
        </Suspense> */}
      </div>
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  );

  // return (
  //   <div className="flex">
  //     <Image
  //       src={pictureUrl}
  //       alt={item.name}
  //       width={250}
  //       height={330}
  //       className={
  //         "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
  //       }
  //     />
  //     <div className="right">
  //       {item[0].name}
  //       {item[0].description}
  //       {item[0].uploaded_by_user_id}
  //     </div>
  //   </div>
  // );
}
