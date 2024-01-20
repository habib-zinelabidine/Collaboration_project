import { useEffect, useState } from "react";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import httpClient from "../../axios";
import NavBar from "../../components/NavBar";

export default function HomePage() {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.content}>
        <SideBar />
        <Outlet />
        <Discussion />
      </div>
    </div>
  );
}
