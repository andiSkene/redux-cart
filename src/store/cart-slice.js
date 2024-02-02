import { createSlice } from "@reduxjs/toolkit";

//slice -------------------------------------------------
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        changed: false
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.itemID === newItem.id);
            state.totalQuantity++;
            state.totalAmount = state.totalAmount + newItem.price;
            state.changed = true;

            if (!existingItem) {
                state.items.push({
                    itemID: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.itemID === id);
            state.totalQuantity--;
            state.totalAmount = state.totalAmount - existingItem.price;
            state.changed = true;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.itemID !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
            state.changed = false;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;