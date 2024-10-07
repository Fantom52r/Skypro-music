"use client";
import styles from "./centerBlock.module.css";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import TrackList from "../TrackList/TrackList";
import { getData, getAllFavoriteTracks } from "../../../API/TrackApi";
import { TrackType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setTracks, setFavoriteList } from "../../../store/features/trackSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; 

const CenterBlock = ({ togglePlay }) => {
  const [isFavorites, setIsFavorites] = useState(false);
  const trackList: TrackType[] = useSelector(
    (state: RootState) => state.tracks.trackList
  );
  const favoriteTracks: TrackType[] = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams(); 
  const router = useRouter(); 

  useEffect(() => {
    const viewParam = searchParams?.get("view"); 
    if (viewParam === "favorites") {
      setIsFavorites(true); 
    } else {
      setIsFavorites(false); 
    }

    const getAllTracks = async () => {
      let response;
      if (isFavorites) { 
        response = await getAllFavoriteTracks();
        if (response) {
          dispatch(setFavoriteList(response.data));
        }
      } else { 
        response = await getData();
        if (response) {
          dispatch(setTracks(response));
        }
      }
    };
    getAllTracks();
  }, [dispatch, isFavorites, searchParams]); 

  const tracksToDisplay = isFavorites ? favoriteTracks : trackList;

  const handleNavigate = (path) => {
    if (path === "favorites") {
      router.push("/home?view=favorites");
    } else {
      router.push("/home?view=all");
    }
  };

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

        <TrackList tracks={tracksToDisplay} togglePlay={togglePlay} />
      </div>
    </div>
  );
};

export default CenterBlock;
