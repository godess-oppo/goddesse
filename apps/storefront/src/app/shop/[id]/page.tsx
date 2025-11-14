import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl h-96" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return mockProducts.map(p => ({ id: p.id }));
}
