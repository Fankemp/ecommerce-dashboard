"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart ,updateQuantity} from "../store/cartSlice";

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
        return <div>Корзина пуста</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>
            <table>
                <tbody className="text-gray-800">
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td>
                            <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                            {item.quantity}
                            <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                        </td>

                        <td>${item.price * item.quantity}</td>

                        <td>
                            <button onClick={() => handleRemove(item.id)}>Удалить</button>
                        </td>

                        
                    </tr>
                ))}
                </tbody>
            </table>
                <div>Сумма: ${totalPrice}</div>
            </div>
        </main>
    )

    
}

