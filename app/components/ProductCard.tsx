"use client";
import { useDispatch } from "react-redux";
import { Product } from "../types";
import { addToCart }  from "../store/cartSlice";
import Image from "next/image";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4">
            <div className="relative h-48 w-full mb-4">
                <Image
                 src={product.thumbnail}
                 alt={product.title}
                  fill
                className="object-contain"
                  />
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{product.title}</h3>
                <p className="text-slate-500 text-sm mb-4">Category: {product.category}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-emerald-600">${product.price}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition active:scale-95"
                >
                    В корзину
                </button>
            </div>
        </div>
    )
}