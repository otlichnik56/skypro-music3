"use client";

import { SideBarPersonal } from "@components/SideBarPersonal/SideBarPersonal";
import styles from "./MainSidebar.module.css";
import { SidebarItem } from "@components/SidebarItem/SidebarItem";
import { useAppSelector } from "../../store/store";
import Skeleton from "react-loading-skeleton";

export function MainSidebar() {
  const { isLoading } = useAppSelector((state) => state.playlist);

  return (
    <div className={styles.sidebar}>
      <SideBarPersonal />
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {isLoading && (
            <Skeleton
              count={3}
              width={250}
              height={150}
              style={{ marginBottom: "30px" }}
            />
          )}
          {!isLoading && (
            <>
              {[1, 2, 3].map((item) => (
                <SidebarItem key={item} id={item.toString()} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
