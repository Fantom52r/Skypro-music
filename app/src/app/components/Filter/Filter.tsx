"use client";
import React, { useState } from "react";
import styles from "./Filter.module.css";

const SHOWN_FILTER = {
  author: false,
  date: false,
  genre: false,
};

const Filter = ({uniqFilters}) => {
  const [isShowList, setIsShowList] = useState(SHOWN_FILTER);
  const [filterByAuthors,setFilterByAuthors] = useState([]);
console.log(uniqFilters)
  return (
    <div className={styles.centerBlockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={`${styles.filterButton} ${styles.btnText}`}>
        исполнителю
      </div>
      {
isShowList.author && <div>
  <ul>
    {}
  </ul>
</div>
      }
      <div className={`${styles.filterButton} ${styles.btnText}`}>
        году выпуска
      </div>
      <div className={`${styles.filterButton} ${styles.btnText}`}>жанру</div>
    </div>
  );
};

export default Filter;
