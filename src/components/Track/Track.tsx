"use client";

import { TrackType } from "@models/track";
import styles from "./Track.module.css";
import { formatTime } from "@utils/formatTime";
import { setCurrentTrack } from "@features/tracksSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import cn from "classnames";
import { useLikeTrack } from "../../hooks/useLikeTrack";
import { useState } from "react";

type TrackProps = {
  track: TrackType;
  tracks: TrackType[];
};

export function Track({ track, tracks }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.playlist);
  const { isLiked, handleLike } = useLikeTrack(track);

  const { name, author, album, duration_in_seconds } = track;
  const conditionCurrentTrack = currentTrack?._id === track._id;

  const [animateLike, setAnimateLike] = useState(false);

  const handleSelectTrack = () => {
    dispatch(setCurrentTrack({ currentTrack: track, playlist: tracks }));
  };

  const handleLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnimateLike(true);
    handleLike(event);

    setTimeout(() => {
      setAnimateLike(false);
    }, 300);
  };

  return (
    <div className={styles.playlistItem} onClick={handleSelectTrack}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          {conditionCurrentTrack && (
            <div
              className={cn(styles.blinkedMark, { [styles.active]: isPlaying })}
            ></div>
          )}
          <div>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackItem}>
          <div
            className={cn(styles.trackTime, {
              [styles.liked]: isLiked && animateLike,
              [styles.disliked]: !isLiked && animateLike,
            })}
            onClick={handleLikeClick}
          >
            <svg className={styles.trackTimeSvg}>
              <use
                xlinkHref={`/img/icon/sprite.svg#icon-${
                  isLiked ? "like" : "dislike"
                }`}
              ></use>
            </svg>
          </div>
          <span className={styles.trackTimeText}>
            {formatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
