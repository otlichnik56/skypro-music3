"use client";

import { useCallback, useMemo, useState } from "react";
import styles from "./Filter.module.css";
import { FilterItem } from "@components/FilterItem/FilterItem";
import { getUniqueValues } from "@utils/getUniqueValues";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAuthor, setDateOrder, setGenre } from "@features/filterSlice";

import Skeleton from "react-loading-skeleton";

const filterNames: { title: string; value: string }[] = [
  { title: "исполнителю", value: "author" },
  { title: "году выпуска", value: "order" },
  { title: "жанру", value: "genre" },
];

export function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const tracks = useAppSelector((state) => state.playlist.allTracks);
  const { isLoading } = useAppSelector((state) => state.playlist);
  const { authors, genres } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handleChangeFilter = useCallback((filterName: string) => {
    setActiveFilter((prevState) =>
      prevState === filterName ? null : filterName
    );
  }, []);

  const handleSelectValue = useCallback(
    (value: string) => {
      if (activeFilter === "исполнителю") {
        dispatch(setAuthor(value));
      }

      if (activeFilter === "жанру") {
        dispatch(setGenre(value));
      }

      if (activeFilter === "году выпуска") {
        dispatch(setDateOrder(value));
      }
    },
    [activeFilter, dispatch]
  );

  const uniqueValues = useMemo(() => {
    if (activeFilter === "исполнителю") {
      return getUniqueValues(tracks, "author");
    }

    if (activeFilter === "жанру") {
      return getUniqueValues(tracks, "genre");
    }

    if (activeFilter === "году выпуска") {
      return ["По умолчанию", "Сначала новые", "Сначала старые"];
    }

    return [];
  }, [activeFilter, tracks]);

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>
        {isLoading ? <Skeleton width={86} height={24} /> : "Искать по:"}
      </div>
      {isLoading && (
        <Skeleton
          width={156}
          height={38}
          count={3}
          containerClassName={styles.skeletonContainer}
          style={{ borderRadius: "60px" }}
        />
      )}
      {!isLoading && (
        <>
          {filterNames.map((filter, index) => {
            const selectedCount =
              filter.value === "author"
                ? authors.length
                : filter.value === "genre"
                ? genres.length
                : 0;

            return (
              <FilterItem
                filterName={filter.title}
                key={index}
                isActive={activeFilter === filter.title}
                handleChangeFilter={handleChangeFilter}
                list={uniqueValues}
                handleSelectValue={handleSelectValue}
                selectedValues={
                  filter.value === "author"
                    ? authors
                    : filter.value === "genre"
                    ? genres
                    : []
                }
                selectedCount={selectedCount}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
