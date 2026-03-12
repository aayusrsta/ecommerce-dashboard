"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore(s => s.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          KinMel
        </Link>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-[#802C6E] ${
                pathname.startsWith("/products") ? "text-[#802C6E]" : "text-gray-600"
              }`}
            >
              Products
            </Link>

            {mounted && (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-[#802C6E]"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className={`text-sm font-medium transition-colors hover:text-[#802C6E] ${
                      pathname === "/login" ? "text-[#802C6E]" : "text-gray-600"
                    }`}
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </nav>

          <Link href="/cart" className="relative text-gray-700 transition-colors hover:text-[#802C6E]">
            <CartIcon />
            {mounted && isAuthenticated && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#802C6E] text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}