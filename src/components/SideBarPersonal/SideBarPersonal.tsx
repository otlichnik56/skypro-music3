"use client";

import { logout } from "@features/userSlice";
import { useInitLikedTracks } from "../../hooks/useInitLikedTracks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./SideBarPersonal.module.css";

export function SideBarPersonal() {
  useInitLikedTracks();
  const isAuth = useAppSelector((state) => state.user.user);
  const username = useAppSelector((state) => state.user.user?.username);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logout());
  };

  if (!isAuth) return <></>;

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{username}</p>
      <div className={styles.sidebarIcon} onClick={signOut}>
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#logout"></use>
        </svg>
      </div>
    </div>
  );
}
