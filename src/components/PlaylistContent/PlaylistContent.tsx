import { PlaylistTitle } from "@components/PlaylistTitle/PlaylistTitle";
import styles from "./PlaylistContent.module.css";
import { Playlist } from "@components/Playlist/Playlist";
import { TrackType } from "@models/track";

type PlaylistContentProps = {
  tracks: TrackType[];
};

export function PlaylistContent({ tracks }: PlaylistContentProps) {
  return (
    <div className={styles.centerblockContent}>
      <PlaylistTitle />
      <Playlist tracks={tracks} />
    </div>
  );
}
