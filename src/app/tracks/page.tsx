"use client";

import styles from "./page.module.css";
import { MainCenterblock } from "@components/MainCenterblock/MainCenterblock";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useFilteredTracks } from "../../hooks/useFilteredTracks";

export default function Home() {
  const { allTracks, error } = useAppSelector((state) => state.playlist);
  const filteredTracks = useFilteredTracks(allTracks);

  return (
    <>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <MainCenterblock tracks={filteredTracks} title={"Все треки"} />
      )}
    </>
  );
}
