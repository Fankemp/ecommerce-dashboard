"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart ,updateQuantity} from "../store/cartSlice";
import Img from "next/image";
import Link from "next/link";


export default function CartPage() {
    const {items, totalPrice} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch()

    const handleIncrement = (id: number, quantity: number) => {
        if(quantity < 1) return;
        dispatch(updateQuantity({id, quantity: quantity + 1}));
    }

    const handleDecrement = (id: number, quantity: number) => {
        if(quantity <= 1) return;
        dispatch(updateQuantity({id, quantity: quantity - 1}));
    }

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    }

    if(items.length === 0) {
        return (
            <main className="h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">          
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Ваша корзина пуста</h1>
                    <Link href="/" className="inline-block bg-emerald-600 text-white rounded-lg px-6 py-3 mt-4 border hover:bg-emerald-700">
                         Перейти в каталог
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>
                

                <table className="bg-white rounded-lg shadow-sm w-full hover:bg-slate-50 transition">
                    <thead className="border-b bg-slate-50">
                        <tr className="text-gray-800">
                            <th className="p-4 text-left font-semibold">Товар</th>
                            <th className="p-4 text-center font-semibold">Цена</th>
                            <th className="p-4 text-center font-semibold">Количество</th>
                            <th className="p-4 text-center font-semibold">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="flex items-center gap-4 p-4">
                                    <div className="w-24 h-24 relative">
                                        <Img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="object-contain"
                                            fill
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-800">{item.title}</p>
                                        <small className="text-gray-800">{item.category}</small>
                                    </div>
                                </td>
                                <td className="text-center p-4">
                                    <p className="text-md text-slate-500">{item.price.toFixed(2)}$</p>
                                    <p className="font-bold text-lg text-emerald-500">{(item.price * item.quantity).toFixed(2)}$</p>

                                </td>
                                <td className="text-gray-800 p-4 text-center">
                                    <div className="flex items-center gap-4 justify-center">
                                        <button className="w-8 h-8 flex items-center justify-center font-bold border rounded-md py-1 px-3 hover:bg-slate-100 transition" onClick={() => handleDecrement(item.id, item.quantity)}>
                                            -
                                        </button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button className="w-8 h-8 flex items-center justify-center font-bold border rounded-md py-1 px-3 hover:bg-slate-100 transition" onClick={() => handleIncrement(item.id, item.quantity)}>
                                            +
                                        </button>
                                    </div>
                                </td >
                                <td className="p-4 text-center">
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemove(item.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-800 font-bold">Общая стоимость:</p>
                        <p className="text-3xl font-bold text-emerald-600">{totalPrice.toFixed(2)}$</p>
                    </div>
                    <button className=" w-full font-bold bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </main>
    )

    
}

