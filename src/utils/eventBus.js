// eventBus.js
class EventBus {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);

        // Return unsubscribe function
        return () => {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        };
    }

    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }

    clear() {
        this.events = {};
    }
}

// Global event bus instance
export const eventBus = new EventBus();

// Event types constants
export const EVENT_TYPES = {
    CART_ADD: 'cart:add',
    CART_REMOVE: 'cart:remove',
    ORDER_PLACED: 'order:placed',
    USER_POINTS_ADD: 'user:points:add',
    USER_PROFILE_UPDATE: 'user:profile:update',
    NOTIFICATION_SHOW: 'notification:show'
};

export default EventBus;