import { getProduct, getProducts } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ProductDetail from "./ProductDetail";
import type { Metadata } from "next";
import { Product } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { data: products } = await getProducts();
  if (!products) return [];
  return products.map((p: Product) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await getProduct(Number(id));
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description.slice(0, 150),
  };
}

function ProductJsonLd({ product }: { product: { id: number; title: string; description: string; image: string; price: number; rating: { rate: number; count: number } } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://kinmel.vercel.app/products/${product.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const { data: product, error } = await getProduct(Number(id));

  return (
    <div className="flex min-h-screen flex-col">
      {product && <ProductJsonLd product={product} />}
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {error || !product ? (
            <ErrorMessage message={error ?? "Product not found"} />
          ) : (
            <ProductDetail product={product} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}