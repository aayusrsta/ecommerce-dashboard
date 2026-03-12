"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, ProductFilters } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import ProductFiltersComponent from "@/components/ui/ProductFilters";
import Pagination from "@/components/ui/Pagination";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface Props {
  initialProducts: Product[];
  error: string | null;
}

const ITEMS_PER_PAGE = 6;

export default function ProductsClient({ initialProducts, error }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  const filters: ProductFilters = {
    category: searchParams.get("category") ?? "",
    search: searchParams.get("search") ?? "",
    sort: (searchParams.get("sort") as "asc" | "desc") ?? "asc",
    minPrice: Number(searchParams.get("minPrice") ?? 0),
    maxPrice: Number(searchParams.get("maxPrice") ?? 9999),
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  const handleFilterChange = (newFilters: ProductFilters) => {
    const params = new URLSearchParams();

    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.sort) params.set("sort", newFilters.sort);
    if (newFilters.minPrice > 0) params.set("minPrice", String(newFilters.minPrice));
    if (newFilters.maxPrice < 9999) params.set("maxPrice", String(newFilters.maxPrice));

    router.push(`/products?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    let result = [...initialProducts];

    if (filters.search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    result = result.filter(
      p => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    result.sort((a, b) =>
      filters.sort === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [initialProducts, filters.search, filters.category, filters.minPrice, filters.maxPrice, filters.sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full lg:w-64 lg:shrink-0">
        <ProductFiltersComponent filters={filters} onChange={handleFilterChange} />
      </aside>

      <div className="flex-1">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-20 text-center">
            <p className="text-sm font-semibold text-gray-700">No products found</p>
            <p className="text-xs text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}