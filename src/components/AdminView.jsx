import { useContext, useState } from "react";
import { AppContext } from "./context";
import {
  RESTAURANTS,
  MOCK_USERS,
  STATUS_LABELS,
} from "./data";

function AdminView() {
  const { state, dispatch } = useContext(AppContext);

  const [tab, setTab] = useState("overview");

  const [pendingRestaurants, setPending] = useState([
    {
      id: 99,
      name: "مطعم الأصالة",
      status: "pending",
      owner: "خالد محمود",
    },
    {
      id: 98,
      name: "كافيه النجوم",
      status: "pending",
      owner: "سارة أحمد",
    },
  ]);

  const tabs = [
    ["overview", "📊 نظرة عامة"],
    ["orders", "📋 الطلبات"],
    ["users", "👥 المستخدمون"],
    ["restaurants", "🏪 المطاعم"],
    ["reports", "📈 التقارير"],
  ];

  const totalRevenue = state.orders.reduce(
    (s, o) => s + o.total,
    0
  );

  return (
    <div
      style={{
        maxWidth: 1000,
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
        لوحة الإدارة 🔧
      </h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background: tab === id ? "#ff6b35" : "#1e1e3a",
              border: "none",
              borderRadius: 10,
              padding: "10px 18px",
              color: tab === id ? "#fff" : "#aaa",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: tab === id ? 700 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {[
            ["💰", "إجمالي الإيرادات", `${totalRevenue}₪`, "#ff6b35"],
            ["📦", "إجمالي الطلبات", state.orders.length, "#3b82f6"],
            [
              "🏪",
              "المطاعم النشطة",
              RESTAURANTS.filter((r) => r.isOpen).length,
              "#22c55e",
            ],
            ["👥", "المستخدمون", MOCK_USERS.length, "#8b5cf6"],
          ].map(([icon, label, val, color]) => (
            <div
              key={label}
              style={{
                background: "#1e1e3a",
                borderRadius: 16,
                padding: "22px 20px",
                border: "1px solid #2a2a4a",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 8,
                }}
              >
                {icon}
              </div>

              <div
                style={{
                  color: "#888",
                  fontSize: 13,
                  marginBottom: 6,
                }}
              >
                {label}
              </div>

              <div
                style={{
                  color,
                  fontWeight: 800,
                  fontSize: 24,
                }}
              >
                {val}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div>
          <h3
            style={{
              color: "#fff",
              marginBottom: 16,
            }}
          >
            جميع الطلبات
          </h3>

          {state.orders.length === 0 ? (
            <p style={{ color: "#888" }}>
              لا توجد طلبات بعد
            </p>
          ) : (
            state.orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "#1e1e3a",
                  borderRadius: 14,
                  padding: "16px 20px",
                  marginBottom: 12,
                  border: "1px solid #2a2a4a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {order.id}
                  </div>

                  <div
                    style={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    {order.restaurant?.name} · {order.createdAt}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#ff6b35",
                      fontWeight: 700,
                    }}
                  >
                    {order.total}₪
                  </span>

                  <span
                    style={{
                      background: `${STATUS_LABELS[order.status]?.color}22`,
                      color: STATUS_LABELS[order.status]?.color,
                      borderRadius: 8,
                      padding: "4px 10px",
                      fontSize: 13,
                    }}
                  >
                    {STATUS_LABELS[order.status]?.label}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_ORDER_STATUS",
                        payload: {
                          id: order.id,
                          status: e.target.value,
                        },
                      })
                    }
                    style={{
                      background: "#2a2a4a",
                      border: "none",
                      color: "#fff",
                      borderRadius: 8,
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "users" && (
        <div>
          <h3
            style={{
              color: "#fff",
              marginBottom: 16,
            }}
          >
            إدارة المستخدمين
          </h3>

          {MOCK_USERS.map((u) => (
            <div
              key={u.id}
              style={{
                background: "#1e1e3a",
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 10,
                border: "1px solid #2a2a4a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {u.name}
                </div>

                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                  }}
                >
                  {u.email} · {u.phone}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: "#2a2a4a",
                    borderRadius: 8,
                    padding: "4px 10px",
                    color: "#aaa",
                    fontSize: 12,
                  }}
                >
                  {u.role === "customer"
                    ? "عميل"
                    : u.role === "admin"
                    ? "إداري"
                    : u.role === "driver"
                    ? "سائق"
                    : "مطعم"}
                </span>

                <button
                  style={{
                    background: "#ef444422",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: 8,
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  تعليق
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "restaurants" && (
        <div>
          <h3
            style={{
              color: "#fff",
              marginBottom: 16,
            }}
          >
            طلبات انضمام جديدة
          </h3>

          {pendingRestaurants.map((r) => (
            <div
              key={r.id}
              style={{
                background: "#1e1e3a",
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 10,
                border: "1px solid #2a2a4a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {r.name}
                </div>

                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                  }}
                >
                  صاحب: {r.owner}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <button
                  onClick={() => {
                    setPending(
                      pendingRestaurants.filter((x) => x.id !== r.id)
                    );

                    dispatch({
                      type: "SET_NOTIFICATION",
                      payload: {
                        msg: `تم قبول ${r.name}`,
                        type: "success",
                      },
                    });
                  }}
                  style={{
                    background: "#22c55e22",
                    border: "1px solid #22c55e",
                    color: "#22c55e",
                    borderRadius: 8,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  ✓ قبول
                </button>

                <button
                  onClick={() =>
                    setPending(
                      pendingRestaurants.filter((x) => x.id !== r.id)
                    )
                  }
                  style={{
                    background: "#ef444422",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: 8,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  ✗ رفض
                </button>
              </div>
            </div>
          ))}

          <h3
            style={{
              color: "#fff",
              marginBottom: 16,
              marginTop: 24,
            }}
          >
            المطاعم النشطة
          </h3>

          {RESTAURANTS.map((r) => (
            <div
              key={r.id}
              style={{
                background: "#1e1e3a",
                borderRadius: 14,
                padding: "14px 20px",
                marginBottom: 10,
                border: "1px solid #2a2a4a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 28 }}>
                  {r.image}
                </span>

                <div>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {r.name}
                  </div>

                  <div
                    style={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    {r.cuisine}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: r.isOpen ? "#22c55e" : "#ef4444",
                    fontSize: 13,
                  }}
                >
                  {r.isOpen ? "● نشط" : "● مغلق"}
                </span>

                <button
                  style={{
                    background: "#ef444422",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: 8,
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  تعليق
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "#1e1e3a",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #2a2a4a",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                📊 ملخص الإيرادات
              </h4>

              {state.orders.length === 0 ? (
                <p
                  style={{
                    color: "#888",
                    fontSize: 14,
                  }}
                >
                  لا توجد طلبات بعد
                </p>
              ) : (
                state.orders.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#aaa",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span>{o.id}</span>

                    <span style={{ color: "#ff6b35" }}>
                      {o.total}₪
                    </span>
                  </div>
                ))
              )}

              <div
                style={{
                  borderTop: "1px solid #2a2a4a",
                  paddingTop: 12,
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                <span>الإجمالي</span>

                <span style={{ color: "#ff6b35" }}>
                  {totalRevenue}₪
                </span>
              </div>
            </div>

            <div
              style={{
                background: "#1e1e3a",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #2a2a4a",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                🏪 إحصائيات المطاعم
              </h4>

              {RESTAURANTS.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#aaa",
                      fontSize: 13,
                    }}
                  >
                    {r.image} {r.name}
                  </span>

                  <span
                    style={{
                      color: "#fbbf24",
                      fontSize: 12,
                    }}
                  >
                    ⭐ {r.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;