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
    { id: 7, name: "Smartphone", price: 799.99, category: "Electronics" },
    { id: 8, name: "Desk Lamp", price: 39.99, category: "Home" },
    { id: 9, name: "Backpack", price: 59.99, category: "Clothing" },
    { id: 10, name: "E-Reader", price: 129.99, category: "Electronics" },
    { id: 11, name: "Water Bottle", price: 18.49, category: "Home" },
    { id: 12, name: "Desk Organizer", price: 22.99, category: "Office" },
    { id: 13, name: "Wireless Mouse", price: 49.99, category: "Electronics" },
    { id: 14, name: "Yoga Mat", price: 35.99, category: "Fitness" },
    { id: 15, name: "Sunglasses", price: 89.99, category: "Accessories" },
    { id: 16, name: "Hoodie", price: 45.0, category: "Clothing" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-5 bg-gray-50 hover:shadow-lg transition duration-200 hover:-translate-y-1"
          >
            <div className="mb-3">
              <h3 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
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
