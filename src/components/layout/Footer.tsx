"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Footer() {
    const { isAuthenticated } = useAuthStore();
    return (
        <footer className="mt-auto border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div>
                        <p className="text-sm font-bold text-gray-900">KinMel</p>
                        <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                            A modern storefront built for speed and simplicity.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Shop</p>
                        <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">All Products</Link>
                        <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Cart</Link>
                    </div>

                    {!isAuthenticated && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Account</p>
                            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Login</Link>
                        </div>)}

                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <p className="text-xs text-gray-400 text-center">©1999 Aayu Shrestha. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}