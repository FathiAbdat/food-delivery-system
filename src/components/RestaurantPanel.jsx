import { useContext, useState } from "react";
import { AppContext } from "./context";
import { MENUS } from "./data";

function RestaurantPanel() {
  const { state, dispatch } = useContext(AppContext);

  const [tab, setTab] = useState("orders");

  const restaurantId = state.user?.restaurantId || 1;
  const menu = MENUS[restaurantId] || [];

  const [items, setItems] = useState(menu);
  const [showAdd, setShowAdd] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    desc: "",
    price: "",
    image: "🍽️",
    category: "",
  });

  const myOrders = state.orders.filter(
    (o) => o.restaurant?.id === restaurantId
  );

  const addItem = () => {
    if (!newItem.name || !newItem.price) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "يرجى تعبئة الاسم والسعر",
          type: "error",
        },
      });

      return;
    }

    setItems([
      ...items,
      {
        ...newItem,
        id: Date.now(),
        price: parseFloat(newItem.price),
        available: true,
      },
    ]);

    setNewItem({
      name: "",
      desc: "",
      price: "",
      image: "🍽️",
      category: "",
    });

    setShowAdd(false);

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        msg: "تم إضافة الصنف",
        type: "success",
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 800,
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
        إدارة المطعم 🏪
      </h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
        }}
      >
        {[
          ["orders", "📋 الطلبات الواردة"],
          ["menu", "🍽️ إدارة القائمة"],
        ].map(([id, label]) => (
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

      {tab === "orders" && (
        <div>
          <h3
            style={{
              color: "#aaa",
              fontSize: 16,
              marginBottom: 14,
            }}
          >
            الطلبات الواردة ({myOrders.length})
          </h3>

          {myOrders.length === 0 ? (
            <div
              style={{
                background: "#1e1e3a",
                borderRadius: 14,
                padding: "40px",
                textAlign: "center",
                color: "#666",
                border: "1px solid #2a2a4a",
              }}
            >
              لا توجد طلبات واردة حالياً
            </div>
          ) : (
            myOrders.map((order) => (
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
                    marginBottom: 8,
                  }}
                >
                  {order.items
                    .map((i) => `${i.name} ×${i.qty}`)
                    .join("، ")}
                </div>

                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                    marginBottom: 14,
                  }}
                >
                  العنوان: {order.address}
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
                          status: "preparing",
                        },
                      });

                      dispatch({
                        type: "SET_NOTIFICATION",
                        payload: {
                          msg: "تم قبول الطلب وبدء التحضير",
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
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_ORDER_STATUS",
                        payload: {
                          id: order.id,
                          status: "ready",
                        },
                      });

                      dispatch({
                        type: "SET_NOTIFICATION",
                        payload: {
                          msg: "تم تجهيز الطلب",
                          type: "success",
                        },
                      });
                    }}
                    style={{
                      flex: 1,
                      background: "#8b5cf6",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    📦 جاهز
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "menu" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <h3
              style={{
                color: "#aaa",
                fontSize: 16,
                margin: 0,
              }}
            >
              قائمة الطعام ({items.length})
            </h3>

            <button
              onClick={() => setShowAdd(true)}
              style={{
                background: "#ff6b35",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              + إضافة صنف
            </button>
          </div>

          {showAdd && (
            <div
              style={{
                background: "#1e1e3a",
                borderRadius: 16,
                padding: "20px",
                marginBottom: 18,
                border: "1px solid #2a2a4a",
              }}
            >
              <h4
                style={{
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                إضافة صنف جديد
              </h4>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                }}
              >
                <input
                  placeholder="اسم الصنف"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      name: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  placeholder="الوصف"
                  value={newItem.desc}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      desc: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                  }}
                >
                  <input
                    placeholder="السعر"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />

                  <input
                    placeholder="الإيموجي"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        image: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />

                  <input
                    placeholder="التصنيف"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        category: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={addItem}
                    style={{
                      flex: 1,
                      background: "#22c55e",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 20px",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    حفظ
                  </button>

                  <button
                    onClick={() => setShowAdd(false)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "1px solid #444",
                      borderRadius: 10,
                      padding: "10px 20px",
                      color: "#aaa",
                      cursor: "pointer",
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}

          {items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                background: "#1e1e3a",
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 10,
                border: "1px solid #2a2a4a",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ fontSize: 36 }}>
                {item.image}
              </span>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                  }}
                >
                  {item.desc}
                </div>

                <div
                  style={{
                    color: "#ff6b35",
                    fontWeight: 700,
                  }}
                >
                  {item.price}₪
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <button
                  onClick={() =>
                    setItems(
                      items.map((x, i) =>
                        i === idx
                          ? {
                              ...x,
                              available: !x.available,
                            }
                          : x
                      )
                    )
                  }
                  style={{
                    background: item.available ? "#22c55e22" : "#2a2a4a",
                    border: `1px solid ${
                      item.available ? "#22c55e" : "#444"
                    }`,
                    color: item.available ? "#22c55e" : "#888",
                    borderRadius: 8,
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  {item.available ? "متوفر" : "غير متوفر"}
                </button>

                <button
                  onClick={() =>
                    setItems(items.filter((_, i) => i !== idx))
                  }
                  style={{
                    background: "#ef444422",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  background: "#2a2a4a",
  border: "1px solid #3a3a5a",
  borderRadius: 10,
  padding: "12px 16px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

export default RestaurantPanel;