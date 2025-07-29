// components/ProductCatalog.js
import React, { useState } from "react";
import { Package } from "lucide-react";
import useEventBus from "../hooks/useEvent";
import { EVENT_TYPES } from "../utils/eventBus";

const ProductCatalog = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
    { id: 2, name: "Coffee Mug", price: 12.99, category: "Home" },
    { id: 3, name: "T-Shirt", price: 24.99, category: "Clothing" },
    { id: 4, name: "Book", price: 15.99, category: "Education" },
    { id: 5, name: "Headphones", price: 199.99, category: "Electronics" },
    { id: 6, name: "Notebook", price: 8.99, category: "Office" },
  ]);

  const addToCart = useEventBus(EVENT_TYPES.CART_ADD);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Package className="mr-2" size={24} />
        Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-green-600">
                ${product.price}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
