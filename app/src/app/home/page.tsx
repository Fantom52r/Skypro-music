"use client";

import Header from "../components/Header/Header";
import CenterBlock from "../components/CenterBlock/CenterBlock";
import SideBar from "../components/Sidebar/SideBar";
import PlayerBar from "../components/PlayerBar/PlayerBar";
import { useState, useRef, useEffect } from "react";
import { TrackType } from "../../types";
import { getData } from "../../API/TrackApi";

const TRACK = {
  _id: 1000,
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

export default function Home() {
  const [trackList, setTrackList] = useState<TrackType[]>([]);
  const [uniqFilters, setUniqFilters] = useState(UNIQ_FILTERS);
  const [isShuffle,setIsShuffle] = useState(false)

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

  const getUniqFilters = (res: TrackType[]) => {
    const uniqGenres = {};
    const uniqDates = {};
    const uniqAuthors = {};

    res.forEach((track) => {
      if (track.author !== "-") {
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
    const getDataTracks = async () => {
      const response: TrackType[] = await getData();
      setTrackList(response);
      getUniqFilters(response);
    };
    getDataTracks();
  }, []);

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
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              uniqFilters={uniqFilters}
              trackList={trackList}
              setTrackList={setTrackList}
              setUniqFilters={setUniqFilters}
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
            trackList={trackList}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
          />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
