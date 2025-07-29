// components/OrderHistory.js
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import useEventBus from "../hooks/useEvent";
import { EVENT_TYPES } from "../utils/eventBus";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const emitUserPoints = useEventBus(EVENT_TYPES.USER_POINTS_ADD);

  // Listen for new orders
  useEventBus(EVENT_TYPES.ORDER_PLACED, (order) => {
    setOrders((prev) => [order, ...prev]);

    // Award points based on order total (1 point per $10 spent)
    const points = Math.floor(order.total / 10);
    if (points > 0) {
      setTimeout(() => emitUserPoints(points), 1000);
    }
  });

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <CheckCircle className="mr-2" size={24} />
        Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Add some products to your cart and checkout to see your orders here!
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold">Order #{order.id}</span>
                <span className="text-green-600 font-bold">
                  {formatCurrency(order.total)}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {formatDate(order.timestamp)}
              </div>

              <div className="text-sm space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-blue-600 mt-2">
                Points earned: {Math.floor(order.total / 10)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
