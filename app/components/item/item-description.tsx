import { Badge } from "@/app/components/ui/badge";

export function ItemDescription({ item }: any) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          {item[0].name}
        </h1>
        <Badge className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          Swapable
        </Badge>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}
      <div className="mb-6 text-sm leading-tight text-muted-foreground">
        <p>{item[0].description}</p>
      </div>
    </>
  );
}
