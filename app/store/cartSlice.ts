import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { CartItem, Product } from '@/app/types';

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        clearCart: (state) => {
            state.items =[];
            state.totalPrice = 0;
        },

        updateQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if(item) {
                const oldQuantity = item.quantity;
                item.quantity = action.payload.quantity;
                state.totalPrice += (action.payload.quantity - oldQuantity) * item.price;
            }
        }
    }
});

export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
