"use client";

import Image from "next/image";
import styles from "./SignIn.module.css";
import cn from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { getToken, signIn } from "@features/userSlice";
import { useRouter } from "next/navigation";

export function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    
    if (!userData.email || !userData.password) {
      setError("Заполните все поля");
      return;
    }

    if (userData.password.length < 6) {
      setError("Пароль должен быть больше 6 символов");
      return;
    }

    try {
      setError("");
      await dispatch(signIn(userData)).unwrap();
      await dispatch(getToken(userData)).unwrap();
      router.push("/tracks");
    } catch (error: unknown) {
      // Проверка, если ошибка является экземпляром Error
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "object" && error !== null) {
        // Дополнительная проверка для обработки ошибок от сервера
        const serverError = (error as { response?: { data?: { message?: string } } }).response;
        if (serverError?.data?.message) {
          setError(serverError.data.message); // Сообщение об ошибке от сервера
        } else {
          setError("Произошла неизвестная ошибка. Попробуйте снова.");
        }
      } else {
        setError("Произошла ошибка. Попробуйте снова.");
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={login}>
            <div className={styles.modalFormTop}>
              <Link href="/">
                <div className={styles.modalLogo}>
                  <Image
                    className={styles.modalLogoImage}
                    src="/img/logo_modal.png"
                    alt="logo"
                    width={140}
                    height={21}
                  />
                </div>
              </Link>
              <input
                className={cn(styles.modalInput, styles.login)}
                type="email"
                name="email"
                placeholder="Почта"
                value={userData.email}
                onChange={handleChangeInput}
              />
              <div className={styles.passwordBlock}>
                <input
                  className={styles.modalInput}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Пароль"
                  value={userData.password}
                  onChange={handleChangeInput}
                />
                <Image
                  className={styles.eye}
                  src={`/img/eye-${showPassword ? "closed" : "open"}.png`}
                  alt="eye"
                  width={20}
                  height={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className={styles.modalFormBottom}>
              {error && <div className={styles.error}>{error}</div>}
              <button className={styles.modalBtnEnter}>Войти</button>
              <button className={styles.modalBtnSignup}>
                <Link className={styles.modalBtnSignupLink} href="/signup">
                  Зарегистрироваться
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
