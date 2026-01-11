"use client";
import { useSelector}  from "react-redux";
import { RootState } from "../store/store";
import Link from "next/link";

export default function Header() {
    const {items} = useSelector((state: RootState) => state.cart)

    return (
        <header className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/" className="text-2xl font-bold hover:text-slate-300 transition">
                            E-comerence
                        </Link>

                        <nav className="flex items-center gap-6">
                            <Link href="/" className="text-white hover:text-slate-300 transition font-medium">
                                Товары
                            </Link>

                            <Link
                             href="/cart"
                             className="relative
                              flex items-center gap-2
                               bg-emerald-600
                                px-4 py-2
                                rounded-lg
                                hover:bg-emerald-700
                                transition
                                font-medium"
                             >
                                🛒 Корзина
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        {items.length}
                                    </span>
                                )}

                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
