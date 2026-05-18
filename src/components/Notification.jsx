import { useContext, useEffect } from "react";
import { AppContext } from "./context";

function Notification() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.notification) {
      const t = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);

      return () => clearTimeout(t);
    }
  }, [state.notification]);

  if (!state.notification) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background:
          state.notification.type === "error"
            ? "#ef4444"
            : "#22c55e",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: 14,
        fontFamily: "inherit",
        fontWeight: 600,
        fontSize: 15,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {state.notification.type === "error" ? "❌" : "✅"}
      {state.notification.msg}
    </div>
  );
}

export default Notification;