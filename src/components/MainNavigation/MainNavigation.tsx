"use client";

import Image from "next/image";
import styles from "./MainNavigation.module.css";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetFilter } from "@features/filterSlice";

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="logo"
          width={113}
          height={17}
          priority
        />
      </div>
      <div
        className={styles.navBurger}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link
                href="/tracks"
                className={styles.menuLink}
                onClick={() => dispatch(resetFilter())}
              >
                Главное
              </Link>
            </li>
            {isAuth && (
              <li className={styles.menuItem}>
                <Link
                  href="/tracks/favorite"
                  className={styles.menuLink}
                  onClick={() => dispatch(resetFilter())}
                >
                  Мой плейлист
                </Link>
              </li>
            )}
            {!isAuth && (
              <li className={styles.menuItem}>
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
