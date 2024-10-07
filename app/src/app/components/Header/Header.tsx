"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
const Header = () => {
  const [openedNavBar, setOpenedNavBar] = useState(false);
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
      <div onClick={()=> setOpenedNavBar(!openedNavBar)} className={styles.navBurger}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={openedNavBar ? styles.navMenu : styles.navMenuClose}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem}>
            <Link href="/Favorites" className={styles.menuLink}>
              Мой плейлист
            </Link>
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
