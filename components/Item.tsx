import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import NextImage from "@/public/vercel.svg"

const products = [
    { name: "Seismographic Vases", price: "399$", isNew: false, imageUrl: {NextImage} },
    { name: "Cast Lights", price: "99$", isNew: false, imageUrl: {NextImage} },
    { name: "Mako Bottle", price: "29$", imageUrl: {NextImage} },
    { name: "Other Product", price: "XX$", imageUrl: {NextImage} },
    // ... Add other products as needed
  ];

export default function Item() {
    return(
        <div className="py-20 px-52">
            <div className="grid grid-cols-3 gap-28">
                {products.map((product, index) => (
                    <div key={index} className="border p-4 relative align-middle">
                        <Image src={NextImage} alt={product.name} className="w-full h-40 object-cover mb-2" />
                        {product.isNew && (
                            <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded">New</span>
                        )}
                        <div className="flex flex-col justify-center h-20"> {/* This is the new div for centering */}
                            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                            <p className="text-gray-500">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}