import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import { AddItemButton } from "@/app/components/add-item-button";
import { ItemList } from "@/app/components/item-list";
import { CategoryList } from "@/app/components/category-list";
import { PodcastEmptyPlaceholder } from "@/app/components/podcast-empty-placeholder";
import { Sidebar } from "@/app/components/sidebar";
import { fetchAllCategories, fetchAllItems } from "@/app/lib/data/data";
import { playlists } from "@/app/lib/data/playlist";

export const metadata: Metadata = {
  title: "yiwuhuanwu ｜ 以物换物",
  description: "Barter anything with yiwuhuanyu",
};

export default async function Page() {
  const categories = await fetchAllCategories();
  const items = await fetchAllItems();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          Public
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Favorites</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Mine
                        </TabsTrigger>
                      </TabsList>
                      <AddItemButton />
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Trending Item
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Nice item for you.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {items?.map((item) => (
                              <Link key={item.id} href={`/items/${item.id}`}>
                                <ItemList
                                  item={item}
                                  className="w-[250px]"
                                  aspectRatio="portrait"
                                  width={250}
                                  height={330}
                                />
                              </Link>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Category
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Visit the items by category.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {categories?.map((category) => (
                              <Link
                                key={category.id}
                                href={`/categories/${category.name}`}
                              >
                                <CategoryList
                                  category={category}
                                  className="w-[150px]"
                                  aspectRatio="square"
                                  width={150}
                                  height={150}
                                />
                              </Link>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorites podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
