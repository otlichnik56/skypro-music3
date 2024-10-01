"use client";

import { MainCenterblock } from "@components/MainCenterblock/MainCenterblock";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFilteredTracks } from "../../../../hooks/useFilteredTracks";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getSelectionTracks } from "@features/tracksSlice";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectionTracks, selectionName } = useAppSelector(
    (state) => state.playlist
  );

  const filteredTracks = useFilteredTracks(selectionTracks);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getSelectionTracks(id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch, id]);

  return <MainCenterblock tracks={filteredTracks} title={selectionName} />;
}
