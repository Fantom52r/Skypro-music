"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setUserLogOut } from "../../../store/features/authSlice";

const SideBar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const isAuth = useSelector((state: RootState) => state.auth.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("userName");
      setUsername(storedUsername);
    }
  }, []);

  const handleClickLogOut = () => {
    localStorage.setItem("userName", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setUsername(null);
  };

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{username ? username : ""}</p>
        <Link
          href="login"
          onClick={handleClickLogOut}
          className={styles.sidebarIcon}
        >
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
