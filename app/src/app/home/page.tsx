"use client";

import Header from "../components/Header/Header";
import CenterBlock from "../components/CenterBlock/CenterBlock";
import SideBar from "../components/Sidebar/SideBar";
import PlayerBar from "../components/PlayerBar/PlayerBar";
import { useState, useRef, useEffect } from "react";
import { TrackType } from "../../types";

const TRACK = {
  _id: 32,
  name: "Essence2",
  author: "MED",
  release_date: "1920-05-03",
  genre: ["Электронная музыка"],
  duration_in_seconds: 205,
  album: "Essence2",
  logo: {
    type: "Buffer",
    data: [],
  },
  track_file:
    "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/MED_-_Essence2.mp3",
  staredUser: [],
};

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<TrackType>(TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(0.5); // Начальная громкость установлена на 50%
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);


  const togglePlay = (track: TrackType = TRACK) => {
    const audio = audioRef.current;
    if (isPlaying && track.name === currentTrack.name) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play();
    }
    audio.loop = isLoop;
  }, [currentTrack, isPlaying, isLoop]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <Header />
            <CenterBlock
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              togglePlay={togglePlay}
            />
            <SideBar />
          </main>
          <PlayerBar
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            audioRef={audioRef}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            volume={volume}
            setVolume={setVolume}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
          />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
