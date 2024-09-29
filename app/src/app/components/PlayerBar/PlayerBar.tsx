//  ДоДелать

import React, { useState } from "react";
import styles from "./PlayerBar.module.css";
import Image from "next/image";
import { TrackType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setCurrentTime,
  setVolume,
  toggleLoop,
  toggleShuffle,
} from "../../../store/features/playerSlice";
import { setCurrentTrack } from "../../../store/features/trackSlice";

const PlayerBar = ({ togglePlay, audioRef }) => {
  const player = useSelector((state: RootState) => state.player);
  const trackList = useSelector((state: RootState) => state.tracks.trackList);
  const currentTrack = useSelector(
    (state: RootState) => state.tracks.currentTrack
  );
  const duration = audioRef.current?.duration || 0;

  const dispatch = useDispatch();

  const timeFormat = (digit) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return [
      minutes < 10 ? "0" + minutes.toFixed(0) : minutes.toFixed(0),
      ":",
      seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0),
    ];
  };
  const max = trackList.length - 1;

  const randomTrack = () => {
    const randomIndex = Math.floor(Math.random() * max);
    return randomIndex;
  };

  const handleClickChangeTrack = (direction: boolean) => {
    if (player.isShuffle) {
      const newIndexTrack = randomTrack();
      dispatch(setCurrentTrack(trackList[newIndexTrack]));
      return;
    }
    if (direction) {
      if (trackList[trackList.length - 1]._id !== currentTrack._id) {
        const index =
          trackList.findIndex(
            (track: TrackType) => track._id === currentTrack._id
          ) + 1;
        dispatch(setCurrentTrack(trackList[index]));
      }
    } else {
      if (trackList[0]._id !== currentTrack._id) {
        const index =
          trackList.findIndex(
            (track: TrackType) => track._id === currentTrack._id
          ) - 1;
        dispatch(setCurrentTrack(trackList[index]));
      }
    }
  };

  return (
    <div className={styles.bar}>
      <input
        className={styles.styledProgressInput}
        type="range"
        min="0"
        max={duration}
        value={player.currentTime}
        step={0.01}
        onChange={(e) => (audioRef.current.currentTime = e.target.value)}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <button
                onClick={() => handleClickChangeTrack(false)}
                className={styles.playerBtnPrev}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <audio
                onTimeUpdate={(e) =>
                  dispatch(setCurrentTime(+e.currentTarget.currentTime))
                }
                ref={audioRef}
                src={currentTrack?.track_file}
              ></audio>
              <button
                onClick={() => togglePlay(currentTrack)}
                className={styles.playerBtnPlay}
              >
                {player.isPlaying ? (
                  <svg
                    className={styles.playerBtnPlaySvg}
                    width="15"
                    height="19"
                    viewBox="0 0 15 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="5" height="19" fill="#D9D9D9" />
                    <rect x="10" width="5" height="19" fill="#D9D9D9" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                  </svg>
                )}
              </button>
              <button
                onClick={() => handleClickChangeTrack(true)}
                className={styles.playerBtnNext}
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button
                onClick={() => dispatch(toggleLoop())}
                className={styles.playerBtnRepeat}
              >
                {player.isLoop ? (
                  <svg
                    className={`${styles.playerBtnRepeatSvg} ${styles.playerBtnRepeatSvgActive}`}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                ) : (
                  <svg className={styles.playerBtnRepeatSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                )}
              </button>
              <button
                onClick={() => dispatch(toggleShuffle())}
                className={styles.playerBtnShuffle}
              >
                {player.isShuffle ? (
                  <svg
                    className={`${styles.playerBtnShuffleSvg} ${styles.playerBtnRepeatSvgActive}`}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                ) : (
                  <svg className={styles.playerBtnShuffleSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                )}
              </button>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {currentTrack ? currentTrack.name : ""}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {currentTrack ? currentTrack.author : ""}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div className={styles.trackPlayLike}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayDisLike}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={styles.volumeProgress}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={player.volume}
                  onChange={(e) => dispatch(setVolume(+e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.playTime}>
        {audioRef.current?.currentTime
          ? timeFormat(audioRef.current?.currentTime)
          : "0:00"}{" "}
        / {timeFormat(currentTrack?.duration_in_seconds)}
      </p>
    </div>
  );
};

export default PlayerBar;
