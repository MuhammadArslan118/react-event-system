// components/EventMonitor.js
import React, { useState, useEffect } from "react";
import { eventBus, EVENT_TYPES } from "../utils/eventBus";

const EventMonitor = () => {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const eventTypes = Object.values(EVENT_TYPES);

    const unsubscribers = eventTypes.map((eventType) =>
      eventBus.subscribe(eventType, (data) => {
        setEvents((prev) => [
          {
            type: eventType,
            data,
            timestamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9),
          },
          ...prev.slice(0, 9), // Keep only last 10 events
        ]);
      })
    );

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatEventData = (data) => {
    if (typeof data === "object") {
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  };

  const getEventColor = (eventType) => {
    switch (eventType) {
      case EVENT_TYPES.CART_ADD:
        return "text-green-400";
      case EVENT_TYPES.CART_REMOVE:
        return "text-red-400";
      case EVENT_TYPES.ORDER_PLACED:
        return "text-blue-400";
      case EVENT_TYPES.USER_POINTS_ADD:
        return "text-yellow-400";
      case EVENT_TYPES.NOTIFICATION_SHOW:
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Open Event Monitor"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md w-80 z-40">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Event Monitor</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-gray-600 px-2 py-1 rounded">
            {events.length} events
          </span>
          <button
            onClick={() => setEvents([])}
            className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-600"
            title="Clear events"
          >
            Clear
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-600 h-8"
            title="Close monitor"
          >
            ×
          </button>
        </div>
      </div>

      <div className="text-xs space-y-2 max-h-60 overflow-y-auto pr-2">
        {events.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            No events yet. Start interacting with the app!
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="border-b border-gray-600 pb-2">
              <div className="flex justify-between items-start mb-1">
                <span className={`font-mono ${getEventColor(event.type)}`}>
                  {event.type}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatTimestamp(event.timestamp)}
                </span>
              </div>
              <div className="text-gray-300 font-mono text-xs bg-gray-700 p-2 rounded overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words">
                  {formatEventData(event.data)}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventMonitor;
