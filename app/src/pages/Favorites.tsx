import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TrackType } from "../types";
import styles from "../app/components/TrackList/TrackList.module.css";
import Track from "../app/components/track/Track";
import { setCurrentTrack, setFavoriteList } from "../store/features/trackSlice";
import {
  addFavoriteTrack,
  deleteFavoriteTrack,
  getAllFavoriteTracks,
} from "../API/TrackApi";

const Favorites = () => {
  const favoriteTracks = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );
  const [isAuthUser, setIsAuthUser] = useState<string | null>(
    null
  );

  const currentTrack: TrackType | null = useSelector(
    (state: RootState) => state?.tracks.currentTrack
  );
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const timeFormat = (digit) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return [
      minutes < 10 ? "0" + minutes : minutes,
      ":",
      seconds < 10 ? "0" + seconds : seconds,
    ];
  };

  const handleClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    // togglePlay(track);
  };

  const handleClickLike = async (id) => {
    const response = await addFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  const handleClickDisLike = async (id) => {
    const response = await deleteFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  useEffect(() => {
    if (isAuthUser) {
      const getAllFavorites = async () => {
        try {
          const response = await getAllFavoriteTracks();
          if (response) {
            dispatch(setFavoriteList(response.data));
          }
        } catch (error) {
          console.error(error);
        }
      };
      getAllFavorites();
    }
  }, []);

  useEffect(() => {}, [favoriteTracks]);
  return (
    <div className={styles.contentPlaylist}>
      {favoriteTracks?.map((track: TrackType) => (
        <Track
          key={track._id}
          track={track}
          handleClickTrack={handleClickTrack}
          currentTrack={currentTrack}
          player={player}
          handleClickLike={handleClickLike}
          timeFormat={timeFormat}
          favoriteTracks={favoriteTracks}
          handleClickDisLike={handleClickDisLike}
          isAuthUser={isAuthUser}
        />
      ))}
    </div>
  );
};

export default Favorites;
