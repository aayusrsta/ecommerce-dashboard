"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";
import type { ProductFilters, SortOrder } from "@/types";

interface Props {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

export default function ProductFilters({ filters, onChange }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const update = (patch: Partial<ProductFilters>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Search
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={e => update({ search: e.target.value })}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Category
        </label>
        <select
          value={filters.category}
          onChange={e => update({ category: e.target.value })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Sort
        </label>
        <select
          value={filters.sort}
          onChange={e => update({ sort: e.target.value as SortOrder })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={e => update({ minPrice: Number(e.target.value) })}
            placeholder="Min"
            min={0}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={e => update({ maxPrice: Number(e.target.value) })}
            placeholder="Max"
            min={0}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={() =>
          onChange({ category: "", minPrice: 0, maxPrice: 9999, search: "", sort: "asc" })
        }
        className="rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50"
      >
        Reset Filters
      </button>
    </div>
  );
}