"use client";
import styles from "./centerBlock.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import TrackList from "../TrackList/TrackList";
import { getData } from "../../../API/TrackApi";
import { TrackType } from "../../../types";

const CenterBlock = ({ togglePlay }) => {
  return (
    <div className="main__centerblock centerblock">
      <Search />
      <h2 className="centerblock__h2">Треки</h2>
      <Filter />
      <div className="centerblock__content playlist-content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">Исполнитель</div>
          <div className="playlist-title__col col03">Альбом</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg">
              <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        
        <TrackList togglePlay={togglePlay} />
      </div>
    </div>
  );
};

export default CenterBlock;
