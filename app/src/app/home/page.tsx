import Header from "../components/Header/Header";
import CenterBlock from "../components/CenterBlock/CenterBlock";
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
