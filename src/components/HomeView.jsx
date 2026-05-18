import { useContext } from "react";
import { AppContext } from "./context";
import { RESTAURANTS } from "./data";

function RestaurantCard({ restaurant: r }) {
  const { dispatch } = useContext(AppContext);

  return (
    <div
      onClick={() =>
        r.isOpen &&
        dispatch({
          type: "SELECT_RESTAURANT",
          payload: r,
        })
      }
      style={{
        background: "#1e1e3a",
        borderRadius: 18,
        padding: 20,
        cursor: r.isOpen ? "pointer" : "default",
        opacity: r.isOpen ? 1 : 0.6,
        border: "1px solid #2a2a4a",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (r.isOpen) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 12px 32px rgba(255,107,53,0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {!r.isOpen && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#ef4444",
            color: "#fff",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          مغلق
        </div>
      )}

      <div
        style={{
          fontSize: 60,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        {r.image}
      </div>

      <h3
        style={{
          color: "#fff",
          margin: "0 0 6px",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {r.name}
      </h3>

      <p
        style={{
          color: "#888",
          margin: "0 0 12px",
          fontSize: 14,
        }}
      >
        {r.cuisine} · {r.category}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#fbbf24",
            fontWeight: 600,
          }}
        >
          ⭐ {r.rating}
        </span>

        <span
          style={{
            color: "#aaa",
            fontSize: 13,
          }}
        >
          ⏱ {r.eta} دقيقة
        </span>

        <span
          style={{
            color: "#aaa",
            fontSize: 13,
          }}
        >
          حد أدنى: {r.minOrder}₪
        </span>
      </div>
    </div>
  );
}

function HomeView() {
  const { state, dispatch } = useContext(AppContext);

  const categories = [
    "all",
    "برجر",
    "بيتزا",
    "شرقي",
    "سوشي",
    "باستا",
    "مكسيكي",
  ];

  const filtered = RESTAURANTS.filter((r) => {
    const matchSearch =
      r.name.includes(state.searchQuery) ||
      r.category.includes(state.searchQuery);

    const matchCat =
      state.filterCategory === "all" ||
      r.category === state.filterCategory;

    return matchSearch && matchCat;
  });

  return (
    <div
      style={{
        padding: "32px 24px",
        maxWidth: 1100,
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: 24,
          padding: "40px 48px",
          marginBottom: 40,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            fontSize: 140,
            opacity: 0.08,
          }}
        >
          🛵
        </div>

        <h1
          style={{
            color: "#fff",
            fontSize: 36,
            fontWeight: 900,
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          وجبتك المفضلة
          <br />
          <span style={{ color: "#ff6b35" }}>
            على بابك
          </span>
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: 16,
            margin: "0 0 28px",
          }}
        >
          تصفح أفضل المطاعم واطلب وجبتك الآن
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          <input
            value={state.searchQuery}
            onChange={(e) =>
              dispatch({
                type: "SET_SEARCH",
                payload: e.target.value,
              })
            }
            placeholder="ابحث عن مطعم أو طعام..."
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: "12px 20px",
              color: "#fff",
              fontSize: 15,
              width: 320,
              outline: "none",
            }}
          />

          <button
            style={{
              background: "#ff6b35",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            🔍 بحث
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                payload: c,
              })
            }
            style={{
              background:
                state.filterCategory === c
                  ? "#ff6b35"
                  : "#1e1e3a",

              border: "none",
              borderRadius: 20,
              padding: "8px 18px",

              color:
                state.filterCategory === c
                  ? "#fff"
                  : "#aaa",

              cursor: "pointer",
              fontSize: 14,

              fontWeight:
                state.filterCategory === c
                  ? 700
                  : 400,

              transition: "all 0.2s",
            }}
          >
            {c === "all" ? "الكل" : c}
          </button>
        ))}
      </div>

      <h2
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        المطاعم المتاحة
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#666",
            padding: 60,
            fontSize: 18,
          }}
        >
          لا توجد نتائج 😕
        </div>
      )}
    </div>
  );
}

export default HomeView;