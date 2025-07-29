// hooks/useEventBus.js
import { useEffect, useCallback } from "react";
import { eventBus } from "../utils/eventBus";

/**
 * Custom hook for event handling
 * @param {string} eventName - Name of the event to listen to
 * @param {function} handler - Handler function for the event
 * @param {array} deps - Dependencies array for useEffect
 * @returns {function} emit - Function to emit events
 */
export const useEventBus = (eventName, handler, deps = []) => {
  useEffect(() => {
    if (handler) {
      const unsubscribe = eventBus.subscribe(eventName, handler);
      return unsubscribe;
    }
  }, deps);

  const emit = useCallback(
    (data) => {
      eventBus.emit(eventName, data);
    },
    [eventName]
  );

  return emit;
};

export default useEventBus;
