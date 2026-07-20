'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SelectedAttribute } from '../types/cart';
import { Product } from '../types/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedAttributes: SelectedAttribute[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jewel_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => {
          setCartItems(parsedCart);
        }, 0);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Sync cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('jewel_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedAttributes: SelectedAttribute[]
  ) => {
    setCartItems((prevItems) => {
      // Create a unique key for the item based on ID and selected options
      const attributesString = selectedAttributes
        .map((attr) => `${attr.name}:${attr.value}`)
        .sort()
        .join('|');
      const itemId = `${product.id}-${attributesString}`;

      const existingItemIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        // Item with same options already exists, increase quantity
        const newItems = [...prevItems];
        const currentQty = newItems[existingItemIndex].quantity;
        const targetQty = currentQty + quantity;
        
        if (targetQty > product.stock) {
          alert(`Only ${product.stock} units of "${product.title}" are available in stock. Your cart quantity has been set to the maximum available.`);
          newItems[existingItemIndex].quantity = product.stock;
        } else {
          newItems[existingItemIndex].quantity = targetQty;
        }
        return newItems;
      } else {
        // Add new item, check stock
        let addedQty = quantity;
        if (quantity > product.stock) {
          alert(`Only ${product.stock} units of "${product.title}" are available in stock. We have added the maximum available quantity to your cart.`);
          addedQty = product.stock;
        }
        if (addedQty <= 0) {
          alert(`"${product.title}" is currently out of stock.`);
          return prevItems;
        }
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            quantity: addedQty,
            selectedAttributes,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          if (quantity > item.product.stock) {
            alert(`Only ${item.product.stock} units of "${item.product.title}" are available in stock.`);
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
