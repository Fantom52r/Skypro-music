"use client";
import React, { useEffect, useState } from "react";
import styles from "./TrackList.module.css";
import { TrackType } from "../../../types";
import {
  setCurrentTrack,
  setFavoriteList,
} from "../../../store/features/trackSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  addFavoriteTrack,
  deleteFavoriteTrack,
  getAllFavoriteTracks,
} from "../../../API/TrackApi";
import Track from "../track/Track";

const TrackList = ({ tracks, togglePlay }) => {
  const [isAuthUser, setIsAuthUser] = useState<string | null>(null);

  const currentTrack: TrackType | null = useSelector(
    (state: RootState) => state?.tracks.currentTrack
  );

  const favoriteTracks = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );

  const trackList = useSelector((state: RootState) => state.tracks.trackList);
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const timeFormat = (digit: number) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    togglePlay(track);
  };

  const handleClickLike = async (id: string) => {
    await addFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  const handleClickDisLike = async (id: string) => {
    await deleteFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authUser = localStorage.getItem("userName");
      setIsAuthUser(authUser);
    }
  }, [isAuthUser, dispatch]);
  useEffect(() => {}, [favoriteTracks, trackList]);

  return (
    <div className={styles.contentPlaylist}>
      {tracks?.map((track: TrackType) => (
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

export default TrackList;
