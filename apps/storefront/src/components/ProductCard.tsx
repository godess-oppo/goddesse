import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg">
      <Link href={`/shop/${product.id}`}>
        <div className="bg-gray-200 h-48 border-dashed border-2 flex items-center justify-center text-gray-500 text-sm">
          {product.name}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/shop/${product.id}`} className="font-semibold block hover:text-blue-600">{product.name}</Link>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  );
}
