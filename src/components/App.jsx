import { useReducer } from "react";

import Navbar from "./Navbar";
import Notification from "./Notification";
import HomeView from "./HomeView";
import RestaurantView from "./RestaurantView";
import CartView from "./CartView";
import CheckoutView from "./CheckoutView";
import OrdersView from "./OrdersView";
import AdminView from "./AdminView";
import DriverView from "./DriverView";
import RestaurantPanel from "./RestaurantPanel";

import { LoginView, RegisterView } from "./AuthViews";

import {
  AppContext,
  initialState,
  reducer,
} from "./context";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f1a",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <Navbar />
        <Notification />

        {state.view === "home" && <HomeView />}
        {state.view === "restaurant" && <RestaurantView />}
        {state.view === "cart" && <CartView />}
        {state.view === "checkout" && <CheckoutView />}
        {state.view === "orders" && <OrdersView />}
        {state.view === "login" && <LoginView />}
        {state.view === "register" && <RegisterView />}
        {state.view === "admin" && <AdminView />}
        {state.view === "driver" && <DriverView />}
        {state.view === "restaurant-panel" && <RestaurantPanel />}
      </div>
    </AppContext.Provider>
  );
}

export default App;