import { useContext, useState } from "react";
import { AppContext } from "./context";

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

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "#1e1e3a",
        borderRadius: 16,
        padding: "20px 22px",
        marginBottom: 18,
        border: "1px solid #2a2a4a",
      }}
    >
      <h4
        style={{
          color: "#fff",
          margin: "0 0 16px",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {title}
      </h4>

      {children}
    </div>
  );
}

function CheckoutView() {
  const { state, dispatch } = useContext(AppContext);

  const [address, setAddress] = useState(state.user?.address || "");
  const [payment, setPayment] = useState("cash");

  const [card, setCard] = useState({
    num: "",
    exp: "",
    cvv: "",
  });

  const total =
    state.cart.reduce((s, i) => s + i.qty * i.price, 0) + 5;

  const placeOrder = () => {
    if (!address.trim()) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "يرجى إدخال عنوان التوصيل",
          type: "error",
        },
      });

      return;
    }

    if (
      payment === "card" &&
      (!card.num || !card.exp || !card.cvv)
    ) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "يرجى إدخال بيانات البطاقة",
          type: "error",
        },
      });

      return;
    }

    dispatch({
      type: "PLACE_ORDER",
      payload: {
        total,
        payment,
        address,
      },
    });

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        msg: "🎉 تم تأكيد طلبك بنجاح!",
        type: "success",
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 600,
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
          marginBottom: 28,
        }}
      >
        إتمام الطلب 📦
      </h2>

      <Section title="📍 عنوان التوصيل">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="أدخل عنوانك الكامل"
          style={inputStyle}
        />
      </Section>

      <Section title="💳 طريقة الدفع">
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            ["cash", "الدفع عند الاستلام 💵"],
            ["card", "بطاقة إلكترونية 💳"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPayment(val)}
              style={{
                flex: 1,
                padding: "12px",
                background:
                  payment === val ? "#ff6b35" : "#2a2a4a",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                cursor: "pointer",
                fontWeight: payment === val ? 700 : 400,
                fontSize: 14,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {payment === "card" && (
          <div
            style={{
              display: "grid",
              gap: 10,
            }}
          >
            <input
              placeholder="رقم البطاقة"
              value={card.num}
              onChange={(e) =>
                setCard({
                  ...card,
                  num: e.target.value,
                })
              }
              style={inputStyle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <input
                placeholder="تاريخ الانتهاء MM/YY"
                value={card.exp}
                onChange={(e) =>
                  setCard({
                    ...card,
                    exp: e.target.value,
                  })
                }
                style={inputStyle}
              />

              <input
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) =>
                  setCard({
                    ...card,
                    cvv: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>
        )}
      </Section>

      <Section title="🧾 ملخص الطلب">
        {state.cart.map((i) => (
          <div
            key={i.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#aaa",
              marginBottom: 6,
              fontSize: 14,
            }}
          >
            <span>
              {i.name} × {i.qty}
            </span>

            <span>{i.qty * i.price}₪</span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#aaa",
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          <span>التوصيل</span>
          <span>5₪</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#ff6b35",
            fontWeight: 800,
            fontSize: 18,
            borderTop: "1px solid #2a2a4a",
            paddingTop: 12,
            marginTop: 8,
          }}
        >
          <span>المجموع</span>
          <span>{total}₪</span>
        </div>
      </Section>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          background: "#ff6b35",
          border: "none",
          borderRadius: 14,
          padding: "16px",
          color: "#fff",
          fontWeight: 800,
          cursor: "pointer",
          fontSize: 18,
          marginTop: 8,
        }}
      >
        🎉 تأكيد الطلب
      </button>
    </div>
  );
}

export default CheckoutView;