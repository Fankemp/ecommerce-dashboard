"use client";
import { useDispatch, useSelector} from "react-redux";
import { Product } from "../types";
import { addToCart,removeFromCart }  from "../store/cartSlice";
import Image from "next/image";
import { RootState } from "../store/store";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const dispatch = useDispatch();
    const {items} = useSelector((state: RootState) => state.cart)
    const isInCart = items.find(item => item.id === product.id)

    const handleAddToCart = () => {
        if(isInCart)  {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-4">
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
                    className={isInCart ?
                        "bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition active:scale-95":
                        "bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition active:scale-95"
                    }
                >
                    {isInCart ? "В корзине" : "Добавить в корзину"}
                </button>
            </div>
        </div>
    )
}