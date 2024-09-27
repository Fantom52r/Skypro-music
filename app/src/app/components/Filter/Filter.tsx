"use client";
import React, { useState } from "react";
import styles from "./Filter.module.css";

const SHOWN_FILTER = {
  author: false,
  date: false,
  genre: false,
};
interface IsOpen {
  author: boolean;
  date: boolean;
  genre: boolean;
}

const Filter = ({ uniqFilters }) => {
  const [isShowList, setIsShowList] = useState(SHOWN_FILTER);
const [filterBy,setFilterBy]= useState ([])

  const handleClickFilter = (selectedKey) => {
    const newObj: IsOpen = {
      author: false,
      date: false,
      genre: false,
    };
    for (const key in isShowList) {
      if (selectedKey === key) {
        newObj[key] = !isShowList[key];
      } else {
        newObj[key] = false;
      }
    }
    setIsShowList(newObj);
  };
  return (
    <div className={styles.centerBlockFilter}> 
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
        <button  onClick={() => handleClickFilter("date")} className={`${styles.filterButton} ${styles.btnText} ${isShowList.date && styles.activeFilterButton}`}>

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
        <button  onClick={() => handleClickFilter("genre")} className={`${styles.filterButton} ${styles.btnText} ${isShowList.genre && styles.activeFilterButton}`}>
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

export default Filter;
