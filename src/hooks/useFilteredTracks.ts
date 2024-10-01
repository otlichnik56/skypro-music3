import { TrackType } from "@models/track";
import { useMemo } from "react";
import { useAppSelector } from "../store/store";

export function useFilteredTracks(tracks: TrackType[]) {
  const { search, authors, genres, dateOrder } = useAppSelector(
    (state) => state.filters
  );

  const filteredTracks = useMemo(() => {
    let result = tracks;

    if (search) {
      result = result.filter((track) =>
        track.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (authors.length > 0) {
      result = result.filter((track) => authors.includes(track.author));
    }

    if (genres.length > 0) {
      result = result.filter((track) =>
        track.genre.some((genre) => genres.includes(genre))
      );
    }

    if (dateOrder === "Сначала новые") {
      result = result
        .slice()
        .sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
    } else if (dateOrder === "Сначала старые") {
      result = result
        .slice()
        .sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
    }

    return result;
  }, [tracks, search, authors, genres, dateOrder]);

  return filteredTracks;
}
