//  ДоДелать

import React, { useState } from "react";
import styles from "./PlayerBar.module.css";
import Image from "next/image";

const PlayerBar = ({
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  togglePlay,
  audioRef,
  isLoop,
  setIsLoop,
  volume,
  setVolume,
  currentTime,
  setCurrentTime,
}) => {
  const duration = audioRef.current?.duration || 0;
  const timeFormat = (digit) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return [
      minutes < 10 ? "0" + minutes.toFixed(0) : minutes.toFixed(0),
      ":",
      seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0),
    ];
  };
  return (
    <div className={styles.bar}>
      <input
        className={styles.styledProgressInput}
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        step={0.01}
        onChange={(e) => (audioRef.current.currentTime = e.target.value)}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div onClick={() => alert("еще не реализовано")} className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <audio
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
                ref={audioRef}
                src={currentTrack?.track_file}
              ></audio>
              <button
                onClick={() => togglePlay(currentTrack)}
                className={styles.playerBtnPlay}
              >
                {isPlaying ? (
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
              <div  onClick={() => alert("еще не реализовано")} className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <button
                onClick={() => setIsLoop(!isLoop)}
                className={styles.playerBtnRepeat}
              >
                {isLoop ? (
                  <Image
                    className={styles.playerBtnRepeatSvg}
                    src="/img/icon/repeatPng.png"
                    alt="logo"
                    height={16}
                    width={12}
                  />
                ) : (
                  <svg className={styles.playerBtnRepeatSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                )}
              </button>
              <div  onClick={() => alert("еще не реализовано")} className={styles.playerBtnShuffle}>
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
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
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
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
        / {timeFormat(currentTrack.duration_in_seconds)}
      </p>
    </div>
  );
};

export default PlayerBar;
