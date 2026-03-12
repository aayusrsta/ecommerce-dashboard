import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import ProductsClient from "./ProductsClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingGrid from "@/components/ui/LoadingGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full collection of products",
};

interface Props {
  searchParams: Promise<{ sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { sort: sortParam } = await searchParams;
  const sort = sortParam === "desc" ? "desc" : "asc";
  const { data: products, error } = await getProducts(sort);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              {products?.length ?? 0} products found
            </p>
          </div>
          <Suspense fallback={<LoadingGrid />}>
            <ProductsClient initialProducts={products ?? []} error={error} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}