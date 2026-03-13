import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Product } from "@/types";
export default async function HomePage() {
  const { data: products } = await getProducts();
  const featured = products?.slice(0, 3) ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-[#802C6E]">
                New arrivals every week
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Everything you need, all in one place
              </h1>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                Browse our curated collection of products across all categories. Fast shipping, easy returns.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-[#802C6E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#551d48]"
                >
                  Shop now
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-purple-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Browse categories
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
            <Link
              href="/products"
              className="text-sm font-medium text-[#802C6E] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}