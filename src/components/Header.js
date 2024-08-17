import React from "react";
import "./Header.css"; // CSS 파일을 임포트
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <Logo className="logo-image" />
      </div>
      <button className="create-group-button">그룹 만들기</button>
    </header>
  );
};

export default Header;
