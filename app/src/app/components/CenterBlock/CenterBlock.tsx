"use client"
import styles from "./centerBlock.module.css";
import Image from "next/image";
import React, { useEffect,useState } from "react";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import TrackList from "../TrackList/TrackList";

const URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

const UNIQ_FILTERS: Filters = {
  AUTORS: [],
  DATES: [],
  GENRES: [],
};

interface Filters {
  AUTORS: string[];
  DATES: string[];
  GENRES: string[];
}

const CenterBlock = () => {

  const [trackList, setTrackList] = useState([]);
  const [uniqFilters, setUniqFilters] = useState(UNIQ_FILTERS);

  const getUniqFilters = (res) => {
    const uniqGenres = {};
    const uniqDates = {};
    const uniqAuthors = {};

    res.forEach((track) => {
      if (track.author !=="-" ) {
      uniqAuthors[track.author] = true;
      }
    });
    const listAuthors = Object.keys(uniqAuthors);

    res.forEach((track) => {
      uniqDates[track.release_date.slice(0, 4)] = true;
    });
    const listDates = Object.keys(uniqDates);

    res.forEach((track) => {
      track.genre.forEach((genre) => {
        uniqGenres[genre] = true;
      });
    });
    const listGenres = Object.keys(uniqGenres);

    setUniqFilters({
      AUTORS: listAuthors,
      DATES: listDates,
      GENRES: listGenres,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(URL)
          .then((res) => res.json())
          .then((res) => res.data);
        setTrackList(response);
        getUniqFilters(response);
      } catch (error) {
        alert("Произошла ошибка " + error);
      }
    };
    getData();
  }, []);

  return (
    <div className="main__centerblock centerblock">
      <Search />
      <h2 className="centerblock__h2">Треки</h2>
      <Filter uniqFilters ={uniqFilters}/>
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
        <TrackList trackList = {trackList}/>
      </div>
    </div>
  );
};

export default CenterBlock;
