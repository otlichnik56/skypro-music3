"use client";

import Skeleton from "react-loading-skeleton";
import styles from "./PlaylistTitle.module.css";
import cn from "classnames";
import { useAppSelector } from "../../store/store";

export function PlaylistTitle() {
  const { isLoading } = useAppSelector((state) => state.playlist);
  return (
    <div className={styles.contentTitle}>
      <div className={cn(styles.playlistTitleCol, styles.col01)}>
        {isLoading ? <Skeleton width={45} height={15} /> : "Трек"}
      </div>
      <div className={cn(styles.playlistTitleCol, styles.col02)}>
        {isLoading ? <Skeleton width={140} height={15} /> : "Исполнитель"}
      </div>
      <div className={cn(styles.playlistTitleCol, styles.col03)}>
        {isLoading ? <Skeleton width={100} height={15} /> : "Альбом"}
      </div>
      <div className={cn(styles.playlistTitleCol, styles.col04)}>
        {isLoading && <Skeleton circle width={15} height={15} />}
        {!isLoading && (
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        )}
      </div>
    </div>
  );
}
