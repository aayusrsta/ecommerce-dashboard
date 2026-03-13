"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

function LoginPrompt() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore(s => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 px-4 py-5">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to KinMel</h2>
            <p className="mt-2 text-sm text-gray-500">
              You need to be logged in to view your cart
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="rounded-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="rounded-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-full bg-[#802C6E] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#551d48] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* <p className="mt-6 text-center text-xs text-gray-400">
              Use test credentials —{" "}
              <button
                onClick={() => { setUsername("johnd"); setPassword("m38rmF$"); }}
                className="font-medium text-[#802C6E] hover:underline"
              >
                fill for me
              </button>
            </p> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const getTotalPrice = useCartStore(s => s.getTotalPrice);
  const clearCart = useCartStore(s => s.clearCart);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isAuthenticated) return <LoginPrompt />;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-4">
          <p className="text-5xl">🛒</p>
          <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-sm text-gray-500">Looks like you haven't added anything yet.</p>
          <Link
            href="/products"
            className="mt-2 rounded-lg bg-[#802C6E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#551d48] transition-colors"
          >
            Start shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="relative h-24 w-24 shrink-0 rounded-lg bg-gray-50">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.product.title}
                    </p>
                    <p className="text-xs capitalize text-gray-400">{item.product.category}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium px-1"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium px-1"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-sm font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-base font-bold text-gray-900">Order Summary</h2>

              <div className="flex flex-col gap-3 border-b border-gray-100 pb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 line-clamp-1 flex-1 mr-2">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <button className="mt-6 w-full rounded-lg bg-[#802C6E] py-3 text-sm font-semibold text-white hover:bg-[#551d48] transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}