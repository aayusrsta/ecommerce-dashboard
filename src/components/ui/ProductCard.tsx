"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [added, setAdded] = useState(false);

  const addItem = useCartStore(s => s.addItem);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-300"
    >
      <div className="relative h-60 w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 gap-2">
        <span className="self-start rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <span className="text-yellow-400">★</span>
          <span>{product.rating.rate} ({product.rating.count})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="rounded-full bg-[#802C6E] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#551d48] transition-colors duration-300"
          >
            {added ? "Added to cart!" : "Add to cart"}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </Link>
  );
}