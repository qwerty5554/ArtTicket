import { useState } from "react";

type Props = {
  onClose: () => void;
};

export const AuthModal = ({ onClose }: Props) => {

  const [tab, setTab] = useState<"login" | "register">("login");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loginError, setLoginError] = useState("");

  // 🔹 VALIDATE
  const validate = () => {

    const e: any = {};

    if (!form.email.includes("@"))
      e.email = "Некорректный email";

    if (form.password.length < 6)
      e.password = "Минимум 6 символов";

    if (form.password !== form.confirm)
      e.confirm = "Пароли не совпадают";

    if (!form.firstName)
      e.firstName = "Введите имя";

    if (!form.lastName)
      e.lastName = "Введите фамилию";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // 🔹 АВТО ЛОГИН ПОСЛЕ РЕГИСТРАЦИИ
  const handleLoginAfterRegister = async () => {

    try {

      const response = await fetch(
        "http://localhost:8081/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {

        setErrors({
          email: data.error || "Ошибка входа",
        });

        return;
      }

      // 🔹 TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // 🔹 USER
      localStorage.setItem(
  "currentUser",
  JSON.stringify({
    ...data.user,

    firstName: data.user.first_name,

    lastName: data.user.last_name,
  })
);

      localStorage.setItem(
        "isAuth",
        "true"
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      onClose();

      window.location.reload();

    } catch (err) {

      console.log(err);

    }
  };

  // 🔹 REGISTER
  const handleRegister = async () => {

    console.log("REGISTER CLICK");

    if (!validate()) return;

    try {

      const response = await fetch(
        "http://localhost:8081/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      // 🔹 ERROR
      if (!response.ok) {

        setErrors({
          email: data.error || "Ошибка регистрации",
        });

        return;
      }

      // 🔹 АВТО ЛОГИН
      await handleLoginAfterRegister();

    } catch (err) {

      console.log(err);

    }
  };

  // 🔹 LOGIN
  const handleLogin = async () => {

    // ADMIN
    if (
      loginData.email.trim().toLowerCase() ===
      "admin@artticket.ru" &&
      loginData.password === "Password1!"
    ) {

      localStorage.setItem("isAuth", "true");

      localStorage.setItem("role", "admin");

      window.location.href = "/admin";

      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8081/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      // 🔹 ERROR
      if (!response.ok) {

        setLoginError(
          data.error || "Неверный email или пароль"
        );

        return;
      }

      // 🔹 TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // 🔹 USER
      localStorage.setItem(
  "currentUser",
  JSON.stringify({
    ...data.user,

    firstName: data.user.first_name,

    lastName: data.user.last_name,
  })
);

      localStorage.setItem(
        "isAuth",
        "true"
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      onClose();

      window.location.reload();

    } catch (err) {

      console.log(err);

      setLoginError(
        "Ошибка подключения к серверу"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-[#8B2635] w-[420px] rounded-3xl p-6 text-white relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl mb-4">
          {tab === "login" ? "Вход" : "Регистрация"}
        </h2>

        {/* TABS */}
        <div className="flex gap-6 border-b border-white/30 mb-5 text-sm">

          <button
            onClick={() => setTab("login")}
            className={`pb-2 ${
              tab === "login"
                ? "border-b-2 border-white"
                : "opacity-70"
            }`}
          >
            Вход
          </button>

          <button
            onClick={() => setTab("register")}
            className={`pb-2 ${
              tab === "register"
                ? "border-b-2 border-white"
                : "opacity-70"
            }`}
          >
            Регистрация
          </button>

        </div>

        {/* LOGIN */}
        {tab === "login" && (

          <div className="flex flex-col gap-4">

            <div>
              <p className="text-xs mb-1">Email</p>

              <input
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
              />
            </div>

            <div>
              <p className="text-xs mb-1">Пароль</p>

              <input
                type="password"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-200">
                {loginError}
              </p>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="mt-2 bg-[#5A1E27] py-3 rounded-xl hover:bg-[#6E1F2B]"
            >
              Войти
            </button>

          </div>
        )}

        {/* REGISTER */}
        {tab === "register" && (

          <div className="flex flex-col gap-4">

            <div className="flex gap-3">

              <div className="w-full">
                <p className="text-xs mb-1">Имя</p>

                <input
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
                />

                {errors.firstName && (
                  <p className="text-xs text-red-200 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="w-full">
                <p className="text-xs mb-1">Фамилия</p>

                <input
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
                />

                {errors.lastName && (
                  <p className="text-xs text-red-200 mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>

            </div>

            <div>
              <p className="text-xs mb-1">Email</p>

              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
              />

              {errors.email && (
                <p className="text-xs text-red-200 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs mb-1">Пароль</p>

              <input
                type="password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
              />

              {errors.password && (
                <p className="text-xs text-red-200 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs mb-1">
                Подтверждение пароля
              </p>

              <input
                type="password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirm: e.target.value,
                  })
                }
                className="w-full bg-[#E7B6BC] text-black p-2 rounded-md"
              />

              {errors.confirm && (
                <p className="text-xs text-red-200 mt-1">
                  {errors.confirm}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="mt-2 bg-[#5A1E27] py-3 rounded-xl hover:bg-[#6E1F2B]"
            >
              Зарегистрироваться
            </button>

          </div>
        )}

      </div>
    </div>
  );
};