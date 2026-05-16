import { useContext } from "react";
import { AppContext } from "./context";
import { STATUS_LABELS } from "./data";

function OrderCard({ order }) {
  const st = STATUS_LABELS[order.status];

  const steps = [
    "confirmed",
    "preparing",
    "ready",
    "picked_up",
    "delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <div
      style={{
        background: "#1e1e3a",
        borderRadius: 18,
        padding: "22px 24px",
        marginBottom: 18,
        border: "1px solid #2a2a4a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {order.id}
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {order.createdAt}
          </div>
        </div>

        <div
          style={{
            background: `${st.color}22`,
            border: `1px solid ${st.color}44`,
            borderRadius: 10,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{st.icon}</span>

          <span
            style={{
              color: st.color,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {st.label}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 3,
            background: "#2a2a4a",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 3,
            background: "#ff6b35",
            transform: "translateY(-50%)",
            zIndex: 0,
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            transition: "width 0.5s",
          }}
        />

        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: i <= currentStep ? "#ff6b35" : "#2a2a4a",
                border: `2px solid ${
                  i <= currentStep ? "#ff6b35" : "#3a3a5a"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              {i <= currentStep ? "✓" : ""}
            </div>

            <span
              style={{
                fontSize: 10,
                color: i <= currentStep ? "#ff6b35" : "#555",
                whiteSpace: "nowrap",
              }}
            >
              {STATUS_LABELS[s].label}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          color: "#aaa",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {order.items.map((i) => `${i.name} ×${i.qty}`).join("، ")}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#ff6b35",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          المجموع: {order.total}₪
        </span>

        <span
          style={{
            color: "#aaa",
            fontSize: 13,
          }}
        >
          {order.payment === "cash"
            ? "💵 دفع عند الاستلام"
            : "💳 بطاقة"}
        </span>
      </div>

      {order.status === "delivered" && (
        <button
          onClick={() => {}}
          style={{
            marginTop: 12,
            background: "transparent",
            border: "1px solid #fbbf24",
            borderRadius: 10,
            padding: "8px 16px",
            color: "#fbbf24",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ⭐ تقييم الطلب
        </button>
      )}
    </div>
  );
}

function OrdersView() {
  const { state, dispatch } = useContext(AppContext);

  if (state.orders.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 80,
          direction: "rtl",
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          📋
        </div>

        <h3 style={{ color: "#fff" }}>
          لا توجد طلبات سابقة
        </h3>

        <button
          onClick={() =>
            dispatch({
              type: "SET_VIEW",
              payload: "home",
            })
          }
          style={{
            background: "#ff6b35",
            border: "none",
            borderRadius: 12,
            padding: "12px 28px",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 16,
            fontSize: 15,
          }}
        >
          اطلب الآن
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "28px 24px",
        direction: "rtl",
      }}
    >
      <h2
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: 800,
          marginBottom: 24,
        }}
      >
        طلباتي 📋
      </h2>

      {state.orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}

export default OrdersView;
//