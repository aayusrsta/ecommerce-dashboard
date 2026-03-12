"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="relative flex h-96 items-center justify-center rounded-xl border border-gray-200 bg-white p-8 lg:h-[500px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-500">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-gray-700">
              {product.rating.rate}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {product.rating.count} reviews
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          {product.description}
        </p>

        <div className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors ${
            added
              ? "bg-green-500 hover:bg-green-600"
              : "bg-[#802C6E] hover:bg-[#551d48]"
          }`}
        >
          {added ? "Added to cart!" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}