import { useContext } from "react";
import { AppContext } from "./context";

function NavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        color: "#ddd",
        cursor: "pointer",
        fontSize: 14,
        padding: "6px 10px",
        borderRadius: 8,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#ff6b35")}
      onMouseLeave={(e) => (e.target.style.color = "#ddd")}
    >
      {children}
    </button>
  );
}

function Navbar() {
  const { state, dispatch } = useContext(AppContext);

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);

  return (
    <nav
      style={{
        background: "#1a1a2e",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        direction: "rtl",
      }}
    >
      <div
        onClick={() =>
          dispatch({
            type: "SET_VIEW",
            payload: "home",
          })
        }
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 28 }}>🛵</span>

        <span
          style={{
            color: "#ff6b35",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: -0.5,
          }}
        >
          وصّلي
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {state.user ? (
          <>
            <span
              style={{
                color: "#aaa",
                fontSize: 13,
              }}
            >
              مرحبا، {state.user.name.split(" ")[0]}
            </span>

            {state.user.role === "customer" && (
              <>
                <NavBtn
                  onClick={() =>
                    dispatch({
                      type: "SET_VIEW",
                      payload: "orders",
                    })
                  }
                >
                  طلباتي
                </NavBtn>

                <NavBtn
                  onClick={() =>
                    dispatch({
                      type: "SET_VIEW",
                      payload: "cart",
                    })
                  }
                >
                  🛒 السلة{" "}
                  {cartCount > 0 && (
                    <span
                      style={{
                        background: "#ff6b35",
                        borderRadius: "50%",
                        padding: "1px 6px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </NavBtn>
              </>
            )}

            {state.user.role === "admin" && (
              <NavBtn
                onClick={() =>
                  dispatch({
                    type: "SET_VIEW",
                    payload: "admin",
                  })
                }
              >
                لوحة الإدارة
              </NavBtn>
            )}

            {state.user.role === "driver" && (
              <NavBtn
                onClick={() =>
                  dispatch({
                    type: "SET_VIEW",
                    payload: "driver",
                  })
                }
              >
                لوحة السائق
              </NavBtn>
            )}

            {state.user.role === "restaurant" && (
              <NavBtn
                onClick={() =>
                  dispatch({
                    type: "SET_VIEW",
                    payload: "restaurant-panel",
                  })
                }
              >
                إدارة المطعم
              </NavBtn>
            )}

            <button
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
              style={{
                background: "transparent",
                border: "1px solid #444",
                color: "#aaa",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              خروج
            </button>
          </>
        ) : (
          <>
            <NavBtn
              onClick={() =>
                dispatch({
                  type: "SET_VIEW",
                  payload: "login",
                })
              }
            >
              دخول
            </NavBtn>

            <button
              onClick={() =>
                dispatch({
                  type: "SET_VIEW",
                  payload: "register",
                })
              }
              style={{
                background: "#ff6b35",
                border: "none",
                color: "#fff",
                borderRadius: 8,
                padding: "8px 18px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              تسجيل
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;