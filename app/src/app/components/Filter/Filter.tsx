"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Filter.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IsOpen {
  author: boolean;
  date: boolean;
  genre: boolean;
}

const Filter: React.FC = () => {
  const uniqFilters = useSelector((state: RootState) => state.filters);
  const [isShowList, setIsShowList] = useState<IsOpen>({
    author: false,
    date: false,
    genre: false,
  });

  const filterRef = useRef<HTMLDivElement>(null);

  const handleClickFilter = useCallback((selectedKey: keyof IsOpen) => {
    setIsShowList((prev) => ({
      ...prev,
      [selectedKey]: !prev[selectedKey],
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsShowList({ author: false, date: false, genre: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className={styles.centerBlockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.authorFilterBlock}>
        <button
          onClick={() => handleClickFilter("author")}
          className={`${styles.filterButton} ${styles.btnText} ${isShowList.author && styles.activeFilterButton}`}
        >
          исполнителю
        </button>
        {isShowList.author && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.AUTORS.map((author) => (
                <li key={author}>
                  <button className={styles.filterBlockListBtn}>
                    {author}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.dateFilterBlock}>
        <button
          onClick={() => handleClickFilter("date")}
          className={`${styles.filterButton} ${styles.btnText} ${isShowList.date && styles.activeFilterButton}`}
        >
          году выпуска
        </button>
        {isShowList.date && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.DATES.map((date) => (
                <li key={date}>
                  <button className={styles.filterBlockListBtn}>{date}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.genreFilterBlock}>
        <button
          onClick={() => handleClickFilter("genre")}
          className={`${styles.filterButton} ${styles.btnText} ${isShowList.genre && styles.activeFilterButton}`}
        >
          жанру
        </button>
        {isShowList.genre && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.GENRES.map((genre) => (
                <li key={genre}>
                  <button className={styles.filterBlockListBtn}>{genre}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Filter);
