import { TrackType } from "@models/track";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDislike, setLike } from "@features/tracksSlice";
import { addLikeTrack, removeLikeTrack } from "@api/tracksApi";

export function useLikeTrack(track: TrackType) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  const user = useAppSelector((state) => state.user.user);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const isLiked = !!likedTracks.find((t) => t._id === track._id);

  async function handleLike(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();

    if (!tokens || !user) {
      alert("Нет авторизации");
      return;
    }

    const fetchAction = isLiked ? removeLikeTrack : addLikeTrack;
    const storeAction = isLiked ? setDislike : setLike;

    try {
      await fetchAction(tokens.access, track._id);
      dispatch(storeAction(track));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isLiked,
    handleLike,
  };
}
