import React from "react";
import NotificationSystem from "./components/NotificationSystem";
import UserProfile from "./components/UserProfile";
import ProductCatalog from "./components/ProductCatalog";
import ShoppingCartComponent from "./components/ShoppingCart";
import OrderHistory from "./components/OrderHistory";
import EventMonitor from "./components/EventMonitor";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 container max-width px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Event-Driven React Architecture Demo
          </h1>
          <p className="text-gray-600">
            Components communicate through custom events without direct coupling
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <UserProfile />
            <ProductCatalog />
          </div>

          <div className="space-y-6">
            <ShoppingCartComponent />
            <OrderHistory />
          </div>
        </div>

        <footer className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Architecture Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Event Flow</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Add products to cart (cart:add)</li>
                <li>• Remove items (cart:remove)</li>
                <li>• Checkout triggers (order:placed)</li>
                <li>• Orders award points (user:points:add)</li>
                <li>• All actions show notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Benefits</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Decoupled components</li>
                <li>• Easy to test and maintain</li>
                <li>• Scalable event system</li>
                <li>• Real-time updates</li>
                <li>• Clear separation of concerns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">
                File Structure
              </h3>
              <ul className="space-y-1 text-gray-600 font-mono text-xs">
                <li>• eventBus.js</li>
                <li>• hooks/useEventBus.js</li>
                <li>• components/UserProfile.js</li>
                <li>• components/ShoppingCart.js</li>
                <li>• components/ProductCatalog.js</li>
                <li>• components/OrderHistory.js</li>
                <li>• components/NotificationSystem.js</li>
                <li>• components/EventMonitor.js</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      {/* Global components */}
      <NotificationSystem />
      <EventMonitor />
    </div>
  );
}

export default App;
