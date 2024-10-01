"use client";

import { Track } from "@components/Track/Track";
import styles from "./Playlist.module.css";
import { TrackType } from "@models/track";
import { useAppSelector } from "../../store/store";
import Skeleton from "react-loading-skeleton";

type PlaylistProps = {
  tracks: TrackType[];
};

export function Playlist({ tracks }: PlaylistProps) {
  const { isLoading } = useAppSelector((state) => state.playlist);

  return (
    <div className={styles.contentPlaylist}>
      {isLoading && (
        <Skeleton
          count={20}
          width="100%"
          height={51}
          style={{ marginBottom: "12px" }}
        />
      )}
      {tracks.map((track) => (
        <Track track={track} key={track._id} tracks={tracks} />
      ))}
    </div>
  );
}
