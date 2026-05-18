import { useContext, useState } from "react";
import { AppContext } from "./context";

function DriverView() {
  const { state, dispatch } = useContext(AppContext);

  const [isOnline, setIsOnline] = useState(true);

  const pendingOrders = state.orders.filter((o) => o.status === "ready");
  const myOrders = state.orders.filter((o) => o.status === "picked_up");

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "28px 24px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: 800,
            margin: 0,
          }}
        >
          لوحة السائق 🛵
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: isOnline ? "#22c55e" : "#888",
              fontSize: 14,
            }}
          >
            {isOnline ? "● متصل" : "● غير متصل"}
          </span>

          <button
            onClick={() => setIsOnline(!isOnline)}
            style={{
              background: isOnline ? "#22c55e22" : "#2a2a4a",
              border: `1px solid ${isOnline ? "#22c55e" : "#444"}`,
              color: isOnline ? "#22c55e" : "#888",
              borderRadius: 10,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {isOnline ? "إيقاف" : "تشغيل"}
          </button>
        </div>
      </div>

      <h3
        style={{
          color: "#aaa",
          fontSize: 16,
          marginBottom: 14,
        }}
      >
        طلبات جاهزة للاستلام ({pendingOrders.length})
      </h3>

      {pendingOrders.length === 0 ? (
        <div
          style={{
            background: "#1e1e3a",
            borderRadius: 14,
            padding: "30px",
            textAlign: "center",
            color: "#666",
            marginBottom: 24,
          }}
        >
          لا توجد طلبات جاهزة
        </div>
      ) : (
        pendingOrders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#1e1e3a",
              borderRadius: 16,
              padding: "20px",
              marginBottom: 14,
              border: "1px solid #2a2a4a",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {order.id}
              </div>

              <span
                style={{
                  color: "#ff6b35",
                  fontWeight: 700,
                }}
              >
                {order.total}₪
              </span>
            </div>

            <div
              style={{
                color: "#888",
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              من: {order.restaurant?.name}
            </div>

            <div
              style={{
                color: "#888",
                fontSize: 13,
                marginBottom: 14,
              }}
            >
              إلى: {order.address}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <button
                onClick={() => {
                  dispatch({
                    type: "UPDATE_ORDER_STATUS",
                    payload: {
                      id: order.id,
                      status: "picked_up",
                    },
                  });

                  dispatch({
                    type: "SET_NOTIFICATION",
                    payload: {
                      msg: "تم قبول طلب التوصيل",
                      type: "success",
                    },
                  });
                }}
                style={{
                  flex: 1,
                  background: "#22c55e",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                ✓ قبول
              </button>

              <button
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid #ef4444",
                  borderRadius: 10,
                  padding: "10px",
                  color: "#ef4444",
                  cursor: "pointer",
                }}
              >
                ✗ رفض
              </button>
            </div>
          </div>
        ))
      )}

      <h3
        style={{
          color: "#aaa",
          fontSize: 16,
          marginBottom: 14,
        }}
      >
        طلباتي الحالية ({myOrders.length})
      </h3>

      {myOrders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "#1e1e3a",
            borderRadius: 16,
            padding: "20px",
            marginBottom: 14,
            border: "1px solid #2a2a4a",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {order.id}
            </div>

            <span
              style={{
                color: "#f97316",
                fontWeight: 700,
              }}
            >
              🛵 في الطريق
            </span>
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginBottom: 14,
            }}
          >
            📍 {order.address}
          </div>

          <button
            onClick={() => {
              dispatch({
                type: "UPDATE_ORDER_STATUS",
                payload: {
                  id: order.id,
                  status: "delivered",
                },
              });

              dispatch({
                type: "SET_NOTIFICATION",
                payload: {
                  msg: "تم تأكيد التوصيل بنجاح",
                  type: "success",
                },
              });
            }}
            style={{
              width: "100%",
              background: "#22c55e",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            ✅ تم التوصيل
          </button>
        </div>
      ))}
    </div>
  );
}

export default DriverView;