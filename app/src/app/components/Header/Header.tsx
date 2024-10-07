"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const [openedNavBar, setOpenedNavBar] = useState(false);
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleClickToFavorites = () => {
    const userAuth = localStorage.getItem("userName") || "";

    if (userAuth) {
      handleNavigate("/home?view=favorites");
    } else {
      alert("Избранные треки доступны только авторизированным пользователям");
    }
  };

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className="logo__image"
          src="/img/logo.png"
          alt="logo"
          height={17}
          width={113}
        />
      </div>
      <div
        onClick={() => setOpenedNavBar(!openedNavBar)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={openedNavBar ? styles.navMenu : styles.navMenuClose}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <button
              onClick={() => handleNavigate("/home?view=all")}
              className={styles.menuLink}
            >
              Главное
            </button>
          </li>
          <li className={styles.menuItem}>
            <button
              onClick={handleClickToFavorites}
              className={styles.menuLink}
            >
              Мой плейлист
            </button>
          </li>
          <li className={styles.menuItem}>
            <a href="../signin.html" className={styles.menuLink}>
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
