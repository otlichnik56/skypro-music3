"use client";

import { Bar } from "@components/Bar/Bar";
import { MainNavigation } from "@components/MainNavigation/MainNavigation";
import { MainSidebar } from "@components/MainSidebar/MainSidebar";
import styles from "./page.module.css";
import { Search } from "@components/Search/Search";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { getAllTracks } from "@features/tracksSlice";

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAllTracks()).unwrap();
      } catch (error: unknown) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNavigation />
          <div className={styles.mainCenterblock}>
            <Search />
            {children}
          </div>
          <MainSidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
