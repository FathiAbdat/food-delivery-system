import { useContext, useState } from "react";
import { AppContext } from "./context";
import { MOCK_USERS } from "./data";

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

function LoginView() {
  const { dispatch } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });

      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: `مرحبا ${user.name}!`,
          type: "success",
        },
      });
    } else {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "بيانات الدخول غير صحيحة",
          type: "error",
        },
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "60px auto",
        padding: "0 24px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          background: "#1e1e3a",
          borderRadius: 24,
          padding: 36,
          border: "1px solid #2a2a4a",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 50,
              marginBottom: 10,
            }}
          >
            🛵
          </div>

          <h2
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
              margin: 0,
            }}
          >
            تسجيل الدخول
          </h2>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              color: "#aaa",
              fontSize: 13,
              display: "block",
              marginBottom: 6,
            }}
          >
            البريد الإلكتروني
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              color: "#aaa",
              fontSize: 13,
              display: "block",
              marginBottom: 6,
            }}
          >
            كلمة المرور
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••"
            style={inputStyle}
          />
        </div>

        <button
          onClick={login}
          style={{
            width: "100%",
            background: "#ff6b35",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          دخول
        </button>

        <div
          style={{
            marginTop: 16,
            background: "#2a2a4a",
            borderRadius: 10,
            padding: 14,
            fontSize: 12,
            color: "#888",
          }}
        >
          <div
            style={{
              marginBottom: 6,
              color: "#aaa",
              fontWeight: 600,
            }}
          >
            حسابات تجريبية:
          </div>

          {MOCK_USERS.map((u) => (
            <div
              key={u.id}
              style={{
                cursor: "pointer",
                padding: "3px 0",
              }}
              onClick={() => {
                setEmail(u.email);
                setPassword(u.password);
              }}
            >
              •{" "}
              {u.role === "customer"
                ? "عميل"
                : u.role === "admin"
                ? "إداري"
                : u.role === "driver"
                ? "سائق"
                : "مطعم"}
              : {u.email} / {u.password}
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: 16,
            fontSize: 14,
          }}
        >
          ليس لديك حساب؟{" "}
          <span
            onClick={() =>
              dispatch({
                type: "SET_VIEW",
                payload: "register",
              })
            }
            style={{
              color: "#ff6b35",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            سجل الآن
          </span>
        </p>
      </div>
    </div>
  );
}

function RegisterView() {
  const { dispatch } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "customer",
  });

  const [submitted, setSubmitted] = useState(false);

  const register = () => {
    if (!form.name || !form.email || !form.password || !form.phone) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "يرجى تعبئة جميع الحقول المطلوبة",
          type: "error",
        },
      });

      return;
    }

    if (MOCK_USERS.find((u) => u.email === form.email)) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          msg: "البريد الإلكتروني مستخدم مسبقاً",
          type: "error",
        },
      });

      return;
    }

    setSubmitted(true);

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        msg: "تم إنشاء الحساب بنجاح!",
        type: "success",
      },
    });

    setTimeout(() => {
      dispatch({
        type: "SET_VIEW",
        payload: "login",
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 80,
          direction: "rtl",
        }}
      >
        <div style={{ fontSize: 80 }}>
          ✅
        </div>

        <h3 style={{ color: "#fff" }}>
          تم إنشاء الحساب بنجاح!
        </h3>

        <p style={{ color: "#888" }}>
          يتم تحويلك لصفحة الدخول...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: "0 24px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          background: "#1e1e3a",
          borderRadius: 24,
          padding: 36,
          border: "1px solid #2a2a4a",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          إنشاء حساب جديد
        </h2>

        {[
          ["name", "الاسم الكامل *"],
          ["email", "البريد الإلكتروني *"],
          ["phone", "رقم الهاتف *"],
          ["address", "العنوان"],
          ["password", "كلمة المرور *"],
        ].map(([f, l]) => (
          <div
            key={f}
            style={{ marginBottom: 14 }}
          >
            <label
              style={{
                color: "#aaa",
                fontSize: 13,
                display: "block",
                marginBottom: 6,
              }}
            >
              {l}
            </label>

            <input
              value={form[f]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f]: e.target.value,
                })
              }
              type={f === "password" ? "password" : "text"}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              color: "#aaa",
              fontSize: 13,
              display: "block",
              marginBottom: 6,
            }}
          >
            نوع الحساب
          </label>

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              appearance: "none",
            }}
          >
            <option value="customer">
              عميل
            </option>

            <option value="restaurant">
              مطعم
            </option>

            <option value="driver">
              سائق
            </option>
          </select>
        </div>

        <button
          onClick={register}
          style={{
            width: "100%",
            background: "#ff6b35",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          إنشاء الحساب
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: 16,
            fontSize: 14,
          }}
        >
          لديك حساب؟{" "}
          <span
            onClick={() =>
              dispatch({
                type: "SET_VIEW",
                payload: "login",
              })
            }
            style={{
              color: "#ff6b35",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            سجل الدخول
          </span>
        </p>
      </div>
    </div>
  );
}

export { LoginView, RegisterView };