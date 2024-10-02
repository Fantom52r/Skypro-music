"use client";
import React, { useEffect, useState } from "react";
import styles from "./TrackList.module.css";
import { getTrack } from "../../../API/TrackApi";
import { TrackType } from "../../../types";

const TrackList = ({ trackList, currentTrack, setCurrentTrack,togglePlay }) => {
  const timeFormat = (digit) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return [
      minutes < 10 ? "0" + minutes : minutes,
      ":",
      seconds < 10 ? "0" + seconds : seconds,
    ];
  };

const handleClickTrack = async (track:TrackType)=>{
  setCurrentTrack(track)
  togglePlay(track)
  const res = await getTrack(track._id)
}

  return (
    <div className={styles.contentPlaylist}>
      {trackList.map((track) => (
        <div key={track._id} className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div
                onClick={() => handleClickTrack(track)}
                className={styles.trackTitleImage}
              >
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                </svg>
              </div>
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
