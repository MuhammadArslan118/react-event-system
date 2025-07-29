// components/ShoppingCart.js
import React, { useState, useEffect } from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import { EVENT_TYPES, eventBus } from "../utils/eventBus";
import useEventBus from "../hooks/useEvent";

const ShoppingCartComponent = () => {
  console.log("App component rendered");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const emitNotification = useEventBus(EVENT_TYPES.NOTIFICATION_SHOW);
  const emitOrder = useEventBus(EVENT_TYPES.ORDER_PLACED);

  // Listen for add to cart events
  useEventBus(EVENT_TYPES.CART_ADD, (product) => {
    console.log(product, "product");

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    emitNotification({
      type: "success",
      message: `${product.name} added to cart!`,
    });
  });

  // Listen for remove from cart events
  useEventBus(EVENT_TYPES.CART_REMOVE, (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    emitNotification({
      type: "info",
      message: "Item removed from cart",
    });
  });

  // Calculate total whenever items change
  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const handleCheckout = () => {
    if (items.length === 0) {
      emitNotification({
        type: "warning",
        message: "Your cart is empty!",
      });
      return;
    }

    const order = {
      id: Date.now(),
      items: [...items],
      total,
      timestamp: new Date().toISOString(),
    };

    emitOrder(order);
    setItems([]);

    emitNotification({
      type: "success",
      message: "Order placed successfully!",
    });
  };

  const handleRemoveItem = (itemId) => {
    eventBus.emit(EVENT_TYPES.CART_REMOVE, itemId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingCart className="mr-2" size={24} />
          Shopping Cart
        </h2>
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {items.length}
        </span>
      </div>

      <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>
              {item.name} x{item.quantity}
            </span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <CreditCard className="mr-2" size={16} />
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
