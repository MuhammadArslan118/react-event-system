# Event-Driven React Architecture

A comprehensive example of implementing event-driven architecture in React applications using custom event handling without external APIs.

## 📁 Project Structure

```
src/
├── App.js                          # Main application component
├── eventBus.js                     # Event bus system and constants
├── hooks/
│   └── useEventBus.js             # Custom hook for event handling
└── components/
    ├── NotificationSystem.js       # Global notification system
    ├── UserProfile.js             # User profile and points display
    ├── ProductCatalog.js          # Product listing and add to cart
    ├── ShoppingCart.js            # Shopping cart management
    ├── OrderHistory.js            # Order tracking and history
    └── EventMonitor.js            # Development tool for event debugging
```

## 🏗️ Architecture Overview

### Event Bus System (`eventBus.js`)

- **Purpose**: Central event management system
- **Features**:
  - Subscribe/unsubscribe to events
  - Emit events with data
  - Automatic cleanup
  - Event type constants for consistency

### Custom Hook (`hooks/useEventBus.js`)

- **Purpose**: Simplify event handling in React components
- **Features**:
  - Automatic subscription management
  - Built-in cleanup on component unmount
  - Easy event emission
  - Dependency tracking

## 🔄 Event Flow

### Core Events

| Event Type          | Trigger        | Listeners          | Data Passed         |
| ------------------- | -------------- | ------------------ | ------------------- |
| `cart:add`          | ProductCatalog | ShoppingCart       | Product object      |
| `cart:remove`       | ShoppingCart   | ShoppingCart       | Product ID          |
| `order:placed`      | ShoppingCart   | OrderHistory       | Order object        |
| `user:points:add`   | OrderHistory   | UserProfile        | Points number       |
| `notification:show` | Any component  | NotificationSystem | Notification object |

### Event Flow Example

1. User clicks "Add to Cart" in `ProductCatalog`
2. `cart:add` event is emitted with product data
3. `ShoppingCart` receives event and updates its state
4. `NotificationSystem` shows success message
5. User proceeds to checkout
6. `order:placed` event is emitted
7. `OrderHistory` receives order and calculates points
8. `user:points:add` event is emitted
9. `UserProfile` updates points display

## 🧩 Component Details

### NotificationSystem

- **File**: `components/NotificationSystem.js`
- **Purpose**: Display toast notifications
- **Events**:
