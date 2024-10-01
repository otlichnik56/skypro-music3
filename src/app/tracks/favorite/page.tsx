"use client";

import { MainCenterblock } from "@components/MainCenterblock/MainCenterblock";
import { useAppSelector } from "../../../store/store";
import { useFilteredTracks } from "../../../hooks/useFilteredTracks";
import { useRouter } from "next/navigation";

export default function FavoritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);
  const { user } = useAppSelector((state) => state.user);
  const filteredTracks = useFilteredTracks(favoriteTracks);

  const router = useRouter();

  if (!user) {
    router.push("/signin");
  }

  return <MainCenterblock tracks={filteredTracks} title={"Мои треки"} />;
}
