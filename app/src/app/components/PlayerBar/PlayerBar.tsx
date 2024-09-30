"use client";
import React, { useCallback, RefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setCurrentTime,
  toggleLoop,
  toggleShuffle,
  setVolume,
  setPlay,
} from "../../../store/features/playerSlice";
import { setCurrentTrack } from "../../../store/features/trackSlice";
import { TrackType } from "../../../types";
import styles from "./PlayerBar.module.css";

interface PlayerBarProps {
  togglePlay: (track: TrackType) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ togglePlay, audioRef }) => {
  const player = useSelector((state: RootState) => state.player);
  const trackList = useSelector((state: RootState) => state.tracks.trackList);
  const currentTrack = useSelector(
    (state: RootState) => state.tracks.currentTrack
  );
  const dispatch = useDispatch();
  const duration = audioRef.current?.duration || 0;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        if (audio.duration > 0 && !isNaN(audio.duration)) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          setProgress(progressPercent);
          document.documentElement.style.setProperty(
            "--value",
            `${progressPercent}%`
          );
        }
      };

      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef]);

  const timeFormat = useCallback((digit: number) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return `${minutes < 10 ? "0" + Math.round(minutes) : Math.round(minutes)}:${
      seconds < 10 ? "0" + Math.round(seconds) : Math.round(seconds)
    }`;
  }, []);

  const randomTrack = useCallback(() => {
    const max = trackList.length - 1;
    const randomIndex = Math.floor(Math.random() * max);
    return trackList[randomIndex];
  }, [trackList]);

  const handleClickChangeTrack = useCallback(
    (direction: boolean) => {
      if (player.isShuffle) {
        dispatch(setCurrentTrack(randomTrack()));
        return;
      }
      const currentIndex = trackList.findIndex(
        (track) => track._id === currentTrack._id
      );
      const newIndex = direction ? currentIndex + 1 : currentIndex - 1;

      if (newIndex >= 0 && newIndex < trackList.length) {
        dispatch(setCurrentTrack(trackList[newIndex]));
      }
    },
    [dispatch, trackList, currentTrack, player.isShuffle, randomTrack]
  );
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.progress} style={{ width: `${progress}%` }} />
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleProgressChange}
        className={styles.rangeInput}
      />
      <div />
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
                  dispatch(setCurrentTime(e.currentTarget.currentTime))
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
                  <a className={styles.trackPlayAuthorLink} href="#">
                    {currentTrack?.name || ""}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="#">
                    {currentTrack?.author || ""}
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
                  onChange={(e) =>
                    dispatch(setVolume(parseFloat(e.target.value)))
                  }
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
