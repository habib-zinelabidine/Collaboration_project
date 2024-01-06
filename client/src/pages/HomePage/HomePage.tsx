import { useEffect, useState } from "react";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import httpClient from "../../axios";

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className={style.container}>
      <SideBar topics={topics} />
      <Outlet />
      <Discussion />
    </div>
  );
}
