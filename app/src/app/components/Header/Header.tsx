import Image from "next/image";
import React from "react";
import styles from "./header.module.css"
const Header = () => {
  return (
    <nav className={styles.mainNav}>
      <div className="nav__logo logo">
        <Image  className="logo__image" src="/img/logo.png" alt="logo" height={17} width={113} />
      </div>
      <div className="nav__burger burger">
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
      <div className="nav__menu menu">
        <ul className="menu__list">
          <li className="menu__item">
            <a href="#" className="menu__link">
              Главное
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Мой плейлист
            </a>
          </li>
          <li className="menu__item">
            <a href="../signin.html" className="menu__link">
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
