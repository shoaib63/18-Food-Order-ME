import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
});


function cartReducer(state, actions) {
    if (actions.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex(item => item.id === actions.item.id);
        const updatedItems = [...state.items];

        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...actions.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }
    }

    if (actions.type === 'REMOVE_ITEM') {
        // DOIT

        const existingItemIndex = state.items.findIndex(item => item.id === actions.id);
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            }
            updatedItems[existingItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems }

    }

    if (actions.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
}


export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    }
    return (<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>);
}


export default CartContext; 