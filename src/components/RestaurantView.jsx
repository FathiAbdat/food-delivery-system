import { useContext, useState } from "react";
import { AppContext } from "./context";
import { MENUS } from "./data";

function RestaurantView() {
  const { state, dispatch } = useContext(AppContext);

  const r = state.selectedRestaurant;
  const menu = MENUS[r?.id] || [];
  const categories = [...new Set(menu.map((i) => i.category))];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const addToCart = (item) => {
    if (!state.user) {
      dispatch({
        type: "SET_VIEW",
        payload: "login",
      });

      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        msg: `تم إضافة ${item.name} للسلة`,
        type: "success",
      },
    });
  };

  const filtered = menu.filter((i) => i.category === activeCategory);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "28px 24px",
        direction: "rtl",
      }}
    >
      <button
        onClick={() =>
          dispatch({
            type: "SET_VIEW",
            payload: "home",
          })
        }
        style={{
          background: "transparent",
          border: "none",
          color: "#ff6b35",
          cursor: "pointer",
          fontSize: 15,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ← رجوع
      </button>

      <div
        style={{
          background: "#1e1e3a",
          borderRadius: 20,
          padding: "28px 32px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 24,
          border: "1px solid #2a2a4a",
        }}
      >
        <span style={{ fontSize: 72 }}>
          {r.image}
        </span>

        <div>
          <h2
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 8px",
            }}
          >
            {r.name}
          </h2>

          <p
            style={{
              color: "#888",
              margin: "0 0 12px",
            }}
          >
            {r.cuisine} · {r.category}
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
            }}
          >
            <span style={{ color: "#fbbf24" }}>
              ⭐ {r.rating}
            </span>

            <span
              style={{
                color: "#aaa",
                fontSize: 14,
              }}
            >
              ⏱ {r.eta} دقيقة
            </span>

            <span
              style={{
                color: "#aaa",
                fontSize: 14,
              }}
            >
              حد أدنى: {r.minOrder}₪
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            style={{
              background:
                activeCategory === c
                  ? "#ff6b35"
                  : "#1e1e3a",

              border: "none",
              borderRadius: 20,
              padding: "8px 18px",

              color:
                activeCategory === c
                  ? "#fff"
                  : "#aaa",

              cursor: "pointer",
              fontSize: 14,

              fontWeight:
                activeCategory === c
                  ? 700
                  : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#1e1e3a",
              borderRadius: 16,
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              border: "1px solid #2a2a4a",
              opacity: item.available ? 1 : 0.5,
            }}
          >
            <span
              style={{
                fontSize: 44,
                flexShrink: 0,
              }}
            >
              {item.image}
            </span>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <h4
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {item.name}
                </h4>

                {!item.available && (
                  <span
                    style={{
                      background: "#374151",
                      color: "#9ca3af",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 11,
                    }}
                  >
                    غير متوفر
                  </span>
                )}
              </div>

              <p
                style={{
                  color: "#888",
                  margin: "0 0 6px",
                  fontSize: 13,
                }}
              >
                {item.desc}
              </p>

              <span
                style={{
                  color: "#ff6b35",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {item.price}₪
              </span>
            </div>

            {item.available && (
              <button
                onClick={() => addToCart(item)}
                style={{
                  background: "#ff6b35",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                + أضف
              </button>
            )}
          </div>
        ))}
      </div>

      {state.cart.length > 0 && (
        <div
          onClick={() =>
            dispatch({
              type: "SET_VIEW",
              payload: "cart",
            })
          }
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ff6b35",
            borderRadius: 14,
            padding: "14px 28px",
            display: "flex",
            gap: 16,
            alignItems: "center",
            boxShadow:
              "0 8px 32px rgba(255,107,53,0.4)",
            cursor: "pointer",
            zIndex: 50,
          }}
        >
          <span
            style={{
              background: "rgba(0,0,0,0.2)",
              borderRadius: "50%",
              padding: "2px 9px",
              fontWeight: 800,
            }}
          >
            {state.cart.reduce((s, i) => s + i.qty, 0)}
          </span>

          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            عرض السلة
          </span>

          <span
            style={{
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {state.cart.reduce(
              (s, i) => s + i.qty * i.price,
              0
            )}
            ₪
          </span>
        </div>
      )}
    </div>
  );
}

export default RestaurantView;