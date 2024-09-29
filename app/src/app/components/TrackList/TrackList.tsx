"use client";
import React, { useEffect, useState } from "react";
import styles from "./TrackList.module.css";
import { TrackType } from "../../../types";
import { setCurrentTrack } from "../../../store/features/trackSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const TrackList = ({ togglePlay,}) => {
  const trackList: TrackType[] = useSelector(
    (state: RootState) => state.tracks.trackList
  );

  const currentTrack: TrackType = useSelector(
    (state: RootState) => state.tracks.currentTrack
  );
  const player=useSelector((state:RootState)=>state.player)
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
    togglePlay(track);
  };

  return (
    <div className={styles.contentPlaylist}>
      {trackList?.map((track: TrackType) => (
        <div key={track._id} className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <button
                onClick={() => handleClickTrack(track)}
                className={styles.trackTitleImage}
              >
                {track._id === currentTrack?._id ? (
                  <div
                    className={
                      player.isPlaying ? styles.pulsingCircle : styles.staticCircle
                    }
                  ></div>
                ) : (
                  <svg className={styles.trackTitleSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                )}
              </button>
              <div className="track__title-text">
                <a className={styles.trackTitleLink} href="http://">
                  {track.name} <span className={styles.trackTitleSpan}></span>
                </a>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <a className={styles.trackAuthorLink} href="http://">
                {track.author}
              </a>
            </div>
            <div className={styles.trackAlbum}>
              <a className={styles.trackAlbumLink} href="http://">
                {track.album}
              </a>
            </div>
            <div className="track__time">
              <svg className={styles.trackTimeSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.trackTimeText}>
                {timeFormat(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
