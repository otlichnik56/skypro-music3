import cn from "classnames";
import styles from "./FilterItem.module.css";
import { memo } from "react";

type FilterItemProps = {
  filterName: string;
  isActive: boolean;
  list: string[];
  selectedValues: string[];
  selectedCount: number;
  handleChangeFilter: (filterName: string) => void;
  handleSelectValue: (value: string) => void;
};

export const FilterItem = memo(function FilterItem({
  filterName,
  isActive,
  list,
  selectedValues,
  selectedCount,
  handleChangeFilter,
  handleSelectValue,
}: FilterItemProps) {
  return (
    <div className={styles.filter}>
      <div
        onClick={() => handleChangeFilter(filterName)}
        className={cn(styles.filterButton, styles.btnText, {
          [styles.active]: isActive,
        })}
      >
        {filterName}
        {selectedCount > 0 && (
          <span className={styles.selectedCount}>{selectedCount}</span>
        )}
      </div>
      {isActive && (
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {list.map((listName, index) => (
              <li
                className={cn(styles.listItem, {
                  [styles.selected]: selectedValues.includes(listName),
                })}
                key={index}
                onClick={() => handleSelectValue(listName)}
              >
                {listName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
