import { createContext } from "react";

export const AppContext = createContext(null);

export const initialState = {
  user: null,
  cart: [],
  orders: [],
  view: "home",
  selectedRestaurant: null,
  orderTracking: null,
  notification: null,
  searchQuery: "",
  filterCategory: "all",
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload };

    case "LOGIN":
      return { ...state, user: action.payload, view: "home" };

    case "LOGOUT":
      return { ...state, user: null, cart: [], view: "home" };

    case "SELECT_RESTAURANT":
      return { ...state, selectedRestaurant: action.payload, view: "restaurant" };

    case "ADD_TO_CART": {
      const exists = state.cart.find((i) => i.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    case "UPDATE_CART_QTY": {
      const updated = state.cart
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, qty: action.payload.qty }
            : i
        )
        .filter((i) => i.qty > 0);

      return { ...state, cart: updated };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "PLACE_ORDER": {
      const order = {
        id: `ORD-${Date.now()}`,
        items: [...state.cart],
        total: action.payload.total,
        payment: action.payload.payment,
        address: action.payload.address,
        restaurant: state.selectedRestaurant,
        status: "confirmed",
        statusHistory: [
          {
            status: "confirmed",
            time: new Date().toLocaleTimeString("ar"),
          },
        ],
        createdAt: new Date().toLocaleString("ar"),
        driverName: "أحمد السواق",
      };

      return {
        ...state,
        orders: [order, ...state.orders],
        cart: [],
        view: "orders",
        orderTracking: order.id,
      };
    }

    case "UPDATE_ORDER_STATUS": {
      const updated = state.orders.map((o) =>
        o.id === action.payload.id
          ? {
              ...o,
              status: action.payload.status,
              statusHistory: [
                ...o.statusHistory,
                {
                  status: action.payload.status,
                  time: new Date().toLocaleTimeString("ar"),
                },
              ],
            }
          : o
      );

      return { ...state, orders: updated };
    }

    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };

    case "CLEAR_NOTIFICATION":
      return { ...state, notification: null };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "SET_FILTER":
      return { ...state, filterCategory: action.payload };
//
    default:
      return state;
  }
}