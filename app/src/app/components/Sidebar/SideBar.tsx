//   Доделать

import Image from "next/image";
import React from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {

    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      setUsername(storedUserName);
    }
  }, []);

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{username? username:"Имя пользователя"}</p>
        <Link href="/login" className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </Link>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
