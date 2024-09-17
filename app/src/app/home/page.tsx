import Image from "next/image";
import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import CenterBlock from "../components/CenterBlock/CenterBlock";
import TrackList from "../components/TrackList/TrackList";
import SideBar from "../components/Sidebar/SideBar";
import PlayerBar from "../components/PlayerBar/PlayerBar";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <Header />
            <CenterBlock />
            <SideBar />
          </main>
          <PlayerBar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
