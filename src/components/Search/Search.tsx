"use client";

import styles from "./Search.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearch } from "@features/filterSlice";

export function Search() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.filters);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(event.target.value));
  }

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}
